import {Effect, Reducer} from "@@/plugin-dva/connect";

export type TTactic = {
  ObjectID: string;
  Name: string;
  PlatformId: number;
  ActionType: string;
  AdvID: string;
  PreProcessMsg: string[];
}

export type TColumn = {
  key: string;
  dataIndex: string;
  title: string;
  width?: number;
  fixed?: string;
};

export type TStateTacticSummary = {
  tacticList: TTactic[];
}

export type TModelTacticSummary = {
  namespace: string;
  state: TStateTacticSummary,
  reducers: {
    updateTacticList: Reducer<TStateTacticSummary>
  }
  effects: {
    getTacticList: Effect;
  }
}
