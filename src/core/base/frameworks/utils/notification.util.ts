import { notification } from 'ant-design-vue';

export const notificationSuccessOrFail = (
  status: boolean,
  title?: string,
  message?: string,
) => {
  if (status) {
    showNotification(
      NotificationType.SUCCESS,
      title ?? `Status`,
      message ?? 'Successfully!',
    );
  } else {
    showNotification(
      NotificationType.ERROR,
      title ?? `Status`,
      message ?? 'Failed!',
    );
  }
};

/**
 * Show the notification in UI
 * @param notificationType SUCCESS, ERROR, INFO, WARNING, WARN, OPEN
 * @param title title of the notification
 * @param message message of the notification
 */
export function showNotification(
  notificationType: NotificationType,
  title: string,
  message?: string,
) {
  switch (notificationType) {
    case NotificationType.SUCCESS:
      notification.success({
        message: title,
        description: message ?? '',
        placement: 'top',
      });
      break;
    case NotificationType.ERROR:
      notification.error({
        message: title,
        description: message ?? '',
        placement: 'top',
      });
      break;
    case NotificationType.INFO:
      notification.info({
        message: title,
        description: message ?? '',
        placement: 'top',
      });
      break;
    case NotificationType.WARNING:
      notification.warning({
        message: title,
        description: message ?? '',
        placement: 'top',
      });
      break;
    case NotificationType.WARN:
      notification.warn({
        message: title,
        description: message ?? '',
        placement: 'top',
      });
      break;
    case NotificationType.OPEN:
      notification.open({
        message: title,
        description: message ?? '',
        placement: 'top',
      });
      break;
  }
}

export enum NotificationType {
  SUCCESS,
  ERROR,
  INFO,
  WARNING,
  WARN,
  OPEN,
}
