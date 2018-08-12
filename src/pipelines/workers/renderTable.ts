import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const renderTable = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  api.setTableData(input[0]);
  resolve();
};

export { renderTable as pipeline };
