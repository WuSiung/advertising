import {Effect, Reducer} from "@@/plugin-dva/connect";

export type TAdvObj = {
  AdvID: string;
  AdvName: string;
  ExecLog: string[];
  CheckTimes: number;
  ExecTimes: number;
  FBID: string;
}

export type TTactic = {
  ObjectID: string;
  Name: string;
  PlatformId: number;
  ActionType: string;
  AdvObjs: TAdvObj[];
  ActionTypeName: string;
  AdvID: string;
  Status: string;
  IsLoaded: boolean;
  PreProcessMsg: string[];
  CreateTime: string;
}

export type TColumn = {
  key: string;
  dataIndex: string;
  title: string;
  width?: number;
  fixed?: string;
};

export type TStateTacticSummary = {
  tacticList?: TTactic[];
}

export type TModelTacticSummary = {
  namespace: string;
  state: TStateTacticSummary,
  reducers: {
    updateTacticList: Reducer<TStateTacticSummary>;
    updateObjInfo: Reducer<TStateTacticSummary>;
  }
  effects: {
    getTacticList: Effect;
    getObjInfo: Effect;
  }
}
