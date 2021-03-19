import moment from 'moment';
import { Reducer } from 'umi';
import { TStaticItemValue } from "@/pages/automation/wizard/components/step2/data";
import {TStateTactic} from "@/pages/automation/wizard/components/step2/data";

export type TActionInfoReviveAdv = {
  staticsIdx?: number;
  installValue?: number;
  installfeeValue?: TStaticItemValue;
  spendFeeValue?: TStaticItemValue;
  // checked?: boolean;
  AndCondition: boolean;
  installs?: number;
  ResetBudgetTime?: moment.Moment;
}

export type TModelReviveAdv = {
  namespace: string;
  state: TStateTactic<TActionInfoReviveAdv>;
  reducers: {
    updateActionInfo: Reducer<TStateTactic<TActionInfoReviveAdv>>;
    updateActionObj: Reducer<TStateTactic<TActionInfoReviveAdv>>;
    init: Reducer<TStateTactic<TActionInfoReviveAdv>>;
  }
}
