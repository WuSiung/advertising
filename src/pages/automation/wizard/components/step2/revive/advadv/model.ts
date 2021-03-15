import moment from 'moment';
import { TModelReviveAdv } from '@/pages/automation/wizard/components/step2/revive/advadv/data';

const FORMAT = 'HH:mm';

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
        mertricType: 2
      },
      installfeeValue: {
        staticMetricValue: 0,
        value: 0,
        lastDays: '',
        mertricType: 2
      },
      checked: false,
      installs: 0,
      ResetBudgetTime: moment('00:00', FORMAT)
    },
    ActionObj: [],
  },
  reducers: {
    updateActionInfo (state, { payload }) {
      const res = {
        ActionInfo: {
          ...state?.ActionInfo,
          ...payload
        }
      }
      return res;
    },
    updateActionObj (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default ReviveAdvModel;
