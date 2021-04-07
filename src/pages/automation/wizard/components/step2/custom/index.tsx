import React, {FC, forwardRef, useImperativeHandle} from 'react';
import Setting from "@/pages/automation/wizard/components/step2/custom/components/setting";
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {
  TActionInfoCustom,
} from "@/pages/automation/wizard/components/step2/custom/data";
import AdSelector from "@/pages/automation/wizard/components/step3/ad-selector";
import CampaignSelector from "@/pages/automation/wizard/components/step3/campaign-selector";
import {ITactic, ITacticForwardRef, TStateTactic} from "@/pages/automation/wizard/components/step2/data";
import {connect} from "umi";

// function initActions(): TAction {
//   return     {
//     task: '',
//     group: {
//       logical: 'or',
//       conditions: [
//         {
//           target: 'cpa',
//           timePeriod: '00:00',
//           operator: '<',
//           value: 0
//         }
//       ],
//       children: []
//     }
//   };
// }
//
// function initPlan(): TDailyPlan {
//   return {
//     numTimePeriod: 1,
//     timePeriods: [6, 7]
//   }
// }

// interface ICustomAd {
//   ref: React.MutableRefObject<any>;
//   step: number;
//   level: number;
//   editInfo?: TTacticEditInfo;
//   onActionObjChange: (isSelected: boolean) => void;
//   onLevelChange: (lvl: number) => void;
// }

interface ICustomAd extends ITactic<TActionInfoCustom>{
  // ref: React.MutableRefObject<any>;
  level: number;
  onLevelChange: (lvl: number) => void;
}

const CustomAd: FC<ICustomAd> = (props) => {
  // todo: 这里持有actions 每个action中有tasks 每个task中有根group和选择的活动，action可以在这里删除

  // const acts: TAction[] = [initActions()];
  //
  // const sched: TSchedule = {
  //   isContinuous: true,
  //   target: '',
  //   timePeriod: '',
  //   isRunDaily: true,
  //   dailyPlan: initPlan(),
  //   weeklyPlan: new Array<TWeeklyPlan>(7).fill({isChecked: true, dailyPlan: initPlan()}).map(() => ({isChecked: true, dailyPlan: initPlan()}))
  // }
  //
  // const actInfo: TActionInfoCustom = {
  //   actions: acts,
  //   effectiveTime: {
  //     isFromNowON: true,
  //     timePeriod: [moment().format('yyyy-MM-DD'), moment().add(30, 'days').format('yyyy-MM-DD')]
  //   },
  //   schedule: sched
  // }
  //
  // const [ActionInfo, setActionInfo] = useState(actInfo);
  // const handleChange = () => {
  //   // console.log('change');
  //   setActionInfo({...ActionInfo});
  // }

  const {tacticInfo, refInstance, dispatch} = props;

  const handleChange = () => {
    dispatch({
      type: 'custom/change'
    })
  }

  const handleAdd = () => {
    // if (!ActionInfo.actions) {
    //   setActionInfo({...ActionInfo, actions: [initActions()]});
    // } else {
    //   ActionInfo.actions.push(initActions());
    // }
    dispatch({
      type: 'custom/addAction',
      payload: {}
    });
  }

  const handleDel = (idx: number) => {
    if (tacticInfo.ActionInfo) {
      tacticInfo.ActionInfo.actions.splice(idx, 1);
      handleChange();
    }
  }

  const handleActionInfoChange = (payload: any) => {
    dispatch({
      type: 'custom/updateActionInfo',
      payload
    });
  }

  const handleSelectorChange = (payload: any) => {
    dispatch({
      type: 'custom/updateActionObj',
      payload
    });
  }

  useImperativeHandle(refInstance, () => ({
    submit: () => {
      console.log('custom submit');
    }
  }));



  return (
    <>
      {props.step === 1 && <Setting level={props.level} onLevelChange={props.onLevelChange} ActionInfo={tacticInfo.ActionInfo} onChange={handleChange} onAdd={handleAdd} onDel={handleDel} />}
      {props.step === 2 && props.level === 0 && <AdSelector Name={tacticInfo.Name} ActionObj={tacticInfo.ActionObj} onChange={handleSelectorChange} onActionObjChange={props.onActionObjChange} />}
      {props.step === 2 && props.level === 1 && <AdSetSelector Name={tacticInfo.Name} ActionObj={tacticInfo.ActionObj} onChange={handleSelectorChange} onActionObjChange={props.onActionObjChange} />}
      {props.step === 2 && props.level === 2 && <CampaignSelector Name={tacticInfo.Name} ActionObj={tacticInfo.ActionObj} onChange={handleSelectorChange} onActionObjChange={props.onActionObjChange} />}
    </>
  )
}

const Component = connect(({custom}: {custom: TStateTactic<TActionInfoCustom>}) => ({
  tacticInfo: custom
}))(CustomAd);

export default forwardRef<Pick<ITacticForwardRef, any>, any>((props, ref) => <Component {...props} refInstance={ref} />);

// export default CustomAd;
