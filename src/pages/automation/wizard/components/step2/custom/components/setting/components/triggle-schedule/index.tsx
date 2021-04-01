import React, {FC} from 'react';
import {Card, Col, Radio, Row, Select, Space} from "antd";

import styles from './index.less';
import ChartSlider
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/triggle-schedule/components/chart-slider";
import NoHoverableGrid from './components/no-hoverable-grid';

const TriggleSchedule: FC<any> = props => {
  const NoHoverableGridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  const clockTxts = [
    '上午十二点',
    '上午一点',
    '上午二点',
    '上午三点',
    '上午四点',
    '上午五点',
    '上午六点',
    '上午七点',
    '上午八点',
    '上午九点',
    '上午十点',
    '上午十一点',
    '中午十二点',
    '下午一点',
    '下午二点',
    '下午三点',
    '下午四点',
    '下午五点',
    '下午六点',
    '下午七点',
    '下午八点',
    '下午九点',
    '下午十点',
    '下午十一点'
  ];
  const title = (
    <>
      <Row>
        <Space>
          <span>实时触发激活计划：</span>
          <span>选择您是希望 7 X 24 还是仅在特定的日期/小时应用规则 时区：亚洲/上海</span>
        </Space>
      </Row>

      <Radio.Group value="0">
        <Radio value="0">连续运行</Radio>
        <Radio value="1">在特定的日期/小时</Radio>
      </Radio.Group>
      {/*<Space>*/}
      {/*  <label>连续运行<Radio></Radio></label>*/}
      {/*  <label>在特定的日期/小时<Radio></Radio></label>*/}
      {/*</Space>*/}
    </>
  )
  return (
      <Card
        className={styles.main}
        title={title}
      >
          <NoHoverableGrid className="select-target-date">
            <Row justify="end" style={{padding: 8}}>
              <Space>
                <span>绩效衡量标准：</span>
                <Select size="small"></Select>
                <span>大体时间：</span>
                <Select size="small"></Select>
              </Space>
            </Row>
          </NoHoverableGrid>
          <NoHoverableGrid className="legend">
            <Row justify="end" style={{padding: 8}}>
              <Space size="large">
                <span>积极的</span>
                <span>不活跃的</span>
                <span>整体平局表现</span>
                <span>每小时平均表现</span>
              </Space>
            </Row>

          </NoHoverableGrid>
          {/*<NoHoverableGrid style={{width: '10%'}}></NoHoverableGrid>*/}
          <NoHoverableGrid className="clock-title">
            <Row>
              <Col flex="100px">
                &nbsp;
              </Col>
              <Col flex="140px"><div style={{width: 100, margin: '0 0 0 auto', padding: '45px 0'}}><span>活动时间范围数</span></div></Col>
              <Col flex="auto" className="clock-txt">
                <Row>
                  {
                    clockTxts.map(c => {
                      const txts = c.split('');
                      return (
                        <Col span={1}><div><span>
                          {
                            txts.map(t => <>{t}<br/></>)
                          }
                        </span></div></Col>
                      )
                    })
                  }
                  {/*<Col span={1}><div><span>上<br/>午<br/>十<br/>二<br/>点</span></div></Col>*/}
                </Row>
              </Col>
            </Row>
          </NoHoverableGrid>
          <Radio.Group style={{width: '100%'}}>
            <NoHoverableGrid className="radio-plan">
              <Space>&nbsp;<Radio>每天</Radio></Space>
            </NoHoverableGrid>
            <NoHoverableGrid className="chart-slider">
              <Row>
                <Col flex='140px'></Col>
                <Col flex="auto">
                  <ChartSlider></ChartSlider>
                </Col>
              </Row>
            </NoHoverableGrid>
            <NoHoverableGrid className="radio-plan">
              <Space>&nbsp;<Radio>在选定的日子</Radio></Space>
            </NoHoverableGrid>
          </Radio.Group>
        <Radio.Group style={{width: '100%'}}>
          <NoHoverableGrid className="chart-slider">
            <Row>
              <Col flex='140px'>
                <div style={{width: 20, margin: '0 auto', paddingTop: 40}}>
                  <Radio>周一</Radio>
                </div>
              </Col>
              <Col flex="auto">
                <ChartSlider></ChartSlider>
              </Col>
            </Row>
          </NoHoverableGrid>
          <NoHoverableGrid className="chart-slider">
            <Row>
              <Col flex='140px'>
                <div style={{width: 20, margin: '0 auto', paddingTop: 40}}>
                  <Radio>周一</Radio>
                </div>
              </Col>
              <Col flex="auto">
                <ChartSlider></ChartSlider>
              </Col>
            </Row>
          </NoHoverableGrid>
        </Radio.Group>
      </Card>
  )
}

export default TriggleSchedule;
