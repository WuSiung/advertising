import moment from 'moment';
import { Reducer } from 'umi';

// export type TSCFCheckPoint = {
//   CheckPoint?: number; // 检查的值
//   DoubleCheck?: number;  // 二次检查的值
// }

export type TSCFRoasWebIncre = {
  MinX: number; // 最小值
  MaxX: number; // 最大值
  Increase: number;  // 改变比例
}

export type TSurfCampaignLevelAction = {
  CheckPoint: number[];
  // CheckPoint: TSCFCheckPoint[]; // 检查金额
  DoubleCheckRoasWeb: number; // 低于增加前预算，则降低的值
  RoasWebIncres: TSCFRoasWebIncre[]; // 预算增加阶梯
  LimitPerCheck: number; // 单次操作增加金额上限
  LimitPerDay: number; // 单日操作增加金额上限
  ResetBudgetTime: moment.Moment; // 重置预算时间点，格式为 00:00
}

export type TStateSurfCampaign = {
  Name?: string;
  ActionInfo?: TSurfCampaignLevelAction;
  ActionObj?: string[];
}

export type TSurfCampaignModel = {
  namespace: string;
  state: TStateSurfCampaign;
  reducers: {
    updateActionInfo: Reducer<TStateSurfCampaign>;
    updateActionObj: Reducer<TStateSurfCampaign>;
    init: Reducer<TStateSurfCampaign>;
  }
}
