import { IDeviceType, IError } from '@/domain';

export interface IDeviceTypeData {
  message: string;
  data: IDeviceType[];
  deviceTypeEdit: { name: string; description: string };
  optionDeviceType: { value: string; label: string }[];
  dataDetails: IDeviceType;
  error: IError;
}