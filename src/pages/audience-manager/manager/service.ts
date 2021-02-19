import request from '@/utils/request'
import { QueryListDataType, SaveCrowdParamsType } from './data'

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

export async function queryAudienceModelList(params: QueryListDataType) {
    return request('/ads/advaud/page', {
        method: 'get',
        params: params
    })
}

// 此接口应需返回人数
export async function queryAudienceModelDetail(params: QueryListDataType) {
    return request('/ads/advaudlove/' + params.id, {
        method: 'get'
    })
}

export async function postSaveCrowd(params: SaveCrowdParamsType) {
    return request('/ads/advaud/saveAud', {
        method: 'post',
        data: params
    })
}

export async function postDelCrowd({ id }: { id: number }) {
    return request('/ads/advaud/' + id, {
        method: 'DELETE',
    })
}