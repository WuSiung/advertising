import request from '@/utils/request';
import {TAdvAccessTokenInfo} from "@/pages/automation/wizard/data";
import Store from '@/utils/store';

export async function createTactic(payload: any) {
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
  return request('/autoTactic/api/startautotactics', {
    method: 'POST',
    data: {
      requestInfo: {
        ...payload,
        PlatformId: String(platformId),
      },
      access: tokenInfo,
    }
  });
};
