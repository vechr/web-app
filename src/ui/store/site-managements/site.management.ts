import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { ICreateSite, ISiteData, IUpdateSite, Site } from '@/domain';
import { useCommonStore } from '@/ui/store';
import { siteController } from '@/applications/controllers';

export const useSiteManagementStore = defineStore('siteManagement', {
  state: () => {
    return {
      message: '',
      data: [],
      updateSite: {},
      dataDetails: undefined,
      optionSites: [],
      success: true,
      error: {
        code: '',
        message: '',
        params: {},
      },
      meta: {},
    } as ISiteData;
  },
  getters: {
    siteColumnsSort() {
      return [
        {
          label: 'Code',
          value: 'code',
        },
        {
          label: 'Site Name',
          value: 'name',
        },
        {
          label: 'Location',
          value: 'location',
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
    siteColumns() {
      return [
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'Site Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Location',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Action',
          dataIndex: 'id',
          key: 'action',
        },
      ];
    },
  },
  actions: {
    async getSitePagination(params: Record<string, any>) {
      const common = useCommonStore();
      common.setIsLoading(true);

      const result = await siteController().getSites(params);

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
    async getOptionSites() {
      const result = await siteController().getSiteAll();
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.optionSites = this.data.map((site) => ({
            value: site.id ? site.id : '',
            label: site.name ? site.name : '',
          }));
          this.error = result.data?.error;
        }
      }
    },
    async getSiteById(siteId: string): Promise<Site | undefined> {
      const common = useCommonStore();
      const result = await siteController().getSiteById(siteId);
      if (result.data) {
        this.error = result.data.error;
        this.updateSite = result.data.result;

        this.dataDetails = result.data.result;
        this.message = result.data.message;
        this.meta = result.data.meta;
        this.success = result.data.success;
      }
      common.setIsLoading(false);

      if (result.data?.error) {
        message.error(`${this.error.message}`);
      }

      return this.dataDetails;
    },
    async createSite(value: ICreateSite) {
      const common = useCommonStore();
      const result = await siteController().createSite(value);
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data.push(result.data?.result);
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
      common.setIsModalShow(false);
      common.setIsLoadingButton(false);
    },
    async updateSiteById(id: string, values: IUpdateSite) {
      const common = useCommonStore();
      const result = await siteController().updateSiteById(id, values);
      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          const index = this.data.findIndex(
            (x) => x.id === result.data?.result.id,
          );
          this.data[index] = result.data?.result;
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
      common.setIsDrawerShow(false);
      common.setIsLoadingButton(false);
    },
    async deleteSiteById(roleId: string) {
      const result = await siteController().deleteSiteById(roleId);

      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = this.data.filter((x) => {
            return x.id != roleId;
          });
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
  },
});
