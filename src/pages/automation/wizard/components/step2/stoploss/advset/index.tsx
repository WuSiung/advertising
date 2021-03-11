import {
  Card,
  TimePicker
} from 'antd'
import React, {FC, forwardRef, ForwardRefExoticComponent, useImperativeHandle, useState} from 'react'
import {StaticsSetUp, StaticsItemValueType} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgStopLoss, {SvgStopLossPicAds} from "../../../svg-stop-loss"
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";

interface StopLossAdvSetProps {
  step: number;
  ref: React.MutableRefObject<any>
}

interface RetrunValueType {
  tacticIdx: number;
  installsValue: number|undefined;
  installfeeValue: StaticsItemValueType;
  spendFeeValue: StaticsItemValueType
}
const Setting: FC<{ onChange: (value:RetrunValueType) => void }> = (props) => {
  const [staticsIdx, setStaticsIdx] = useState<number>(0);//策略的索引 installs 和 installsfee
  const [installsValue, setInstallsValue] = useState<number>();
  const [installfeeValue, setInstallfeeValue] = useState<StaticsItemValueType>({mertricType: 2});
  const [spendFeeValue, setSpendFeeValue] = useState<StaticsItemValueType>({mertricType: 2});
  /*
    StaticsItemValueType:
    staticMetricValue?:number;//静态指标值
    value?:number;//动态指标值
    lastDays?:string|number;//动态指标最近天数
    mertricType?:number;//1选中静态指标,2选中动态指标
  * */
  return (<>
    {<SettingHeadCard title="止损广告位" icon={<SvgStopLoss/>} pictrue={<SvgStopLossPicAds/>}
                      subTitle="我们已经准备了止损策略，以适应渠道中的各种事件。选择您想要作为止损基础的事件，我们将为您推荐该事件的最佳预测止损指标，或者跳过此步骤并从头开始制定策略。"/>}
    <StaticsSetUp title="系统将触发止损并暂停广告集"
                  staticsIdx={staticsIdx}
                  setStaticsIdx={setStaticsIdx}
                  installsValue={installsValue}
                  installfeeValue={installfeeValue}
                  spendFeeValue={spendFeeValue}
                  onInstallfeeValueChange={(value) => {
                    setInstallfeeValue(ifv => {
                      props.onChange({tacticIdx:staticsIdx,installsValue:installsValue,spendFeeValue:spendFeeValue,installfeeValue:{...ifv, ...value}})
                      return {...ifv, ...value};
                    })
                  }}
                  onInstallsValueChange={(value) => {
                    props.onChange({tacticIdx:staticsIdx,installsValue:value as number|undefined,spendFeeValue:spendFeeValue,installfeeValue:installfeeValue})
                    setInstallsValue(value as number);
                  }}
                  onSpendFeeValueChange={(value) => {
                    setSpendFeeValue(ifv => {
                      props.onChange({tacticIdx:staticsIdx,installsValue:installsValue,installfeeValue:installfeeValue,spendFeeValue:{...ifv, ...value}})
                      return {...ifv, ...value};
                    })
                  }}


    />
    <Card>
      <div><span className="em">该广告集</span> 将被自动取消暂停在当地时间</div>
      <div>重置时间表:<TimePicker/></div>
    </Card>
  </>);
}

const StopLossAdvSet: ForwardRefExoticComponent<Pick<StopLossAdvSetProps, any>> = forwardRef((props, ref) => {
  // console.log(props.step);

  const [rVal, setRVal] = useState<RetrunValueType>();
  useImperativeHandle(ref, () => ({
    submit: () => {
      console.log("---------",rVal);
    }
  }))

  return (
    <>
      {props.step === 1 && <Setting onChange={value => {
        setRVal(value);
      }}/>}
      {props.step === 2 && <AdSetSelector/>}
    </>
  )
});


export default StopLossAdvSet