import React, { FC, useImperativeHandle, forwardRef, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import Setting from './components/setting';
import {TStateSurfCampaign} from "@/pages/automation/wizard/components/step2/surf-campaign/data";
import CampaignSelector from "@/pages/automation/wizard/components/step3/campaign-selector";
import {TTacticEditInfo} from "@/pages/automation/data";
import moment from "moment";

interface ISurfCampaignBase {
  dispatch: Dispatch;
  step: number;
}

interface ISurfCampaign extends ISurfCampaignBase {
  refInstance: React.MutableRefObject<any>;
  surfCampaign: TStateSurfCampaign;
  editInfo?: TTacticEditInfo;
  onActionObjChange: (isSelected: boolean) => void;
}

interface  ISurfCampaignForwardRef extends ISurfCampaignBase {
  ref: React.MutableRefObject<any>
}

const SurfCampaign: FC<ISurfCampaign> = (props) => {
  const {surfCampaign, refInstance, dispatch} = props;
  useImperativeHandle(refInstance, () => ({
    submit: () => {
      // console.log('surf-campaign commit');
      const actionInfo: any = {...surfCampaign.ActionInfo};
      actionInfo.ResetBudgetTime = actionInfo.ResetBudgetTime.format('HH:mm');
      const obj = {
        ObjectID: props.editInfo?.objectID,
        Name: surfCampaign.Name,
        ActionObj: surfCampaign.ActionObj?.map(o => String(o)),
        ActionInfo: JSON.stringify(actionInfo)
      }
      // console.log(JSON.stringify(obj));
      return obj;
    }
  }));

  useEffect(() => {
    if (props.editInfo) {
      const actionInfo = JSON.parse(props.editInfo.actionInfo);
      actionInfo.ResetBudgetTime = moment(actionInfo.ResetBudgetTime, 'HH:mm');
      dispatch({
        type: 'surfCampaign/init',
        payload: {
          ObjectID: props.editInfo.objectID,
          Name: props.editInfo.actionName,
          ActionInfo: actionInfo,
          ActionObj: props.editInfo.actionObj
        }
      })
    }
  })

  const handleActionInfoChange = (payload: any) => {
    dispatch({
      type: 'surfCampaign/updateActionInfo',
      payload
    });
  }

  const handleSelectorChange = (payload: any) => {
    dispatch({
      type: 'surfCampaign/updateActionObj',
      payload
    });
  }

  return (
    <>
    { props.step === 1 && <Setting ActionInfo={surfCampaign.ActionInfo} onChange={handleActionInfoChange} /> }
      { props.step === 2 && <CampaignSelector Name={surfCampaign.Name} ActionObj={surfCampaign.ActionObj} onChange={handleSelectorChange} onActionObjChange={props.onActionObjChange} /> }
    </>
  )
};

const Component = connect(({surfCampaign}: {surfCampaign: TStateSurfCampaign}) => ({
  surfCampaign
}))(SurfCampaign);

export default forwardRef<Pick<ISurfCampaignForwardRef, any>, any>((props, ref) => <Component {...props} refInstance={ref} />)

// export default SurfCampaign;
