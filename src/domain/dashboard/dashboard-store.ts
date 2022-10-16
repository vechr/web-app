import { IBaseResponse } from '../protocol';
import { IDashboard } from '.';

export interface IDashboardData extends IBaseResponse {
  dataFull: IDashboard[];
  data: IDashboard[];
  dashboardEdit: { name: string; description: string; devices: string[] };
  dataDetails: IDashboard;
}
