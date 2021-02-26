import request from '@/utils/request'

export async function postLauncherAdv(params: { data: string }) {
    return request('/ads/advadv/batchAdv', {
        method: 'post',
        data: params
    })
}
