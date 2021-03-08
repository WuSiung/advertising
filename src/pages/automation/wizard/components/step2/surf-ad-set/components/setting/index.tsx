import React, {FC, useState} from 'react';
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
import {TSurfadSetLevelAction} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";

const {Option} = Select;

interface ISetting {
  settingData?: TSurfadSetLevelAction;
  onChange: (payload: any) => void;
};

const Setting: FC<ISetting> = (props) => {
  const { settingData } = props;
  const [ target, setTarget ] = useState(2)
  console.log('setting', JSON.stringify(settingData));
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

  const labels: string[] = [
    '最佳广告集效果',
    '良好的广告集效果',
    '中级广告集效果',
    '广告集效果最差'
  ];

  const handleListChange = (i: number, j: number, value: number) => {
    const list = settingData.AdvEffectLv?.concat([]);
    if (list) {
      list[i][j] = value;
    }
    props.onChange({
      AdvEffectLv: list
    })
  }
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
              <Select value="0" style={{width: 100}}>
                <Option value="0">点击</Option>
                <Option value="1">出站点击</Option>
              </Select>
              <span>{'>='}</span>
              <InputNumber style={{width: 100}} value={settingData.InsertCount} onChange={value => props.onChange({InsertCount: value})}/>
            </Space>
            <Space>
              <span>花费</span>
              <span>{'<='}</span>
              <Radio.Group value={target}>
                <Space direction="vertical" size="small">
                  <Space size="small">
                    <Radio style={radioStyle} value={1} disabled={true}>
                      动态指标
                    </Radio>
                    <span>$</span>
                    <span>0.00</span>
                    <span>[</span>
                    <InputNumber style={{width: 100}} disabled={true}/>
                    <span>$ 0.00 </span>
                    <Select style={{width: 150}} disabled={true}>
                      <Option value="1">每次点击的费用（购买）</Option>
                    </Select>
                    <Select style={{width: 150}} disabled={true}>
                      <Option value="1">最后一天</Option>
                    </Select>
                    <span>]</span>
                  </Space>
                  <Space>
                    <Radio style={radioStyle} value={2}>
                      静态指标 <span>$</span>
                    </Radio>
                    <InputNumber prefix="$" style={{width: 100}} value={settingData.CostValue} onChange={value => props.onChange({CostValue: value})} />
                  </Space>
                </Space>
              </Radio.Group>
            </Space>
          </Space>
        </Space>

      </StepCard>
      <StepCard title="广告集的预算将根据该算法增加。">
        <div>冲浪极限： <InputNumber value={settingData.LimitPerCheck} onChange={value => props.onChange({LimitPerCheck: value})} /></div>
        <div>
          <Row justify="center">
            <Col span={3}></Col>
            <Col span={2}>每日预算低</Col>
            <Col span={2}>每日预算中</Col>
            <Col span={2}>每日预算高</Col>
          </Row>
          {
            settingData.AdvEffectLv && settingData.AdvEffectLv.map((list, i) => {
              return <Row justify="center" key={i}>
                <Col span={3}><p style={{lineHeight: '32px', backgroundColor: '#c4dfe2'}}>{labels[i]}</p></Col>
                {
                  list.map((d, j) => {
                    return <Col span={2} key={j}><InputNumber
                        value={d[j]}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        onChange={value => handleListChange(i, j, value)}
                      /></Col>
                  })
                }
              </Row>
            })
          }
        </div>

      </StepCard>
      <StepCard
        title="预算将在当地时间00:00 (亚洲/上海) 自动重置"
      >
        <Space><label>重置时间表： </label><TimePicker value={settingData.ResetBudgetTime} format={format} onChange={value => props.onChange({ResetBudgetTime: value})} /></Space>
      </StepCard>
    </div>
  );
};

export default Setting;
