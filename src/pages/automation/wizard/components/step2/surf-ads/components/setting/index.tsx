import React, {FC} from 'react';
import SettingHeadCard from "@/pages/automation/wizard/components/setting-head-card";
import line from '@/assets/automation/line.svg';
import SvgChartAds
  from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-chart-ads";
import StepCard from "@/pages/automation/wizard/components/step-card";
import {Space, Select, Input, Radio, Row, Col, InputNumber, TimePicker} from "antd";
import SvgGrid from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-grid";
import SvgSurf from "@/pages/automation/wizard/components/svg-surf";
import SvgLine2 from "@/pages/automation/wizard/components/svg-line2";
import moment from "moment";

const {Option} = Select;

interface ISetting {
};

const Setting: FC<ISetting> = (props) => {
  const format = 'HH:mm';
  const title1 = (
    <Space direction="vertical">
      <span>触发SURF并增加广告集支出</span>
      <span>如果广告组达到3出站点击的，只要支出最少超过$0今天。</span>
    </Space>
  );

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <div>
      <SettingHeadCard
        size="small"
        icon={<SvgSurf fill="#7655c9" />}
        pictrue={<SvgChartAds/>}
        title="SURF广告水平"
        subTitle="奖励强者"
        remark="SURF确定了强劲的效果趋势，并通过将可用的广告集预算增加到原始限制之外，自动利用积极的势头。预算将在选定的本地时间自动重置。"
      />

      <StepCard title={title1}>
        <Space size="small">
          <SvgLine2 />
          <Space direction="vertical" size="large">
            <Space>
              <Select style={{width: 100}}>
                <Option value="1">出站点击</Option>
              </Select>
              <span>{'>='}</span>
              <Input style={{width: 100}}/>
            </Space>
            <Space>
              <span>花费</span>
              <span>{'<='}</span>
              <Radio.Group>
                <Space direction="vertical" size="small">
                  <Space size="small">
                    <Radio style={radioStyle} value={1}>
                      动态指标
                    </Radio>
                    <span>$</span>
                    <span>0.00</span>
                    <span>[</span>
                    <Input style={{width: 100}}/>
                    <span>$ 0.00 </span>
                    <Select style={{width: 150}}>
                      <Option value="1">每次点击的费用（购买）</Option>
                    </Select>
                    <Select style={{width: 150}}>
                      <Option value="1">最后一天</Option>
                    </Select>
                    <span>]</span>
                  </Space>
                  <Space>
                    <Radio style={radioStyle} value={2}>
                      静态指标
                    </Radio>
                    <span>$</span>
                    <span>0.00</span>
                  </Space>
                </Space>
              </Radio.Group>
            </Space>
          </Space>
        </Space>

      </StepCard>
      <StepCard title="广告集的预算将根据该算法增加。">
        <div>冲浪极限： <InputNumber
          defaultValue={100}
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
        /></div>
        <div>
          <Row justify="center">
            <Col span={3}></Col>
            <Col span={2}>每日预算低</Col>
            <Col span={2}>每日预算中</Col>
            <Col span={2}>每日预算高</Col>
          </Row>
          <Row justify="center">
            <Col span={3}><p style={{lineHeight: '32px', backgroundColor: '#c4dfe2'}}>最佳广告集效果</p></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
          </Row>
          <Row justify="center">
            <Col span={3}><p style={{lineHeight: '32px', backgroundColor: '#d3e5e7'}}>良好的广告集效果</p></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
          </Row>
          <Row justify="center">
            <Col span={3}><p style={{lineHeight: '32px', backgroundColor: '#e7eff0'}}>中级广告集效果</p></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
          </Row>
          <Row justify="center">
            <Col span={3}><p style={{lineHeight: '32px', backgroundColor: '#f9f1f4'}}>广告集效果最差</p></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
            <Col span={2}><InputNumber
              defaultValue={100}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            /></Col>
          </Row>
        </div>

      </StepCard>
      <StepCard
        title="预算将在当地时间00:00 (亚洲/上海) 自动重置"
      >
        <Space><label>重置时间表： </label><TimePicker defaultValue={moment('00:00', format)} format={format} /></Space>
      </StepCard>
    </div>
  );
};

export default Setting;
