import {TSurfAdSetModel} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";
import moment from 'moment';
import { TState } from './data'

const TACTIC_NAME = '冲浪-广告集水平 触发 -> ';
const OPERATOR = '>= '
export const OPTIONS = {
  '0': '点击',
  '1': '出站点击'
};

const advEffectLv: number[][] = (() => {
  return new Array(4).fill(new Array(3).fill(0));
})();
const format = 'HH:mm';
const SurfAdSetModel: TSurfAdSetModel = {
  namespace: 'surfAdSet',
  state: {
    Name: TACTIC_NAME + OPTIONS['0'] + OPERATOR + 1,
    settingData: {
      Target: '0',
      TargetName: OPTIONS['0'],
      InsertCount: 1,
      CostValue: 100,
      AdvEffectLv: [
        [100, 80, 50],
        [75, 60, 35],
        [60, 40, 30],
        [40, 35, 15]
      ],
      ResetBudgetTime: moment('00:00', format),
      LimitPerCheck: 300
    },
    ActionObj: []
  },
  reducers: {
    updateSettingData(state, { payload }) {
      // console.log('update', JSON.stringify(payload));
      // todo: 生成Name
      const res: TState = {
        settingData: {
          ...state?.settingData,
          ...payload
        }
      }
      res.Name = TACTIC_NAME + res.settingData?.TargetName + OPERATOR + res.settingData?.InsertCount
      return res;
    },
    updateSelectorData(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default SurfAdSetModel;
