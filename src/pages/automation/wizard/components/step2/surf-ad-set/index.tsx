import React, { FC, useImperativeHandle, forwardRef } from 'react';
import { connect, Dispatch } from 'umi';
import Setting from './components/setting';
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {TState} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";

import {OPTIONS} from './model';

interface ISurfAdSetBase {
  dispatch: Dispatch
  step: number;
}

interface ISurfAdSet extends ISurfAdSetBase{
  step: number;
  refInstance: React.MutableRefObject<any>
  surfAdSet: TState
}

interface ISurfAdSetForwardRef extends ISurfAdSetBase {
  ref: React.MutableRefObject<any>
}

const SurfAdSet: FC<ISurfAdSet> = (props) => {
  // console.log(props.step);
  const {surfAdSet, refInstance, dispatch} = props;
  console.log(JSON.stringify(props));
  // console.log(JSON.stringify(ref));
  useImperativeHandle(refInstance, () => ({
    submit: () => {
      // console.log('surf-ad-set commit');
      const actionInfo: any = {...surfAdSet.settingData};
      actionInfo.ResetBudgetTime = actionInfo.ResetBudgetTime.format('HH:mm');
      actionInfo.InsertCount = String(actionInfo.InsertCount);
      actionInfo.CostValue = String(actionInfo.CostValue);
      const obj = {
        Name: surfAdSet.Name,
        ActionObj: surfAdSet.ActionObj?.map(o => String(o)),
        ActionInfo: JSON.stringify(actionInfo)
      };
      // console.log(JSON.stringify(obj));
      return obj;
    }
  }))

  const handleSettingChange = (payload: any) => {
    dispatch({
      type: 'surfAdSet/updateSettingData',
      payload
    });
  }

  const handleSelectorChange = (payload: any) => {
    dispatch({
      type: 'surfAdSet/updateSelectorData',
      payload
    });
  }

  return (
    <>
      {props.step === 1 && <Setting options={OPTIONS} settingData={surfAdSet.settingData} onChange={handleSettingChange} />}
      {props.step === 2 && <AdSetSelector Name={surfAdSet.Name} ActionObj={surfAdSet.ActionObj} onChange={handleSelectorChange}/>}
    </>
  )
};

// export default SurfAdSet;
const Component = connect(({surfAdSet}: {surfAdSet: TState}) => ({
  surfAdSet
}))(SurfAdSet);

export default forwardRef<Pick<ISurfAdSetForwardRef, any>, any>( (props,ref) => <Component  {...props}  refInstance={ref} />);
