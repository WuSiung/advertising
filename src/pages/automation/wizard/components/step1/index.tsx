import React, { FC } from 'react';
import {Card, Col, Row, Space} from "antd";
import TacticCardHead from "@/pages/automation/wizard/components/tactic-card-head";
import surf from '@/assets/automation/surf.svg';
import SvgSurf from "@/pages/automation/wizard/components/svg-surf";
import SvgStopLoss from "@/pages/automation/wizard/components/svg-stop-loss";
import SvgRevive from "@/pages/automation/wizard/components/svg-revive";
import TacticCard from "@/pages/automation/wizard/components/tactic-card";
import {EActionType} from '@/pages/automation/wizard/data.d';

interface IStep1 {
  onTactic: (tactic: string, level: number) => void;
}

const Step1: FC<IStep1> = (props) => {
  return (
    <div>
      <Row justify="start" gutter={{ xs: 8, sm: 16, md: 24}} style={{marginBottom: 25}}>
        <Col span={8}>
            <TacticCard
              tactic={EActionType.AAT_Surf_AdSetLevel}
              level={1}
              icon={<SvgSurf fill="#7655c9" />}
              color="#7655c9"
              title="冲浪"
              subTitle="广告集级别"
              remark="SURF确定了强劲的效果趋势，并通过将可用的广告集预算增加到原始限制之外，自动利用积极的势头，预算将在选定的本地时间自动重置。"
              onSelected={props.onTactic}
            />
        </Col>
        <Col span={8}>
          <TacticCard
            tactic={EActionType.AAT_Surf_CampaignLevel}
            level={2}
            icon={<SvgSurf fill="#3d2870" />}
            color="#3d2870"
            title="冲浪"
            subTitle="广告活动层级"
            remark="SURF识别出强劲的绩效趋势，并通过将可用的广告系列预算增加到原始限制之外，自动利用积极的势头。预算将在选定的本地时间自动恢复为原始预算。"
            onSelected={props.onTactic}
          />
        </Col>
        {/*<Col span={8}>*/}
        {/*  <TacticCard*/}
        {/*    tactic={EActionType.AAT_StopLoss_AdSetLevel}*/}
        {/*    level={1}*/}
        {/*    icon={<SvgStopLoss fill="#7655c9" />}*/}
        {/*    color="#7655c9"*/}
        {/*    title="止损"*/}
        {/*    subTitle="广告集级别"*/}
        {/*    remark="止损可以通过在效果不好的广告集一经识别就立即将其变为负动量，从而将其暂停，从而保护您的预算。在选定的当地时间，它会重新打开广告集。"*/}
        {/*    onSelected={props.onTactic}*/}
        {/*  />*/}
        {/*</Col>*/}
      </Row>
      {/*<Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24}}>*/}
      {/*  <Col span={8}>*/}
      {/*    <TacticCard*/}
      {/*      tactic={EActionType.AAT_StopLoss_AdLevel}*/}
      {/*      level={0}*/}
      {/*      icon={<SvgStopLoss fill="#d964c5" />}*/}
      {/*      color="#d964c5"*/}
      {/*      title="止损"*/}
      {/*      subTitle="广告等级"*/}
      {/*      remark="止损一经发现就立即已负动量暂停效果不佳的广告，从而保护您的预算，在选定的当地时间，它会重新打开广告。"*/}
      {/*      onSelected={props.onTactic}*/}
      {/*    />*/}
      {/*  </Col>*/}
      {/*  <Col span={8}>*/}
      {/*    <TacticCard*/}
      {/*      tactic={EActionType.AAT_Revive_AdSetLevel}*/}
      {/*      level={1}*/}
      {/*      icon={<SvgRevive fill="#7655c9" />}*/}
      {/*      color="#7655c9"*/}
      {/*      title="复活"*/}
      {/*      subTitle="广告集级别"*/}
      {/*      remark="Revive在检测到任何积极的活动表明该广告集已再次获利时，会自动重新激活所有已暂停的广告集。"*/}
      {/*      onSelected={props.onTactic}*/}
      {/*    />*/}
      {/*  </Col>*/}
      {/*  <Col span={8}>*/}
      {/*    <TacticCard*/}
      {/*      tactic={EActionType.AAT_Revive_AdLevel}*/}
      {/*      level={0}*/}
      {/*      icon={<SvgRevive fill="#d964c5" />}*/}
      {/*      color="#d964c5"*/}
      {/*      title="复活"*/}
      {/*      subTitle="广告等级"*/}
      {/*      remark="Revive在检测到任何积极的活动表明该广告已再次获利时，会自动重新激活任何已暂停的广告"*/}
      {/*      onSelected={props.onTactic}*/}
      {/*    />*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </div>
  )
}

export default Step1;
