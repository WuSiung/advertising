import {AdvData} from "./data";
import { Effect, Reducer} from "@@/plugin-dva/connect";
import {qureyAdvPark,queryAdvSet,queryAdvAdv,queryAdvSetForTreeView,queryAdvAdvForTreeView,advAdv,advPack,advSet} from "./service";

export interface AdvModalType {
    namespace: string,
    state: AdvData,
    effects: {
        fetchAdvPackList: Effect,
        fetchAdvSetList: Effect,
        fetchAdvAdvList: Effect,
        fetchAdvSetListForTreeView:Effect,
        fetchAdvAdvListForTreeView:Effect,
        advAdv:Effect,
        advSet:Effect,
        advPack:Effect
    },
    reducers: {
        saveAdvPackList: Reducer<AdvData>,
        saveAdvPackTotal: Reducer<AdvData>,
        saveAdvSetList: Reducer<AdvData>,
        saveAdvSetTotal: Reducer<AdvData>,
        saveAdvAdvList: Reducer<AdvData>,
        saveAdvAdvTotal: Reducer<AdvData>,
        saveAdvSetListForTreeView:Reducer<AdvData>,
        saveAdvAdvListForTreeView:Reducer<AdvData>
    }
}

const AdvModal: AdvModalType = {
    namespace: 'adv',
    state: {
        advPackList:[],
        advPackTotal:0,
        advSetList:[],
        advSetTotal:0,
        advAdvList:[],
        advAdvTotal:0,
        advSetListForTreeView:[],
        advAdvListForTreeView:[]
    },
    effects: {
        *fetchAdvPackList({payload,callback}, { call, put }) {
            const response = yield call(qureyAdvPark,payload)
            yield put({
                type: 'saveAdvPackList',
                payload: {advPackList: response.data.records}
            })
            yield put({
                type: 'saveAdvPackTotal',
                payload: {advPackTotal: response.data.total}
            })
        },
        *fetchAdvSetList({payload,callback}, { call, put }) {
            const response = yield call(queryAdvSet,payload)
            yield put({
                type: 'saveAdvSetList',
                payload: {advSetList: response.data.records}
            })
            yield put({
                type: 'saveAdvSetTotal',
                payload: {advSetTotal: response.data.total}
            })
        },
        *fetchAdvAdvList({payload,callback}, { call, put }) {
            const response = yield call(queryAdvAdv,payload)
            yield put({
                type: 'saveAdvAdvList',
<<<<<<< HEAD
                payload: {advAdvList: response.data.records}
            })
            yield put({
                type: 'saveAdvAdvTotal',
                payload: {advAdvTotal: response.data.total}
=======
                payload: {advSetList: response.data.records}
            })
            yield put({
                type: 'saveAdvAdvTotal',
                payload: {advSetTotal: response.data.total}
>>>>>>> 07ff2a7 (feat:广告管理功能)
            })
        },
        *fetchAdvSetListForTreeView({payload,callback}, { call, put }) {
            const response = yield call(queryAdvSetForTreeView,payload);
            yield put({
                type: 'saveAdvSetListForTreeView',
                payload: {advSetListForTreeView: response.data.records}
            })
            return response.data.records;
        },
        *fetchAdvAdvListForTreeView({payload,callback}, { call, put }) {
            const response = yield call(queryAdvAdvForTreeView,payload);
            yield put({
                type: 'saveAdvAdvListForTreeView',
                payload: {advAdvListForTreeView: response.data.records}
            })
            return response.data.records;
        },
        *advAdv({payload,callback}, { call, put }) {
            try{
                const response = yield call(advAdv,payload);
                return response.data;
            }catch (e){
                return null;
            }
        },
        *advSet({payload,callback}, { call, put }) {
            try{
                const response = yield call(advSet,payload);
                return response.data;
            }catch (e){
                return null;
            }
        },
        *advPack({payload,callback}, { call, put }) {
            try{
                const response = yield call(advPack,payload);
                return response.data;
            }catch (e){
                return null;
            }
        }
    },
    reducers: {
        saveAdvPackList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvPackTotal(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvSetList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvSetTotal(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvAdvList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvAdvTotal(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvSetListForTreeView(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvAdvListForTreeView(state, { payload }) {
            return { ...state, ...payload }
        },

    }
}

export default AdvModal