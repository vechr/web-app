import { defineStore } from "pinia";
import { IDevice, IError } from "@/types";
import axios from "axios";
import { useCommonStore } from "..";
import { message } from "ant-design-vue";

interface IDeviceData {
  message: string,
  data: IDevice[],
  deviceEdit: { name: string, description: string, deviceTypeId?: string, isActive: boolean }
  optionDevice: { value: string ,label: string }[],
  dataDetails: IDevice,
  error: IError
}

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

export const useDeviceManagementStore = defineStore('deviceManagement', {
  state: () => {
    return {
      message: "",
      data: [],
      deviceEdit: { name: "", description: "", deviceTypeId: "", isActive: false },
      optionDevice: [],
      dataDetails: {
        id: "",
        name: "",
        description: "",
        deviceTypeId: "",
        isActive: false,
        createdAt: "",
        updatedAt: "",
        topics: [],
        deviceType: {
          id: "",
          name: "",
          description: "",
          createdAt: "",
          updatedAt: "",
        }
      },
      error: {
        code: "",
        message: "",
        params: Object
      }
    } as IDeviceData
  },
  getters: {
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
          key: 'action'
        }
      ]
    },
    deviceList(state) {
      return (
        state.data.map((device) => ({
          id: device.id,
          name: device.name,
          description: device.description,
          isActive: device.isActive,
          deviceTypeId: device.deviceTypeId,
          deviceType: device.deviceType?.name,
          createdAt: device.createdAt !== undefined ? new Date(device.createdAt).toLocaleString('en-US') : device.createdAt,
          updatedAt: device.updatedAt !== undefined ? new Date(device.updatedAt).toLocaleString('en-US') : device.updatedAt,
          topics: device.topics?.map((topic) => topic.name)
        }))
      )
    }
  },
  actions: {
    async getOptionDevice() {
      await axios.get(`/api/device`)
        .then((res) => {
          if (res.status === 200) {
            this.message = res.data.message;
            this.data = res.data.result;
            this.optionDevice = this.data.map((device) => ({value: device.id, label: device.name}));
            this.error = res.data.error;
          }
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async getDeviceList() {
      const common = useCommonStore();
      common.setIsLoading(true);
      await axios.get(`/api/device`)
        .then((res) => {
          common.setIsLoading(false);
          if (res.status === 200) {
            this.message = res.data.message;
            this.data = res.data.result;
            this.error = res.data.error;
          }
        })
        .catch((err) => {
          common.setIsLoading(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async getDeviceById(id: string) {
      const common = useCommonStore();
      await axios.get(`/api/device/${id}`)
      .then((res) => {
        common.setIsLoading(false);
        if (res.status === 200) {
          this.message = res.data.message;
          this.deviceEdit.name = res.data.result.name;
          this.deviceEdit.description = res.data.result.description,
          this.deviceEdit.deviceTypeId = res.data.result.deviceType?.id,
          this.deviceEdit.isActive = res.data.result.isActive
          this.dataDetails = res.data.result;
          this.error = res.data.error;
        }
      })
      .catch((err) => {
        common.setIsLoading(false);
        this.error = err.response.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      })
    },
    async createDevice(value: {name: string, description: string, isActive: boolean, deviceTypeId: string}) {
      const common = useCommonStore();
      await axios.post(`/api/device`, JSON.stringify(value, null, 2))
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
      })
    },
    async updateDeviceById(id: string, value: { name: string, description: string, isActive: boolean, deviceTypeId: string }){
      const common = useCommonStore();
      await axios.patch(`/api/device/${id}`, value)
        .then((res) => {
          common.setIsDrawerShow(false);
          common.setIsLoadingButton(false);
          if (res.status === 200) {
            this.message = res.data.message;
            const index = this.data.findIndex((x) => x.id === res.data.result.id)
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
        })
    },
    async deleteDeviceById(id: string) {
      await axios.delete(`/api/device/${id}`)
      .then((res) => {
        if (res.status === 200) {
          this.message = res.data.message;
          this.data = this.data.filter(x => { return x.id != id })
          this.error = res.data.error;
          message.success(`${res.status} ${this.message}`);
        }
      })
      .catch((err) => {
        this.error = err.response.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      })
    }
  }
});