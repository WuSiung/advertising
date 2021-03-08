import moment from 'moment';
import { Reducer } from 'umi';
export type TSurfadSetLevelAction  = {
  InsertCount?:  number; // 移动安装数
  CostValue?:    number; // 花费金额
  AdvEffectLv?:  number[][]; // 根据广告修改预算的结构体
  ResetBudgetTime?: moment.Moment; // 重置预算时间点，格式为 00:00
  LimitPerCheck?:  number; // 增加比例的上限值
}

export type TSelectorData = {
  Name: string;
  ActionObj: string[];
}

export type TState = {
  settingData?: TSurfadSetLevelAction,
  selectorData?: TSelectorData
}

export type TSurfAdSetModel = {
  namespace: string;
  state: TState;
  reducers: {
    updateSettingData: Reducer<TState>;
    updateSelectorData: Reducer<TState>;
  }
}
