import { AxiosHttpClient } from '@/applications/drivers';

export function deviceController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getDevices() {
    return await http.request({
      method: 'get',
      url: '/device',
    })
  }

  async function getDeviceById(id: string) {
    return await http.request({
      method: 'get',
      url: `/device/${id}`,
    })
  }

  async function createDevice(value: {
    name: string;
    description: string;
    isActive: boolean;
    deviceTypeId: string;
  }) {
    return await http.request({
      method: 'post',
      url: '/device',
      data: JSON.stringify(value, null, 2)
    })
  }

  async function updateDeviceById(
    id: string,
    value: {
      name: string;
      description: string;
      isActive: boolean;
      deviceTypeId: string;
    }
  ) {
    return await http.request({
      method: 'patch',
      url: `/device/${id}`,
      data: value
    })
  }

  async function deleteDeviceById(id: string) {
    return await http.request({
      method: 'delete',
      url: `/device/${id}`
    })
  }

  return {
    getDevices,
    getDeviceById,
    createDevice,
    updateDeviceById,
    deleteDeviceById
  }
}