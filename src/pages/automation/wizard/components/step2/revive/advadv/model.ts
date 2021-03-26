import moment from 'moment';
import { TModelReviveAdv } from '@/pages/automation/wizard/components/step2/revive/advadv/data';

const FORMAT = 'HH:mm';
const TACTIC_NAME = '复活广告层级 触发 -> ';

function createName(obj: any) {
  obj.Name = `${TACTIC_NAME}(安装数 >= ${obj.ActionInfo.installs})`;
  if (obj.ActionInfo.AndCondition) {
    obj.Name = `${obj.Name} && (每应用安装费 <= ${obj.ActionInfo.installfeeValue.staticMetricValue})`
  }
}
const ReviveAdvModel: TModelReviveAdv = {
  namespace: 'reviveAdv',
  state: {
    Name: '',
    ActionInfo: {
      installValue: 0,
      staticsIdx: 0,
      spendFeeValue: {
        staticMetricValue: 0,
        value: 0,
        lastDays: '',
        mertricType: 1
      },
      installfeeValue: {
        staticMetricValue: 0,
        value: 0,
        lastDays: '',
        mertricType: 1
      },
      AndCondition: false,
      // checked: false,
      installs: 0,
      ResetBudgetTime: moment('00:00', FORMAT)
    },
    ActionObj: [],
  },
  reducers: {
    updateActionInfo (state, { payload }) {
      const res = {
        ...state,
        ActionInfo: {
          ...state?.ActionInfo,
          ...payload
        }
      }
      createName(res);
      return res;
    },
    updateActionObj (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    init (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default ReviveAdvModel;
