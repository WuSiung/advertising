import request from '@/utils/request';
import type {FacebookAccount} from '@/models/user'

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/admin/user/info');
}

export async function queryFbAccounts(): Promise<any> {
  return request('/admin/systoken/getTokens');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function changeFbAccount(params:FacebookAccount) {
  return request('/admin/systoken/bindPlatform', {
    data: params,
    method: 'post'
  })
}
