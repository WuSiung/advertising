import moment from 'moment';
import { Reducer } from 'umi';
import { TStaticItemValue } from "@/pages/automation/wizard/components/step2/data";
import {TStateTactic} from "@/pages/automation/wizard/components/step2/data";

export type TActionInfoStopLossAdvSet = {
  staticsIdx?: number;
  installValue?: number;
  installfeeValue?: TStaticItemValue;
  spendFeeValue?: TStaticItemValue;
  staticsIdxPer?: number;
  // installValuePer?: number;
  installfeeValuePer?: TStaticItemValue;
  spendFeeValuePer?: TStaticItemValue;
  // checked?: boolean;
  OrCondition: boolean;
  ResetBudgetTime: moment.Moment;
}

export type TModelStopLossAdvSet = {
  namespace: string;
  state: TStateTactic<TActionInfoStopLossAdvSet>;
  reducers: {
    updateActionInfo: Reducer<TStateTactic<TActionInfoStopLossAdvSet>>;
    updateActionObj: Reducer<TStateTactic<TActionInfoStopLossAdvSet>>;
    init: Reducer<TStateTactic<TActionInfoStopLossAdvSet>>;
  }
}
