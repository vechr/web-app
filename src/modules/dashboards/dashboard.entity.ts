import { Device } from '../devices/device.entity';
import {
  TFieldDatePicker,
  TFieldInput,
  TFieldSelectMultiple,
  TFieldTextArea,
} from '@/core/base/domain/entities/protocol';
import { BaseEntity } from '@/core/base/domain/entities';

export class Dashboard extends BaseEntity {
  devices: DashboardDevice[];
}

export class DashboardDevice {
  deviceId: string;
  dashboardId: string;
  createdAt: Date;
  updatedAt: Date;
  device: Device;
}

export type TDashboardForm = {
  id?: TFieldInput;
  name: TFieldInput;
  description: TFieldTextArea;
  devices: TFieldSelectMultiple;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
