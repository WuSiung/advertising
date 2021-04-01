import request from '@/utils/request';

export async function getAdList(payload: any) {
  return request(`/ads/advadv/page?current=${payload.current}&size=${payload.size}&packState=1&status=3`);
  // return request('/ads/advadv/page?packState=1');
}
