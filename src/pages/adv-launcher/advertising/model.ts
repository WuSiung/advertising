import { queryAdvAdv } from '@/pages/adv-manager/service';
import { Effect, Reducer } from 'umi';
import { AdvModelStateType } from './data';
import { queryAdvList } from './service';

interface AdverModelType {
    namespace: string,
    state: AdvModelStateType,
    effects: {
        fetchAdvList: Effect,
        fetchAdvListAddMore:Effect
    },
    reducers: {
        saveAdvLis: Reducer,
        saveAdvListAddMore:Reducer
    }
}

const AdverModel: AdverModelType = {
    namespace: 'advertising',
    state: {
        advertisingList: [],
        count:0
    },
    effects: {
        *fetchAdvList({payload}, { call, put }) {
            const res = yield call(queryAdvList, payload)
            yield put({
                type: 'saveAdvLis',
                payload: {advertisingList: res.data.records}
            })
            // yield put({
            //     type: 'saveAdvLis',
            //     payload: {count: res.data.total}
            // })
        },
        *fetchAdvListAddMore({payload}, { call, put }) {
            const res = yield call(queryAdvList, payload)
            yield put({
                type: 'saveAdvListAddMore',
                payload: {advertisingList: res.data}
            });
            yield put({
                type: 'saveAdvLis',
                payload: {count: res.data.total}
            })
        }
    },
    reducers: {
        saveAdvLis(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvListAddMore(state, { payload }) {
            const st= state;
            st.advertisingList= st.advertisingList.concat(payload.advertisingList);
            return { ...st }
        }
    }
}

export default AdverModel