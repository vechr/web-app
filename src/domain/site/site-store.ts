import { IBaseResponse, Site } from '@/domain';

export interface ISiteData extends IBaseResponse {
  data: Partial<Site>[];
  optionSites: { value: string; label: string }[];
  updateSite: IUpdateSite;
  dataDetails?: Site;
}

export interface ICreateSite {
  code: string;
  name: string;
  location: string;
  description?: string;
}

export interface IUpdateSite {
  code?: string;
  name?: string;
  location?: string;
  description?: string;
}
