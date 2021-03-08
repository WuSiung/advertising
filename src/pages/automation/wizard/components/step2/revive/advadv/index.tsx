import {
  Card,
  Steps,
  TimePicker,
  InputNumber,
  Switch
} from 'antd'
import React, {FC, useState} from 'react'
import {connect} from 'umi'
import {StaticsSetUp,StaticsItemValueType} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgRevive,{SvgRevivePic} from "../../../svg-revive"
import styles from "./index.less";
interface StopLossAdvSetProps{
  step:number
}

const ReviveAdvAdv: FC<StopLossAdvSetProps> = (props) => {
  const [staticsIdx,setStaticsIdx] = useState<number>(0);
  const [installsValue,setInstallsValue] = useState<number>();
  const [installfeeValue,setInstallfeeValue] = useState<StaticsItemValueType>({mertricType:2});
  const [spendFeeValue,setSpendFeeValue] = useState<StaticsItemValueType>({mertricType:2});
  const [checked,setChecked]= useState<boolean>(false);
  const [installs,setInstalls]= useState<number>(0);
  return (<>
   { <SettingHeadCard title="复活广告位" icon={<SvgRevive fill="#d964c5" />} pictrue={<SvgRevivePic />} subTitle="我们准备了Revive策略，以适应渠道中的各种事件。选择您想作为Revive基础的事件，我们将为您推荐该事件的最佳预测Revive指标，或跳过此步骤并从头开始制定策略。" />}

   <Card
     title="恢复效果良好的已暂停广告集"
   >
     <div style={{fontSize:"18px",margin:"10px 0"}}>如果今天暂停的广告集获得<span className="em">{installs}</span>次或更多安装次数</div>
     <div><InputNumber value={installs} onChange={(value)=>{
       setInstalls(value as number);
     }} /> 移动安装次数</div>
   </Card>
     <div className={styles.swichWrap}>
        <Switch onChange={(value)=>{
          setChecked(value);
        }} defaultChecked={checked} title="和"></Switch>
     </div>
    <div  style={{opacity:checked?"1":"0.5",pointerEvents:checked?"inherit":"none"}} >
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
    </div>
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
}))(ReviveAdvAdv)