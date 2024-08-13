import { BaseEntity } from '@/core/base/domain/entities';
import {
  TFieldDatePicker,
  TFieldInput,
  TFieldTextArea,
} from '@/core/base/domain/entities/protocol';

export class Site extends BaseEntity {
  code: string;
  location: string;
}

export type TSiteForm = {
  id?: TFieldInput;
  name: TFieldInput;
  description: TFieldTextArea;
  code: TFieldInput;
  location: TFieldInput;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
