import request from '@/utils/request';
import Store from "@/utils/store";
import {TAdvAccessTokenInfo} from "@/pages/automation/wizard/data";
import {TTactic} from "@/pages/automation/summary/data";

export async function getTacticList(payload: any) {
  const platformId = Store.GetTokenId();
  const tokenInfo: TAdvAccessTokenInfo = {
    Access_token: Store.GetToken(),
    Token_id: platformId,
    User_id: Store.GetUserId(),
    Username: Store.GetUserName(),
    Refresh_token: Store.GetRefreshToken(),
    Token_type: Store.GetTokenType(),
    Expires_in: Store.GetExpiresIn()
  }
  return request('/autoTactic/api/getautotactics', {
    method: 'POST',
    data: {
      access: tokenInfo,
      requestInfo: {
        PlatformId: String(platformId)
      }
    }
  });
}

export async function deleteTactic(payload: TTactic) {
  const platformId = Store.GetTokenId();
  const tokenInfo: TAdvAccessTokenInfo = {
    Access_token: Store.GetToken(),
    Token_id: platformId,
    User_id: Store.GetUserId(),
    Username: Store.GetUserName(),
    Refresh_token: Store.GetRefreshToken(),
    Expires_in: Store.GetExpiresIn()
  }
  return request('/autoTactic/api/stopautotactic', {
    method: 'POST',
    data: {
      access: tokenInfo,
      requestInfo: payload
    }
  });
}

export async function pauseTactic(payload: TTactic) {
  const platformId = Store.GetTokenId();
  const tokenInfo: TAdvAccessTokenInfo = {
    Access_token: Store.GetToken(),
    Token_id: platformId,
    User_id: Store.GetUserId(),
    Username: Store.GetUserName(),
    Refresh_token: Store.GetRefreshToken(),
    Expires_in: Store.GetExpiresIn()
  }
  return request('/autoTactic/api/pauseautotactic', {
    method: 'POST',
    data: {
      access: tokenInfo,
      requestInfo: payload
    }
  });
}

export async function restoreTactic(payload: TTactic) {
  const platformId = Store.GetTokenId();
  const tokenInfo: TAdvAccessTokenInfo = {
    Access_token: Store.GetToken(),
    Token_id: platformId,
    User_id: Store.GetUserId(),
    Username: Store.GetUserName(),
    Refresh_token: Store.GetRefreshToken(),
    Expires_in: Store.GetExpiresIn()
  }
  return request('/autoTactic/api/continueautotactic', {
    method: 'POST',
    data: {
      access: tokenInfo,
      requestInfo: payload
    }
  });
}

// AAT_Surf_AdSetLevel = 'Surf_AdSetLevel', //
//   AAT_Surf_CampaignLevel = 'Surf_CampaignLevel',
//   AAT_StopLoss_AdSetLevel = 'StopLoss_AdSetLevel',
//   AAT_StopLoss_AdLevel = 'StopLoss_AdLevel',
//   AAT_Revive_AdSetLevel = 'Revive_AdSetLevel',
//   AAT_Revive_AdLevel = 'Revive_AdLevel'

export async function getActionObjList(payload: any) {
  const {actionType, objIds} = payload;
  let path = '';
  let key = '';
  switch (actionType) {
    case 'StopLoss_AdLevel':
    case 'Revive_AdLevel':
      path = '/ads/advadv';
      key = 'advName';
      break;
    case 'Surf_AdSetLevel':
    case 'StopLoss_AdSetLevel':
    case 'Revive_AdSetLevel':
      path = '/ads/advset';
      key = 'setName';
      break;
    case 'Surf_CampaignLevel':
      path = '/ads/advpack';
      key = 'appName';
      break;
    default:
  }

  const list: Promise<any>[] = [];
  objIds.forEach((o: string) => {
    list.push(request(`${path}/${o}`))
  });

  const res = await Promise.all(list);
  return res.map((r, idx) => (r && r.data) ? r.data[key] : objIds[idx])
}
