import request from '@/utils/request'

export async function queryInterestList(params: any) {
    return request('/ads/advlove/page', {
        method: 'get',
        params: params
    })
}