import { THttpResponse } from '@/domain';
import { AxiosHttpClient } from '@/applications/drivers';

export function dashboardController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getDashboardFullList(): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/api/v1/things/dashboard/details',
    });
  }

  async function getDashboardListV2(
    urlParams: Record<string, any>,
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/api/v2/things/dashboard',
      params: urlParams,
    });
  }

  async function getDashboardList(): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/api/v1/things/dashboard',
    });
  }

  async function getDashboardById(id: string): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: `/api/v1/things/dashboard/${id}`,
    });
  }

  async function createDashboard(value: {
    name: string;
    description: string;
  }): Promise<THttpResponse> {
    return await http.request({
      method: 'post',
      url: '/api/v1/things/dashboard',
      data: value,
    });
  }

  async function updateDashboardById(
    id: string,
    value: { name: string; description: string; devices: string[] },
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'patch',
      url: `/api/v1/things/dashboard/${id}`,
      data: value,
    });
  }

  async function deleteDashboardById(id: string): Promise<THttpResponse> {
    return await http.request({
      method: 'delete',
      url: `/api/v1/things/dashboard/${id}`,
    });
  }

  return {
    getDashboardById,
    getDashboardFullList,
    getDashboardList,
    createDashboard,
    updateDashboardById,
    deleteDashboardById,
    getDashboardListV2,
  };
}
