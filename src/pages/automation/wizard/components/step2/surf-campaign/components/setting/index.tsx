import React, {FC, useState} from 'react';
import {Card, InputNumber, Select, Slider, Space, Switch, TimePicker} from 'antd';
import StepCard from "@/pages/automation/wizard/components/step-card";
import SvgLine from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-line";
import SvgGrid from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-grid";
import SvgChartCampaign
  from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-chart-campaign";
import surf from '@/assets/automation/surf.svg';
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

  // const [checkRoas, setCheckRoas] = useState(ActionInfo?.CheckPoint.length === 6);
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

  ActionInfo?.CheckPoint.forEach((p, idx) => {
    let tag = `第${idx + 1}次检查`
    // if (ActionInfo.CheckPoint.length === 5 && idx < 4 && idx % 2 !== 0) {
    //   tag = '二次检查'
    // }
    if (ActionInfo.CheckPoint.length === 6) {
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
    // todo: 如果有二次检查，二次检查的检查点随动
    // todo: 确定当前移动的点是不是第一次检查的点，看数组长度，和点在数组中的位置
    const values = [...value];
    if (ActionInfo?.CheckPoint && ActionInfo?.CheckPoint.length === 6) {
      let idx = -1;
      let direction = 0;
      for (let i = 0; i < value.length; i += 1) {
        if (value[i] !== ActionInfo?.CheckPoint[i]) {
          idx = i;
          if (value[i] > ActionInfo?.CheckPoint[i]) {
            direction = 1;
          }

          if (value[i] < ActionInfo?.CheckPoint[i]) {
            direction = -1
          }
          break;
        }
      }

      if ([0, 2, 4].indexOf(idx) > -1) {
        let per1 = 0; // 移动点左边的二次检查点当前的占比
        let per2 = 0; // 移动点右边的二次检查点的当前占比
        const delta = 1;
        const deltaPer = 0.02;
        if (idx === 0) {
          per2 = (ActionInfo.CheckPoint[idx + 1] - ActionInfo.CheckPoint[idx]) / (ActionInfo.CheckPoint[idx + 2] - ActionInfo.CheckPoint[idx]);

          if (per2 > 0.8) {
            per2 -= deltaPer;
          }
          if (per2 < 0.5) {
            per2 += deltaPer;
          }
          if (per2 > 0) {
            if (direction === -1) {

              // let v = Math.floor(value[idx] + (value[idx + 2] - value[idx]) * per2)
              // if (v >= value[idx + 2]) {
              //   v = value[idx + 2] - delta
              // }
              values[idx + 1] = Math.max(Math.floor(value[idx] + (value[idx + 2] - value[idx]) * per2), value[idx] + delta);
            }
            if (direction === 1) {
              // if (per2 < 0.2) {
              //   per2 += deltaPer;
              // }
              values[idx + 1] = Math.min(Math.round(value[idx] + (value[idx + 2] - value[idx]) * per2), value[idx + 2] - delta);
            }
          }
        }

        if (idx === 2) {
          per1 = (ActionInfo.CheckPoint[idx - 1] - ActionInfo.CheckPoint[idx - 2]) / (ActionInfo.CheckPoint[idx] - ActionInfo.CheckPoint[idx - 2]);
          if (per1 > 0.8) {
            per1 -= deltaPer;
          }
          if (per1 < 0.5) {
            per1 += deltaPer;
          }

          if (per1 > 0) {
            if (direction === -1) {
              // if (per1 >= 0.8) {
              //   per1 -= deltaPer;
              // }
              values[idx - 1] = Math.max(Math.floor(value[idx - 2] + (value[idx] - value[idx - 2]) * per1), value[idx - 2] + delta);
            }
            if (direction === 1) {
              // if (per1 < 0.5) {
              //   per1 += deltaPer;
              // }
              // let v = Math.round(value[idx - 2] + (value[idx] - value[idx - 2]) * per1);
              // if (v <= value[idx - 2]) {
              //   v = value[idx - 2] + delta;
              // }
              values[idx - 1] = Math.min(Math.round(value[idx - 2] + (value[idx] - value[idx - 2]) * per1), value[idx] - delta);
            }
          }

          per2 = (ActionInfo.CheckPoint[idx + 1] - ActionInfo.CheckPoint[idx]) / (ActionInfo.CheckPoint[idx + 2] - ActionInfo.CheckPoint[idx]);

          if (per2 > 0.8) {
            per2 -= deltaPer;
          }
          if (per2 < 0.5) {
            per2 += deltaPer
          }
          if (per2 > 0) {
            if (direction === -1) {
              // if (per2 > 0.8) {
              //   per2 -= deltaPer;
              // }
              // if (per2 < 0.5) {
              //   per2 += deltaPer
              // }
              values[idx + 1] = Math.max(Math.floor(value[idx] + (value[idx + 2] - value[idx]) * per2), value[idx] + delta);
            }
            if (direction === 1) {
              // if (per2 < 0.2) {
              //   per2 += deltaPer;
              // }
              values[idx + 1] = Math.min(Math.round(value[idx] + (value[idx + 2] - value[idx]) * per2), value[idx + 2] - delta);
            }
          }
        }

        if (idx === 4) {
          per1 = (ActionInfo.CheckPoint[idx - 1] - ActionInfo.CheckPoint[idx - 2]) / (ActionInfo.CheckPoint[idx] - ActionInfo.CheckPoint[idx - 2]);
          if (per1 > 0.8) {
            per1 -= deltaPer;
          }
          if (per1 < 0.5) {
            per1 += deltaPer;
          }
          if (per1 > 0) {
            if (direction === -1) {
              // if (per1 >= 0.8) {
              //   per1 -= deltaPer;
              // }
              values[idx - 1] = Math.max(Math.floor(value[idx - 2] + (value[idx] - value[idx - 2]) * per1), value[idx - 2] + delta);
            }
            if (direction === 1) {
              // if (per1 < 0.5) {
              //   per1 += deltaPer;
              // }
              // let v = Math.round(value[idx - 2] + (value[idx] - value[idx - 2]) * per1);
              // if (v <= value[idx - 2]) {
              //   v = value[idx - 2] + delta;
              // }
              values[idx - 1] = Math.round(value[idx - 2] + (value[idx] - value[idx - 2]) * per1);
            }
          }

          per2 = (ActionInfo.CheckPoint[idx + 1] - ActionInfo.CheckPoint[idx]) / (300 - ActionInfo.CheckPoint[idx]);
          if (per2 >= 0.8) {
            per2 -= deltaPer;
          }
          if (per2 < 0.5) {
            per2 += deltaPer
          }
          if (per2 > 0) {
            if (direction === -1) {
              // if (per2 >= 0.8) {
              //   per2 -= deltaPer;
              // }
              // if (per2 < 0.5) {
              //   per2 += deltaPer
              // }
              // let v = Math.round(value[idx] + (300 - value[idx]) * per2);
              // if (v >= 300) {
              //   v = 300 - delta;
              // }
              values[idx + 1] = Math.max(Math.round(value[idx] + (300 - value[idx]) * per2), value[idx] + delta);
            }
            if (direction === 1) {
              if (per2 < 0.2) {
                per2 += deltaPer;
              }
              values[idx + 1] = Math.round(value[idx] + (300 - value[idx]) * per2);
            }
          }
        }
      }

      // if ([0, 2, 4].indexOf(idx) > -1) {
      //   let per1 = 0; // 移动点左边的二次检查点当前的占比
      //   let per2 = 0; // 移动点右边的二次检查点的当前占比
      //   const delta = 1;
      //   if (idx === 0) {
      //     per2 = (ActionInfo.CheckPoint[idx + 1] - ActionInfo.CheckPoint[idx]) / (ActionInfo.CheckPoint[idx + 2] - ActionInfo.CheckPoint[idx]);
      //     if (per2 > 0) {
      //       if (direction === -1) {
      //         let v = Math.floor(value[idx] + (value[idx + 2] - value[idx]) * per2)
      //         if (v >= value[idx + 2]) {
      //           v = value[idx + 2] - delta
      //         }
      //         values[idx + 1] = v;
      //       }
      //       if (direction === 1) {
      //         values[idx + 1] = Math.min(Math.round(value[idx] + (value[idx + 2] - value[idx]) * per2), value[idx + 2] - delta);
      //       }
      //     }
      //   }
      //
      //   if (idx === 2) {
      //     per1 = (ActionInfo.CheckPoint[idx - 1] - ActionInfo.CheckPoint[idx - 2]) / (ActionInfo.CheckPoint[idx] - ActionInfo.CheckPoint[idx - 2]);
      //     if (per1 > 0) {
      //       if (direction === -1) {
      //         values[idx - 1] = Math.max(Math.floor(value[idx - 2] + (value[idx] - value[idx - 2]) * per1), value[idx - 2] + delta);
      //       }
      //       if (direction === 1) {
      //         let v = Math.round(value[idx - 2] + (value[idx] - value[idx - 2]) * per1);
      //         if (v <= value[idx - 2]) {
      //           v = value[idx - 2] + delta;
      //         }
      //         values[idx - 1] = v;
      //       }
      //     }
      //
      //     per2 = (ActionInfo.CheckPoint[idx + 1] - ActionInfo.CheckPoint[idx]) / (ActionInfo.CheckPoint[idx + 2] - ActionInfo.CheckPoint[idx]);
      //     if (per2 > 0) {
      //       if (direction === -1) {
      //         let v = Math.floor(value[idx] + (value[idx + 2] - value[idx]) * per2);
      //         if (v >= value[idx + 2]) {
      //           v = value[idx + 2] -delta;
      //         }
      //         values[idx + 1] = v;
      //       }
      //       if (direction === 1) {
      //         values[idx + 1] = Math.min(Math.round(value[idx] + (value[idx + 2] - value[idx]) * per2), value[idx + 2] - delta);
      //       }
      //     }
      //   }
      //
      //   if (idx === 4) {
      //     per1 = (ActionInfo.CheckPoint[idx - 1] - ActionInfo.CheckPoint[idx - 2]) / (ActionInfo.CheckPoint[idx] - ActionInfo.CheckPoint[idx - 2]);
      //     if (per1 > 0) {
      //       if (direction === -1) {
      //         values[idx - 1] = Math.max(Math.floor(value[idx - 2] + (value[idx] - value[idx - 2]) * per1), value[idx - 2] + delta);
      //       }
      //       if (direction === 1) {
      //         let v = Math.round(value[idx - 2] + (value[idx] - value[idx - 2]) * per1);
      //         if (v <= value[idx - 2]) {
      //           v = value[idx - 2] + delta;
      //         }
      //         values[idx - 1] = v;
      //       }
      //     }
      //
      //     per2 = (ActionInfo.CheckPoint[idx + 1] - ActionInfo.CheckPoint[idx]) / (300 - ActionInfo.CheckPoint[idx]);
      //     if (per2 > 0) {
      //       if (direction === -1) {
      //         let v = Math.floor(value[idx] + (300 - value[idx]) * per2);
      //         if (v >= 300) {
      //           v = 300 - delta;
      //         }
      //         values[idx + 1] = v;
      //       }
      //       if (direction === 1) {
      //         values[idx + 1] = Math.min(Math.round(value[idx] + (300 - value[idx]) * per2), 300 -delta);
      //       }
      //     }
      //   }
      // }
    }

    props.onChange({
      CheckPoint: values
    })
  }

  const handleSwitchChange = ((value: boolean) => {
    let list: number[] = [];
    if (value) {
      if (ActionInfo?.CheckPoint.length === 3) {
        // 增加2个检查点
        list = [
          ActionInfo.CheckPoint[0],
          Math.round((ActionInfo.CheckPoint[0] + ActionInfo.CheckPoint[1]) / 2),
          ActionInfo.CheckPoint[1],
          Math.round((ActionInfo?.CheckPoint[1] + ActionInfo.CheckPoint[2]) / 2),
          ActionInfo.CheckPoint[2],
          Math.round((ActionInfo?.CheckPoint[2] + 300) / 2)
          ];
      }
    } else if (ActionInfo?.CheckPoint.length === 6) {
        // 去掉2个检查点
        list = [
          ActionInfo.CheckPoint[0],
          ActionInfo.CheckPoint[2],
          ActionInfo.CheckPoint[4]
        ];
    }

    props.onChange({
      FullCheck: value,
      CheckPoint: list
    })

    // setCheckRoas(value);
    // handleChange(list);
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
      <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ActionInfo?.FullCheck} onChange={handleSwitchChange}/>
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
        <Slider max={300} range marks={marks} value={ActionInfo?.CheckPoint as [number, number]} onChange={handleChange}
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
          parser={value => value ? parseInt(value.replace('%', ''), 10) : 0}
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
                    parser={value => value ? parseInt(value.replace('%', ''), 10) : 0}
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
