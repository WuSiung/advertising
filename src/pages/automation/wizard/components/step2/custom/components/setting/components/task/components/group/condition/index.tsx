import React, {FC} from 'react';
import {Col, Divider, Row, Space} from "antd";

const Condition: FC<any> = (props) => {
  return (
    // <Row style={{height: 24}}>
    //   <Col style={{width: 10}}>
    //     <Divider />
    //   </Col>
    //   <Col span={5}>
    //     <p>选择条件</p>
    //   </Col>
    // </Row>
    <div style={{height: 24}}>
      <Space style={{height: 24}}>
        <Divider style={{width: 10}} />
        <p style={{marginBottom: 0}}>选择条件</p>
      </Space>
    </div>
  )
}

export default Condition;
