import { THttpResponse } from '@/domain';
import { AxiosHttpClient } from '@/applications/drivers'

export function dashboardController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getDashboardFullList(): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/dashboard/details',
    })
  }

  async function getDashboardList(): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/dashboard'
    })
  }

  async function getDashboardById(id: string): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: `/dashboard/${id}`
    })
  }

  async function createDashboard(value: { name: string; description: string }): Promise<THttpResponse> {
    return await http.request({
      method: 'post',
      url: '/dashboard',
      data: value
    })
  }

  async function updateDashboardById(
    id: string,
    value: { name: string; description: string; devices: string[] }
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'patch',
      url: `/dashboard/${id}`,
      data: value
    })
  }

  async function deleteDashboardById(id: string): Promise<THttpResponse> {
    return await http.request({
      method: 'delete',
      url: `/dashboard/${id}`
    })
  }

  return {
    getDashboardById,
    getDashboardFullList,
    getDashboardList,
    createDashboard,
    updateDashboardById,
    deleteDashboardById
  }
}