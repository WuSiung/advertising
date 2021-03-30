import React, {FC, MouseEventHandler} from 'react';
import {PlusOutlined} from "@ant-design/icons";
import {Dropdown, Menu, Button} from "antd";

interface IOperator {
  logical: 'or' | 'and';
  numCondition: number;
  condMarginTop: number;
  condHeight: number;
  optWidth: number;
  onAddCondition: MouseEventHandler<HTMLElement>;
  onAddGroup: MouseEventHandler<HTMLElement>;
  onToggle: MouseEventHandler<HTMLElement>;
}

const Operator: FC<IOperator> = (props) => {
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
    <div style={{marginTop: props.numCondition === 1 ? (props.condHeight - props.optWidth) / 2: 0, width: props.optWidth, height: (props.numCondition === 1) ? props.optWidth : (props.numCondition * (props.condHeight + props.condMarginTop) - 10), borderRadius: props.optWidth / 2, backgroundColor: '#b6dee2', position: 'relative'}}>
      {
        props.numCondition > 1 &&
        <Button size="small" style={{position: 'absolute', top: '60%', transformOrigin: '0 0', transform: 'rotate(-90deg)', borderRadius: 12}} onClick={props.onToggle}>
          {props.logical === 'and' ? '并且' : '或者'}
        </Button>
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
