import React, {FC, useState} from 'react';
import Action from "@/pages/automation/wizard/components/step2/custom/components/setting/components/action";
import {TAction, TActionInfoCustom} from "@/pages/automation/wizard/components/step2/custom/data";
import {Button, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import TriggleSchedule
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/triggle-schedule";
import EffectiveTime
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/effective-time";

interface ISetting {
  ActionInfo: TActionInfoCustom;
  // actions: TAction[]
  onChange: () => void
  onAdd: () => void
  onDel: (idx: number) => void
}

const Setting: FC<ISetting> = (props) => {
  // const groups: TGroup[] = [];
  // const group: TGroup = {
  //   logical: 'or',
  //   conditions: [
  //     {
  //       target: 'cpa',
  //       time: '00:00',
  //       operator: '<',
  //       value: 0
  //     }
  //   ],
  //   children: groups
  // };

  // const [grp, setGrp] = useState(group);

  // const handleChange = () => {
  //   setGrp({...grp});
  // }
  // const {actions} = props;

  return (
    <>
      {
        props.ActionInfo.actions.map((a, i) => <Action idx={i} action={a} onChange={props.onChange} onDel={props.onDel}></Action>)
      }
      <Row justify="center" style={{marginBottom: 40}}>
        <Button type="primary" onClick={props.onAdd}><PlusOutlined />&nbsp;&nbsp;行动</Button>
      </Row>
      <EffectiveTime effectiveTime={props.ActionInfo.effectiveTime} onChange={props.onChange}></EffectiveTime>
      <TriggleSchedule schedule={props.ActionInfo.schedule} onChange={props.onChange} ></TriggleSchedule>
    </>
  )
}

export default Setting;
