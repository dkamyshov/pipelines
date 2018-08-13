const workersResolvers = {
  root: () => import(/* webpackChunkName: "workers/root" */ './workers/root'),
  timeout: () =>
    import(/* webpackChunkName: "workers/timeout" */ './workers/timeout'),
  remap: () =>
    import(/* webpackChunkName: "workers/remap" */ './workers/remap'),
  log: () => import(/* webpackChunkName: "workers/log" */ './workers/log'),
  getTableData: () =>
    import(/* webpackChunkName: "workers/getTableData" */ './workers/getTableData'),
  sortTable: () =>
    import(/* webpackChunkName: "workers/sortTable" */ './workers/sortTable'),
  renderTable: () =>
    import(/* webpackChunkName: "workers/renderTable" */ './workers/renderTable'),
  getCurrentTableSelectedRows: () =>
    import(/* webpackChunkName: "workers/getCurrentTableSelectedRows" */ './workers/getCurrentTableSelectedRows'),
  getCurrentTableData: () =>
    import(/* webpackChunkName: "workers/getCurrentTableData" */ './workers/getCurrentTableData'),
  filterTableSelectedRows: () =>
    import(/* webpackChunkName: "workers/filterTableSelectedRows" */ './workers/filterTableSelectedRows'),
  sendTableData: () =>
    import(/* webpackChunkName: "workers/sendTableData" */ './workers/sendTableData'),
  navigate: () =>
    import(/* webpackChunkName: "workers/navigate" */ './workers/navigate'),
};

export type TWorkerName = keyof typeof workersResolvers;

export const isKnownWorker = (name: string): name is TWorkerName => {
  return Object.prototype.hasOwnProperty.call(workersResolvers, name);
};

export const getWorkerResolver = (name: TWorkerName) => {
  return workersResolvers[name];
};
