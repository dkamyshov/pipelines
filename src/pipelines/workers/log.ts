import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const log = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  console.log(input);
  resolve();
};

export { log as pipeline };
