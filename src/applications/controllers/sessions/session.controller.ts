import { AxiosHttpClient } from '@/applications/drivers';

export function sessionController() {
  const http = new AxiosHttpClient(import.meta.env.VUE_APP_SERVICE_THINGS);

  async function statusToken() {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/sessions',
    });
  }

  async function login(value: { username: string; password: string }) {
    return await http.request({
      method: 'post',
      url: '/api/v1/auth/sessions',
      data: JSON.stringify(value),
    });
  }

  async function refresh(refreshToken: string) {
    return await http.request({
      method: 'post',
      url: `api/v1/auth/sessions/refresh/${refreshToken}`,
    });
  }

  return {
    login,
    refresh,
    statusToken,
  };
}
