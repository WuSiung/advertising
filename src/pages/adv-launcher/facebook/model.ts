import { Effect, Reducer } from 'umi';
import { FacebookStateType } from './data';
import { fetchCountryTen, fetchMarketType, fetchTargetType } from './service';

interface FacebookModelType {
    namespace: string,
    state: FacebookStateType,
    effects: {
        fetchCountry: Effect,
        fetchMarket: Effect,
        fetchTarget: Effect,
    },
    reducers: {
        saveTenCountry: Reducer<FacebookStateType['countryList']>,
        saveMarketType: Reducer<FacebookStateType['marketList']>,
        saveTargetType: Reducer<FacebookStateType['targetList']>,
    }
}

const FacebookModel: FacebookModelType = {
    namespace: 'facebook',
    state: {
        countryList: [],
        marketList: [],
        targetList: [],
    },
    effects: {
        *fetchCountry(_, { call, put }) {
            const res = yield call(fetchCountryTen)
            yield put({
                type: 'saveTenCountry',
                payload: { countryList: res.data }
            })
        },
        *fetchMarket(_, { call, put }) {
            const res = yield call(fetchMarketType)
            yield put({
                type: 'saveTenCountry',
                payload: { marketList: res.data }
            })
        },
        *fetchTarget(_, { call, put }) {
            const res = yield call(fetchTargetType)
            yield put({
                type: 'saveTenCountry',
                payload: { targetList: res.data }
            })
        },
    },
    reducers: {
        saveTenCountry(state, { payload }) {
            return { ...state, ...payload }
        },
        saveMarketType(state, { payload }) {
            return { ...state, ...payload }
        },
        saveTargetType(state, { payload }) {
            return { ...state, ...payload }
        },
    }
}

export default FacebookModel