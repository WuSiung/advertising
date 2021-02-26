import {AdvData} from "./data";
import { Effect, Reducer} from "@@/plugin-dva/connect";
import {qureyAdvPark,queryAdvSetForTreeView,queryAdvAdvForTreeView,advAdv,advPack,advSet} from "./service";

export interface AdvModalType {
    namespace: string,
    state: AdvData,
    effects: {
        fetchAdvPackList: Effect,
        fetchAdvSetListForTreeView:Effect,
        fetchAdvAdvListForTreeView:Effect,
        advAdv:Effect,
        advSet:Effect,
        advPack:Effect
    },
    reducers: {
        saveAdvPackList: Reducer<AdvData>,
        saveAdvPackTotal: Reducer<AdvData>,
        saveAdvSetListForTreeView:Reducer<AdvData>,
        saveAdvAdvListForTreeView:Reducer<AdvData>
    }
}

const AdvModal: AdvModalType = {
    namespace: 'adv',
    state: {
        advPackList:[],
        advPackTotal:0,
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
        saveAdvSetListForTreeView(state, { payload }) {
            return { ...state, ...payload }
        },
        saveAdvAdvListForTreeView(state, { payload }) {
            return { ...state, ...payload }
        },

    }
}

export default AdvModal