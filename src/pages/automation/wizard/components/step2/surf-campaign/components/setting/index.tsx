import React, {FC, useState} from 'react';
import {Card, Col, Input, InputNumber, Row, Select, Slider, Space, Switch, TimePicker} from 'antd';
import StepCard from "@/pages/automation/wizard/components/step-card";
import SvgLine from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-line";
import SvgGrid from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-grid";
import SvgChartCampaign
  from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-chart-campaign";

import TacticCardHead from "@/pages/automation/wizard/components/tactic-card-head";
// import surf from '../../../../../../assets/automation/surf.svg';
import surf from '@/assets/automation/surf.svg';
import moment from 'moment';
import SettingHeadCard from "@/pages/automation/wizard/components/setting-head-card";
import {TSurfCampaignLevelAction} from "@/pages/automation/wizard/components/step2/surf-campaign/data";

const { Option } = Select;
interface ISetting {
  ActionInfo?: TSurfCampaignLevelAction;
  onChange: (payload: any) => void;
}

const Setting: FC<ISetting> = (props) => {
  const {ActionInfo} = props;
  const format = 'HH:mm';
  // const [values, setValues] = useState([26, 37, 48]);
  // const marks = {
  //   0: {
  //     label: <strong>00:00<br />初始点</strong>,
  //   },
  //   [values[0]]: '第一次检查',
  //   [values[1]]: '第二次检查',
  //   [values[2]]: '第三次检查',
  //   100: {
  //     style: {
  //       // color: '#f50',
  //     },
  //     label: <strong>00:00<br />结束日</strong>,
  //   }
  // };

  // const handleChange = (value: any) => {
  //   console.log(value);
  //   setValues(value);
  // }

  // const [values, setValues] = useState([26, 37, 48]);
  const [checkRoas, setCheckRoas] = useState(ActionInfo?.CheckPoints.length === 6);
  const marks = {
    0: {
      label: <strong>00:00<br/>初始点</strong>,
    },
    300: {
      style: {
        // color: '#f50',
      },
      label: <strong>00:00<br/>结束点</strong>,
    }
  };

  ActionInfo?.CheckPoints.forEach((p, idx) => {
    let tag = `第${idx + 1}次检查`
    // if (ActionInfo.CheckPoints.length === 5 && idx < 4 && idx % 2 !== 0) {
    //   tag = '二次检查'
    // }
    if (ActionInfo.CheckPoints.length === 6) {
      if (idx % 2 !== 0) {
        if (idx === 1) {
          tag = '二次检查1';
        } else if (idx === 3) {
          tag = '二次检查2';
        } else {
          tag = '二次检查3';
        }
      } else {
        tag = `第${Math.round(idx / 2) + 1}次检查`
      }
    }

    marks[p] = tag;
  });


  const handleChange = (value: number[]) => {
    // todo: 2个点重合不更新
    // for (let i = 0; i < value.length - 1; i++) {
    //   for (let j = i + 1; j < value.length; j++) {
    //     if (value[i] === value[j]) {
    //       return;
    //     }
    //   }
    // }
    // // todo: 如果有1个以上的值跟原始值对不上，就不更新了
    // if (ActionInfo) {
    //   let diffCount = 0;
    //   value.forEach((v, i) => {
    //     if (v !== ActionInfo.CheckPoints[i]) {
    //       diffCount += 1;
    //     }
    //   });
    //   if (diffCount > 1) {
    //     return;
    //   }
    // }

    props.onChange({
      CheckPoints: value
    })
  }

  const handleSwitchChange = (value => {
    const list: number[] = [];
    if (value) {
      if (ActionInfo?.CheckPoints.length === 3) {
        // todo: 增加2个检查点
        list[0] = ActionInfo.CheckPoints[0];
        list[1] = Math.round((ActionInfo.CheckPoints[0] + ActionInfo.CheckPoints[1]) / 2);
        list[2] = ActionInfo.CheckPoints[1];
        list[3] = Math.round((ActionInfo?.CheckPoints[1] + ActionInfo.CheckPoints[2]) / 2);
        list[4] = ActionInfo.CheckPoints[2];
        list[5] = Math.round((ActionInfo?.CheckPoints[2] + 300) / 2);
      }
    } else {
      if (ActionInfo?.CheckPoints.length === 6) {
        // todo: 去掉2个检查点
        list[0] = ActionInfo.CheckPoints[0];
        list[1] = ActionInfo.CheckPoints[2];
        list[2] = ActionInfo.CheckPoints[4];
      }
    }

    setCheckRoas(value);
    handleChange(list);
  });

  const handleListChange = (i: number, key: string, value: number) => {
    const list = ActionInfo?.RoasWebIncres?.concat([]);
    if (list) {
      list[i][key] = value;
    }
    props.onChange({
      RoasWebIncres: list
    });
  }


  const campaignTitle = (
    <Space>
      <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={checkRoas} onChange={handleSwitchChange}/>
      <span>仔细检查广告支出回报率（应用安装）是否低于增加前的预算-将预算降低{ActionInfo?.DoubleCheckRoasWeb}%</span>
    </Space>
  )
  const tictacTitle2 = (
    <Space direction="vertical">
      <span>达到支出门槛后，广告系列预算将根据以下设置增加。</span>
      <Space>
        <span>如果广告支出回报率（应用安装）</span>
        <SvgLine></SvgLine>
        <Space direction="vertical" size="large">
          {
            ActionInfo?.RoasWebIncres.map((rwi, idx) =>
              <Space key={idx}><SvgGrid/><span>在。。。之间 {rwi.MinX}x - {idx === 2 ? '无限' : rwi.MaxX}x 广告系列预算将增加 {rwi.Increase}%.</span></Space>
            )
          }
        </Space>
      </Space>
    </Space>
  )

  return (
    <div>
      <SettingHeadCard
        size="small"
        icon={surf}
        pictrue={<SvgChartCampaign/>}
        title="SURF CBO战役等级"
        subTitle="奖励强者"
        remark="SURF识别出强劲的绩效趋势，并通过将可用的广告系列预算增加到原始限制之外，自动利用积极的势头。预算将在选定的本地时间自动恢复为原始预算。"
      />

      <Card type="inner">
        <Slider max={300} range marks={marks} value={ActionInfo?.CheckPoints} onChange={handleChange}
                tooltipVisible={true} />
      </Card>
      <StepCard
        title={campaignTitle}
      >
        <label><InputNumber
          value={ActionInfo?.DoubleCheckRoasWeb}
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
          onChange={value => props.onChange({DoubleCheckRoasWeb: value})}
        /></label>
      </StepCard>
      <StepCard
        title={tictacTitle2}
      >
        <Space>
          <Select style={{width: 240}} value="roas">
            <Option value="roas">广告支出回报率（应用安装）</Option>
          </Select>
          <SvgLine></SvgLine>
          <Space direction="vertical" size="large">
            {
              ActionInfo?.RoasWebIncres.map((rwi, idx) =>
                  <Space key={idx}>
                    <SvgGrid/>
                    <span>
                      在。。。之间 <InputNumber step={0.01} value={rwi.MinX} onChange={value => handleListChange(idx, 'MinX', value)} /> x - {idx === 2 ? '无限': <InputNumber step={0.01} value={rwi.MaxX} onChange={value => handleListChange(idx, 'MaxX', value)} />} x 广告系列预算将增加 <InputNumber
                    value={rwi.Increase}
                    min={0}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={value => handleListChange(idx, 'Increase', value)}
                  /></span>
                </Space>)
            }
          </Space>
        </Space>
      </StepCard>
      <Card>
        <Space direction="vertical">
          <Space><label>每张支票的冲浪限制</label><InputNumber prefix="$" style={{width: 100}} value={ActionInfo?.LimitPerCheck}
                                                      onChange={value => props.onChange({LimitPerCheck: value})}/></Space>
          <Space><label>每天的冲浪限制</label><InputNumber prefix="$" style={{width: 100}} value={ActionInfo?.LimitPerDay}
                                                    onChange={value => props.onChange({LimitPerDay: value})}/></Space>
        </Space>
      </Card>
      <StepCard
        title={`预算将在当地时间${ActionInfo?.ResetBudgetTime.format(format)} (亚洲/上海) 自动重置`}
      >
        <Space><label>重置时间表： </label><TimePicker value={ActionInfo?.ResetBudgetTime} format={format}
                                                 onChange={value => props.onChange({ResetBudgetTime: value})}/></Space>
      </StepCard>
    </div>
  )
}

export default Setting;
