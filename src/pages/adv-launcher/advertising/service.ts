import request from '@/utils/request'

export async function queryAdvList(params: any){
    return request('/ads/advimg/existAds',{
        method: 'get',
        params
    });
}