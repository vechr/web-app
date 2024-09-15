import 'reflect-metadata';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { Service } from 'typedi';
import {
  EHttpStatusCode,
  IHttpClient,
  THttpRequest,
  TResponseData,
} from '@/core/base/domain/entities/protocol';
import { SessionUsecase } from '@/core/modules/sessions/session.usecase';

@Service()
export class AxiosHttpClient<T = any> implements IHttpClient<T> {
  private myAxios = axios;

  constructor() {
    this.myAxios.defaults.baseURL =
      SessionUsecase.getSettingLocalStorage().backendProtocol +
      SessionUsecase.getSettingLocalStorage().backedServer;
    this.myAxios.defaults.headers.post['Content-Type'] = 'application/json';
    this.myAxios.defaults.headers.post['Accept'] = 'application/json';
  }

  private status: EHttpStatusCode = EHttpStatusCode.NO_CONTENT;

  private data: TResponseData;

  async request(httpRequest: THttpRequest) {
    try {
      await this.myAxios
        .request({
          url: httpRequest.url,
          method: httpRequest.method,
          data: httpRequest.data,
          headers: httpRequest.headers,
          baseURL: httpRequest.baseURL,
          withCredentials: true,
          params: httpRequest.params,
        })
        .then((res) => {
          this.status = res.status;
          this.data = res.data;
        })
        .catch((err) => {
          this.status = err.response.status;
          this.data = err.response.data;
        });
    } catch (error) {
      message.error(
        'Something wrong with Application, please contact your administrator!',
      );
    }

    return {
      status: this.status,
      data: this.data,
    };
  }
}
