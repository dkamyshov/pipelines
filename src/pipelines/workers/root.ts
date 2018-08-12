import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const root = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  resolve();
};

export { root as pipeline };
