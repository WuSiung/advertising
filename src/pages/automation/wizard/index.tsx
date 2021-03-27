import React, {FC, useState, useRef} from 'react';
import { connect, Dispatch, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import Title from './components/title';
import Step1 from './components/step1';
import styles from "@/pages/dashboard/index.less";
import SurfAdSet from "@/pages/automation/wizard/components/step2/surf-ad-set";
import SurfCampaign from "@/pages/automation/wizard/components/step2/surf-campaign";
import StopLossAdvSet from "@/pages/automation/wizard/components/step2/stoploss/advset";
import StopLossAdvAdv from "@/pages/automation/wizard/components/step2/stoploss/advadv";
import ReviveAdvSet from "@/pages/automation/wizard/components/step2/revive/advset";
import ReviveAdvAdv from "@/pages/automation/wizard/components/step2/revive/advadv";
import Loading from '@/components/Loading';
import {TAdvAutoActionReq} from "@/pages/automation/wizard/data";
import {EActionType} from "@/pages/automation/wizard/data.d";
import {createTactic} from "@/pages/automation/wizard/service";
import {TTacticEditInfo} from "@/pages/automation/data";

interface WizardProps {
  dispatch: Dispatch
  isLoading: boolean;
  location: {
    pathname: string;
    state: {
      record: {
        ObjectID: string;
        Name: string;
        ActionType: string;
        ActionInfo: string;
        AdvObjs: any[];
      }
    }
  }
}

const Wizard: FC<WizardProps> = (props) => {
  const { isLoading, location } = props
  const [isBackToZero, setIsBackToZero] = useState(false);
  // const title = (
  //   <div>
  //     <Row justify="space-between">
  //       <Col>
  //         <Button onClick={() => history.goBack()}>{'< 后退'}</Button>
  //       </Col>
  //     </Row>
  //   </div>
  // )

  // const subTitle = (
  //   <Row>
  //     <Col span={8}></Col>
  //     <Col>
  //       <div style={{color: '#eee', width: 5, height: 100}}></div>
  //     </Col>
  //   </Row>
  // )

  // console.log('wizard', JSON.stringify(location.state));
  let defaultCurrent = 0;
  let defautTactic = '';
  let defaultLevel = -1;

  let editInfo;

  if (location.state && location.state.record) {
    defaultCurrent = 1;
    defautTactic = location.state.record.ActionType;
    // todo: 根据actionType设置level
    switch (defautTactic) {
      case 'Surf_CampaignLevel':
        defaultLevel = 2;
        break;
      case 'Surf_AdSetLevel':
      case 'StopLoss_AdSetLevel':
      case 'Revive_AdSetLevel':
        defaultLevel = 1;
        break;
      case 'StopLoss_AdLevel':
      case 'Revive_AdLevel':
        defaultLevel = 0;
        break;
      default:
    }
    const {record} = location.state;

    if (!isBackToZero) {
      editInfo = {
        objectID: record.ObjectID,
        actionName: record.Name,
        actionInfo: record.ActionInfo,
        actionObj: record.AdvObjs.map(o => parseInt(o.AdvID, 10))
      }
    }
  }

  const childRef: React.MutableRefObject<any> = useRef()

  const [current, setCurrent] = useState(defaultCurrent)

  const [tactic, setTactic] = useState(defautTactic);

  const [level, setLevel] = useState(defaultLevel);

  const [isActionObjSelected, setIsActionObjSelected] = useState(false);

  const handleTactic = (tt: string, lvl: number) => {
    // console.log('handleTactic', tt);
    if (tt) {
      setCurrent(1);
      setTactic(tt);
      setLevel(lvl);
    }
  }

  const handleClick = async (step: number) => {
    // 选好广告、广告集、活动之后直接调用子组件接口提交
    // todo: 将对submit的调用封装成asnyc，并启用遮罩，asnyc执行完毕后，提示信息，然后导航到自动化主页面
    if (step === 3) {
      if (childRef && childRef.current) {
        const data = childRef.current.submit();
        // console.log('createTactic');
        await createTactic({
          ObjectID: data.ObjectID,
          Name: data.Name,
          ActionInfo: data.ActionInfo,
          ActionObj: data.ActionObj,
          ActionType: tactic
        });
        history.push('/automation/summary');
        // dispatch({
        //   type: 'tacticWizard/createTactic',
        //   payload: {
        //     Name: data.Name,
        //     ActionInfo: data.ActionInfo,
        //     ActionObj: data.ActionObj,
        //     ActionType: tactic
        //   }
        // });
      }
    } else {
      setCurrent(step);
    }

    if (step === 0) {
      setIsBackToZero(true);
    }
  }

  const handleDataChange = (isSelected: boolean) => {
    setIsActionObjSelected(isSelected)
  }

  return (
    <PageContainer header={{title: '创建策略', breadcrumb: {}}} content='你可以选择单个或多个规则形成一个新策略，实现对广告的实时监控，触发执行。检测频率大约5～15分钟一次。'>
      <Card
        className={`${styles.totalCard}`}
        title={<Title isActionObjSelected={isActionObjSelected} current={current} tactic={tactic} level={level} handleClick={handleClick}></Title>}
      >
        {current === 0 && <Step1 onTactic={handleTactic}></Step1>}
        {tactic === EActionType.AAT_Surf_CampaignLevel && <SurfCampaign ref={childRef} step={current} editInfo={editInfo} onActionObjChange={handleDataChange}></SurfCampaign>}
        {tactic === EActionType.AAT_Surf_AdSetLevel && <SurfAdSet ref={childRef} step={current} editInfo={editInfo} onActionObjChange={handleDataChange}></SurfAdSet>}
        {tactic === EActionType.AAT_StopLoss_AdSetLevel && <StopLossAdvSet ref={childRef} step={current} editInfo={editInfo} onActionObjChange={handleDataChange}></StopLossAdvSet>}
        {tactic === EActionType.AAT_StopLoss_AdLevel && <StopLossAdvAdv ref={childRef} step={current} editInfo={editInfo} onActionObjChange={handleDataChange}></StopLossAdvAdv>}
        {tactic === EActionType.AAT_Revive_AdSetLevel && <ReviveAdvSet ref={childRef} step={current} editInfo={editInfo} onActionObjChange={handleDataChange}></ReviveAdvSet>}
        {tactic === EActionType.AAT_Revive_AdLevel && <ReviveAdvAdv ref={childRef} step={current} editInfo={editInfo} onActionObjChange={handleDataChange}></ReviveAdvAdv>}
      </Card>
      { isLoading && <Loading size="large" showMask tips="提交数据中，请稍等..." />}
    </PageContainer>
  )
}

export default connect(({ tacticWizard, loading }: {tacticWizard: TAdvAutoActionReq; loading: any}) => ({
  tacticWizard,
  isLoading: loading.effects['tacticWizard/createTactic']
}))(Wizard);

// export default Wizard;
