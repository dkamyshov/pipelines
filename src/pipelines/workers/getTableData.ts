import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';
import { convertToPipelineError } from '../runner2';

const getTableData = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  fetch(options.url)
    .then(response => response.json())
    .then(json => {
      resolve(json.rows);
    })
    .catch(e => {
      reject(convertToPipelineError(e));
    });
};

export { getTableData as pipeline };
