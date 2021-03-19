import {
  Card,
  TimePicker,
  InputNumber,
  Switch, Space
} from 'antd'
import React, {FC, forwardRef, ForwardRefExoticComponent, useEffect, useImperativeHandle, useState} from 'react';
import { connect } from 'umi';
import {StaticsSetUp,StaticsItemValueType} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgRevive,{SvgRevivePic} from "../../../svg-revive"
import styles from "./index.less";
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {
  TActionInfoReviveAdvSet,
} from "@/pages/automation/wizard/components/step2/revive/advset/data";
import {Dispatch} from "@@/plugin-dva/connect";
import {TStateSurfCampaign} from "@/pages/automation/wizard/components/step2/surf-campaign/data";
import {ITactic, ITacticForwardRef, TStateTactic} from "@/pages/automation/wizard/components/step2/data";
import {TSurfadSetLevelAction} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";

interface StopLossAdvSetProps{
  step: number;
  ref: React.MutableRefObject<any>
}

interface ISetting {
  ActionInfo?: TActionInfoReviveAdvSet;
  onChange: (payload: any) => void;
};

const Setting: FC<ISetting> = (props) => {
  // const [staticsIdx,setStaticsIdx] = useState<number>(0);
  // const [installsValue,setInstallsValue] = useState<number>();
  // const [installfeeValue,setInstallfeeValue] = useState<StaticsItemValueType>({mertricType:2});
  // const [spendFeeValue,setSpendFeeValue] = useState<StaticsItemValueType>({mertricType:2});
  // const [checked,setChecked]= useState<boolean>(false);
  // const [installs,setInstalls]= useState<number>(0);
  const format = 'HH:mm';
  const { ActionInfo, onChange } = props;
  return (<>
   { <SettingHeadCard title="复活广告位" icon={<SvgRevive fill="" />} pictrue={<SvgRevivePic />} subTitle="Revive在检测到任何积极的活动表明该广告已再次获利时，会自动重新激活任何已暂停的广告。" />}

   <Card
     title="恢复效果良好的已暂停广告集"
   >
     <div style={{fontSize:"18px",margin:"10px 0"}}>如果今天暂停的广告集获得<span className="em">{ActionInfo?.installs}</span>次或更多安装次数</div>
     <div><InputNumber value={ActionInfo?.installs} onChange={(value)=>{
       onChange({installs: value})
     }} /> 移动安装次数</div>
   </Card>
     <div className={styles.swichWrap}>
       <Space>
         <Switch onChange={(value)=>{
           onChange({AndCondition: value})
         }} defaultChecked={ActionInfo?.AndCondition} title="和"></Switch>
         <span>和</span>
       </Space>
     </div>
    <div  style={{opacity: ActionInfo?.AndCondition?"1":"0.5",pointerEvents:ActionInfo?.AndCondition?"inherit":"none"}} >
    <StaticsSetUp title=""
                  ActionInfo={ActionInfo}
                  onChange={onChange}
    />
    </div>
  </>);
}
const ReviveAdvSet: FC<ITactic<TActionInfoReviveAdvSet>> = (props) => {
  // console.log(props.step);
  const { tacticInfo, refInstance, dispatch } = props;
  useImperativeHandle(refInstance, () => ({
    submit: () => {
      const actionInfo: any = {...tacticInfo.ActionInfo};
      actionInfo.ResetBudgetTime = actionInfo.ResetBudgetTime.format('HH:mm');
      const obj = {
        ObjectID: props.editInfo?.objectID,
        Name: tacticInfo.Name,
        ActionObj: tacticInfo.ActionObj?.map(o => String(o)),
        ActionInfo: JSON.stringify({
          AndCondition: actionInfo.AndCondition,
          InsertCount: actionInfo.installs,
          InsertOneCost: actionInfo.installfeeValue.staticMetricValue
        })
      }
      // console.log('revive advset commit');
      return obj;
    }
  }));

  useEffect(() => {
    if (props.editInfo) {
      const actionInfo = JSON.parse(props.editInfo.actionInfo);

      dispatch({
        type: 'reviveAdvSet/init',
        payload: {
          ObjectID: props.editInfo.objectID,
          Name: props.editInfo.actionName,
          ActionInfo: {
            ...tacticInfo.ActionInfo,
            AndCondition: actionInfo.AndCondition,
            installs: actionInfo.InsertCount,
            installfeeValue: {
              ...tacticInfo.ActionInfo?.installfeeValue,
              staticMetricValue: actionInfo.InsertOneCost
            }
          },
          ActionObj: props.editInfo.actionObj
        }
      });
    }
  }, []);

  const handleActionInfoChange = (payload: any) => {
    dispatch({
      type: 'reviveAdvSet/updateActionInfo',
      payload
    });
  }

  const handleSelectorChange = (payload: any) => {
    dispatch({
      type: 'reviveAdvSet/updateActionObj',
      payload
    })
  }

  return (
    <>
      {props.step === 1 && <Setting ActionInfo={tacticInfo.ActionInfo} onChange={handleActionInfoChange} />}
      {props.step === 2 && <AdSetSelector Name={tacticInfo.Name} ActionObj={tacticInfo.ActionObj} onChange={handleSelectorChange} onActionObjChange={props.onActionObjChange} />}
    </>
  )
};
// export default ReviveAdvSet;

const Component = connect(({ reviveAdvSet}: {reviveAdvSet: TStateTactic<TActionInfoReviveAdvSet>}) => ({
  tacticInfo: reviveAdvSet
}))(ReviveAdvSet);

export default forwardRef<Pick<ITacticForwardRef, any>, any>((props, ref) => <Component {...props} refInstance={ref} />)
