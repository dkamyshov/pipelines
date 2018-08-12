import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const getCurrentTableSelectedRows = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  resolve(api.getCurrentTableSelectedRows());
};

export { getCurrentTableSelectedRows as pipeline };
