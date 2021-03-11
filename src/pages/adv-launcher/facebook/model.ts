import { Effect, Reducer } from 'umi';
import { FacebookStateType } from './data';
import { fetchCountryTen, fetchMarketType, fetchTargetType } from './service';
import { allCountry, CountryType } from '@/utils/countrys'

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
            let countryLog = res.data.map((item: any) => item.countryId.toUpperCase()) // 记录中的国家code
            let tempCountrys = allCountry.filter(item => countryLog.includes(item.code)) // 记录中的国家信息
            let otherCountrys = allCountry.filter(item => !countryLog.includes(item.code)) // 不在记录中的国家
            let arr: CountryType[] = []
            countryLog.map((item: any) => { // 排序
                tempCountrys.map(tempItem => {
                    if (item == tempItem.code) {
                        arr.push(tempItem)
                    }
                })
            })
            yield put({
                type: 'saveTenCountry',
                payload: { countryList: arr.concat(otherCountrys) }
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