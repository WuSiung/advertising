import React, {FC, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Button, Card, Col, Row, Select, Slider, Space, Table} from 'antd';
import Title from './components/title';
import Step1 from './components/step1';
import SurfCampaign from "./components/step2/surf-campaign";
import styles from "@/pages/dashboard/index.less";
import SurfAds from "@/pages/automation/wizard/components/step2/surf-ads";


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

  const [current, setCurrent] = useState(0)

  const [tactic, setTactic] = useState('');

  const handleTactic = (tt: string) => {
    // console.log('handleTactic', tt);
    if (tt) {
      setCurrent(1);
      setTactic(tt);
    }
  }

  return (
    <PageContainer>
      <Card
        className={`${styles.totalCard}`}
        title={<Title current={current} tactic={tactic} handleClick={(step) => setCurrent(step)}></Title>}
        loading={isLoading}
      >
        {current === 0 && <Step1 onTactic={handleTactic}></Step1>}
        {current === 1 && tactic === 'surfCampaign' && <SurfCampaign></SurfCampaign>}
        {current === 1 && tactic === 'surfAds' && <SurfAds></SurfAds>}
      </Card>
    </PageContainer>
  )
}

export default Wizard;
