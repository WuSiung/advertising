import React, {FC, useState, useRef} from 'react';
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


const { Option } = Select;
interface WizardProps {
  isLoading: boolean;
}

const Wizard: FC<WizardProps> = (props) => {
  const { isLoading } = props

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

  const handleClick = (step: number) => {
    // 选好广告、广告集、活动之后直接调用子组件接口提交
    if (step === 3) {
      if (childRef && childRef.current) {
        childRef.current.submit();
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
        loading={isLoading}
      >
        {current === 0 && <Step1 onTactic={handleTactic}></Step1>}
        {tactic === 'surfCampaign' && <SurfCampaign ref={childRef} step={current}></SurfCampaign>}
        {tactic === 'surfAds' && <SurfAdSet ref={childRef} step={current}></SurfAdSet>}
        {tactic === 'stopLossAds' && <StopLossAdvSet  ref={childRef} step={current}></StopLossAdvSet>}
        {tactic === 'stopLossAd' && <StopLossAdvAdv  ref={childRef} step={current}></StopLossAdvAdv>}
        {tactic === 'reviveAds' && <ReviveAdvSet  ref={childRef} step={current}></ReviveAdvSet>}
        {tactic === 'reviveAd' && <ReviveAdvAdv  ref={childRef} step={current}></ReviveAdvAdv>}
      </Card>
    </PageContainer>
  )
}

export default Wizard;
