import { IError } from '../protocol';
import { IDashboard } from '.';

export interface IDashboardData {
  message: string;
  dataFull: IDashboard[];
  data: IDashboard[];
  dashboardEdit: { name: string; description: string; devices: string[] };
  dataDetails: IDashboard;
  error: IError;
}
