import React, { FC } from 'react';
import {Button, Col, Row, Steps} from "antd";
import {history} from "umi";

const { Step } = Steps;

interface ITitle {
  current: number;
  handleClick: (step: number) => void;
}

const Title: FC<ITitle> = (props) => {
  // const [current, setCurrent] = React.useState(0);
  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
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
        <Button disabled={ props.current >= steps.length - 1 } onClick={() => props.handleClick(props.current + 1)}>下一步</Button>
      </Row>
      <Row style={{marginTop: 20}}>
        <Steps current={props.current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </Row>
    </div>
  );
}

export default Title;

