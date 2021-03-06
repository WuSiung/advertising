import {
  Tooltip,
  Select,
  Space,
  Tag,
  InputNumber,
  Radio
} from 'antd'
import React, {FC} from 'react'
import styles from './index.less';
import {TActionInfoReviveAdvSet} from "@/pages/automation/wizard/components/step2/revive/advset/data";
import StepCard from "@/pages/automation/wizard/components/step-card";
import Prompt from "@/pages/automation/components/tooltip";

export interface StaticsItemValueType {
  staticMetricValue?: number;
  value?: number;
  lastDays?: string | number;
  mertricType?: number;
}


interface StaticsItemProps {
  onChange?: (value: any) => void;
  initValues: StaticsItemValueType | undefined,
}

const StaticsItem: FC<StaticsItemProps> = (props) => {
  // const [metricType, setMetricType] = useState<number|undefined>(props.initValues?.mertricType);
  const {initValues} = props;
  return <Radio.Group value={initValues?.mertricType} onChange={(event) => {
    const value = event.target.value;
    props.onChange && props.onChange({...initValues, mertricType: value});
    return value;
  }}>
    <div style={{fontSize: "14px"}}>
      <Space>
          <Radio value={1}>
            静态指标
            &nbsp;
            <Prompt content="可以根据您的喜好设置为1个固定的值" />
          </Radio>
        &nbsp;
        <InputNumber value={props.initValues?.staticMetricValue} onChange={(value) => {
          const obj = {staticMetricValue: value as number | undefined};
          props.onChange && props.onChange({...initValues, ...obj});
        }}/> 元
      </Space>
    </div>
    <div style={{fontSize: "14px", marginTop: "8px"}}>
      <Space>
          <Radio disabled={true} value={2}>
            动态指标
            &nbsp;
            <Prompt content="可以根据所选指标随时间变化进行设置" />
          </Radio>
        $ 0.00
        [

        <InputNumber disabled={true} value={props.initValues?.value} onChange={(value) => {
          const obj = {value: value as number | undefined};
          props?.onChange && props.onChange({...initValues, ...obj});
        }}/> 倍
        &nbsp;
        &nbsp;
        $ 0.00
        &nbsp;
        &nbsp;
        每次安装费用
        &nbsp;
        &nbsp;
        <Select disabled={true} value={props.initValues?.lastDays} onChange={value => {
          const obj = {lastDays: value as number | undefined};
          props.onChange && props.onChange({...initValues, ...obj});
        }} style={{width: 120}}>
          <Select.Option value={1}>
            最近1天
          </Select.Option>
          <Select.Option value={7}>
            最近7天
          </Select.Option>
          <Select.Option value={14}>
            最近14天
          </Select.Option>
          <Select.Option value={28}>
            最近28天
          </Select.Option>
        </Select>
        ]
      </Space>
    </div>
  </Radio.Group>
}

interface ISetUp {
  title: string;
  ActionInfo?: TActionInfoReviveAdvSet;
  onChange: (payload: any) => void;
};

const StaticsSetUp: FC<ISetUp> = (props) => {
  // const { staticsIdx } = props;
  const {ActionInfo} = props;
  const statics: { node: JSX.Element; field: string; label: string }[] = [
    {
      field: "installfee",
      label: "每移动应用安装费用",
      node: <StaticsItem initValues={ActionInfo?.installfeeValue} onChange={(value) => {
        props.onChange({installfeeValue: value})
      }}/>
    }
  ]
  return (<>
    <StepCard
      title={
        <>
          <p>{props.title}</p>
          <p>
            如果今天暂停的广告集的
            <strong>{statics[ActionInfo?.staticsIdx].label}</strong>
            低或等于
            <strong>{ActionInfo?.installfeeValue?.mertricType === 2 ? ActionInfo?.installfeeValue?.value : ActionInfo?.installfeeValue?.staticMetricValue}</strong>
          </p>
        </>
      }
      className={styles.tacticsSetUp}
    >
      <div style={{marginTop: "20px"}}><Space>
        <svg className="icon"
             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1470">
          <path
            d="M853.333333 554.666667H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667zM853.333333 320H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667zM853.333333 789.333333H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666666s19.2-42.666667 42.666667-42.666667h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666666z"
            p-id="1471"></path>
        </svg>
        <Select onChange={(value) => {
          props.onChange({staticsIdx: statics.findIndex(item => item.field === value)})
        }} value={statics[ActionInfo?.staticsIdx].label} style={{width: 160}}>
          {
            statics.map(item => {
              return <Select.Option key={item.field} value={item.field}>
                {
                  item.label
                }
              </Select.Option>
            })
          }
        </Select>
        &nbsp;
        <Tag color="rgb(208 208 208)">&nbsp; &lt;= &nbsp;</Tag>
        &nbsp;
        {statics[ActionInfo?.staticsIdx].node}
      </Space></div>
    </StepCard>
  </>);
}
export {StaticsSetUp}
