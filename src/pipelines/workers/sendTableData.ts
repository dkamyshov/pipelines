import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const sendTableData = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  fetch(options.url, {
    method: 'POST',
    body: JSON.stringify(input[0]),
  }).then(() => {
    resolve();
  });
};

export { sendTableData as pipeline };
