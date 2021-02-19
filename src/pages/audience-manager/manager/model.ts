import { Effect, Reducer } from 'umi'
import { ManagerDataType } from './data'
import { queryAudiencetList, queryInterestList } from './service'

export interface ManagerModelType {
    namespace: string,
    state: ManagerDataType,
    effects: {
        fetchInterestList: Effect,
        fetchAudienceList: Effect
    },
    reducers: {
        saveInterestList: Reducer<ManagerDataType['interestList']>,
        saveAudienceList: Reducer<ManagerDataType['audienceList']>
    }
}

const ManagerModel: ManagerModelType = {
    namespace: 'audienceManager',
    state: {
        interestList: [],
        audienceList: [],
    },
    effects: {
        *fetchInterestList(_, { call, put }) {
            const response = yield call(queryInterestList)
            yield put({
                type: 'saveInterestList',
                payload: { interestList: response.data.records }
            })
        },
        *fetchAudienceList(_, { call, put }) {
            const response = yield call(queryAudiencetList)
            yield put({
                type: 'saveAudienceList',
                payload: { audienceList: response.data.records }
            })
        }
    },
    reducers: {
        saveInterestList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAudienceList(state, { payload }) {
            return { ...state, ...payload }
        },
    }
}

export default ManagerModel