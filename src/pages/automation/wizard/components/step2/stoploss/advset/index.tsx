import {
  Card, Space, Switch,
  TimePicker
} from 'antd'
import React, {FC, forwardRef, useEffect, useImperativeHandle} from 'react'
import {connect} from 'umi';
import {StaticsSetUp, StaticsSetUp2} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgStopLoss, {SvgStopLossPicAds} from "../../../svg-stop-loss"
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {ITactic, ITacticForwardRef, TStateTactic} from "@/pages/automation/wizard/components/step2/data";
import {TActionInfoStopLossAdvSet} from "@/pages/automation/wizard/components/step2/stoploss/advset/data";
import moment from 'moment';
import styles from "@/pages/automation/wizard/components/step2/revive/advset/index.less";

// interface StopLossAdvSetProps {
//   step: number;
//   ref: React.MutableRefObject<any>
// }
//
// interface RetrunValueType {
//   tacticIdx: number;
//   installsValue: number | undefined;
//   installfeeValue: StaticsItemValueType;
//   spendFeeValue: StaticsItemValueType
// }

interface ISetting {
  ActionInfo?: TActionInfoStopLossAdvSet;
  onChange: (payload: any) => void;
};

const Setting: FC<ISetting> = (props) => {
  // const [staticsIdx, setStaticsIdx] = useState<number>(0);//策略的索引 installs 和 installsfee
  // const [installsValue, setInstallsValue] = useState<number>();
  // const [installfeeValue, setInstallfeeValue] = useState<StaticsItemValueType>({mertricType: 2});
  // const [spendFeeValue, setSpendFeeValue] = useState<StaticsItemValueType>({mertricType: 2});
  /*
    StaticsItemValueType:
    staticMetricValue?:number;//静态指标值
    value?:number;//动态指标值
    lastDays?:string|number;//动态指标最近天数
    mertricType?:number;//1选中静态指标,2选中动态指标
  * */
  const format = 'HH:mm';
  const {ActionInfo, onChange} = props;
  return (<>
    {<SettingHeadCard title="止损广告位" icon={<SvgStopLoss/>} pictrue={<SvgStopLossPicAds/>}
                      subTitle="我们已经准备了止损策略，以适应渠道中的各种事件。选择您想要作为止损基础的事件，我们将为您推荐该事件的最佳预测止损指标，或者跳过此步骤并从头开始制定策略。"/>}
    <StaticsSetUp title="系统将触发止损并暂停广告集"
                  ActionInfo={ActionInfo}
                  onChange={onChange}


    />
    <div className={styles.swichWrap}>
      <Space>
        <Switch onChange={(value) => {
          onChange({OrCondition: value})
        }} defaultChecked={ActionInfo?.OrCondition} title="和"></Switch>
        <span>要么</span>
      </Space>

    </div>
    <div style={{opacity: ActionInfo?.OrCondition ? "1" : "0.5", pointerEvents: ActionInfo?.OrCondition ? "inherit" : "none"}}>
      <StaticsSetUp2 title=""
                     ActionInfo={ActionInfo}
                     onChange={onChange}
      />
    </div>
    <Card>
      <div><span className="em">该广告集</span> 将被自动取消暂停在当地时间</div>
      <div>重置时间表:<TimePicker value={ActionInfo?.ResetBudgetTime} format={format}
                             onChange={value => props.onChange({ResetBudgetTime: value})}/></div>
    </Card>
  </>);
}

const StopLossAdvSet: FC<ITactic<TActionInfoStopLossAdvSet>> = ((props) => {
  // console.log(props.step);

  // const [rVal, setRVal] = useState<RetrunValueType>();
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
      };
      // console.log('stopLoss advset commit');
      return obj;
    }
  }));

  useEffect(() => {
    if (props.editInfo) {
      const actionInfo = JSON.parse(props.editInfo.actionInfo);
      // console.log(actionInfo);
      dispatch({
        type: 'stopLossAdvSet/init',
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
  }, []);

  const handleActionInfoChange = (payload: any) => {
    dispatch({
      type: 'stopLossAdvSet/updateActionInfo',
      payload
    });
  }

  const handleSelectorChange = (payload: any) => {
    dispatch({
      type: 'stopLossAdvSet/updateActionObj',
      payload
    });
  }

  return (
    <>
      {props.step === 1 && <Setting ActionInfo={tacticInfo.ActionInfo} onChange={handleActionInfoChange}/>}
      {props.step === 2 &&
      <AdSetSelector Name={tacticInfo.Name} ActionObj={tacticInfo.ActionObj} onChange={handleSelectorChange}
                     onActionObjChange={props.onActionObjChange}/>}
    </>
  )
});

const Component = connect(({stopLossAdvSet}: { stopLossAdvSet: TStateTactic<TActionInfoStopLossAdvSet> }) => ({
  tacticInfo: stopLossAdvSet
}))(StopLossAdvSet);

export default forwardRef<Pick<ITacticForwardRef, any>, any>((props, ref) => <Component {...props} refInstance={ref}/>)

// export default StopLossAdvSet
