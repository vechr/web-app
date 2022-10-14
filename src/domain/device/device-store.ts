import { IBaseResponse, IDevice } from '@/domain';

export interface IDeviceData extends IBaseResponse {
  data: IDevice[];
  deviceEdit: {
    name: string;
    description: string;
    deviceTypeId?: string;
    isActive: boolean;
  };
  optionDevice: { value: string; label: string }[];
  dataDetails: IDevice;
}
