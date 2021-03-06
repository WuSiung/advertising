import React, {FC, ReactNode} from 'react';
import { Space} from "antd";

interface ITacticCardHead {
  icon: string | ReactNode;
  title: string;
  subTitle: string;
  remark?: string;
  size?: string;
}

const TacticCardHead: FC<ITacticCardHead> = (props) => {
  const size = props.size || 'large';
  return (
    <div>
      <Space>
        {typeof(props.icon) === 'string' ? <img src={props.icon} alt=""/> : props.icon}
        <div>
          {size === 'small' ? <h4><strong>{props.title}</strong></h4> : <h2><strong>{props.title}</strong></h2>}
          <p>{props.subTitle}</p>
        </div>
      </Space>
      { props.remark && <p>{props.remark}</p> }
    </div>
  )
}

export default TacticCardHead;
