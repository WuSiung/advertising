import {
  Card,
  Steps,
  TimePicker
} from 'antd'
import React, {FC, useState} from 'react'
import {connect} from 'umi'
import {StaticsSetUp,StaticsItemValueType} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgStopLoss,{SvgStopLossPicAds} from "../../../svg-stop-loss"
interface StopLossAdvSetProps{
  step:number
}

const StopLossAdvSet: FC<StopLossAdvSetProps> = (props) => {
  const [staticsIdx,setStaticsIdx] = useState<number>(0);
  const [installsValue,setInstallsValue] = useState<number>();
  const [installfeeValue,setInstallfeeValue] = useState<StaticsItemValueType>({mertricType:2});
  const [spendFeeValue,setSpendFeeValue] = useState<StaticsItemValueType>({mertricType:2});
  return (<>
   { <SettingHeadCard title="止损广告位" icon={<SvgStopLoss/>} pictrue={<SvgStopLossPicAds/>} subTitle="我们已经准备了止损策略，以适应渠道中的各种事件。选择您想要作为止损基础的事件，我们将为您推荐该事件的最佳预测止损指标，或者跳过此步骤并从头开始制定策略。" />}

    <StaticsSetUp title="系统将触发止损并暂停广告集"
                  staticsIdx={staticsIdx}
                  setStaticsIdx={setStaticsIdx}
                  installsValue={installsValue}
                  installfeeValue={installfeeValue}
                  spendFeeValue={spendFeeValue}
                  onInstallfeeValueChange={(value)=>{
                    setInstallfeeValue(ifv=>{
                      return {...ifv,...value};
                    })
                  }}
                  onInstallsValueChange={(value )=>{
                    setInstallsValue(value as number);
                  }}
                  onSpendFeeValueChange={(value)=>{
                    setSpendFeeValue(ifv=>{
                      return {...ifv,...value};
                    })
                  }}


    />
    <Card>
      <div><span className="em">该广告集</span> 将被自动取消暂停在当地时间</div>
      <div>重置时间表:<TimePicker /></div>
    </Card>
  </>);
}

export default connect(({stoploss, loading}: {
  stoploss: any, loading:
    {
      effects: {
        [key
          :
          string
          ]:
          boolean
      }
    }
}) => ({
  stoploss,
}))(StopLossAdvSet)