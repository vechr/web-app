import { AxiosHttpClient } from '@/applications/drivers';

export function userController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getUsers() {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/users',
    });
  }

  async function getUserById(userId: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/auth/users/${userId}`,
    });
  }

  async function deleteUserById(userId: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/auth/users/${userId}`,
    });
  }

  return {
    getUsers,
    getUserById,
    deleteUserById,
  };
}
