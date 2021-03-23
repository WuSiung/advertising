import React, {FC, MouseEventHandler} from 'react';
import { Card } from 'antd';
import Group
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/task/components/group";
import {TGroup} from "@/pages/automation/wizard/components/step2/custom/components/setting/data";

interface ITask {
  group: TGroup
  onAdd: () => void
}

const Task: FC<ITask> = (props) => {
  return (
    <Card>
      <Group group={props.group} onAdd={props.onAdd}></Group>
    </Card>

  )
}

export default Task;
