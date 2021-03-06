import {
  Card,

  Row,
  Col,

  Button,
  Space,

  Steps,
  Tag
} from 'antd'
import React, {FC, useState} from 'react'
import {connect} from 'umi'
import { LeftOutlined, RightOutlined} from '@ant-design/icons';
import styles from './index.less';
import {StaticsSetUp} from "../components/StaticsSetUp";

const {Step} = Steps;
interface StopLossAdvSetProps{

}

/*
* staticsIdx:number,
  title:string,
  installsValue?:number,
  installfeeValue?:StaticsItemValueType,
  spendFeeValue?:StaticsItemValueType,
  onInstallsValueChange:(installsValue:number|string|undefined|null)=>void,
  onInstallfeeValueChange:(installfeeValue:StaticsItemValueType|undefined)=>void,
  onSpendFeeValueChange:(spendFeeValue:StaticsItemValueType|undefined)=>void,
* */
const StopLossAdvSet: FC<StopLossAdvSetProps> = (props) => {
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [staticsIdx,setStaticsIdx] = useState<number>(0);
  return (<>
    <Card>
      <div className={styles.slStepsWrap}>
        <Button onClick={() => {
          setStepIdx(0);
        }}><LeftOutlined/>后退</Button>
        <Steps className={styles.slSteps} current={stepIdx}>
          <Step title="设置"/>
          <Step title="选择广告集"/>
        </Steps>
        <Button onClick={() => {
          setStepIdx(1);
        }} type="primary">下一个<RightOutlined/></Button>
      </div>
    </Card>
    <Card
      className={styles.blockDes}
      title={<>
        <Space>
          <div className={styles.desTitle}>止损</div>
          <div className={styles.desSubTitle}>广告集</div>
        </Space>
      </>}
    >
      <Row>
        <Col span={14}>
          <div>止损一经发现，便会立即以负动量暂停效果欠佳的广告集，从而保护您的预算。在选定的本地时间，它会重新打开广告集</div>
          <div style={{marginTop: "10px"}}>
            <Tag color="#87d068">广告集</Tag>
          </div>
        </Col>
        <Col span={10}>
        </Col>
      </Row>
    </Card>

    <StaticsSetUp title="系统将触发止损并暂停广告集" staticsIdx={0}
    />
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