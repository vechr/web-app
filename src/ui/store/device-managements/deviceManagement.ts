import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { useCommonStore } from '..';
import { deviceController } from '@/applications/controllers';
import { IDeviceData } from '@/domain';

export const useDeviceManagementStore = defineStore('deviceManagement', {
  state: () => {
    return {
      message: '',
      data: [],
      deviceEdit: {
        name: '',
        description: '',
        deviceTypeId: '',
        isActive: false,
      },
      optionDevice: [],
      dataDetails: {
        id: '',
        name: '',
        description: '',
        deviceTypeId: '',
        isActive: false,
        createdAt: '',
        updatedAt: '',
        topics: [],
        deviceType: {
          id: '',
          name: '',
          description: '',
          createdAt: '',
          updatedAt: '',
        },
      },
      error: {
        code: '',
        message: '',
        params: Object,
      },
      meta: {},
    } as IDeviceData;
  },
  getters: {
    deviceColumnsSort() {
      return [
        {
          label: 'Name',
          value: 'name',
        },
        {
          label: 'Description',
          value: 'description',
        },
        {
          label: 'Created At',
          value: 'createdAt',
        },
        {
          label: 'Updated At',
          value: 'updatedAt',
        },
      ];
    },
    deviceColumns() {
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
          title: 'Device Type',
          dataIndex: 'deviceType',
          key: 'deviceType',
        },
        {
          title: 'Active',
          dataIndex: 'isActive',
          key: 'isActive',
        },
        {
          title: 'Topics',
          dataIndex: 'topics',
          key: 'topics',
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
    deviceList(state) {
      return state.data.map((device) => ({
        id: device.id,
        name: device.name,
        description: device.description,
        isActive: device.isActive,
        deviceTypeId: device.deviceTypeId,
        deviceType: device.deviceType?.name,
        createdAt:
          device.createdAt !== undefined
            ? new Date(device.createdAt).toLocaleString('en-US')
            : device.createdAt,
        updatedAt:
          device.updatedAt !== undefined
            ? new Date(device.updatedAt).toLocaleString('en-US')
            : device.updatedAt,
        topics: device.topics?.map((topic) => topic.name),
      }));
    },
  },
  actions: {
    async getDevicePagination(params: Record<string, any>) {
      const common = useCommonStore();
      common.setIsLoading(true);

      const result = await deviceController().getDeviceListV2(params);

      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.success = result.data?.success;
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.error = result.data?.error;
          this.meta = result.data?.meta;
        }
      }
      common.setIsLoading(false);
    },
    async getOptionDevice() {
      const result = await deviceController().getDevices();
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.optionDevice = this.data.map((device) => ({
            value: device.id,
            label: device.name,
          }));
          this.error = result.data?.error;
        }
      }
    },
    async getDeviceList() {
      const common = useCommonStore();
      common.setIsLoading(true);
      const result = await deviceController().getDevices();
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async getDeviceById(id: string) {
      const result = await deviceController().getDeviceById(id);
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.deviceEdit.name = result.data?.result.name;
          (this.deviceEdit.description = result.data?.result.description),
            (this.deviceEdit.deviceTypeId = result.data?.result.deviceType?.id),
            (this.deviceEdit.isActive = result.data?.result.isActive);
          this.dataDetails = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async createDevice(value: {
      name: string;
      description: string;
      isActive: boolean;
      deviceTypeId: string;
    }) {
      const common = useCommonStore();
      const result = await deviceController().createDevice(value);
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
    async updateDeviceById(
      id: string,
      value: {
        name: string;
        description: string;
        isActive: boolean;
        deviceTypeId: string;
      },
    ) {
      const common = useCommonStore();
      const result = await deviceController().updateDeviceById(id, value);
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
    async deleteDeviceById(id: string) {
      const result = await deviceController().deleteDeviceById(id);
      if (result.data?.error) {
        this.error = result.data.error;
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
