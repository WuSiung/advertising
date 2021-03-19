import request from '@/utils/request';

export async function getAdList(payload: any) {
  return request('/ads/advadv/page?state=1');
}
