import Container, { Service } from 'typedi';
import { message } from 'ant-design-vue';
import {
  Session,
  TSettingBody,
  TCreateSessionRequestBody,
} from './session.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';
import { TCompactAuthUser } from '@/core/base/domain/entities';
import { notificationSuccessOrFail } from '@/core/base/frameworks/utils';
import { EHttpStatusCode, IError } from '@/core/base/domain/entities/protocol';
import router from '@/app/router';
import {
  decryptedDataString,
  encryptedDDataString,
} from '@/core/base/frameworks/utils';
import { SECRET } from '@/core/base/domain/constant';

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

  saveSettingLocalStorage(body: TSettingBody): void {
    for (const key in body) {
      localStorage.setItem(
        key,
        encryptedDDataString(body[key as keyof TSettingBody], SECRET),
      );
    }

    message.success('Setting saved successfully!');
  }

  static getSettingLocalStorage(): TSettingBody {
    const dataSetting = {
      backedServer: '',
      backendProtocol: 'https://',
      natsProtocol: 'wss://',
      natsServer: '',
      natsUsername: '',
      natsPassword: '',
    };

    for (const key in dataSetting) {
      const value: string = decryptedDataString(
        localStorage.getItem(key) ?? '',
        SECRET,
      );
      dataSetting[key as keyof TSettingBody] = value;
    }

    return dataSetting as TSettingBody;
  }

  getSessionLocalStorage(): {
    sessionBody: TCreateSessionRequestBody;
    isRemember: boolean;
  } {
    const dataSession: TCreateSessionRequestBody = {
      username: '',
      password: '',
    };

    dataSession.username = decryptedDataString(
      localStorage.getItem('user-sec') ?? '',
      SECRET,
    );
    dataSession.password = decryptedDataString(
      localStorage.getItem('pass-sec') ?? '',
      SECRET,
    );

    return {
      sessionBody: dataSession,
      isRemember: Boolean(localStorage.getItem('remember') ?? false),
    };
  }

  async login(
    body: TCreateSessionRequestBody,
    isRemember: boolean,
  ): Promise<void> {
    if (isRemember) {
      localStorage.setItem(
        'user-sec',
        encryptedDDataString(body.username, SECRET),
      );
      localStorage.setItem(
        'pass-sec',
        encryptedDDataString(body.password, SECRET),
      );
      localStorage.setItem('remember', String(isRemember));
    } else {
      localStorage.removeItem('user-sec');
      localStorage.removeItem('pass-sec');
      localStorage.removeItem('remember');
    }

    // validation before login
    if (
      SessionUsecase.getSettingLocalStorage().backedServer === '' ||
      (SessionUsecase.getSettingLocalStorage().backendProtocol !== 'http://' &&
        SessionUsecase.getSettingLocalStorage().backendProtocol !==
          'https://') ||
      SessionUsecase.getSettingLocalStorage().natsServer === '' ||
      (SessionUsecase.getSettingLocalStorage().natsProtocol !== 'ws://' &&
        SessionUsecase.getSettingLocalStorage().natsProtocol !== 'wss://') ||
      SessionUsecase.getSettingLocalStorage().natsUsername === '' ||
      SessionUsecase.getSettingLocalStorage().natsPassword === ''
    ) {
      message.error('please do settings or configuration before login!');
      return;
    }

    // create login session
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
