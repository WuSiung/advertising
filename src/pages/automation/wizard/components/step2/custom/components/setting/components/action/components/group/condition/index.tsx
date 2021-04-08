import React, {FC} from 'react';
import {Cascader, Col, Divider, Row, Select, Space} from "antd";

import styles from './index.less';
import {CopyOutlined, DeleteOutlined, InteractionOutlined} from "@ant-design/icons";

const {Option} = Select;

interface ICondition {
  idx: number;
  condHeight: number;
  condMarginTop: number;
  onDel: (idx: number) => void;
  onCopy: (idx: number) => void;
}

const Condition: FC<ICondition> = (props) => {
  const targetList = [
    {
      value: 'purchaseRoas',
      label: '购买回报率'
    },
    {
      value: 'cpa',
      label: '每次安装费用'
    },
    {
      value: 'frequency',
      label: '频率'
    },
    {
      value: 'spend',
      label: '广告支出'
    },
    {
      value: 'installs',
      label: '移动应用安装数'
    },
    {
      value: 'time',
      label: '时间'
    }
  ];

  const options = [
    {
      value: 'lastMonth',
      label: '上个月',
    },
    {
      value: 'all',
      label: '全部时间',
    },
    {
      value: 'days',
      label: '天（今天除外）',
      children: [
        {
          value: 'last2days',
          label: '最近2天',
        },
        {
          value: 'last7days',
          label: '最近7天',
        },
        {
          value: 'last14days',
          label: '最近14天',
        },
        {
          value: 'last28days',
          label: '最近28天',
        },
        {
          value: 'last30days',
          label: '最近30天',
        },
        {
          value: 'last90days',
          label: '最近90天',
        },
        {
          value: 'last180days',
          label: '最近180天',
        },
        {
          value: 'last365days',
          label: '最近365天',
        },
      ],
    },
    {
      value: 'hours',
      label: '小时',
      children: [
        {
          value: 'currentHour',
          label: '当前小时',
        },
        {
          value: 'lastHour',
          label: '最近1小时',
        },
        {
          value: 'last2Hours',
          label: '最近2小时',
        },
        {
          value: 'last3Hours',
          label: '最近3小时',
        },
        {
          value: 'last4Hours',
          label: '最近4小时',
        },
        {
          value: 'last5Hours',
          label: '最近5小时',
        },
        {
          value: 'last6Hours',
          label: '最近6小时',
        },
        {
          value: 'last7Hours',
          label: '最近7小时',
        },
        {
          value: 'last8Hours',
          label: '最近8小时',
        },
        {
          value: 'last9Hours',
          label: '最近9小时',
        },
        {
          value: 'last10Hours',
          label: '最近10小时',
        },
        {
          value: 'last11Hours',
          label: '最近11小时',
        },
        {
          value: 'last12Hours',
          label: '最近12小时',
        },
        {
          value: 'last13Hours',
          label: '最近13小时',
        },
        {
          value: 'last14Hours',
          label: '最近14小时',
        },
        {
          value: 'last15Hours',
          label: '最近15小时',
        },
        {
          value: 'last16Hours',
          label: '最近16小时',
        },
        {
          value: 'last17Hours',
          label: '最近17小时',
        },
        {
          value: 'last18Hours',
          label: '最近18小时',
        },
        {
          value: 'last19Hours',
          label: '最近19小时',
        },
        {
          value: 'last20Hours',
          label: '最近20小时',
        },
        {
          value: 'last21Hours',
          label: '最近21小时',
        },
        {
          value: 'last22Hours',
          label: '最近22小时',
        },
        {
          value: 'last23Hours',
          label: '最近23小时',
        },
        {
          value: 'last24Hours',
          label: '最近24小时',
        },
      ],
    },
    {
      value: 'weeks',
      label: '周数',
      children: [
        {
          value: 'currentWeek',
          label: '本周',
        },
        {
          value: 'lastWeek',
          label: '上周',
        },
        {
          value: 'last2Weeks',
          label: '上2周',
        },
        {
          value: 'last3Weeks',
          label: '上3周',
        },
        {
          value: 'last4Weeks',
          label: '上4周',
        },
        {
          value: 'last5Weeks',
          label: '上5周',
        },
        {
          value: 'last6Weeks',
          label: '上6周',
        },
        {
          value: 'last7Weeks',
          label: '上7周',
        },
        {
          value: 'last8Weeks',
          label: '上8周',
        },
      ],
    },
  ];

  const operatorList = [
    '=',
    '>=',
    '<=',
    '>',
    '<'
  ];

  function onChange(value) {
    console.log(value);
  }

// Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1];
  }

  return (
    // <Row style={{height: 24}}>
    //   <Col style={{width: 10}}>
    //     <Divider />
    //   </Col>
    //   <Col span={5}>
    //     <p>选择条件</p>
    //   </Col>
    // </Row>
    <div className={styles.main} style={{height: props.condHeight, marginTop: props.idx === 0 ? 0 : props.condMarginTop}}>
      <Space className="outter-space" style={{height: props.condHeight}}>
        <Divider />
        {/*<p style={{marginBottom: 0}}>选择条件</p>*/}
        <Row className="box" style={{height: props.condHeight}} justify="space-between">
          <Space className="select-space" size="large" >
            <Select size="small">
              {
                targetList.map(t => <Option key={t.value} value={t.value}>{t.label}</Option>)
              }
            </Select>
            {/*<Select size="small"></Select>*/}
            <Cascader
              size="small"
              options={options}
              expandTrigger="hover"
              displayRender={displayRender}
              onChange={onChange}
            />
            <Select size="small">
              {
                operatorList.map(o => <Option key={o} value={o}>{o}</Option>)
              }
            </Select>
          </Space>
          <Space className="action-space">
            {/*<InteractionOutlined />*/}
            <CopyOutlined onClick={() => props.onCopy(props.idx)} />
            <DeleteOutlined onClick={() => props.onDel(props.idx)} />
          </Space>
        </Row>
      </Space>
    </div>
  )
}

export default Condition;
