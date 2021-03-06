import React, {FC, ReactNode} from 'react';
import {Card} from "antd";
import TacticCardHead from "@/pages/automation/wizard/components/tactic-card-head";

interface ITacticCard {
  icon: string | ReactNode;
  color: string;
  title: string;
  subTitle: string;
  remark: string;
  tactic: string;
  level: number;
  onSelected: (tactic: string, level: number) => void;
}

const TacticCard: FC<ITacticCard> = (props) => {
  const border = `8px solid ${props.color}`;
  return (
    <Card
      type="inner"
      style={{borderRight: border, height: 210, overflow: "hidden"}}
      hoverable={true}
      onClick={() => {props.onSelected(props.tactic, props.level)}}
    >
      <TacticCardHead
        icon={props.icon}
        title={props.title}
        subTitle={props.subTitle}
        remark={props.remark}
      />

    </Card>
  )
};

export default TacticCard;
