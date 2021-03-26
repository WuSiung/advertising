import React, {FC} from 'react';
import {Col, Divider, Row, Select, Space} from "antd";

import styles from './index.less';

interface ICondition {
  idx: number;
  condHeight: number;
  condMarginTop: number;
}

const Condition: FC<ICondition> = (props) => {
  const px = 24 // 30
  return (
    // <Row style={{height: 24}}>
    //   <Col style={{width: 10}}>
    //     <Divider />
    //   </Col>
    //   <Col span={5}>
    //     <p>选择条件</p>
    //   </Col>
    // </Row>
    <div className={styles.main} style={{height: props.condHeight, marginTop: props.idx === 0 ? 0 : props.condMarginTop}}>
      <Space style={{height: props.condHeight}}>
        <Divider style={{width: 10, borderTop: '2px solid rgba(0, 0, 0, 0.1)'}} />
        {/*<p style={{marginBottom: 0}}>选择条件</p>*/}
          <Space size="large" style={{height: props.condHeight, border: '1px solid black', borderRadius: 12, padding: '1px 10px'}}>
            <Select size="small" style={{width: 120}}></Select>
            <Select size="small" style={{width: 120}}></Select>
            <Select size="small" style={{width: 120}}></Select>
          </Space>
      </Space>
    </div>
  )
}

export default Condition;
