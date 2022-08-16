import { IDevice } from '../device/device';

export interface IDeviceType {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  devices?: IDevice[];
}
