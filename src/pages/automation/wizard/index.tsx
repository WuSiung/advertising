import React, {FC, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Button, Card, Col, Row, Select, Slider, Space, Table} from 'antd';
import {history} from "@@/core/history";
import Title from './components/title';
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

  return (
    <PageContainer>
      <Card
        className={`${styles.totalCard}`}
        title={<Title></Title>}
        loading={isLoading}
      >
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
        <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24}}>
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
        <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24}}>
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
      </Card>
    </PageContainer>
  )
}

export default Wizard;
