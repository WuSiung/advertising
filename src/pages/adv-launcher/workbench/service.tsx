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

export async function postOneRecordToWorkbench(params: PostMediaDataType) {
    return request('/ads/advimg', {
        method: 'post',
        data: { type: params.type || 0, fileId: params.id, url: params.link, md5: params.md5Hex }
    })
}

export async function postOneTextsToWorkbench(data: { content: string, title: string }) {
    return request('/ads/advtext', {
        method: 'post',
        data: data
    })
}

export async function editText(params: { content: string, title: string, textId: number }) {
    return request('/ads/advtext', {
        method: 'put',
        data: params
    })
}

export async function postTextsToWorkbench(data: { data: string }) {
    return request('/ads/advtext/batchSave', {
        method: 'post',
        data: data
    })
}

export async function postMediasToWorkbench(data: { data: string }) {
    return request('/ads/advimg/batchSave', {
        method: 'post',
        data: data
    })
}

export async function saveTemp(params: { imgStr: string, relStr: string, templateName: string, textStr: string }) {
    return request('/ads/advtemplate/saveTemplate', {
        method: 'post',
        data: params
    })
}

export async function queryTemplate() {
    return request('/ads/advtemplate/page')
}

export async function deleteTemplate(id: string | number) {
    return request('/ads/advtemplate/' + id, {
        method: 'delete'
    })
}

export async function getTempDetail(id: string | number) {
    return request('/ads/advtemplate/' + id)
}

export async function clearAllMaterial() {
    return request('/ads/advimg/recentAllClear')
}

export async function deleteMedia(id: number | string) {
    return request('/ads/advimg/' + id, {
        method: 'DELETE'
    })
}

export async function deleteText(id: number | string) {
    return request('/ads/advtext/' + id, {
        method: 'DELETE'
    })
}