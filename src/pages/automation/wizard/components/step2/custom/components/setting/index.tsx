import React, {FC, useEffect, useState} from 'react';
import Action from "@/pages/automation/wizard/components/step2/custom/components/setting/components/action";
import {TAction, TActionInfoCustom} from "@/pages/automation/wizard/components/step2/custom/data";
import {Button, Card, Radio, RadioChangeEvent, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import TriggleSchedule
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/triggle-schedule";
import EffectiveTime
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/effective-time";

interface ISetting {
  level: number;
  ActionInfo: TActionInfoCustom;
  // actions: TAction[]
  onChange: () => void
  onAdd: () => void
  onDel: (idx: number) => void
  onLevelChange: (v: number) => void;
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
  useEffect(() => {
    props.onLevelChange(0);
  }, []);
  const handleLevelChange = (e: RadioChangeEvent) => {
    props.onLevelChange(e.target.value);
  }

  return (
    <>
      <Card style={{marginBottom: 20}}>
        <Radio.Group value={props.level} style={{width: '100%'}} onChange={handleLevelChange}>
          <Row justify="space-between">
            <Radio value={0}>广告层级</Radio>
            <Radio value={1}>广告集层级</Radio>
            <Radio value={2}>广告系列层级</Radio>
          </Row>
        </Radio.Group>
      </Card>
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
