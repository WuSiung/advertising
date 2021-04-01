import { Effect, Reducer } from "@@/plugin-dva/connect";

export type TCampaign = {
  packId: string;
  appName: string;
}

export type TColumn = {
  key: string;
  dataIndex: string;
  title: string;
  width?: number;
  fixed?: string;
};

export type TStateCampaignSelector = {
  total: number;
  current: number;
  campaignList: TCampaign[];
}

export type TModelCampaignSelector = {
  namespace: string;
  state: TStateCampaignSelector;
  reducers: {
    updateCampaignList: Reducer<TStateCampaignSelector>;
  },
  effects: {
    getCampaignList: Effect;
  }
}


