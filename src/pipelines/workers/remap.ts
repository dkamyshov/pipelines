import { IPipelineApi, IPipelineResolveFunc, IPipelineRejectFunc } from '..';

const remap = (api: IPipelineApi) => (
  resolve: IPipelineResolveFunc,
  reject: IPipelineRejectFunc
) => (options: any, input: any[]) => {
  if (input.length < 2) {
    reject({
      code: 'TOO_FEW_INPUTS',
      message: 'remap requires at least 2 inputs!',
    });
    return;
  }

  const table = input[0];
  const mapped = input[1];

  for (let i = 0; i < table.length; ++i) {
    const row = table[i];

    if (Object.prototype.hasOwnProperty.call(row, options.source)) {
      const remapRow = mapped.find(
        (mapRow: any) => mapRow[options.compare] === row[options.source]
      );
      if (remapRow) {
        row[options.source] = remapRow[options.return];
      }
    }
  }

  resolve(table);
};

export { remap as pipeline };
