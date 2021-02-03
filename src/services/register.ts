import request from '@/utils/request';

export type RegisterParamsType = {
    companyName: string,
    password: string,
    confirmPwd: string,
    phone: string,
    username: string,
    code: string,
    randomStr: string
}

export async function postUserRegisterParams(params: RegisterParamsType) {
    const { code, randomStr, confirmPwd, ...otherParams } = params
    return request(`/admin/user/registUser`, {
        method: 'POST',
        params: { code, randomStr },
        data: { ...otherParams, isToken: false }
      })
}