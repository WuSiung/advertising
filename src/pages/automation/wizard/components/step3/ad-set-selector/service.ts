import request from '@/utils/request';

export async function getAdSetList(payload: any) {
  return request('/ads/advset/page?budget=1&packState=1');
}
