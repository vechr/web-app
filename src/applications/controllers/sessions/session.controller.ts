import { AxiosHttpClient } from '@/applications/drivers';

export function sessionController() {
  const http = new AxiosHttpClient(import.meta.env.APP_BACKEND_SERVICE);

  async function mySession() {
    return await http.request({
      method: 'get',
      url: '/api/v1/auth/sessions/me',
    });
  }

  async function logout() {
    return await http.request({
      method: 'post',
      url: '/api/v1/auth/sessions/logout',
    });
  }

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

  async function refresh() {
    return await http.request({
      method: 'post',
      url: `api/v1/auth/sessions/refresh`,
    });
  }

  return {
    mySession,
    login,
    refresh,
    statusToken,
    logout,
  };
}
