import request from '@/utils/request';

export async function getCampaignList(payload: any) {
  return request(`/ads/advpack/page?current=${payload.current}&size=${payload.size}&state=1&budget=1&status=3`);
  // return request('/ads/advpack/page?state=1&budget=1');
}
