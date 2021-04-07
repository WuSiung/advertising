import {
  TAction,
  TDailyPlan,
  TModelCustom,
  TSchedule,
  TWeeklyPlan
} from "@/pages/automation/wizard/components/step2/custom/data";
import moment from "moment";

function initActions(): TAction {
  return     {
    task: '',
    group: {
      logical: 'or',
      conditions: [
        {
          target: 'cpa',
          timePeriod: '00:00',
          operator: '<',
          value: 0
        }
      ],
      children: []
    }
  };
}

function initPlan(): TDailyPlan {
  return {
    numTimePeriod: 1,
    timePeriods: [6, 7]
  }
}

const acts: TAction[] = [initActions()];

const sched: TSchedule = {
  isContinuous: true,
  target: '',
  timePeriod: '',
  isRunDaily: true,
  dailyPlan: initPlan(),
  weeklyPlan: new Array<TWeeklyPlan>(7).fill({isChecked: true, dailyPlan: initPlan()}).map(() => ({isChecked: true, dailyPlan: initPlan()}))
}

const CustomModel: TModelCustom = {
  namespace: 'custom',
  state: {
    Name: '',
    ActionInfo: {
      actions: acts,
      effectiveTime: {
        isFromNowON: true,
        timePeriod: [moment().format('yyyy-MM-DD'), moment().add(30, 'days').format('yyyy-MM-DD')]
      },
      schedule: sched
    },
    ActionObj: []
  },
  reducers: {
    change (state, {payload}) {
      return {
        ...state
      }
    },
    addAction (state, {payload}) {
      state?.ActionInfo?.actions.push(initActions());
      return {
        ...state,
      }
    },
    updateActionObj (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  }
}

export default CustomModel;
