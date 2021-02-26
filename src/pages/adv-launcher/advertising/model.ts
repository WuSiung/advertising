import { queryAdvAdv } from '@/pages/adv-manager/service';
import { Effect, Reducer } from 'umi';
import { AdvModelStateType } from './data';

interface AdverModelType {
    namespace: string,
    state: AdvModelStateType,
    effects: {
        fetchAdvList: Effect
    },
    reducers: {
        saveAdvLis: Reducer
    }
}

const AdverModel: AdverModelType = {
    namespace: 'advertising',
    state: {
        advertisingList: []
    },
    effects: {
        *fetchAdvList({payload}, { call, put }) {
            const res = yield call(queryAdvAdv, payload)
            yield put({
                type: 'saveAdvLis',
                payload: {advertisingList: res.data.records}
            })
        }
    },
    reducers: {
        saveAdvLis(state, { payload }) {
            return { ...state, ...payload }
        }
    }
}

export default AdverModel