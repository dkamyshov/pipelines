import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const delay = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  setTimeout(() => {
    resolve(options.value);
  }, options.delay);
};

export { delay as pipeline };
