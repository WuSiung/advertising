import request from '@/utils/request';
import type { FacebookAccount } from '@/models/user'

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/admin/user/info');
}

export async function queryFbAccounts(): Promise<any> {
  return request('/admin/systoken/getTokens');
}

export async function getFbId() {
  return request('/auth/token/appid');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function bindFbAccount(params: FacebookAccount) {
  return request('/admin/systoken/bindPlatform', {
    data: params,
    method: 'post'
  })
}

export async function refreshToekn(refresh_token: string) {
  const grant_type = 'refresh_token'
  return request('/auth/oauth/token/?grant_type=' + grant_type + '&refresh_token=' + refresh_token, {
    method: 'post',
    data: { refresh_token, isToken: false, scope: 'server' }
  })
}

export async function changeFbAccount(params: FacebookAccount) {
  return request('/admin/systoken/changePlatform', {
    method: 'post',
    data: params
  })
}

export async function queryFbOnlineAccounts(params: { access_token: string, fbid: string }) {
  return request('/admin/user/getAccount', {
    data: params,
    method: 'post'
  })
}

export async function logout() {
  return request('/auth/token/logout', {
    method: 'delete'
  })
}