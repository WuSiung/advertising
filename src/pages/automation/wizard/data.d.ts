import { Effect } from 'umi';

export enum EActionType {
  AAT_Surf_AdSetLevel = 'Surf_AdSetLevel', //
  AAT_Surf_CampaignLevel = 'Surf_CampaignLevel',
  AAT_StopLoss_AdSetLevel = 'StopLoss_AdSetLevel',
  AAT_StopLoss_AdLevel = 'StopLoss_AdLevel',
  AAT_Revive_AdSetLevel = 'Revive_AdSetLevel',
  AAT_Revive_AdLevel = 'Revive_AdLevel',
  AAT_Custom_AdLevel = 'Custom_AdLevel'
}

export type TAdvAccessTokenInfo = {
  Access_token: string | null;
  Token_id: number | null;
  User_id: number | null;
  Username: string | null;
  Refresh_token: string | null;
  Token_type: string | null;
  Expires_in: number | null;
}

export type TAdvAutoActionReq = {
  Name?: string;
  PlatformId?: string;
  ActionInfo?: string;
  ActionObj?: string[];
  Access?: TAdvAccessTokenInfo;
  ActionType?: EActionType
}

export type TTacticWizardModel = {
  namespace: string;
  state: TAdvAutoActionReq;
  effects: {
    createTactic: Effect;
  }
}
