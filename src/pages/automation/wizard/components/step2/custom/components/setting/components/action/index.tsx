import React, {FC} from 'react';
import {Button, Card, Row, Select, Space} from 'antd';
import Group
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/action/components/group";
import {TAction, TGroup} from "@/pages/automation/wizard/components/step2/custom/data";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";

interface ITask {
  // group: TGroup
  idx: number;
  action: TAction
  onDel: (idx: number) => void
  onChange: () => void
}

const Action: FC<ITask> = (props) => {
  const handleReplaceGroup = (g: TGroup) => {
    Object.assign(props.action.group, {logical: g.logical, conditions: [...g.conditions], children: g.children ? [...g.children]: []});
    props.onChange();
  }

  const title = (
    <>
      <Space>
        <span>选择任务：</span>
        <Select style={{width: 120}}></Select>
      </Space>
      <p>
        如果出现以下情况，Madgicx将暂停广告系列：
      </p>
    </>
  )
  return (
    <>
      <Card
        style={{marginBottom: 20}}
        title={title}
        extra={ <DeleteOutlined style={{fontSize: 18}} onClick={() => props.onDel(props.idx)} />}
      >
        <Group group={props.action.group} onChange={props.onChange} onReplace={handleReplaceGroup}></Group>
      </Card>
    </>
  )
}

export default Action;
