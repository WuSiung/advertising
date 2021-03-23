import React, {FC, MouseEventHandler} from 'react';
import {PlusOutlined} from "@ant-design/icons";
import {Dropdown, Menu, Button} from "antd";

interface IOperator {
  numCondition: number
  onAddCondition: MouseEventHandler<HTMLElement>;
  onAddGroup: MouseEventHandler<HTMLElement>;
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
    <div style={{width: 24, height: props.numCondition * 24, borderRadius: 12, backgroundColor: 'green', position: 'relative'}}>
      {
        props.numCondition > 1 && <div style={{position: 'absolute', bottom: '50%', left: '50%', right: '50%', width: 10, marginLeft: -7, marginRight: -7}}>or</div>
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
