import React, {FC, useState, useRef} from 'react';
import { connect, Dispatch, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import {Button, Card, Col, Row, Select, Slider, Space, Table} from 'antd';
import Title from './components/title';
import Step1 from './components/step1';
import styles from "@/pages/dashboard/index.less";
import SurfAdSet from "@/pages/automation/wizard/components/step2/surf-ad-set";
import SurfCampaign from "@/pages/automation/wizard/components/step2/surf-campaign";
import StopLossAdvSet from "@/pages/automation/wizard/components/step2/stoploss/advset";
import StopLossAdvAdv from "@/pages/automation/wizard/components/step2/stoploss/advadv";
import ReviveAdvSet from "@/pages/automation/wizard/components/step2/revive/advset";
import ReviveAdvAdv from "@/pages/automation/wizard/components/step2/revive/advadv";
import Loading from '@/components/Loading';
import {TAdvAutoActionReq} from "@/pages/automation/wizard/data";
import {EActionType} from "@/pages/automation/wizard/data.d";
import {createTactic} from "@/pages/automation/wizard/service";

const { Option } = Select;
interface WizardProps {
  dispatch: Dispatch
  isLoading: boolean;
}

const Wizard: FC<WizardProps> = (props) => {
  const { isLoading, dispatch } = props

  // const title = (
  //   <div>
  //     <Row justify="space-between">
  //       <Col>
  //         <Button onClick={() => history.goBack()}>{'< 后退'}</Button>
  //       </Col>
  //     </Row>
  //   </div>
  // )

  // const subTitle = (
  //   <Row>
  //     <Col span={8}></Col>
  //     <Col>
  //       <div style={{color: '#eee', width: 5, height: 100}}></div>
  //     </Col>
  //   </Row>
  // )

  const childRef: React.MutableRefObject<any> = useRef()

  const [current, setCurrent] = useState(0)

  const [tactic, setTactic] = useState('');

  const [level, setLevel] = useState(-1);

  const handleTactic = (tt: string, lvl: number) => {
    // console.log('handleTactic', tt);
    if (tt) {
      setCurrent(1);
      setTactic(tt);
      setLevel(lvl);
    }
  }

  const handleClick = async (step: number) => {
    // 选好广告、广告集、活动之后直接调用子组件接口提交
    // todo: 将对submit的调用封装成asnyc，并启用遮罩，asnyc执行完毕后，提示信息，然后导航到自动化主页面
    if (step === 3) {
      if (childRef && childRef.current) {
        const data = childRef.current.submit();
        await createTactic({
          Name: data.Name,
          ActionInfo: data.ActionInfo,
          ActionObj: data.ActionObj,
          ActionType: tactic
        });
        history.push('/automation/summary');
        // dispatch({
        //   type: 'tacticWizard/createTactic',
        //   payload: {
        //     Name: data.Name,
        //     ActionInfo: data.ActionInfo,
        //     ActionObj: data.ActionObj,
        //     ActionType: tactic
        //   }
        // });
      }
    } else {
      setCurrent(step);
    }
  }

  return (
    <PageContainer>
      <Card
        className={`${styles.totalCard}`}
        title={<Title current={current} tactic={tactic} level={level} handleClick={handleClick}></Title>}
      >
        {current === 0 && <Step1 onTactic={handleTactic}></Step1>}
        {tactic === EActionType.AAT_Surf_CampaignLevel && <SurfCampaign ref={childRef} step={current}></SurfCampaign>}
        {tactic === EActionType.AAT_Surf_AdSetLevel && <SurfAdSet ref={childRef} step={current}></SurfAdSet>}
        {tactic === EActionType.AAT_StopLoss_AdSetLevel && <StopLossAdvSet step={current}></StopLossAdvSet>}
        {tactic === EActionType.AAT_StopLoss_AdLevel && <StopLossAdvAdv step={current}></StopLossAdvAdv>}
        {tactic === EActionType.AAT_Revive_AdSetLevel && <ReviveAdvSet step={current}></ReviveAdvSet>}
        {tactic === EActionType.AAT_Revive_AdLevel && <ReviveAdvAdv step={current}></ReviveAdvAdv>}
      </Card>
      { isLoading && <Loading size="large" showMask tips="提交数据中，请稍等..." />}
    </PageContainer>
  )
}

export default connect(({ tacticWizard, loading }: {tacticWizard: TAdvAutoActionReq; loading: any}) => ({
  tacticWizard,
  isLoading: loading.effects['tacticWizard/createTactic']
}))(Wizard);

// export default Wizard;
