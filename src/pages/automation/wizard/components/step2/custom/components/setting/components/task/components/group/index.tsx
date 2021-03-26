import React, {FC, MouseEventHandler} from 'react';
import {Col, Row} from "antd";
import Operator
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/task/components/group/operator";
import Condition
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/task/components/group/condition";
import {TGroup} from "@/pages/automation/wizard/components/step2/custom/components/setting/data";

interface IGroup {
  idx?: number;
  numCondition?: number; // 同级的conditions数目
  group: TGroup;
  onAdd: () => void
}

function getNumOfCondition(group: TGroup): number {
  let count = 0;
  function calculate(g: TGroup) {
    count += g.conditionList.length;
    if (g.children) {
      for (let i = 0; i < g.children.length; i += 1) {
        calculate(g.children[i])
      }
    }
  }

  calculate(group);
  return count;
}

const Group: FC<IGroup> = (props) => {
 // todo: 求出group中的所有condition的数目
  const numCondition = getNumOfCondition(props.group);
  // console.log(numCondition);
  const condHeight = 40  // 条件高度
  const condMaginTop = 10 // 条件间隔
  const optWidth = 24  // 操作条宽度

  const {group} = props;
  const handleAddGroup = () => {
    if (!group.children) {
      group.children = [
        {
          conditionList: [
            {
              target: 'cpa',
              time: '00:00',
              operator: '<',
              value: 0
            },
            {
              target: 'cpa',
              time: '00:00',
              operator: '<',
              value: 0
            }
          ]
        }
      ];
    } else {
      group.children.push({
        conditionList: [
          {
            target: 'cpa',
            time: '00:00',
            operator: '<',
            value: 0
          },
          {
            target: 'cpa',
            time: '00:00',
            operator: '<',
            value: 0
          }
        ]
      })
    }
    props.onAdd();
  }

  const handleAddCondition = () => {
    group.conditionList.push({
      target: 'cpa',
      time: '00:00',
      operator: '<',
      value: 0
    });
    props.onAdd();
  }

  return (
    <>
      <Row style={{marginLeft: 5, marginTop: (props.numCondition === 0 && props.idx === 0) ? 0 : condMaginTop}}>
        <Col>
          <Operator numCondition={numCondition} condHeight={condHeight} condMarginTop={condMaginTop} optWidth={optWidth} onAddGroup={handleAddGroup} onAddCondition={handleAddCondition}></Operator>
        </Col>
        <Col span={20}>
          {
            props.group.conditionList.map((c, i) => <Condition key={i} idx={i} condHeight={condHeight} condMarginTop={condMaginTop}></Condition>)
          }
          {
            props.group.children && props.group.children.map((g, j) => <Group onAdd={props.onAdd} key={j} numCondition={props.group.conditionList.length} idx={j} group={g} />)
          }
        </Col>
      </Row>
    </>
  )
}

export default Group;
