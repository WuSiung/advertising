import React, {FC, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Button, Card, Col, Row, Select, Slider, Space, Table} from 'antd';
import {history} from "@@/core/history";
import Title from './components/title';
import Step1 from './components/step1';
import Step2 from "./components/step2";
import styles from "@/pages/dashboard/index.less";


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

  return (
    <PageContainer>
      <Card
        className={`${styles.totalCard}`}
        title={<Title current={current} handleClick={(step) => setCurrent(step)}></Title>}
        loading={isLoading}
      >
        {current === 0 && <Step1></Step1>}
        {current === 1 && <Step2></Step2>}
      </Card>
    </PageContainer>
  )
}

export default Wizard;
