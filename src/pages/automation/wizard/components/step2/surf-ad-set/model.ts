import {TSurfAdSetModel} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";
import moment from 'moment';
import { TState } from './data'

const TACTIC_NAME = '冲浪-广告集水平 触发 -> ';
const OPERATOR = '>= '
export const OPTIONS = {
  'installs': '移动应用安装数',
  // '0': '点击',
  // '1': '出站点击'
};

const format = 'HH:mm';
const SurfAdSetModel: TSurfAdSetModel = {
  namespace: 'surfAdSet',
  state: {
    Name: TACTIC_NAME + OPTIONS['installs'] + OPERATOR + 1,
    ActionInfo: {
      Target: 'installs',
      TargetName: OPTIONS['installs'],
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
      // 生成Name
      const res: TState = {
        ...state,
        ActionInfo: {
          ...state?.ActionInfo,
          ...payload
        }
      }
      res.Name = TACTIC_NAME + res.ActionInfo?.TargetName + OPERATOR + res.ActionInfo?.InsertCount
      return res;
    },
    updateSelectorData(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    init(state, { payload }) {
      // console.log('init', payload);
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default SurfAdSetModel;
