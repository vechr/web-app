import { BaseEntity } from '@/core/base/domain/entities';
import {
  TFieldDatePicker,
  TFieldInput,
  TFieldTextArea,
} from '@/core/base/domain/entities/protocol';

export class NotificationEmail extends BaseEntity {
  sender: string;
  recipient: string;
}

export type TNotificationEmailForm = {
  id?: TFieldInput;
  name: TFieldInput;
  sender: TFieldInput;
  recipient: TFieldInput;
  description: TFieldTextArea;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
