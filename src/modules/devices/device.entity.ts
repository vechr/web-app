import { DeviceType } from '../device-types/device-type.entity';
import { Topic } from '../topics/topic.entity';
import {
  TFieldCheckBox,
  TFieldDatePicker,
  TFieldInput,
  TFieldSelect,
  TFieldTextArea,
} from '@/core/base/domain/entities/protocol';
import { BaseEntity } from '@/core/base/domain/entities';

export class Device extends BaseEntity {
  deviceTypeId: string;
  isActive: boolean;
  deviceType: DeviceType;
  topics: Topic[];
}

export type TDeviceForm = {
  id?: TFieldInput;
  name: TFieldInput;
  isActive: TFieldCheckBox;
  deviceTypeId: TFieldSelect;
  description: TFieldTextArea;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
