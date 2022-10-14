import { IBaseResponse, IDeviceType } from '@/domain';

export interface IDeviceTypeData extends IBaseResponse {
  data: IDeviceType[];
  deviceTypeEdit: { name: string; description: string };
  optionDeviceType: { value: string; label: string }[];
  dataDetails: IDeviceType;
}
