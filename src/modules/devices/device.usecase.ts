import Container, { Service } from 'typedi';
import { Device } from './device.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class DeviceUsecase extends BaseUsecase<Device> {
  constructor() {
    super(
      Device,
      '/api/things/v1/device',
      Container.get(AxiosHttpClient<Device>),
    );
  }
}
