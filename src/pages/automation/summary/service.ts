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
    Expires_in: Store.GetExpiresIn()
  }
  return request('/autoTactic/api/getautotactics', {
    method: 'POST',
    data: {
      access: tokenInfo,
      requestInfo: String(platformId)
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
