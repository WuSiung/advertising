import request from '@/utils/request';

export async function getCampaignList(payload: any) {
  return request('/ads/advpack/page?state=1&budget=1');
}
