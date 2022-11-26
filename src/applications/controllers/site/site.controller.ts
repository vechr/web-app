import { AxiosHttpClient } from '@/applications/drivers';
import { ICreateSite, IUpdateSite, THttpResponse } from '@/domain';

export function siteController() {
  const http = new AxiosHttpClient(import.meta.env.APP_BACKEND_SERVICE);

  async function getSites(urlParams: Record<string, any>) {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/sites',
      params: urlParams,
    });
  }

  async function getSiteAll(): Promise<THttpResponse> {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/sites/all',
    });
  }

  async function getSiteById(siteId: string) {
    return await http.request({
      method: 'get',
      url: `/api/v1/auth/sites/${siteId}`,
    });
  }

  async function createSite(value: ICreateSite): Promise<THttpResponse> {
    return await http.request({
      method: 'post',
      url: '/api/v1/auth/sites',
      data: value,
    });
  }

  async function updateSiteById(
    siteId: string,
    values: IUpdateSite,
  ): Promise<THttpResponse> {
    return await http.request({
      method: 'patch',
      url: `/api/v1/auth/sites/${siteId}`,
      data: values,
    });
  }

  async function deleteSiteById(siteId: string) {
    return await http.request({
      method: 'delete',
      url: `/api/v1/auth/sites/${siteId}`,
    });
  }

  return {
    getSites,
    getSiteAll,
    getSiteById,
    createSite,
    updateSiteById,
    deleteSiteById,
  };
}
