import request from '@/utils/request'

export async function queryAdvList(params: any){
    return request('/ads/advcreativedata/page',{
        method: 'get',
        params
    });
}