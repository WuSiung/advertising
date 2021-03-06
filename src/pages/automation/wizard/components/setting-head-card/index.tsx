import React, {FC, ReactNode} from 'react';
import {Card, Col, Row} from "antd";
import TacticCardHead from "@/pages/automation/wizard/components/tactic-card-head";

interface ISettingHeadCard {
  icon: string | ReactNode;
  pictrue: string | ReactNode;
  title: string;
  subTitle: string;
  remark?: string;
  size?: string;
}

const SettingHeadCard: FC<ISettingHeadCard> = (props) => {
  const size = props.size || 'small';
  return (
    <Card type="inner">
      <Row justify="start">
        <Col span={12}>
          <TacticCardHead
            icon={props.icon}
            title={props.title}
            subTitle={props.subTitle}
            size={size}
            remark={props.remark}
          />
        </Col>
        <Col>
          {typeof(props.pictrue) === 'string' ? <img src={props.pictrue} alt=""/> : props.pictrue}
        </Col>
      </Row>
    </Card>
  )
};

export default SettingHeadCard;
