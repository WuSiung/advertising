import React, {FC, useState} from 'react';
import {Col, InputNumber, Row, Slider, Space} from "antd";
import styles from './index.less';

function formatter(value?: number) {
  // return <p>{`${value}%`}</p>;
  return null
}

const ChartSlider: FC<any> = props => {
  const marks = {
    0: {
      label: <strong>00:00</strong>,
    },
    24: {
      style: {
        // color: '#f50',
      },
      label: <strong>00:00</strong>,
    }
  };

  const [values, setValues] = useState([6, 7]);

  values.forEach((v, idx) => {
    const tag = (
      <Space direction="vertical">
        <span>{v}点</span>
        <div style={{width: 0, height: 35, border: '1px solid green', margin: '0 auto'}}></div>
      </Space>
    )

    marks[v] = {
      label: tag,
      style: {
        bottom: 14
      }
    };
  });

  const cols = new Array(24).fill(0)


  return (
    <Row className={styles.main}>
      <Col flex='100px'>
        <div style={{padding: '14px 0'}}>
          <InputNumber size="small"></InputNumber>
        </div>
      </Col>
      <Col flex="auto">
        <Row style={{height:35, marginTop: 10, backgroundColor: 'red'}}>
          {
            cols.map(c => <Col span={1}></Col>)
          }
        </Row>
        <Slider style={{width: '100%'}} max={24} range={{ draggableTrack: true }} marks={marks} value={values as [number, number]}
                 tooltipVisible={false} onChange={vs => setValues(vs)} />
      </Col>
    </Row>
  )
}

export default ChartSlider;
