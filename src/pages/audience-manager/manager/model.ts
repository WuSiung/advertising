import { Effect, Reducer } from 'umi'
import { AudienceDataType, AudienceModelDetailType, InterestDataType, ManagerDataType } from './data'
import { queryAudiencetList, queryInterestList, queryAudienceModelList, queryAudienceModelDetail } from './service'

export interface ManagerModelType {
    namespace: string,
    state: ManagerDataType,
    effects: {
        fetchInterestList: Effect,
        fetchAudienceList: Effect,
        fetchAudienceModelList: Effect,
        fetchAudienceModelDetail: Effect,
        clearList: Effect
    },
    reducers: {
        saveInterestList: Reducer<ManagerDataType['interestList']>,
        saveAudienceList: Reducer<ManagerDataType['audienceList']>,
        saveIncludeList: Reducer<ManagerDataType['includeList']>,
        saveExcludeList: Reducer<ManagerDataType['excludeList']>,
        saveAudienceModel: Reducer<ManagerDataType['excludeList']>,
    }
}

const ManagerModel: ManagerModelType = {
    namespace: 'audienceManager',
    state: {
        interestList: [],
        audienceList: [],
        includeList: [],
        excludeList: [],
        modelList: []
    },
    effects: {
        *fetchInterestList({ payload }, { call, put, select }) {
            const response = yield call(queryInterestList, payload)

            // 更新列表时同步选择结果
            const { includeList, excludeList } = yield select((_: any) => _.audienceManager)
            const allIncludeIds = includeList.map((item: InterestDataType) => item.loveId)
            const allExcludeIds = excludeList.map((item: InterestDataType) => item.loveId)
            let list = response.data.records.map((item: InterestDataType) => {
                if (allIncludeIds.includes(item.loveId)) {
                    item.checked = true
                } else if (allExcludeIds.includes(item.loveId)) {
                    item.checked = false
                } else {
                    item.checked = undefined
                }
                return item
            })
            yield put({
                type: 'saveInterestList',
                payload: { interestList: list }
            })
        },
        *fetchAudienceList({ payload }, { call, put, select }) {
            const response = yield call(queryAudiencetList, payload)

            // 更新列表时同步选择结果
            const { includeList, excludeList } = yield select((_: any) => _.audienceManager)
            const allIncludeIds = includeList.map((item: AudienceDataType) => item.audienceId)
            const allExcludeIds = excludeList.map((item: AudienceDataType) => item.audienceId)
            let list = response.data.records.map((item: AudienceDataType) => {
                if (allIncludeIds.includes(item.audienceId)) {
                    item.checked = true
                } else if (allExcludeIds.includes(item.audienceId)) {
                    item.checked = false
                } else {
                    item.checked = undefined
                }
                return item
            })
            yield put({
                type: 'saveAudienceList',
                payload: { audienceList: list }
            })
        },
        *fetchAudienceModelList({ payload }, { call, put }) {
            const response = yield call(queryAudienceModelList, payload)
            yield put({
                type: 'saveAudienceModel',
                payload: { modelList: response.data.records }
            })
        },
        // 同时更新四个列表
        *fetchAudienceModelDetail({ payload }, { call, put, select }) {
            const response = yield call(queryAudienceModelDetail, payload)
            let inArr: any = [], exArr: any = [];
            response.data.map((item: AudienceModelDetailType) => {
                if (item.type == 0) {
                    if (item.stype == 0) {
                        inArr.push({ ...item, checked: true })
                    } else {
                        inArr.push({ audienceName: item.loveCname, checked: true, audienceId: item.loveId })
                    }
                } else if (item.type == 1) {
                    if (item.stype == 0) {
                        exArr.push({ ...item, checked: false })
                    } else {
                        exArr.push({ audienceName: item.loveCname, checked: false, audienceId: item.loveId })
                    }
                }
            })
            yield put({
                type: 'saveIncludeList',
                payload: { includeList: inArr }
            })
            yield put({
                type: 'saveExcludeList',
                payload: { excludeList: exArr }
            })

            // 更新列表时同步选择结果
            const { includeList, excludeList, interestList, audienceList } = yield select((_: any) => _.audienceManager)
            const allIncludeIds = includeList.map((item: InterestDataType) => item.loveId)
            const allExcludeIds = excludeList.map((item: InterestDataType) => item.loveId)
            let list = interestList.map((item: InterestDataType) => {
                if (allIncludeIds.includes(item.loveId)) {
                    item.checked = true
                } else if (allExcludeIds.includes(item.loveId)) {
                    item.checked = false
                } else {
                    item.checked = undefined
                }
                return item
            })
            // 更新列表时同步选择结果
            const allIncludeAudienceIds = includeList.map((item: AudienceDataType) => item.audienceId)
            const allExcludeAudienceIds = excludeList.map((item: AudienceDataType) => item.audienceId)
            let Audiencelist = audienceList.map((item: AudienceDataType) => {
                if (allIncludeAudienceIds.includes(item.audienceId)) {
                    item.checked = true
                } else if (allExcludeAudienceIds.includes(item.audienceId)) {
                    item.checked = false
                } else {
                    item.checked = undefined
                }
                return item
            })

            yield put({
                type: 'saveInterestList',
                payload: { interestList: list }
            })
            yield put({
                type: 'saveAudienceList',
                payload: { audienceList: Audiencelist }
            })
        },
        *clearList(_, {  put, select }) {
            yield put({
                type: 'saveIncludeList',
                payload: { includeList: [] }
            })
            yield put({
                type: 'saveExcludeList',
                payload: { excludeList: [] }
            })
            
            const { interestList, audienceList } = yield select((_: any) => _.audienceManager)
            let list = interestList.map((item: InterestDataType) => {
                item.checked = undefined
                return item
            })
            let Audiencelist = audienceList.map((item: AudienceDataType) => {
                item.checked = undefined
                return item
            })

            yield put({
                type: 'saveInterestList',
                payload: { interestList: list }
            })
            yield put({
                type: 'saveAudienceList',
                payload: { audienceList: Audiencelist }
            })
        },
    },
    reducers: {
        saveInterestList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAudienceList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveIncludeList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveExcludeList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAudienceModel(state, { payload }) {
            return { ...state, ...payload }
        },
    }
}

export default ManagerModel