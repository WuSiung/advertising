import request from '@/utils/request';

export async function queryStatistics(payload: any) {
  // return request(`/ads/advadv/adsCaculate?start=${payload.start}&end=${payload.end}`);
  return Promise.all([
    request(`/ads/advadv/adsCaculate?start=${payload.start}&end=${payload.end}`),
    request(`/ads/advadv/adsCaculateDetail?start=${payload.start}&end=${payload.end}`),
    request(`/ads/advadv/adsCaculateCount?start=${payload.start}&end=${payload.end}`),
  ]);
}
