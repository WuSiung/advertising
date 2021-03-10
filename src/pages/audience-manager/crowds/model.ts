import { Effect, Reducer } from 'umi'
import { CrowdStateType } from './data';
import { queryAudienceModelList } from '../manager/service';
import { queryBaseCrowd } from './service';

export interface ManagerModelType {
    namespace: string,
    state: CrowdStateType,
    effects: {
        fetchCrowdsList: Effect,
    },
    reducers: {
        saveCustomCrowd: Reducer<CrowdStateType['customCrowd']>,
        saveBaseCrowd: Reducer<CrowdStateType['baseCrowd']>,
        setTitle: Reducer<CrowdStateType>,
        saveAllCrowd: Reducer<CrowdStateType['allCrowds']>,
        setKinds: Reducer<CrowdStateType>,
    }
}

const CrowdsModel: ManagerModelType = {
    namespace: 'crowds',
    state: {
        customCrowd: [],
        baseCrowd: [],
        title: '全部',
        allCrowds: {
            custom: [],
            base: [],
        },
        kinds: 'all'
    },
    effects: {
        *fetchCrowdsList({ payload }, { call, put }) {
            const res = yield call(queryAudienceModelList, payload)
            const baseRes = yield call(queryBaseCrowd, payload)
            yield put({
                type: 'saveCustomCrowd',
                payload: { customCrowd: res.data.records }
            })
            yield put({
                type: 'saveBaseCrowd',
                payload: { baseCrowd: baseRes.data.records }
            })
            yield put({
                type: 'saveAllCrowd',
                payload: { allCrowds: { custom: res.data.records, base: baseRes.data.records } }
            })
        }
    },
    reducers: {
        saveCustomCrowd(state, { payload }) {
            return { ...state, ...payload }
        },
        saveBaseCrowd(state, { payload }) {
            return { ...state, ...payload }
        },
        setTitle(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAllCrowd(state, { payload }) {
            return { ...state, ...payload }
        },
        setKinds(state, { payload }) {
            return { ...state, ...payload }
        },

    }
}

export default CrowdsModel