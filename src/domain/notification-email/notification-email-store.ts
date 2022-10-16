import { IBaseResponse, INotificationEmail } from '@/domain';

export interface INotificationEmailData extends IBaseResponse {
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
}
