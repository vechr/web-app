import Container, { Service } from 'typedi';
import { DeviceType } from './device-type.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class DeviceTypeUsecase extends BaseUsecase<DeviceType> {
  constructor() {
    super(
      DeviceType,
      '/api/things/v1/device-type',
      Container.get(AxiosHttpClient<DeviceType>),
    );
  }
}
