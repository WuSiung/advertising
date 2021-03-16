import React, { FC } from 'react';
import {Button, Col, Row, Space, Steps} from "antd";
import {history} from "umi";
import SvgHead from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-head";
import SvgGear from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-gears";
import SvgFrontSight from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-front-sight";
import SvgSignal from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-signal";
import TacticCardHead from "@/pages/automation/wizard/components/tactic-card-head";

const { Step } = Steps;

interface ITitle {
  isActionObjSelected: boolean;
  current: number;
  level: number; // 等级（广告，广告集，活动）
  tactic: string;
  handleClick: (step: number) => void;
}

const Title: FC<ITitle> = (props) => {
  // const [current, setCurrent] = React.useState(0);
  const steps = [
    {
      title: '选择',
      content: 'First-content',
    },
    {
      title: '设置',
      content: 'Second-content',
    },
    {
      title: '完成',
      content: 'Last-content',
    },
  ];

  // const next = () => {
  //   setCurrent(current + 1);
  // };
  //
  // const prev = () => {
  //   setCurrent(current - 1);
  //   // history.goBack()
  // };

  return (
    <div>
      <Row justify="space-between">
        <Button disabled={ props.current <= 0 } onClick={() =>  props.handleClick(props.current - 1)}>{'< 后退'}</Button>
        { props.current === 0 && <h3>选择自动化策略</h3>}
        { props.current === 1 && <h3>设置参数</h3>}
        { props.current === 2 && props.level === 0 && <h3>请选择广告</h3>}
        { props.current === 2 && props.level === 1 && <h3>请选择广告集</h3>}
        { props.current === 2 && props.level === 2 && <h3>请选择活动</h3>}
        <Button type="primary" disabled={ !props.tactic || (props.current === 2 && !props.isActionObjSelected) } onClick={() => props.handleClick(props.current + 1)}>下一步</Button>
      </Row>
      <Row style={{marginTop: 20}}>
        <Steps current={props.current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </Row>
      { props.current === 0 &&
        <div>
          <Row justify="center" style={{marginTop: 20}}><SvgHead /></Row>
          <Row justify="space-between" style={{marginTop: 20}}>
            <Col>
              <TacticCardHead
                icon={<SvgGear/>}
                size="small"
                title="1.战术与最佳实践"
                subTitle="将多种广告购买自动化规则和策略封装到一个策略中"
              />
            </Col>
            <Col>
              <TacticCardHead
                icon={<SvgFrontSight />}
                size="small"
                title="2.实时优化"
                subTitle="虽然定期检查的市场标准是15/30分钟，但是自动化规则会实时触发"
              />
            </Col>
            <Col>
              <TacticCardHead
                icon={<SvgSignal />}
                size="small"
                title="3.动态规则"
                subTitle="根据动态字段设置规则，这些规则在性能波动时保持相关"
              />
            </Col>
          </Row>
        </div>
      }
    </div>
  );
}

export default Title;

