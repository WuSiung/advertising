import request from '@/utils/request'

export async function fetchMarketType(media: FormData) {
    return request('/admin/dict/type/market_type', {
        method: 'get'
    })
}

export async function fetchTargetType(media: FormData) {
    return request('/admin/dict/type/target_type', {
        method: 'get'
    })
}

export async function fetchCountryTen(media: FormData) {
    return request('/ads/advcountry/getTen', {
        method: 'get'
    })
}