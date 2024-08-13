import { BaseEntity } from '@/core/base/domain/entities';
import {
  TFieldDatePicker,
  TFieldInput,
  TFieldTextArea,
} from '@/core/base/domain/entities/protocol';

export class DeviceType extends BaseEntity {}

export type TDeviceTypeForm = {
  id?: TFieldInput;
  name: TFieldInput;
  description: TFieldTextArea;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
