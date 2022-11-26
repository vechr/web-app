import { AxiosHttpClient } from '@/applications/drivers';
import { THttpResponse } from '@/domain';
import { ICreateUser, IUpdateUser } from '@/domain';

export function userController() {
  const http = new AxiosHttpClient(import.meta.env.APP_BACKEND_SERVICE);

  async function getUsers(urlParams: Record<string, any>) {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/users',
      params: urlParams,
    });
  }

  async function getUserById(userId: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/auth/users/${userId}`,
    });
  }

  async function createUser(value: ICreateUser): Promise<THttpResponse> {
    return await http.request({
      method: 'post',
      url: '/api/v1/auth/users',
      data: value,
    });
  }

  async function updateUserById(
    id: string,
    values: IUpdateUser,
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'patch',
      url: `/api/v1/auth/users/${id}`,
      data: values,
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
    createUser,
    updateUserById,
    deleteUserById,
  };
}
