import { AxiosHttpClient } from '@/applications/drivers';

export function notificationEmailController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getNotificationEmailList() {
    return await http.request({
      method: 'get',
      url: '/api/v1/notification/email',
    })
  }

  async function getNotificationEmailById(id: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/notification/email/${id}`
    })
  }

  async function createNotificationEmail(
    value: { name: string; description: string; sender: string, recipient: string }
  ) {
    return await http.request({
      method: 'post',
      url: '/api/v1/notification/email',
      data: JSON.stringify(value, null, 2)
    })
  }

  async function updateNotificationEmailById(
    id: string,
    value: { name: string; description: string; sender: string, recipient: string }
  ) {
    return await http.request({
      method: 'patch',
      url: `/api/v1/notification/email/${id}`,
      data: value
    })
  }

  async function deleteNotificationEmailById(id: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/notification/email/${id}`,
    })
  }

  return {
    getNotificationEmailList,
    getNotificationEmailById,
    createNotificationEmail,
    updateNotificationEmailById,
    deleteNotificationEmailById
  }
}