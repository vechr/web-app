import { IError, INotificationEmail } from '@/domain';

export interface INotificationEmailData {
  message: string;
  data: INotificationEmail[];
  dataDetails: INotificationEmail;
  optionNotificationEmail: { value: string; label: string }[];
  notificationEmailEdit: {
    id: string;
    name: string;
    description: string;
    sender: string;
    recipient: string;
  };
  error: IError;
}
