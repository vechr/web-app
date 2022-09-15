import axios from 'axios';
import {
  EHttpStatusCode,
  IHttpClient,
  THttpRequest,
  THttpResponse,
  TResponseData,
} from '@/domain';

export class AxiosHttpClient implements IHttpClient {
  private myAxios = axios;

  constructor(
    defaultBaseURL: string,
    defaultContentType?: string,
    defaultAccept?: string,
  ) {
    this.myAxios.defaults.baseURL = defaultBaseURL;
    this.myAxios.defaults.headers.post['Content-Type'] =
      defaultContentType ?? 'application/json';
    this.myAxios.defaults.headers.post['Accept'] =
      defaultAccept ?? 'application/json';
  }

  private status: EHttpStatusCode = EHttpStatusCode.noContent;

  private data: TResponseData | undefined = undefined;

  async request(httpRequest: THttpRequest): Promise<THttpResponse> {
    await this.myAxios
      .request({
        url: httpRequest.url,
        method: httpRequest.method,
        data: httpRequest.data,
        headers: httpRequest.headers,
        baseURL: httpRequest.baseURL,
      })
      .then((res) => {
        this.status = res.status;
        this.data = res.data;
      })
      .catch((err) => {
        this.status = err.response.status;
        this.data = err.response.data;
      });

    return {
      status: this.status,
      data: this.data,
    };
  }
}
