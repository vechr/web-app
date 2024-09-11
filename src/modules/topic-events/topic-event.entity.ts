import { NotificationEmail } from '../notification-emails/notification-email.entity';
import {
  TFieldDatePicker,
  TFieldInput,
  TFieldSelect,
  TFieldSelectMultiple,
  TFieldTextArea,
} from '@/core/base/domain/entities/protocol';
import { BaseEntity } from '@/core/base/domain/entities';

export class TopicEvent extends BaseEntity {
  topicId: string;
  eventExpression: string | null;
  bodyEmail: string | null;
  htmlBodyEmail: string | null;

  notificationEmails: NotificationEmail[];
}

export type TTopicEventForm = {
  id?: TFieldInput;
  name: TFieldInput;
  topicId: TFieldSelect;
  eventExpression: TFieldInput;
  bodyEmail: TFieldTextArea;
  htmlBodyEmail: TFieldTextArea;
  notificationEmails: TFieldSelectMultiple;
  description: TFieldTextArea;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
