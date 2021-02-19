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
        saveCompaignsList: Reducer<CompaignsData>,
    }
}

const CompaignsModal: CompaignsModalType = {
    namespace: 'compaigns',
    state: {
        compaignsList: []
    },
    effects: {
        *fetchCompaignsList(_, { call, put }) {
            const response = yield call(queryCompaigns)
            yield put({
                type: 'saveCompaignsList',
                payload: response.data.records
            })
        }
    },
    reducers: {
        saveCompaignsList(state, { payload }) {
            return { ...state, ...{ compaignsList: payload } }
        }
    }
}

export default CompaignsModal