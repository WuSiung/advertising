import {Effect, Reducer} from "@@/plugin-dva/connect";

export type TAdbObj = {
  AdvID: string;
  ObjName: string;
  ExecLog: string[];
  CheckTimes: number;
  ExecTimes: number;
}

export type TTactic = {
  ObjectID: string;
  Name: string;
  PlatformId: number;
  ActionType: string;
  AdvObjs: TAdbObj[];
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
