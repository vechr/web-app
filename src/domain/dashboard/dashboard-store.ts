import { IDashboard } from '.';
import { IError } from '../protocol';

export interface IDashboardData {
  message: string;
  dataFull: IDashboard[];
  data: IDashboard[];
  dashboardEdit: { name: string; description: string; devices: string[] };
  dataDetails: IDashboard;
  error: IError;
}