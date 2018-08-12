export interface IPipelineApi {
  notifyReady: () => void;
  setTableData: (data: any[]) => void;
  getCurrentTableData: () => any[];
  getCurrentTableSelectedRows: () => number[];
  navigate: (url: string) => void;
}

export interface IPipelineResolveFunc {
  (result?: any): void;
}

export interface IPipelineRejectFunc {
  (error?: any): void;
}
