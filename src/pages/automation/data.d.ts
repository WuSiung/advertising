export enum EActionTypeName {
  Surf_AdSetLevel = '冲浪-广告集层级',
  Surf_CampaignLevel = '冲浪-广告系列层级',
  StopLoss_AdSetLevel = '止损-广告集层级',
  StopLoss_AdLevel = '止损-广告层级',
  Revive_AdSetLevel = '复活-广告集层级',
  Revive_AdLevel = '复活-广告层级'
}

export type TTacticEditInfo = {
  objectID: string;
  actionName: string;
  actionInfo: string;
  actionObj: number[];
};
