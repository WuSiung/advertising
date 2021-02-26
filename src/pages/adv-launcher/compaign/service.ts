import request from '@/utils/request'
import { CreateCompaignDataType } from './data'

export async function queryCompaigns(param: { size: number }) {
    return request('/ads/advpack/page', {
        method: 'get',
        params: param
    })
}

export async function postCreateCompaign(params: CreateCompaignDataType) {
    return request('/ads/advpack', {
        method: 'post',
        data: params
    })
}