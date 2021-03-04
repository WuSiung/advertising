import React, { FC } from 'react';
import {Card, Col, Row, Space} from "antd";


interface IStep1 {

}

const Step1: FC<IStep1> = (props) => {
  return (
    <div>
      <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24}}>
        <Col span={8}>
          <Card
            type="inner"
            style={{borderRight: '8px solid #9966ff', marginBottom: 25}}
            hoverable={true}
          >
            <Space direction="vertical" size="small">
              <div>
                <h2><strong>冲浪</strong></h2>
                <p>广告集级别</p>
              </div>
              <div>
                SURF确定了强劲的效果趋势，并通过将可用的广告集预算增加到原始限制之外，自动利用积极的势头，预算将在选定的本地时间自动重置。
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            type="inner"
            style={{ borderRight: '8px solid #9966ff', marginBottom: 25}}
            hoverable={true}
          >
            <Space direction="vertical" size="small">
              <div>
                <h2><strong>冲浪</strong></h2>
                <p>广告集级别</p>
              </div>
              <div>
                SURF确定了强劲的效果趋势，并通过将可用的广告集预算增加到原始限制之外，自动利用积极的势头，预算将在选定的本地时间自动重置。
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            type="inner"
            style={{ borderRight: '8px solid #9966ff', marginBottom: 25}}
            hoverable={true}
          >
            <Space direction="vertical" size="small">
              <div>
                <h2><strong>冲浪</strong></h2>
                <p>广告集级别</p>
              </div>
              <div>
                SURF确定了强劲的效果趋势，并通过将可用的广告集预算增加到原始限制之外，自动利用积极的势头，预算将在选定的本地时间自动重置。
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Step1;
