import moment from 'moment';
import { Reducer } from 'umi';
import { TStaticItemValue } from "@/pages/automation/wizard/components/step2/data";
import {TStateTactic} from "@/pages/automation/wizard/components/step2/data";

// export type TStaticItemValue = {
//   staticMetricValue?: number;
//   value?: number;
//   lastDays?: string|number;
//   mertricType?: number;
// }

export type TActionInfoReviveAdvSet = {
  staticsIdx?: number;
  installValue?: number;
  installfeeValue?: TStaticItemValue;
  spendFeeValue?: TStaticItemValue;
  AndCondition: boolean;
  // checked?: boolean;
  installs?: number;
  ResetBudgetTime: moment.Moment;
}

// export type TStateReviveAdvSet = {
//   Name?: string;
//   ActionInfo?: TActionInfoReviveAdvSet;
//   ActionObj?: string[]
// }

export type TModelReviveAdvSet = {
  namespace: string;
  state: TStateTactic<TActionInfoReviveAdvSet>;
  reducers: {
    updateActionInfo: Reducer<TStateTactic<TActionInfoReviveAdvSet>>;
    updateActionObj: Reducer<TStateTactic<TActionInfoReviveAdvSet>>;
    init: Reducer<TStateTactic<TActionInfoReviveAdvSet>>;
  }
}
