import { AxiosHttpClient } from '@/applications/drivers';
import { ICreateRole, IUpdateRole, THttpResponse } from '@/domain';

export function roleController() {
  const http = new AxiosHttpClient(import.meta.env.APP_BACKEND_SERVICE);

  async function getRoles(urlParams: Record<string, any>) {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/roles',
      params: urlParams,
    });
  }

  async function getRoleAll(): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/roles/all',
    });
  }

  async function getRoleById(roleId: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/auth/roles/${roleId}`,
    });
  }

  async function createRole(value: ICreateRole): Promise<THttpResponse> {
    return await http.request({
      method: 'post',
      url: '/api/v1/auth/roles',
      data: value,
    });
  }

  async function updateRoleById(
    roleId: string,
    values: IUpdateRole,
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'patch',
      url: `/api/v1/auth/roles/${roleId}`,
      data: values,
    });
  }

  async function deleteRoleById(roleId: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/auth/roles/${roleId}`,
    });
  }

  return {
    getRoles,
    getRoleAll,
    getRoleById,
    createRole,
    updateRoleById,
    deleteRoleById,
  };
}
