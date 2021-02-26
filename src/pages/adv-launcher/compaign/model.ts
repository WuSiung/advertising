import { Effect, Reducer } from 'umi';
import type { CompaignsData } from './data'
import { queryCompaigns } from './service'

export interface CompaignsModalType {
    namespace: string,
    state: CompaignsData,
    effects: {
        fetchCompaignsList: Effect,
    },
    reducers: {
        saveCompaignsList: Reducer<CompaignsData['compaignsList']>,
        saveCompaignChooseParams: Reducer<CompaignsData['compaignParams']>,
    }
}

const CompaignsModal: CompaignsModalType = {
    namespace: 'compaigns',
    state: {
        compaignsList: [],
        compaignParams: {
            budget: 0,
            spendNum: 0,
            appName: '',
        },
    },
    effects: {
        *fetchCompaignsList({payload}, { call, put }) {
            const response = yield call(queryCompaigns, payload)
            yield put({
                type: 'saveCompaignsList',
                payload: {compaignsList: response.data.records}
            })
        }
    },
    reducers: {
        saveCompaignsList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveCompaignChooseParams(state, { payload }) {
            return { ...state, ...payload }
        }
    }
}

export default CompaignsModal