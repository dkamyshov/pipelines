import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const getCurrentTableData = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  resolve(api.getCurrentTableData());
};

export { getCurrentTableData as pipeline };
