import { IError } from '@/types';
import { IDeviceType } from '@/types';
import { message } from 'ant-design-vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useCommonStore } from '..';

interface IDeviceTypeData {
  message: string;
  data: IDeviceType[];
  deviceTypeEdit: { name: string; description: string };
  optionDeviceType: { value: string; label: string }[];
  dataDetails: IDeviceType;
  error: IError;
}

axios.defaults.baseURL = import.meta.env.VUE_APP_SERVICE_THINGS
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

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
      await axios
        .get('/device-type')
        .then((res) => {
          if (res.status === 200) {
            this.message = res.data.message;
            this.data = res.data.result;
            this.optionDeviceType = this.data.map((device) => ({
              value: device.id,
              label: device.name,
            }));
            this.error = res.data.error;
          }
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
    async getDeviceTypeList() {
      const common = useCommonStore();
      common.setIsLoading(true);
      await axios
        .get('/device-type')
        .then((res) => {
          common.setIsLoading(false);
          if (res.status === 200) {
            this.message = res.data.message;
            this.data = res.data.result;
            this.optionDeviceType = this.data.map((device) => ({
              value: device.id,
              label: device.name,
            }));
            this.error = res.data.error;
          }
        })
        .catch((err) => {
          common.setIsLoading(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
    async getDeviceTypeById(id: string) {
      const common = useCommonStore();
      await axios
        .get(`/device-type/${id}`)
        .then((res) => {
          common.setIsLoading(false);
          if (res.status === 200) {
            this.message = res.data.message;
            this.deviceTypeEdit.name = res.data.result.name;
            this.deviceTypeEdit.description = res.data.result.description;
            this.dataDetails = res.data.result;
            this.error = res.data.error;
          }
        })
        .catch((err) => {
          common.setIsLoading(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
    async createDeviceType(value: { name: string; description: string }) {
      const common = useCommonStore();
      await axios
        .post('/device-type', value)
        .then((res) => {
          common.setIsModalShow(false);
          common.setIsLoadingButton(false);
          if (res.status === 201) {
            this.message = res.data.message;
            this.data.push(res.data.result);
            this.error = res.data.error;
            message.success(`${res.status} ${this.message}`);
          }
        })
        .catch((err) => {
          common.setIsModalShow(false);
          common.setIsLoadingButton(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
    async updateDeviceTypeById(
      id: string,
      value: { name: string; description: string }
    ) {
      const common = useCommonStore();
      await axios
        .patch(`/device-type/${id}`, value)
        .then((res) => {
          common.setIsDrawerShow(false);
          common.setIsLoadingButton(false);
          if (res.status === 200) {
            this.message = res.data.message;
            const index = this.data.findIndex(
              (x) => x.id === res.data.result.id
            );
            this.data[index] = res.data.result;
            this.error = res.data.error;
            message.success(`${res.status} ${this.message}`);
          }
        })
        .catch((err) => {
          common.setIsDrawerShow(false);
          common.setIsLoadingButton(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
    async deleteDeviceTypeById(id: string) {
      await axios
        .delete(`/device-type/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.message = res.data.message;
            this.data = this.data.filter((x) => {
              return x.id != id;
            });
            this.error = res.data.error;
            message.success(`${res.status} ${this.message}`);
          }
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
  },
});
