import { AxiosHttpClient } from '@/applications/drivers';

export function topicEventController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function getTopicEventList(topicId: string) {
    return await http.request({
      method: 'get',
      url: `/topic/${topicId}/topic-events`,
    })
  }

  async function getTopicEventById(topicId: string, id: string) {
    return await http.request({
      method: 'get',
      url: `/topic/${topicId}/topic-events/${id}`
    })
  }

  async function createTopicEvent(
    topicId: string,
    value: { name: string; description: string; eventExpression: object }
  ) {
    return await http.request({
      method: 'post',
      url: `/topic/${topicId}/topic-events`,
      data: JSON.stringify(value, null, 2)
    })
  }

  async function updateTopicEventById(
    topicId: string,
    id: string,
    value: { name: string; description: string; eventExpression: object }
  ) {
    return await http.request({
      method: 'patch',
      url: `/topic/${topicId}/topic-events/${id}`,
      data: value
    })
  }

  async function deleteTopicEventById(topicId: string, id: string) {
    return await http.request({
      method: 'delete',
      url: `/topic/${topicId}/topic-events/${id}`,
    })
  }

  return {
    getTopicEventList,
    getTopicEventById,
    createTopicEvent,
    updateTopicEventById,
    deleteTopicEventById
  }
}