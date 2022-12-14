import { AxiosHttpClient } from '@/applications/drivers';
import { THttpResponse } from '@/domain';

export function deviceController() {
  const http = new AxiosHttpClient(import.meta.env.APP_BACKEND_SERVICE);

  async function getDeviceListV2(
    urlParams: Record<string, any>,
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/api/v2/things/device',
      params: urlParams,
    });
  }

  async function getDevices() {
    return await http.request({
      method: 'get',
      url: '/api/v1/things/device',
    });
  }

  async function getDeviceById(id: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/things/device/${id}`,
    });
  }

  async function createDevice(value: {
    name: string;
    description: string;
    isActive: boolean;
    deviceTypeId: string;
  }) {
    return await http.request({
      method: 'post',
      url: '/api/v1/things/device',
      data: JSON.stringify(value, null, 2),
    });
  }

  async function updateDeviceById(
    id: string,
    value: {
      name: string;
      description: string;
      isActive: boolean;
      deviceTypeId: string;
    },
  ) {
    return await http.request({
      method: 'patch',
      url: `/api/v1/things/device/${id}`,
      data: value,
    });
  }

  async function deleteDeviceById(id: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/things/device/${id}`,
    });
  }

  return {
    getDeviceListV2,
    getDevices,
    getDeviceById,
    createDevice,
    updateDeviceById,
    deleteDeviceById,
  };
}
