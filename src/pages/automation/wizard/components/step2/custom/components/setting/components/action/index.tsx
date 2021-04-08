import React, {FC} from 'react';
import {Button, Card, Row, Select, Space} from 'antd';
import Group
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/action/components/group";
import {TAction, TGroup} from "@/pages/automation/wizard/components/step2/custom/data";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

interface ITask {
  // group: TGroup
  idx: number;
  action: TAction
  onDel: (idx: number) => void
  onChange: () => void
}

const Action: FC<ITask> = (props) => {
  const taskList = [
    {
      value: 'pause',
      label: '暂停投放'
    },
    {
      value: 'pauseTody',
      label: '暂停今天的投放活动'
    },
    {
      value: 'restore',
      label: '开始投放'
    },
    {
      value: 'setBudget',
      label: '设定广告活动预算'
    },
    {
      value: 'appendBidding',
      label: '增加竞价预算'
    },
    {
      value: 'reduceBidding',
      label: '减少竞价预算'
    },
    {
      value: 'biddingTactic',
      label: '竞价策略'
    },
    {
      value: 'copyCampaign',
      label: '复制广告系列'
    },
    {
      value: 'delete',
      label: '删除'
    },
    {
      value: 'addToName',
      label: '添加到名称'
    },
    {
      value: 'removeFromName',
      label: '从名称中删除'
    },
    {
      value: 'replace',
      label: '替换名称中的文本'
    },
    {
      value: '',
      label: ''
    }
  ];
  const handleReplaceGroup = (g: TGroup) => {
    Object.assign(props.action.group, {logical: g.logical, conditions: [...g.conditions], children: g.children ? [...g.children]: []});
    props.onChange();
  }

  const title = (
    <>
      <Space>
        <span>选择任务：</span>
        <Select style={{width: 120}}>
          {
            taskList.map(t => <Option key={t.value} value={t.value}>{t.label}</Option>)
          }
        </Select>
      </Space>
      <p>
        如果出现以下情况，贪玩智投将暂停广告系列：
      </p>
    </>
  )
  return (
    <>
      <Card
        style={{marginBottom: 40}}
        title={title}
        extra={ <DeleteOutlined style={{fontSize: 18}} onClick={() => props.onDel(props.idx)} />}
      >
        <Group deepth={0} group={props.action.group} onChange={props.onChange} onReplace={handleReplaceGroup}></Group>
      </Card>
    </>
  )
}

export default Action;
