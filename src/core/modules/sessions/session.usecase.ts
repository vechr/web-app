import Container, { Service } from 'typedi';
import { Session, TCreateSessionRequestBody } from './session.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';
import { TCompactAuthUser } from '@/core/base/domain/entities';
import { notificationSuccessOrFail } from '@/core/base/frameworks/utils';
import { EHttpStatusCode, IError } from '@/core/base/domain/entities/protocol';
import router from '@/app/router';

@Service()
export class SessionUsecase extends BaseUsecase<Session> {
  public currentSession?: TCompactAuthUser | undefined;

  constructor() {
    super(
      Session,
      '/api/auth/v1/session',
      Container.get(AxiosHttpClient<Session>),
    );
  }

  async login(body: TCreateSessionRequestBody): Promise<void> {
    const result = await this.create(body, false, 'authentication status!');
    if (result) {
      router.push('/');
    }
  }

  async mySession(): Promise<void> {
    const result = await this.http.request({
      method: 'get',
      url: `${this._baseUrl}/me`,
    });

    const currenSession = result.data?.result as TCompactAuthUser;

    if (currenSession) this.currentSession = currenSession;
  }

  async ping(): Promise<{ result: boolean; error?: IError }> {
    const result = await this.http.request({
      method: 'get',
      url: `${this._baseUrl}/ping`,
    });

    return {
      error: result.data?.error,
      result: result.data?.result ?? false,
    };
  }

  async refresh(): Promise<{ status: boolean }> {
    const result = await this.http.request({
      method: 'post',
      url: `${this._baseUrl}/refresh`,
    });

    return {
      status: result.data?.result as boolean,
    };
  }

  async logout(): Promise<void> {
    const result = await this.http.request({
      method: 'post',
      url: `${this._baseUrl}/logout`,
    });

    notificationSuccessOrFail(
      result.status === EHttpStatusCode.OK || result.data?.success === true,
      result.data?.message ?? '',
      'authentication status!',
    );

    const status = result.data?.result as boolean;

    if (status) {
      this.currentSession = undefined;
      router.push('/session');
    }
  }
}
