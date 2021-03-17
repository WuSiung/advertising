import React, {FC, useImperativeHandle, forwardRef, useEffect} from 'react';
import { connect, Dispatch } from 'umi';
import Setting from './components/setting';
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {TState} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";

import {OPTIONS} from './model';
import moment from "moment";
import {TTacticEditInfo} from "@/pages/automation/data";

interface ISurfAdSetBase {
  dispatch: Dispatch
  step: number;
}

interface ISurfAdSet extends ISurfAdSetBase{
  refInstance: React.MutableRefObject<any>;
  surfAdSet: TState;
  editInfo?: TTacticEditInfo;
  onActionObjChange: (isSelected: boolean) => void;
}

interface ISurfAdSetForwardRef extends ISurfAdSetBase {
  ref: React.MutableRefObject<any>
}

const SurfAdSet: FC<ISurfAdSet> = (props) => {
  const {surfAdSet, refInstance, dispatch} = props;
  useImperativeHandle(refInstance, () => ({
    submit: () => {
      const actionInfo: any = {...surfAdSet.ActionInfo};
      actionInfo.ResetBudgetTime = actionInfo.ResetBudgetTime.format('HH:mm');
      actionInfo.InsertCount = String(actionInfo.InsertCount);
      actionInfo.CostValue = String(actionInfo.CostValue);
      const obj = {
        ObjectID: props.editInfo?.objectID,
        Name: surfAdSet.Name,
        ActionObj: surfAdSet.ActionObj?.map(o => String(o)),
        ActionInfo: JSON.stringify(actionInfo)
      };
      return obj;
    }
  }))

  useEffect(() => {
    if (props.editInfo) {
      // const editInfo = {props} as TTacticEditInfo;
      // todo: 解析actionInfo, actionObj
      // console.log('editInfo', props.editInfo);
      const actionInfo = JSON.parse(props.editInfo.actionInfo);
      actionInfo.ResetBudgetTime = moment(actionInfo.ResetBudgetTime, 'HH:mm');
      actionInfo.InsertCount = parseInt(actionInfo.InsertCount, 10);
      actionInfo.CostValue = parseInt(actionInfo.CostValue, 10);

      dispatch({
        type: 'surfAdSet/init',
        payload: {
          ObjectID: props.editInfo.objectID,
          Name: props.editInfo.actionName,
          ActionInfo: actionInfo,
          ActionObj: props.editInfo.actionObj
        }
      })
    }
  }, []);

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
      {props.step === 1 && <Setting options={OPTIONS} ActionInfo={surfAdSet.ActionInfo} onChange={handleSettingChange} />}
      {props.step === 2 && <AdSetSelector Name={surfAdSet.Name} ActionObj={surfAdSet.ActionObj} onChange={handleSelectorChange} onActionObjChange={props.onActionObjChange} />}
    </>
  )
};

const Component = connect(({surfAdSet}: {surfAdSet: TState}) => ({
  surfAdSet
}))(SurfAdSet);

export default forwardRef<Pick<ISurfAdSetForwardRef, any>, any>( (props,ref) => <Component  {...props}  refInstance={ref} />);
