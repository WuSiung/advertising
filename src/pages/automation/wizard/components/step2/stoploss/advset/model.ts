import { TModelStopLossAdvSet} from "@/pages/automation/wizard/components/step2/stoploss/advset/data";
import moment from 'moment';

const FORMAT = 'HH:mm';
const TACTIC_NAME = '止损-广告集水平 触发 -> ';

function createName(obj: any) {
  obj.Name = `${TACTIC_NAME}(安装数 < ${obj.ActionInfo.installValue} && 花费 > ${obj.ActionInfo.spendFeeValue.staticMetricValue})`;
  if (obj.ActionInfo.OrCondition) {
    obj.Name = `${obj.Name} || (每应用安装费 > ${obj.ActionInfo.installfeeValue.staticMetricValue} && 花费 > ${obj.ActionInfo.spendFeeValuePer.staticMetricValue})`
  }
}

const StopLossAdvSetModel: TModelStopLossAdvSet = {
  namespace: 'stopLossAdvSet',
  state: {
    Name: '',
    ActionInfo: {
      installValue: 1,
      staticsIdx: 0,
      spendFeeValue: {
        staticMetricValue: 0,
        value: 0,
        lastDays: '28',
        mertricType: 1
      },
      installfeeValue: {
        staticMetricValue: 0,
        value: 0,
        lastDays: '28',
        mertricType: 1
      },
      // installValuePer: 0,
      staticsIdxPer: 0,
      spendFeeValuePer: {
        staticMetricValue: 0,
        value: 0,
        lastDays: '28',
        mertricType: 1
      },
      installfeeValuePer: {
        staticMetricValue: 0,
        value: 0,
        lastDays: '28',
        mertricType: 1
      },
      // checked: false,
      OrCondition: false,
      ResetBudgetTime: moment('00:00', FORMAT)
    },
    ActionObj: [],
  },
  reducers: {
    updateActionInfo (state, { payload }) {
      // console.log('stop loss adv set ', payload);
      const res: any = {
        ...state,
        ActionInfo: {
          ...state?.ActionInfo,
          ...payload
        }
      }
      // res.Name = `${TACTIC_NAME}(安装数 < ${res.ActionInfo.installValue} && 花费 > ${res.ActionInfo.spendFeeValue.staticMetricValue})`;
      // if (res.ActionInfo.checked) {
      //   res.Name = `${res.Name} || (每应用安装费 > ${res.ActionInfo.installfeeValue.staticMetricValue} && 花费 > ${res.ActionInfo.spendFeeValuePer.staticMetricValue})`
      // }
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

createName(StopLossAdvSetModel.state);

export default StopLossAdvSetModel;
