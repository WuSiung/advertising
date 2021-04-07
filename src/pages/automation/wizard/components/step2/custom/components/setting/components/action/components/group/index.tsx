import React, {FC} from 'react';
import {Col, Row} from "antd";
import Operator
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/action/components/group/operator";
import Condition
  from "@/pages/automation/wizard/components/step2/custom/components/setting/components/action/components/group/condition";
import {TGroup} from "@/pages/automation/wizard/components/step2/custom/data";

interface IGroup {
  deepth: number;
  idx?: number;
  numCondition?: number; // 同级的conditions数目
  group: TGroup;
  onChange: () => void;
  onDel?: (idx: number) => void;
  onReplace: (g: TGroup, idx?: number) => void;
}

function getNumOfCondition(group: TGroup): number {
  let count = 0;
  function calculate(g: TGroup) {
    count += g.conditions.length;
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
  const { group } = props;
  const numCondition = getNumOfCondition(props.group);
  // console.log(numCondition);
  const condHeight = 40  // 条件高度
  const condMaginTop = 10 // 条件间隔
  const optWidth = 24  // 操作条宽度
  const handleAddGroup = () => {
    if (!group.children) {
      group.children = [
        {
          logical: 'or',
          conditions: [
            {
              target: 'cpa',
              timePeriod: '00:00',
              operator: '<',
              value: 0
            },
            {
              target: 'cpa',
              timePeriod: '00:00',
              operator: '<',
              value: 0
            }
          ]
        }
      ];
    } else {
      group.children.push({
        logical: 'or',
        conditions: [
          {
            target: 'cpa',
            timePeriod: '00:00',
            operator: '<',
            value: 0
          },
          {
            target: 'cpa',
            timePeriod: '00:00',
            operator: '<',
            value: 0
          }
        ]
      })
    }
    props.onChange();
  }

  const handleAddCondition = () => {
    group.conditions.push({
      target: 'cpa',
      timePeriod: '00:00',
      operator: '<',
      value: 0
    });
    // props.onAdd() // 改为onChange
    props.onChange();
  }

  const handleCopyCondition = (idx: number) => {
    group.conditions.push({
      ...group.conditions[idx]
    });
    props.onChange();
  }

  const handleDelCondition = (idx: number) => {
    // todo: 如果还有组，直接删除condtion
    // todo: 如果没有组，1.conditon数目大于2,删除condition;2.condtition数目小于等于2，删除整个组
    // if (group.children && group.children.length) {
    //   group.conditions.splice(idx, 1);
    // } else if (group.conditions && group.conditions.length > 2) {
    //   group.conditions.splice(idx, 1);
    // } else
    //   if (props.idx !== undefined) {
    //     // todo: 删除组件本身
    //     props.onDel(props.idx);
    // }

    if (group.children && group.children.length) {
      group.conditions.splice(idx, 1);
      // todo: 没有条件了，chldren.length === 1的时候，就用children中的唯一group替换自己
      if (!group.conditions.length && group.children.length === 1) {
        // todo: 用child替换自己
        // Object.assign(group, group.children[0]);
        props.onReplace(group.children[0], props.idx);
      }
    } else {
      if (props.idx === undefined) {
        if (group.conditions && group.conditions.length > 1) {
          group.conditions.splice(idx, 1);
        }
      } else {
        if (group.conditions && group.conditions.length > 2) {
          group.conditions.splice(idx, 1);
        } else if (props.onDel) {
          props.onDel(props.idx);
        }
      }
    }

    props.onChange();
  }

  const handleDelGroup = (idx: number) => {
    if (!Number.isNaN(idx) && group.children && group.children.length > idx) {
      group.children.splice(idx, 1);
      // 删除之后，如果只剩下一个组,也进行组替换
      if (!props.group.conditions.length && group.children.length === 1) {
        props.onReplace(group.children[0], props.idx);
      }
    }
    props.onChange();
  }

  const handleReplaceGroup = (g: TGroup, idx?: number) => {
    if (group && group.children && idx !== undefined) {
      group.children[idx] = g;
    }
    props.onChange();
  }

  const handleToggle = () => {
    if (group.logical === 'or') {
      group.logical = 'and';
    } else {
      group.logical = 'or'
    }
    props.onChange()
  }

  return (
    <>
      <Row style={{marginLeft: 5, marginTop: (props.numCondition === 0 && props.idx === 0) ? 0 : condMaginTop}}>
        <Col flex="24px">
          <Operator deepth={props.deepth} logical={group.logical} numCondition={numCondition} condHeight={condHeight} condMarginTop={condMaginTop} optWidth={optWidth} onAddGroup={handleAddGroup} onAddCondition={handleAddCondition} onToggle={handleToggle}></Operator>
        </Col>
        <Col flex="auto">
          {
            props.group.conditions.map((c, i) => <Condition onCopy={handleCopyCondition} onDel={handleDelCondition} key={i} idx={i} condHeight={condHeight} condMarginTop={condMaginTop} ></Condition>)
          }
          {
            props.group.children && props.group.children.map((g, j) => <Group deepth={props.deepth + 1} onChange={props.onChange} onDel={handleDelGroup} onReplace={handleReplaceGroup} key={j} numCondition={props.group.conditions.length} idx={j} group={g} />)
          }
        </Col>
      </Row>
    </>
  )
}

export default Group;
