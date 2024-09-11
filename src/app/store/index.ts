import { usePermissionStore } from '../../modules/permissions/permission.store';
import { useRoleStore } from '../../modules/roles/role.store';
import { useUserStore } from '../../modules/users/user.store';
import { useDashboardStore } from '@/modules/dashboards/dashboard.store';
import { useSiteStore } from '@/modules/sites/site.store';
import { useDeviceStore } from '@/modules/devices/device.store';
import { useDeviceTypeStore } from '@/modules/device-types/device-type.store';
import { useTopicStore } from '@/modules/topics/topic.store';
import { useTopicEventStore } from '@/modules/topic-events/topic-event.store';
import { useNotificationEmailStore } from '@/modules/notification-emails/notification-email.store';

export const store = {
  user: useUserStore,
  permission: usePermissionStore,
  site: useSiteStore,
  role: useRoleStore,
  dashboard: useDashboardStore,
  device: useDeviceStore,
  deviceType: useDeviceTypeStore,
  topic: useTopicStore,
  topicEvent: useTopicEventStore,
  notificationEmail: useNotificationEmailStore,
};

export type TStore =
  | 'user'
  | 'permission'
  | 'role'
  | 'site'
  | 'dashboard'
  | 'device'
  | 'deviceType'
  | 'topic'
  | 'topicEvent'
  | 'notificationEmail';

export const listOfDomains = [
  'User',
  'Role',
  'Site',
  'Dashboard',
  'Device',
  'Device Type',
  'Topic',
  'Topic Event',
  'Notification Email',
];
