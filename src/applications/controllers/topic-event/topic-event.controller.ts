import { AxiosHttpClient } from '@/applications/drivers';
import { THttpResponse } from '@/domain';

export function topicEventController() {
  const http = new AxiosHttpClient(import.meta.env.APP_BACKEND_SERVICE);

  async function getTopicEventListV2(
    topicId: string,
    urlParams: Record<string, any>,
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: `/api/v2/things/topic/${topicId}/topic-events`,
      params: urlParams,
    });
  }

  async function getTopicEventList(topicId: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/things/topic/${topicId}/topic-events`,
    });
  }

  async function getTopicEventById(topicId: string, id: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/things/topic/${topicId}/topic-events/${id}`,
    });
  }

  async function createTopicEvent(
    topicId: string,
    value: {
      name: string;
      description: string;
      eventExpression: string;
      notificationEmailId: string[];
      bodyEmail?: string;
      htmlBodyEmail?: string;
    },
  ) {
    return await http.request({
      method: 'post',
      url: `/api/v1/things/topic/${topicId}/topic-events`,
      data: JSON.stringify(value, null, 2),
    });
  }

  async function updateTopicEventById(
    topicId: string,
    id: string,
    value: {
      name: string;
      description: string;
      eventExpression: string;
      notificationEmailId: string[];
      bodyEmail?: string;
      htmlBodyEmail?: string;
    },
  ) {
    return await http.request({
      method: 'patch',
      url: `/api/v1/things/topic/${topicId}/topic-events/${id}`,
      data: value,
    });
  }

  async function deleteTopicEventById(topicId: string, id: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/things/topic/${topicId}/topic-events/${id}`,
    });
  }

  return {
    getTopicEventListV2,
    getTopicEventList,
    getTopicEventById,
    createTopicEvent,
    updateTopicEventById,
    deleteTopicEventById,
  };
}
