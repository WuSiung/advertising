import React, {FC, useState} from 'react';
import Setting from "@/pages/automation/wizard/components/step2/custom/components/setting";
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {
  TAction,
  TActionInfoCustom,
  TDailyPlan,
  TSchedule,
  TWeeklyPlan
} from "@/pages/automation/wizard/components/step2/custom/data";

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

const CustomAd: FC<any> = (props) => {
  // todo: 这里持有actions 每个action中有tasks 每个task中有根group和选择的活动，action可以在这里删除
  // const list: TAction[] = [
  //   {
  //     task: '',
  //     group: {
  //       logical: 'or',
  //       conditions: [
  //         {
  //           target: 'cpa',
  //           time: '00:00',
  //           operator: '<',
  //           value: 0
  //         }
  //       ],
  //       children: []
  //     }
  //   }
  // ]

  const acts: TAction[] = [initActions()];

  const sched: TSchedule = {
    isContinuous: true,
    target: '',
    timePeriod: '',
    isRunDaily: true,
    dailyPlan: initPlan(),
    weeklyPlan: new Array<TWeeklyPlan>(7).fill({isChecked: true, dailyPlan: initPlan()}).map(() => ({isChecked: true, dailyPlan: initPlan()}))
  }

  const actInfo: TActionInfoCustom = {
    actions: acts,
    schedule: sched
  }

  const [ActionInfo, setActionInfo] = useState(actInfo);
  const handleChange = () => {
    console.log('change');
    setActionInfo({...ActionInfo});
  }

  const handleAdd = () => {
    if (!ActionInfo.actions) {
      setActionInfo({...ActionInfo, actions: [initActions()]});
    } else {
      ActionInfo.actions.push(initActions());
    }
    handleChange();
  }

  const handleDel = (idx: number) => {
    ActionInfo.actions.splice(idx, 1);
    handleChange();
  }

  // const [actions, setActions] = useState([initActions()]);
  // const handleChange = () => {
  //   setActions([...actions]);
  // }
  //
  // const handleAdd = () => {
  //   if (!actions) {
  //     setActions([initActions()]);
  //   } else {
  //     actions.push(initActions());
  //   }
  //   handleChange();
  // }
  //
  // const handleDel = (idx: number) => {
  //   actions.splice(idx, 1);
  //   handleChange();
  // }

  return (
    <>
      {props.step === 1 && <Setting ActionInfo={ActionInfo} onChange={handleChange} onAdd={handleAdd} onDel={handleDel} />}
      {props.step === 2 && <AdSetSelector onChange={() => {}} onActionObjChange={props.onActionObjChange} />}
    </>
  )
}

export default CustomAd;
