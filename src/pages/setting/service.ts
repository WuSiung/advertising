import request from '@/utils/request'

export async function editPwdApi(params: { newpassword1: string, password: string, username: string }) {
    return request('/admin/user/edit', {
        method: 'put',
        data: params
    })
}