import {
  Card,
  TimePicker,
  InputNumber,
  Switch
} from 'antd'
import React, {FC, forwardRef, useImperativeHandle} from 'react'
import {connect} from 'umi';
import {StaticsSetUp} from "../components/StaticsSetUp";
import SettingHeadCard from "../../../setting-head-card"
import SvgRevive, {SvgRevivePic} from "../../../svg-revive"
import styles from "./index.less";
import {TActionInfoReviveAdv} from "@/pages/automation/wizard/components/step2/revive/advadv/data";
import {ITactic, ITacticForwardRef, TStateTactic} from "@/pages/automation/wizard/components/step2/data";
import AdSelector from "@/pages/automation/wizard/components/step3/ad-selector";
import {TActionInfoReviveAdvSet} from "@/pages/automation/wizard/components/step2/revive/advset/data";

// interface StopLossAdvSetProps {
//   step: number;
//   ref: React.MutableRefObject<any>
// }

interface ISetting {
  ActionInfo?: TActionInfoReviveAdv;
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
  const {ActionInfo, onChange} = props;
  return (<>
    {<SettingHeadCard title="复活广告位" icon={<SvgRevive fill="#d964c5"/>} pictrue={<SvgRevivePic/>}
                      subTitle="我们准备了Revive策略，以适应渠道中的各种事件。选择您想作为Revive基础的事件，我们将为您推荐该事件的最佳预测Revive指标，或跳过此步骤并从头开始制定策略。"/>}

    <Card
      title="恢复效果良好的已暂停广告"
    >
      <div style={{fontSize: "18px", margin: "10px 0"}}>如果今天暂停的广告集获得<span className="em">{ActionInfo?.installs}</span>次或更多安装次数
      </div>
      <div><InputNumber value={ActionInfo?.installs} onChange={(value) => {
        onChange({installs: value})
      }}/> 移动安装次数
      </div>
    </Card>
    <div className={styles.swichWrap}>
      <Switch onChange={(value) => {
        onChange({checked: value})
      }} defaultChecked={ActionInfo?.checked} title="和"></Switch>
    </div>
    <div style={{opacity: ActionInfo?.checked ? "1" : "0.5", pointerEvents: ActionInfo?.checked ? "inherit" : "none"}}>
      <StaticsSetUp title=""
                    ActionInfo={ActionInfo as TActionInfoReviveAdvSet}
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
const ReviveAdvAdv: FC<ITactic<TActionInfoReviveAdv>> = (props) => {
  // console.log(props.step);
  const {tacticInfo, refInstance, dispatch} = props;
  useImperativeHandle(refInstance, () => ({
    submit: () => {
      const actionInfo: any = {...tacticInfo.ActionInfo};
      actionInfo.ResetBudgetTime = actionInfo.ResetBudgetTime.format('HH:mm');
      const obj = {
        Name: tacticInfo.Name,
        ActionObj: tacticInfo.ActionObj?.map(o => String(o)),
        ActionInfo: JSON.stringify(actionInfo)
      }
      // console.log('revive adv commit');
      return obj;
    }
  }));

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
// export default ReviveAdvAdv
