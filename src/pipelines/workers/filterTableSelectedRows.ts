import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const filterTableSelectedRows = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  if (input.length < 2) {
    reject({
      code: 'TOO_FEW_INPUTS',
      message: 'filterTableSelectedRows requires at least 2 inputs!',
    });
  }

  const rows = input[0];
  const required = input[1];

  const result = [] as any[];

  rows.forEach((row: any) => {
    if (required.includes(row.id)) {
      result.push(row);
    }
  });

  resolve(result);
};

export { filterTableSelectedRows as pipeline };
