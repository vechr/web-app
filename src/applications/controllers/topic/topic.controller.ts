import { AxiosHttpClient } from '@/applications/drivers';
import { THttpResponse } from '@/domain';

export function topicController() {
  const http = new AxiosHttpClient(import.meta.env.APP_BACKEND_SERVICE);

  async function getTopicListV2(
    deviceId: string,
    urlParams: Record<string, any>,
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: `/api/v2/things/device/${deviceId}/topic`,
      params: urlParams,
    });
  }

  async function getTopicList(deviceId: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/things/device/${deviceId}/topic`,
    });
  }

  async function getTopicById(deviceId: string, id: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/things/device/${deviceId}/topic/${id}`,
    });
  }

  async function createTopic(
    deviceId: string,
    value: { name: string; description: string; widgetType?: string },
  ) {
    return await http.request({
      method: 'post',
      url: `/api/v1/things/device/${deviceId}/topic`,
      data: JSON.stringify(value, null, 2),
    });
  }

  async function updateTopicById(
    deviceId: string,
    id: string,
    value: { name: string; description: string },
  ) {
    return await http.request({
      method: 'patch',
      url: `/api/v1/things/device/${deviceId}/topic/${id}`,
      data: value,
    });
  }

  async function deleteTopicById(deviceId: string, id: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/things/device/${deviceId}/topic/${id}`,
    });
  }

  return {
    getTopicListV2,
    getTopicList,
    getTopicById,
    createTopic,
    updateTopicById,
    deleteTopicById,
  };
}
