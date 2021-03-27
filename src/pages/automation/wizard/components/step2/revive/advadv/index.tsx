import {InputNumber, Switch, Space
} from 'antd'
import React, {FC, forwardRef, useEffect, useImperativeHandle} from 'react'
import {connect} from 'umi';
import {StaticsSetUp} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgRevive, {SvgRevivePic} from "../../../svg-revive"
import styles from "./index.less";
import {TActionInfoReviveAdv} from "@/pages/automation/wizard/components/step2/revive/advadv/data";
import {ITactic, ITacticForwardRef, TStateTactic} from "@/pages/automation/wizard/components/step2/data";
import AdSelector from "@/pages/automation/wizard/components/step3/ad-selector";
import {TActionInfoReviveAdvSet} from "@/pages/automation/wizard/components/step2/revive/advset/data";
import StepCard from "@/pages/automation/wizard/components/step-card";
import Prompt from "@/pages/automation/components/tooltip";


interface ISetting {
  ActionInfo?: TActionInfoReviveAdv;
  onChange: (payload: any) => void;
};

const Setting: FC<ISetting> = (props) => {
  const {ActionInfo, onChange} = props;
  return (<>
    <SettingHeadCard title="复活广告层级" subTitle="实时恢复广告" icon={<SvgRevive fill="#d964c5"/>} pictrue={<SvgRevivePic/>}
                      remark="我们准备了复活策略，以适应渠道中的各种事件。选择您想作为复活基础的事件，我们将为您推荐该事件的最佳预测复活指标，或跳过此步骤并从头开始制定策略。"/>
    <StepCard
      title={
        <>
          <p>恢复效果良好的已暂停广告</p>
          <p>如果今天暂停的广告获得<strong>{ActionInfo?.installs}或更多</strong>安装次数</p>
        </>
      }
    >
      <div><InputNumber value={ActionInfo?.installs} onChange={(value) => {
        onChange({installs: value})
      }}/> 移动安装次数
      </div>
    </StepCard>
    <div className={styles.swichWrap}>
      <Space>
        <Switch onChange={(value) => {
          onChange({AndCondition: value})
        }} checked={ActionInfo?.AndCondition} title="和"></Switch>
        <span>和&nbsp;<Prompt placement="right" content="为了确定这个广告今天确实是有利可图的，我们推荐您同时选择这2个触发条件" /></span>
      </Space>
    </div>
    <div style={{opacity: ActionInfo?.AndCondition ? "1" : "0.5", pointerEvents: ActionInfo?.AndCondition ? "inherit" : "none"}}>
      <StaticsSetUp title=""
                    ActionInfo={ActionInfo as TActionInfoReviveAdvSet}
                    onChange={onChange}
      />
    </div>
  </>);
}
const ReviveAdvAdv: FC<ITactic<TActionInfoReviveAdv>> = (props) => {
  // console.log(props.step);
  const {tacticInfo, refInstance, dispatch} = props;
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
      // console.log('revive adv commit');
      return obj;
    }
  }));

  useEffect(() => {
    if (props.editInfo) {
      const actionInfo = JSON.parse(props.editInfo.actionInfo);
      dispatch({
        type: 'reviveAdv/init',
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
      type: 'reviveAdv/updateActionInfo',
      payload
    });
  }

  const handleSelectorChange = (payload: any) => {
    dispatch({
      type: 'reviveAdv/updateActionObj',
      payload
    })
  }

  return (
    <>
      {props.step === 1 && <Setting ActionInfo={tacticInfo.ActionInfo} onChange={handleActionInfoChange}/>}
      {props.step === 2 &&
      <AdSelector Name={tacticInfo.Name} ActionObj={tacticInfo.ActionObj} onChange={handleSelectorChange}
                  onActionObjChange={props.onActionObjChange}/>}
    </>
  )
};

const Component = connect(({reviveAdv}: { reviveAdv: TStateTactic<TActionInfoReviveAdv> }) => ({
  tacticInfo: reviveAdv
}))(ReviveAdvAdv);

export default forwardRef<Pick<ITacticForwardRef, any>, any>((props, ref) => <Component {...props} refInstance={ref}/>)

