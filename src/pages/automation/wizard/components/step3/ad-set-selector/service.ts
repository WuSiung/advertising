import request from '@/utils/request';

export async function getAdSetList(payload: any) {
  let url = '/ads/advset/page?packState=1'
  if (payload.budget) {
    url =`${url}&budget=${payload.budget}`
  }
  return request(url);
}
