import { AxiosHttpClient } from '@/applications/drivers';
import { THttpResponse } from '@/domain';

export function permissionController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getPermissionAll(): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/permissions/all',
    });
  }

  return {
    getPermissionAll,
  };
}