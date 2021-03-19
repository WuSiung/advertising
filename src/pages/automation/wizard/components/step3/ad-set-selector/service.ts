import request from '@/utils/request';

export async function getAdSetList(payload: any) {
  return request('/ads/advset/page?state=1&budget=1');
}
