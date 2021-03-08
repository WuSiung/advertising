import React, { FC, ForwardRefExoticComponent, useImperativeHandle, forwardRef } from 'react';
import { connect, Dispatch } from 'umi';
import Setting from './components/setting';
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {TState, TSurfadSetLevelAction} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";

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
      console.log('surf-ad-set commit');
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
      {props.step === 1 && <Setting settingData={surfAdSet.settingData} onChange={handleSettingChange} />}
      {props.step === 2 && <AdSetSelector/>}
    </>
  )
};

// export default SurfAdSet;
const Component = connect(({surfAdSet}: {surfAdSet: TSurfadSetLevelAction}) => ({
  surfAdSet
}))(SurfAdSet);

export default forwardRef<Pick<ISurfAdSetForwardRef, any>, any>( (props,ref) => <Component  {...props}  refInstance={ref} />);
