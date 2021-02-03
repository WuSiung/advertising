import { LoginAndRegisterPublicType } from '@/models/login';
import { postUserRegisterParams } from '@/services/register';
import { encryption } from '@/utils/utils';
import { Effect, history } from 'umi';


export type RegisterModelType = {
    namespace: string,
    state?: string,
    effects: {
        register: Effect
    }
}

const Modal: RegisterModelType = {
    namespace: 'register',
    state: '1',
    effects: {
        *register({ payload }, { call, put }) {
            const registerPublicParams: LoginAndRegisterPublicType = {
                grant_type: 'password',
                scope: 'server'
            }
            const registerParams = encryption({ data: payload, key: 'thanks,pig4cloud', param: ['password'] })

            let response = yield call(postUserRegisterParams, { ...registerParams, ...registerPublicParams })
            if (response.code == 0) {
                history.replace('/user/login')
            }
        }
    }
}

export default Modal