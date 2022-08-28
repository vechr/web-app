import { AxiosHttpClient } from '@/applications/drivers';
import { ICreateWidget, IUpdateWidget } from '@/domain';

export function widgetController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function updateWidgetById(dashboardId: string, widgetId: string, data: IUpdateWidget) {
    return await http.request({
      method: 'patch',
      url: `/api/v1/things/dashboard/${dashboardId}/widget/${widgetId}`,
      data: data
    })
  }

  async function deleteWidgetById(dashboardId: string, widgetId: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/things/dashboard/${dashboardId}/widget/${widgetId}`
    })
  }

  async function getAllWidgets(dashboardId: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/things/dashboard/${dashboardId}/widget`
    })
  }

  async function createWidget(dashboardId: string, data: ICreateWidget) {
    return await http.request({
      method: 'post',
      url: `/api/v1/things/dashboard/${dashboardId}/widget`,
      data: data
    })
  }

  return {
    updateWidgetById,
    deleteWidgetById,
    getAllWidgets,
    createWidget
  }
}