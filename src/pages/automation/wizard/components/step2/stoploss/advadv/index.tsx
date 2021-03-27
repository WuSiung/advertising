import {
  Space, Switch,
  TimePicker
} from 'antd'
import React, {FC, forwardRef, useEffect, useImperativeHandle} from 'react'
import {connect} from 'umi';
import {StaticsSetUp, StaticsSetUp2} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgStopLoss, {SvgStopLossPicAds} from "../../../svg-stop-loss"
import {ITactic, ITacticForwardRef, TStateTactic} from "@/pages/automation/wizard/components/step2/data";
import {TActionInfoStopLossAdv} from "@/pages/automation/wizard/components/step2/stoploss/advadv/data";
import AdSelector from "@/pages/automation/wizard/components/step3/ad-selector";
import moment from "moment";
import styles from "@/pages/automation/wizard/components/step2/revive/advset/index.less";
import Prompt from "@/pages/automation/components/tooltip";
import StepCard from "@/pages/automation/wizard/components/step-card";

interface ISetting {
  ActionInfo?: TActionInfoStopLossAdv;
  onChange: (payload: any) => void;
};

const Setting: FC<ISetting> = (props) => {
  const format = 'HH:mm';
  const {ActionInfo, onChange} = props;
  return (<>
    <SettingHeadCard title="止损广告层级" subTitle="减少效果不好的广告" icon={<SvgStopLoss fill="#d964c5"/>} pictrue={<SvgStopLossPicAds/>}
                      remark="我们已经准备了止损策略，以适应渠道中的各种事件。选择您想要作为止损基础的事件，我们将为您推荐该事件的最佳预测止损指标，或者跳过此步骤并从头开始制定策略。"/>

    <StaticsSetUp title={
      <p>
        贪玩智投将触发止损并暂停广告
        &nbsp;<Prompt content="设置触发暂停效果不好的广告直到凌晨所需要的临界值"/>
      </p>
    }
                  ActionInfo={ActionInfo}
                  onChange={onChange}
    />
    <div className={styles.swichWrap}>
      <Space>
        <Switch onChange={(value) => {
          onChange({OrCondition: value})
        }} checked={ActionInfo?.OrCondition} title="或者"></Switch>
        <span>或者&nbsp;<Prompt content="为了确保所选的广告在今天真的有利可图，我们推荐您同时选择2个触发条件" /></span>
      </Space>

    </div>
    <div style={{
      opacity: ActionInfo?.OrCondition ? "1" : "0.5",
      pointerEvents: ActionInfo?.OrCondition ? "inherit" : "none"
    }}>
      <StaticsSetUp2 title=""
                     ActionInfo={ActionInfo}
                     onChange={onChange}
      />
    </div>
    <StepCard
      title={
        <p>在当地（亚洲/上海）时间 {ActionInfo?.ResetBudgetTime.format('HH:mm')}
          <strong>该广告</strong>将被自动<strong>取消暂停</strong>&nbsp;
          <Prompt content="在设置的时间点，所有受此策略影响的广告集将被取消暂停"/>
        </p>
      }
    >
      <Space><label>重置时间表: </label><TimePicker value={ActionInfo?.ResetBudgetTime} format={format}
                                               onChange={value => props.onChange({ResetBudgetTime: value})}/></Space>
    </StepCard>
  </>);
}

const StopLossAdvAdv: FC<ITactic<TActionInfoStopLossAdv>> = (props) => {
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
          OrCondition: actionInfo.OrCondition,
          InsertCount: actionInfo.installValue,
          ICCostedValue: actionInfo.spendFeeValue.staticMetricValue,
          InsertOneCost: actionInfo.installfeeValue.staticMetricValue,
          IOCCostValue: actionInfo.spendFeeValuePer.staticMetricValue,
          ResetInfoTime: actionInfo.ResetBudgetTime
        })
      }
      // console.log('stopLoss advadv commit');
      return obj;
    }
  }))

  useEffect(() => {
    // console.log(props.editInfo);
    if (props.editInfo) {
      const actionInfo = JSON.parse(props.editInfo.actionInfo);

      dispatch({
        type: 'stopLossAdv/init',
        payload: {
          ObjectID: props.editInfo.objectID,
          Name: props.editInfo.actionName,
          ActionInfo: {
            ...tacticInfo.ActionInfo,
            OrCondition: actionInfo.OrCondition,
            installValue: actionInfo.InsertCount,
            ResetBudgetTime: moment(actionInfo.ResetInfoTime, 'HH:mm'),
            spendFeeValue: {
              ...tacticInfo.ActionInfo?.spendFeeValue,
              staticMetricValue: actionInfo.ICCostedValue,
            },
            installfeeValue: {
              ...tacticInfo.ActionInfo?.installfeeValue,
              staticMetricValue: actionInfo.InsertOneCost,
            },
            spendFeeValuePer: {
              ...tacticInfo.ActionInfo?.spendFeeValuePer,
              staticMetricValue: actionInfo.IOCCostValue
            }
          },
          ActionObj: props.editInfo.actionObj
        }
      })
    }
  }, [])

  const handleActionInfoChange = (payload: any) => {
    dispatch({
      type: 'stopLossAdv/updateActionInfo',
      payload
    });
  }

  const handleSelectorChange = (payload: any) => {
    dispatch({
      type: 'stopLossAdv/updateActionObj',
      payload
    });
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

const Component = connect(({stopLossAdv}: { stopLossAdv: TStateTactic<TActionInfoStopLossAdv> }) => ({
  tacticInfo: stopLossAdv
}))(StopLossAdvAdv);

export default forwardRef<Pick<ITacticForwardRef, any>, any>((props, ref) => <Component {...props} refInstance={ref}/>);

