import {TSurfAdSetModel} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";
import moment from 'moment';

const advEffectLv: number[][] = (() => {
  return new Array(4).fill(new Array(3).fill(0));
})();
const format = 'HH:mm';
const SurfAdSetModel: TSurfAdSetModel = {
  namespace: 'surfAdSet',
  state: {
    settingData: {
      InsertCount: 0,
      CostValue: 0,
      AdvEffectLv: advEffectLv,
      ResetBudgetTime: moment('00:00', format),
      LimitPerCheck: 0
    },
    selectorData: []
  },
  reducers: {
    updateSettingData(state, { payload }) {
      // console.log('update', JSON.stringify(payload));
      return {
        settingData: {
          ...state?.settingData,
          ...payload
        }
      }
    },
    updateSelectorData(state, { payload }) {
      return {
        selectorData: {
          ...state?.selectorData,
          ...payload
        }
      }
    }
  }
}

export default SurfAdSetModel;
