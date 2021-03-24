import React, {FC, useState} from 'react';
import SettingHeadCard from "@/pages/automation/wizard/components/setting-head-card";
import SvgChartAds
  from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-chart-ads";
import StepCard from "@/pages/automation/wizard/components/step-card";
import {Space, Select, Radio, Row, Col, InputNumber, TimePicker, Tag} from "antd";
import SvgSurf from "@/pages/automation/wizard/components/svg-surf";
import SvgLine2 from "@/pages/automation/wizard/components/svg-line2";
import {TSurfadSetLevelAction} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";
import Prompt from "@/pages/automation/components/tooltip";

const {Option} = Select;

interface ISetting {
  options: Record<string, string>;
  ActionInfo?: TSurfadSetLevelAction;
  onChange: (payload: any) => void;
};

const Setting: FC<ISetting> = (props) => {
  const { ActionInfo } = props;
  const [ target ] = useState(2);
  const format = 'HH:mm';
  const title1 = (
    <Space direction="vertical">
      <span>
        冲浪策略触发条件和增加的广告集支出&nbsp;
        <Prompt
          placement="right"
          content="设置能触发冲浪策略的最低条件，和临时增加的最高预算，去利用今天短时间内的良好势头"
        />
      </span>
      <span>如果广告集<strong>达到{ActionInfo?.InsertCount}次{ActionInfo?.Target ? props.options[ActionInfo?.Target] : ''}</strong>，并且当天增加的<strong>支出少于${ActionInfo?.CostValue}</strong>。</span>
    </Space>
  );

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  // const labels: string[] = [
  //   '最佳广告集效果',
  //   '良好的广告集效果',
  //   '中级广告集效果',
  //   '最差广告集效果'
  // ];

  const labels = [
    {
      title: '最佳广告集效果',
      content: '最近7天和最近3天的平均移动应用安装回报率都高于平均水平',
    },
    {
      title: '良好的广告集效果',
      content: '最近7天的移动应用安装回报率低于平局水平，并且最近3天的移动应用安装回报率高于平均水平',
    },
    {
      title: '中级广告集效果',
      content: '最近7天的移动应用安装回报率高于平局水平，并且最近3天的移动应用安装回报率高于平均水平',
    },
    {
      title: '最差广告集效果',
      content: '最近7天和最近3天的平均移动应用安装回报率都低于平均水平',
    }
  ]

  const handleListChange = (i: number, j: number, value: number) => {
    const list = ActionInfo?.AdvEffectLv?.concat([]);
    if (list) {
      list[i][j] = value;
    }
    props.onChange({
      AdvEffectLv: list
    })
  }

  const optionList: {value: string, title: string}[] = [];

  Object.entries(props.options).forEach(o => {
    optionList.push({value: o[0], title: o[1]});
  });

  return (
    <div>
      <SettingHeadCard
        size="small"
        icon={<SvgSurf fill="#7655c9" />}
        pictrue={<SvgChartAds/>}
        title="冲浪广告集层级"
        subTitle="给效果好的广告集增加预算"
        remark="冲浪策略能识别出强劲的绩效趋势，并通过将可用的广告集预算增加到原始限制之外，自动利用积极的势头。预算将在设定的本地时间自动恢复为原始预算。"
      />

      <StepCard title={title1}>
        <Space size="small">
          <SvgLine2 />
          <Space direction="vertical" size="large">
            <Space>
              <Select value={ActionInfo?.Target} style={{width: 150}} onChange={value => props.onChange({Target: value, TargetName: props.options[value]})}>
                {
                  optionList.map(o => {
                    return <Option key={o.value} value={o.value}>{o.title}</Option>
                  })
                }

              </Select>
              <Tag color="rgb(208 208 208)">&nbsp; &gt;= &nbsp;</Tag>
              <InputNumber style={{width: 100}} value={ActionInfo?.InsertCount} onChange={value => props.onChange({InsertCount: value})}/>
            </Space>
            <Space>
              <span>花费</span>
              <Tag color="rgb(208 208 208)">&nbsp; &lt;= &nbsp;</Tag>
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
                      <Option value="1">移动应用安装数</Option>
                    </Select>
                    <Select style={{width: 150}} disabled={true}>
                      <Option value="1">最后一天</Option>
                    </Select>
                    <span>]</span>
                  </Space>
                  <Space>
                    <Radio style={radioStyle} value={2}>
                      静态指标&nbsp;
                      <Prompt placement="bottom" content="根据您的喜好，可以设置为固定的值" />&nbsp;
                      <span>$</span>
                    </Radio>
                    <InputNumber prefix="$" style={{width: 100}} value={ActionInfo?.CostValue} onChange={value => props.onChange({CostValue: value})} />
                  </Space>
                </Space>
              </Radio.Group>
            </Space>
          </Space>
        </Space>

      </StepCard>
      <StepCard
        title={
          <p>
            广告集的预算将根据该算法增加。
            <Prompt placement="right"
                    content={<p>一旦冲浪策略因匹配上述条件而触发，预算将会根据次算法相应地增加。<br/>
                      为了最大化广告效果和成本效率，这个算法考虑了按广告效果等级，和日预算中位数。<br/>
                      预算中位数较高的广告集将会比低预算中位数的广告集增加得少一些，<br/>
                      效果好的广告集将会看到一个较大的预算增加，反之亦然。</p>}
            />
          </p>
        }>
        <div>冲浪极限： <InputNumber value={ActionInfo?.LimitPerCheck} onChange={value => props.onChange({LimitPerCheck: value})} /></div>
        <div>
          <Row justify="center">
            <Col span={3}></Col>
            <Col span={2}>每日预算低</Col>
            <Col span={2}>每日预算中</Col>
            <Col span={2}>每日预算高</Col>
          </Row>
          {
            ActionInfo?.AdvEffectLv && ActionInfo?.AdvEffectLv.map((list, i) => {
              return <Row justify="center" key={i}>
                <Col span={3} style={{minWidth: 150}}>
                    <Row justify="space-between" style={{lineHeight: '32px', backgroundColor: '#c4dfe2'}}>
                      <span>{labels[i].title}&nbsp;</span>
                      <span>
                        <Prompt placement="right" content={<p>{labels[i].content}</p>} />
                    </span>
                    </Row>
                </Col>
                {
                  list.map((d, j) => {
                    return <Col span={2} key={j}><InputNumber
                        style={{width: '100%'}}
                        value={d}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value ? parseInt(value.replace('%', ''), 10) : 0}
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
        title={
          <p>
            <strong>预算</strong>
            将在当地时间{ActionInfo?.ResetBudgetTime?.format(format)} (亚洲/上海) 自动
            <strong>重置</strong>
            &nbsp;<Prompt content={'在设置的时间点，所有受次策略影响的广告集，都将恢复到它们的初始预算'} />
          </p>
        }
      >
        <Space><label>重置时间表： </label><TimePicker value={ActionInfo?.ResetBudgetTime} format={format} onChange={value => props.onChange({ResetBudgetTime: value})} /></Space>
      </StepCard>
    </div>
  );
};

export default Setting;
