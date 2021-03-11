import request from '@/utils/request';

export async function getCampaignList(payload: any) {
  return request('/ads/advpack/page?budget=1');
}
