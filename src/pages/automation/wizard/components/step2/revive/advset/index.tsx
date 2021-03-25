import {
  InputNumber,
  Switch, Space
} from 'antd'
import React, {FC, forwardRef, useEffect, useImperativeHandle} from 'react';
import { connect } from 'umi';
import {StaticsSetUp} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgRevive,{SvgRevivePic} from "../../../svg-revive"
import styles from "./index.less";
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {
  TActionInfoReviveAdvSet,
} from "@/pages/automation/wizard/components/step2/revive/advset/data";
import {ITactic, ITacticForwardRef, TStateTactic} from "@/pages/automation/wizard/components/step2/data";
import StepCard from "@/pages/automation/wizard/components/step-card";
import Prompt from "@/pages/automation/components/tooltip";


interface ISetting {
  ActionInfo?: TActionInfoReviveAdvSet;
  onChange: (payload: any) => void;
};

const Setting: FC<ISetting> = (props) => {
  const { ActionInfo, onChange } = props;
  return (<>
   <SettingHeadCard title="复活广告集层级" subTitle="实时恢复广告集" icon={<SvgRevive fill="" />} pictrue={<SvgRevivePic />} remark="复活策略在检测到任何积极的活动表明该广告集已再次获利时，会自动重新激活任何已暂停的广告。" />

   <StepCard
     title={
       <>
         <p>恢复效果良好的已暂停广告集</p>
         <p>如果今天暂停的广告集获得<strong>{ActionInfo?.installs}次或更多</strong>移动应用安装次数</p>
       </>
     }
   >

     <div><InputNumber value={ActionInfo?.installs} onChange={(value)=>{
       onChange({installs: value})
     }} /> 移动安装次数</div>
   </StepCard>
     <div className={styles.swichWrap}>
       <Space>
         <Switch onChange={(value)=>{
           onChange({AndCondition: value})
         }} defaultChecked={ActionInfo?.AndCondition} title="和"></Switch>
         <span>和&nbsp;<Prompt placement="right" content="为了确定这个广告集今天确实是有利可图的，我们推荐您同时选择这2个触发条件" /></span>
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

const Component = connect(({ reviveAdvSet}: {reviveAdvSet: TStateTactic<TActionInfoReviveAdvSet>}) => ({
  tacticInfo: reviveAdvSet
}))(ReviveAdvSet);

export default forwardRef<Pick<ITacticForwardRef, any>, any>((props, ref) => <Component {...props} refInstance={ref} />)
