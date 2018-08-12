const workersResolvers = {
  root: () => import(/* webpackChunkName: "pipeline.root" */ './workers/root'),
  timeout: () =>
    import(/* webpackChunkName: "pipeline.timeout" */ './workers/timeout'),
  remap: () =>
    import(/* webpackChunkName: "pipeline.remap" */ './workers/remap'),
  log: () => import(/* webpackChunkName: "pipeline.log" */ './workers/log'),
  getTableData: () =>
    import(/* webpackChunkName: "pipeline.getTableData" */ './workers/getTableData'),
  sortTable: () =>
    import(/* webpackChunkName: "pipeline.sortTable" */ './workers/sortTable'),
  renderTable: () =>
    import(/* webpackChunkName: "pipeline.renderTable" */ './workers/renderTable'),
  getCurrentTableSelectedRows: () =>
    import(/* webpackChunkName: "pipeline.getCurrentTableSelectedRows" */ './workers/getCurrentTableSelectedRows'),
  getCurrentTableData: () =>
    import(/* webpackChunkName: "pipeline.getCurrentTableData" */ './workers/getCurrentTableData'),
  filterTableSelectedRows: () =>
    import(/* webpackChunkName: "pipeline.filterTableSelectedRows" */ './workers/filterTableSelectedRows'),
  sendTableData: () =>
    import(/* webpackChunkName: "pipeline.sendTableData" */ './workers/sendTableData'),
  navigate: () =>
    import(/* webpackChunkName: "pipeline.navigate" */ './workers/navigate'),
};

export type TWorkerName = keyof typeof workersResolvers;

export const isKnownWorker = (name: string): name is TWorkerName => {
  return Object.prototype.hasOwnProperty.call(workersResolvers, name);
};

export const getWorkerResolver = (name: TWorkerName) => {
  return workersResolvers[name];
};
