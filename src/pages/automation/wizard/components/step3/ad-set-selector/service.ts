import request from '@/utils/request';

export async function getAdSetList(payload: any) {
  // let url = '/ads/advset/page?packState=1'
  let url = `/ads/advset/page?current=${payload.current}&size=${payload.size}&packState=1&status=3`;
  if (payload.budget) {
    url =`${url}&budget=${payload.budget}`
  }
  return request(url);
}
