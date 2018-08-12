import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const sortTable = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  api.navigate(options.url);
  resolve();
};

export { sortTable as pipeline };
