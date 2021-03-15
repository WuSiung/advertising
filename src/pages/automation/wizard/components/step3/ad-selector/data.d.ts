import { Effect, Reducer } from "@@/plugin-dva/connect";

export type TAd = {
  advId: string;
  advName: string;
}

export type TColumn = {
  key: string;
  dataIndex: string;
  title: string;
  width?: number;
  fixed?: string;
};

export type TStateAdSelector = {
  adList: TAd[];
}

export type TModelAdSelector = {
  namespace: string;
  state: TStateAdSelector;
  reducers: {
    updateAdList: Reducer<TStateAdSelector>;
  },
  effects: {
    getAdList: Effect;
  }
}


