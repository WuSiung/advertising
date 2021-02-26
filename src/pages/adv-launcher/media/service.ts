import request from '@/utils/request'

export async function queryMediaList(params: { size: number, page: number, id: number }) {
    return request(`/subApi/resources/permanent/media/${params.id}/${params.page}/${params.size}`)
}

export async function deletResource(id: string) {
    return request(`/subApi/resources/permanent/${id}`, { method: 'DELETE' })
}

export async function createContainer(params: { id: number, description: string, title: string }) {
    const { id, ...ohterParams } = params
    return request(`/subApi//resources/permanent/${id}`, {
        method: 'POST',
        data: ohterParams
    })
}

export async function uploadMedia(params: { media: FormData, id: string }) {
    const { id, media } = params
    return request(`/subApi/resources/permanent/${id}/media`, {
        method: 'POST',
        data: media
    })
}

export async function uploadText(params: {userId: number|string, arr: { title: string; text: string; id: string; }[]}) {
    const { userId, arr } = params
    return request(`/subApi/resources/permanent/${userId}/text`, {
        method: 'PUt',
        data: arr
    })
}

export async function queryTextList(params: { size: number, page: number, id: number }) {
    return request(`/subApi/resources/permanent/text/${params.id}/${params.page}/${params.size}`)
}
