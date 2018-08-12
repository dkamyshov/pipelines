import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const sortTable = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  resolve(input[0].sort((a: any, b: any) => a.id - b.id));
};

export { sortTable as pipeline };
