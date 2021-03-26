import React, {FC, MouseEventHandler} from 'react';
import {PlusOutlined} from "@ant-design/icons";
import {Dropdown, Menu, Button} from "antd";

interface IOperator {
  numCondition: number;
  condMarginTop: number;
  condHeight: number;
  optWidth: number;
  onAddCondition: MouseEventHandler<HTMLElement>;
  onAddGroup: MouseEventHandler<HTMLElement>;
}

const Operator: FC<IOperator> = (props) => {
  const w = 10 // 14
  const menu = (
    <Menu>
      <Menu.ItemGroup title="添加：">
        <Menu.Item key="0">
          <Button onClick={props.onAddGroup}>组</Button>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <Button onClick={props.onAddCondition}>条件</Button>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  return (
    <div style={{marginTop: props.numCondition === 1 ? (props.condHeight - props.optWidth) / 2: 0, width: props.optWidth, height: (props.numCondition === 1) ? props.optWidth : (props.numCondition * (props.condHeight + props.condMarginTop) - 10), borderRadius: props.optWidth / 2, backgroundColor: 'green', position: 'relative'}}>
      {
        props.numCondition > 1 && <div style={{position: 'absolute', bottom: '50%', left: '50%', right: '50%', width: w, marginLeft: -(props.optWidth - w) / 2, marginRight: -(props.optWidth - w) / 2, transform: 'rotate(-90deg)'}}>or</div>
      }
      <div>
        <Dropdown overlay={menu} trigger={['click']}>
          <PlusOutlined style={{position: 'absolute', marginLeft: 5, marginRight: 5, bottom: 5}} />
        </Dropdown>
      </div>
    </div>
  )
}

export default Operator;
