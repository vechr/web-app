import { IDevice, IError } from '@/domain';

export interface IDeviceData {
  message: string;
  data: IDevice[];
  deviceEdit: {
    name: string;
    description: string;
    deviceTypeId?: string;
    isActive: boolean;
  };
  optionDevice: { value: string; label: string }[];
  dataDetails: IDevice;
  error: IError;
}
