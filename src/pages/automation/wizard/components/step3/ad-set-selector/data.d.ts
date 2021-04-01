import { Effect, Reducer } from "@@/plugin-dva/connect";

export type TAdSet = {
  setId: string;
  setName: string;
}

export type TColumn = {
  key: string;
  dataIndex: string;
  title: string;
  width?: number;
  fixed?: string;
};

export type TStateAdSetSelector = {
  total: number;
  current: number;
  adSetList: TAdSet[];
}

export type TModelAdSetSelector = {
  namespace: string;
  state: TStateAdSetSelector;
  reducers: {
    updateAdSetList: Reducer<TStateAdSetSelector>;
  },
  effects: {
    getAdSetList: Effect;
  }
}


