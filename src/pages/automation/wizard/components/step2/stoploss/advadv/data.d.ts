import moment from 'moment';
import { Reducer } from 'umi';
import { TStaticItemValue } from "@/pages/automation/wizard/components/step2/data";
import {TStateTactic} from "@/pages/automation/wizard/components/step2/data";

export type TActionInfoStopLossAdv = {
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

export type TModelStopLossAdv = {
  namespace: string;
  state: TStateTactic<TActionInfoStopLossAdv>;
  reducers: {
    updateActionInfo: Reducer<TStateTactic<TActionInfoStopLossAdv>>;
    updateActionObj: Reducer<TStateTactic<TActionInfoStopLossAdv>>;
    init: Reducer<TStateTactic<TActionInfoStopLossAdv>>;
  }
}
