import { AxiosHttpClient } from '@/applications/drivers';
import { THttpResponse } from '@/domain';

export function deviceTypeController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getDeviceTypes(): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/api/v1/things/device-type',
    })
  }

  async function getDeviceTypeById(id: string): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: `/api/v1/things/device-type/${id}`,
    })
  }

  async function createDeviceType(value: { name: string; description: string }) {
    return await http.request({
      method: 'post',
      url: '/api/v1/things/device-type',
      data: value
    })
  }

  async function updateDeviceTypeById(
    id: string,
    value: { name: string; description: string }
  ) {
    return await http.request({
      method: 'patch',
      url: `/api/v1/things/device-type/${id}`,
      data: value
    })
  }

  async function deleteDeviceTypeById(id: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/things/device-type/${id}`
    })
  }

  return {
    getDeviceTypes,
    getDeviceTypeById,
    createDeviceType,
    updateDeviceTypeById,
    deleteDeviceTypeById
  }
}