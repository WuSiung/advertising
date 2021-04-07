import React, {FC} from 'react';
import {Col, Divider, Row, Select, Space} from "antd";

import styles from './index.less';
import {CopyOutlined, DeleteOutlined, InteractionOutlined} from "@ant-design/icons";

interface ICondition {
  idx: number;
  condHeight: number;
  condMarginTop: number;
  onDel: (idx: number) => void;
  onCopy: (idx: number) => void;
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
      <Space className="outter-space" style={{height: props.condHeight}}>
        <Divider />
        {/*<p style={{marginBottom: 0}}>选择条件</p>*/}
        <Row className="box" style={{height: props.condHeight}} justify="space-between">
          <Space className="select-space" size="large" >
            <Select size="small"></Select>
            <Select size="small"></Select>
            <Select size="small"></Select>
          </Space>
          <Space className="action-space">
            {/*<InteractionOutlined />*/}
            <CopyOutlined onClick={() => props.onCopy(props.idx)} />
            <DeleteOutlined onClick={() => props.onDel(props.idx)} />
          </Space>
        </Row>
      </Space>
    </div>
  )
}

export default Condition;
