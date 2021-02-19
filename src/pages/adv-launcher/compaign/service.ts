import request from '@/utils/request'
import { CreateCompaignDataType } from './data'

export async function queryCompaigns() {
    return request('/ads/advpack/page')
}

export async function postCreateCompaign(params:CreateCompaignDataType) {
    return request('/ads/advpack', {
        method: 'post',
        data: params
    })
}