import * as directory from './directory';

import { IPipelineApi } from '.';

interface IPipelineDescription {
  id: number;
  name: string;
  dependencies?: number[];
  options?: any;
}

interface IPipelineBlock {
  id: number;
  resolved: boolean;
  running: boolean;
  dependencies?: number[];
  parents: number[];
  value: any;
  name: string;
  options: any;
}

interface IPipelineError {
  code: string;
  message?: string;
}

/**
 * Runs a microtask.
 * 
 * ==================================
 * 
 * **CRITICAL** For speed concerns `runMicrotask` does not handle exceptions by itself. Triple check that there is nothing that may `throw` inside your `catch` routine as any uncaught errors will not only be lost forever, but will also cause you a huge headache!
 * 
 * ==================================
 * 
 * @param task A function to be executed as a microtask.
 */
const runMicrotask = (task: (...args: any[]) => void) =>
  Promise.resolve()
    .then(task);

export const convertToPipelineError = (e: Error) => {
  return {
    code: 'INTERNAL_ERROR',
    message: e.message,
  };
};

export const createPipelineRunner = (
  descriptions: IPipelineDescription[],
  api: IPipelineApi,
  onPipelineError: (error: string) => void
) => {
  const blocks = new Map<number, IPipelineBlock>();
  const deps = new Map<number, number[]>();

  descriptions.forEach(description => {
    blocks.set(description.id, {
      id: description.id,
      resolved: false,
      running: false,
      dependencies: description.dependencies,
      parents: [],
      value: void 0,
      name: description.name,
      options: description.options,
    });

    deps.set(description.id, []);
  });

  descriptions.forEach(description => {
    if (typeof description.dependencies !== 'undefined') {
      description.dependencies.forEach(dependency => {
        deps.get(dependency)!.push(description.id);
      });
    }
  });

  const isDependencyResolved = (id: number) => {
    return blocks.get(id)!.resolved && !blocks.get(id)!.running;
  };

  const checkDependencies = (id: number) => {
    return descriptions
      .find(description => description.id === id)!
      .dependencies!.every(isDependencyResolved);
  };

  const shouldExecute = (id: number) => {
    return (
      !blocks.get(id)!.resolved &&
      !blocks.get(id)!.running &&
      checkDependencies(id)
    );
  };

  const getInputValues = (dependencies: number[]): any[] => {
    return dependencies.map(dependency => blocks.get(dependency)!.value);
  };

  const hasErrorHandler = (id: number) => {
    return false;
  };

  const runBlock = (id: number) => {
    const description = descriptions.find(
      description => description.id === id
    )!;
    const name = description.name as string;

    if (directory.isKnownWorker(name)) {
      const resolver = directory.getWorkerResolver(name);
      resolver()
        .then(worker => {
          try {
            const inputs = getInputValues(description.dependencies!);
            worker.pipeline(api)(resolveFunc(id), rejectFunc(id))(
              description.options,
              inputs
            );
          } catch (e) {
            rejectFunc(id)(convertToPipelineError(e), void 0, `INTERNAL ERROR`);
          }
        })
        .catch(e => {
          rejectFunc(id)(convertToPipelineError(e), void 0, `UNABLE TO LOAD`);
        });
    } else {
      rejectFunc(id)(
        {
          code: 'UNKNOWN_WORKER',
          message: `"${name}" is not a worker we know about!`,
        },
        void 0,
        'UNKNOWN WORKER'
      );
    }
  };

  const notifyExecutionDone = (block: IPipelineBlock) => {
    // get children of `id`
    const dependencies = deps.get(block.id);

    if (!dependencies) return;

    // check them
    dependencies.forEach(dependency => {
      if (shouldExecute(dependency)) {
        runMicrotask(() => {
          runBlock(dependency);
        });
      }
    });
  };

  const resolveFunc = (id: number) => (value: any) => {
    const block = blocks.get(id)!;
    block.resolved = true;
    block.running = false;
    block.value = value;

    notifyExecutionDone(block);
  };

  const rejectFunc = (id: number) => (
    error: IPipelineError,
    stack?: string,
    additionalInfo?: string
  ) => {
    if (id === 0) {
      const message =
        'Uncaught pipeline rejection!\n' +
        error.code +
        ': ' +
        (error.message || '[no message]') +
        '\n\nExecution path:\n' +
        ('[0] root\n' + (stack || ''));
      onPipelineError(message);
    } else {
      const block = blocks.get(id)!;
      const currentStack = `[${block.id}] ${block.name}${
        additionalInfo ? ` <- ${additionalInfo}` : ''
      } ${
        block.options
          ? `\n${JSON.stringify(block.options, null, 4)
              .split('\n')
              .map(l => ' '.repeat(2) + l)
              .join('\n')}`
          : ''
      }`;

      if (hasErrorHandler(id)) {
        // kek
      } else {
        for (let i = block.dependencies!.length - 1; i >= 0; --i) {
          if (hasErrorHandler(block.dependencies![i])) {
            // kek
          }

          if (i == 0) {
            rejectFunc(block.dependencies![i])(
              error,
              currentStack + '\n' + (stack || '')
            );
          }
        }
      }
    }
  };

  return {
    run: () => runMicrotask(resolveFunc(0)),
  };
};
