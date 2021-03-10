import request from '@/utils/request'

export async function queryInterestList(params: any) {
    return request('/ads/advlove/page', {
        method: 'get',
        params: params
    })
}

export async function queryBaseCrowd(params: any) {
    return request('/ads/advaudiencebase/page', {
        method: 'get',
        params: params
    })
}