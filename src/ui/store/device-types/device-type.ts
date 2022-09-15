import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { useCommonStore } from '..';
import { IDeviceTypeData } from '@/domain';
import { deviceTypeController } from '@/applications/controllers';

export const useDeviceTypeStore = defineStore('deviceType', {
  state: () => {
    return {
      message: '',
      data: [],
      dataDetails: {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        devices: [],
      },
      deviceTypeEdit: { name: '', description: '' },
      optionDeviceType: [],
      error: {
        code: '',
        message: '',
        params: Object,
      },
    } as IDeviceTypeData;
  },
  getters: {
    deviceTypeColumns() {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Devices',
          dataIndex: 'devices',
          key: 'devices',
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: 'Updated At',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
        },
        {
          title: 'Action',
          dataIndex: 'id',
          key: 'action',
        },
      ];
    },
    deviceTypeList(state) {
      return state.data.map((deviceType) => ({
        id: deviceType.id,
        name: deviceType.name,
        description: deviceType.description,
        devices: deviceType.devices?.map((device) => device.name),
        createdAt:
          deviceType.createdAt !== undefined
            ? new Date(deviceType.createdAt).toLocaleString('en-US')
            : deviceType.createdAt,
        updatedAt:
          deviceType.updatedAt !== undefined
            ? new Date(deviceType.updatedAt).toLocaleString('en-US')
            : deviceType.updatedAt,
      }));
    },
  },
  actions: {
    async getOptionDeviceType() {
      const result = await deviceTypeController().getDeviceTypes();
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.optionDeviceType = this.data.map((device) => ({
            value: device.id,
            label: device.name,
          }));
          this.error = result.data?.error;
        }
      }
    },
    async getDeviceTypeList() {
      const common = useCommonStore();
      common.setIsLoading(true);
      const result = await deviceTypeController().getDeviceTypes();
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.optionDeviceType = this.data.map((device) => ({
            value: device.id,
            label: device.name,
          }));
          this.error = result.data?.error;
        }
      }
    },
    async getDeviceTypeById(id: string) {
      const common = useCommonStore();
      const result = await deviceTypeController().getDeviceTypeById(id);
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.deviceTypeEdit.name = result.data?.result.name;
          this.deviceTypeEdit.description = result.data?.result.description;
          this.dataDetails = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async createDeviceType(value: { name: string; description: string }) {
      const common = useCommonStore();
      const result = await deviceTypeController().createDeviceType(value);
      if (result.data?.error) {
        common.setIsModalShow(false);
        common.setIsLoadingButton(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsModalShow(false);
        common.setIsLoadingButton(false);
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data.push(result.data?.result);
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
    async updateDeviceTypeById(
      id: string,
      value: { name: string; description: string },
    ) {
      const common = useCommonStore();
      const result = await deviceTypeController().updateDeviceTypeById(
        id,
        value,
      );
      if (result.data?.error) {
        common.setIsDrawerShow(false);
        common.setIsLoadingButton(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsDrawerShow(false);
        common.setIsLoadingButton(false);
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          const index = this.data.findIndex(
            (x) => x.id === result.data?.result.id,
          );
          this.data[index] = result.data?.result;
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
    async deleteDeviceTypeById(id: string) {
      const result = await deviceTypeController().deleteDeviceTypeById(id);
      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = this.data.filter((x) => {
            return x.id != id;
          });
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
  },
});
