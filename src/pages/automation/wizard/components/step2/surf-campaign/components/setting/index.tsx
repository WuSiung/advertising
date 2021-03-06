import React, {FC, useState} from 'react';
import {Card, Col, Input, Row, Slider, Space, Switch, TimePicker} from 'antd';
import StepCard from "@/pages/automation/wizard/components/step-card";
import SvgLine from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-line";
import SvgGrid from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-grid";
import SvgChartCampaign from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-chart-campaign";

import TacticCardHead from "@/pages/automation/wizard/components/tactic-card-head";
// import surf from '../../../../../../assets/automation/surf.svg';
import surf from '@/assets/automation/surf.svg';
import moment from 'moment';
import SettingHeadCard from "@/pages/automation/wizard/components/setting-head-card";

interface ISetting {

}

const Setting: FC<ISetting> = (props) => {
  const format = 'HH:mm';
  const [values, setValues] = useState([26, 37, 48]);
  const marks = {
    0: {
      label: <strong>00:00<br />初始点</strong>,
    },
    [values[0]]: '第一次检查',
    [values[1]]: '第二次检查',
    [values[2]]: '第三次检查',
    100: {
      style: {
        // color: '#f50',
      },
      label: <strong>00:00<br />结束日</strong>,
    }
  };

  const handleChange = (value: any) => {
    console.log(value);
    setValues(value);
  }

  const campaignTitle = (
    <Space>
      <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      <span>仔细检查广告支出回报率（应用安装）是否低于增加前的预算-将预算降低20%</span>
    </Space>
  )
  const tictacTitle2 = (
    <Space direction="vertical">
      <span>达到支出门槛后，广告系列预算将根据以下设置增加。</span>
      <Space>
        <span>如果广告支出回报率（应用安装）</span>
        <SvgLine></SvgLine>
        <Space direction="vertical" size="large">
          <Space><SvgGrid /><span>在。。。之间1.00x - 1.90x 广告系列预算将增加 30%.</span></Space>
          <Space><SvgGrid /><span>在。。。之间1.00x - 1.90x 广告系列预算将增加 30%.</span></Space>
          <Space><SvgGrid /><span>在。。。之间1.00x - 1.90x 广告系列预算将增加 30%.</span></Space>
        </Space>
      </Space>
    </Space>
  )

  return (
    <div>
      <SettingHeadCard
        size="small"
        icon={surf}
        pictrue={<SvgChartCampaign />}
        title="SURF CBO战役等级"
        subTitle="奖励强者"
        remark="SURF识别出强劲的绩效趋势，并通过将可用的广告系列预算增加到原始限制之外，自动利用积极的势头。预算将在选定的本地时间自动恢复为原始预算。"
      />

      <Card type="inner">
        <Slider range marks={marks} defaultValue={[26, 37, 48]} onChange={handleChange} />
      </Card>
      <StepCard
        title={campaignTitle}
      >
        <label><Input placeholder="请输入预算降低百分比" style={{width: '120px'}} /> %</label>
      </StepCard>
      <StepCard
        title={tictacTitle2}
      >
      <Space>
        <span>如果广告支出回报率（应用安装）</span>
        <SvgLine></SvgLine>
        <Space direction="vertical" size="large">
          <Space><SvgGrid /><span>在。。。之间1.00x - 1.90x 广告系列预算将增加 30%.</span></Space>
          <Space><SvgGrid /><span>在。。。之间1.00x - 1.90x 广告系列预算将增加 30%.</span></Space>
          <Space><SvgGrid /><span>在。。。之间1.00x - 1.90x 广告系列预算将增加 30%.</span></Space>
        </Space>
      </Space>
      </StepCard>
      <Card>
        <Space direction="vertical">
          <Space><label>每张支票的冲浪限制</label><Input style={{width: 120}} prefix="￥" /></Space>
          <Space><label>每天的冲浪限制</label><Input style={{width: 120}} prefix="￥" /></Space>
        </Space>
      </Card>
      <StepCard
        title="预算将在当地时间00:00 (亚洲/上海) 自动重置"
      >
        <Space><label>重置时间表： </label><TimePicker defaultValue={moment('00:00', format)} format={format} /></Space>
      </StepCard>
    </div>
  )
}

export default Setting;
