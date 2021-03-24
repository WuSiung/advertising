import React, {FC, ReactNode} from 'react';
import {Popover} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {TooltipPlacement} from "antd/lib/tooltip";

interface IPrompt {
  placement?: TooltipPlacement;
  content: ReactNode | string;
}

const Prompt: FC<IPrompt> = (props) => {
  return (
    <Popover
      placement={props.placement}
      content={props.content}>
      <InfoCircleOutlined />
    </Popover>
  )
}

export default Prompt;
