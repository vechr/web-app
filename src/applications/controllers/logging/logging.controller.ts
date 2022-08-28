import { AxiosHttpClient } from '@/applications/drivers';

export function loggingController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getHistoricalData(payload: {
    dashboardId: string | string[];
    deviceId: string | string[];
    topicId: string | string[];
    topic: string | string[];
  }) {
    return await http.request({
      method: 'post',
      url: `/api/v1/things/device/${payload.deviceId}/topic/query`,
      data: payload
    })
  }

  return {
    getHistoricalData
  }
}
