import request from '@/utils/request'
import { PostMediaDataType } from './data'

export async function queryAllList() {
    return request('/ads/advimg/recentAll')
}

export async function uploadMediaToWorkbench(media: FormData) {
    return request('/subApi/resources/temp/media', {
        method: 'post',
        data: media
    })
}

export async function postOneRecordToWorkbench(params:PostMediaDataType) {
    return request('/ads/advimg', {
        method: 'post',
        data: {type: 0, fileId: params.id, url: params.link}
    })
}