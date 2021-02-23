import { Effect, Reducer } from 'umi'
import { CrowdStateType } from './data';
import { queryAudienceModelList } from '../manager/service';

export interface ManagerModelType {
    namespace: string,
    state: CrowdStateType,
    effects: {
        fetchCrowdsList: Effect,
    },
    reducers: {
        saveCrowdsList: Reducer<CrowdStateType['crowdsList']>,
    }
}

const CrowdsModel: ManagerModelType = {
    namespace: 'crowds',
    state: {
        crowdsList: []
    },
    effects: {
        *fetchCrowdsList({ payload }, { call, put }) {
            const res = yield call(queryAudienceModelList, payload)
            yield put({
                type: 'saveCrowdsList',
                payload: { crowdsList: res.data.records }
            })
        }
    },
    reducers: {
        saveCrowdsList(state, { payload }) {
            return { ...state, ...payload }
        }
    }
}

export default CrowdsModel