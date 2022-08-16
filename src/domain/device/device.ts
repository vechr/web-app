import { IDeviceType } from '../device-type/device-type';
import { ITopic } from '../topic/topic';

export interface IDevice {
  id: string;
  deviceTypeId: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  topics?: ITopic[];
  deviceType?: IDeviceType;
}
