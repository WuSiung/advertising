import request from '@/utils/request'
import { QueryListDataType } from './data'

export async function queryInterestList(params: QueryListDataType) {
    return request('/ads/advlove/page', {
        method: 'get',
        params: params
    })
}

export async function queryAudiencetList(params: QueryListDataType) {
    return request('/ads/advaudience/page', {
        method: 'get',
        params: params
    })
}