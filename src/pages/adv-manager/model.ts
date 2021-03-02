import {AdvData, AdvPackListType, AdvSetListType, AdvAdvListType} from "./data";
import {Effect, Reducer} from "@@/plugin-dva/connect";
import {
    qureyAdvPark,
    queryAdvSet,
    queryAdvAdv,
    queryAdvSetForTreeView,
    queryAdvAdvForTreeView,
    advAdv,
    advPack,
    advSet
} from "./service";

export interface AdvModalType {
    namespace: string,
    state: AdvData,
    effects: {
        fetchAdvPackList: Effect,
        fetchAdvSetList: Effect,
        fetchAdvAdvList: Effect,
        fetchAdvSetListForTreeView: Effect,
        fetchAdvAdvListForTreeView: Effect,
        advAdv: Effect,
        advSet: Effect,
        advPack: Effect
    },
    reducers: {
        saveAdvPackList: Reducer<AdvData>,
        saveAdvPackTotal: Reducer<AdvData>,
        saveAdvSetList: Reducer<AdvData>,
        saveAdvSetTotal: Reducer<AdvData>,
        saveAdvAdvList: Reducer<AdvData>,
        saveAdvAdvTotal: Reducer<AdvData>,
        saveAdvSetListForTreeView: Reducer<AdvData>,
        saveAdvAdvListForTreeView: Reducer<AdvData>
    }
}

const AdvModal: AdvModalType = {
    namespace: 'adv',
    state: {
        advPackList: [],
        advPackTotal: 0,
        advSetList: [],
        advSetTotal: 0,
        advAdvList: [],
        advAdvTotal: 0,
        advSetListForTreeView: [],
        advAdvListForTreeView: []
    },
    effects: {
        * fetchAdvPackList({payload, callback}, {call, put}) {
            const response = yield call(qureyAdvPark, payload)
            yield put({
                type: 'saveAdvPackList',
                payload: {advPackList: response.data.records}
            })
            yield put({
                type: 'saveAdvPackTotal',
                payload: {advPackTotal: response.data.total}
            })
        },
        * fetchAdvSetList({payload, callback}, {call, put}) {
            const response = yield call(queryAdvSet, payload)
            yield put({
                type: 'saveAdvSetList',
                payload: {advSetList: response.data.records}
            })
            yield put({
                type: 'saveAdvSetTotal',
                payload: {advSetTotal: response.data.total}
            })
        },
        * fetchAdvAdvList({payload, callback}, {call, put}) {
            const response = yield call(queryAdvAdv, payload)
            yield put({
                type: 'saveAdvAdvList',
                payload: {advAdvList: response.data.records}
            })
            yield put({
                type: 'saveAdvAdvTotal',
                payload: {advAdvTotal: response.data.total}
            })
        },
        * fetchAdvSetListForTreeView({payload, callback}, {call, put}) {
            const response = yield call(queryAdvSetForTreeView, payload);
            yield put({
                type: 'saveAdvSetListForTreeView',
                payload: {advSetListForTreeView: response.data.records}
            })
            return response.data.records;
        },
        * fetchAdvAdvListForTreeView({payload, callback}, {call, put}) {
            const response = yield call(queryAdvAdvForTreeView, payload);
            yield put({
                type: 'saveAdvAdvListForTreeView',
                payload: {advAdvListForTreeView: response.data.records}
            })
            return response.data.records;
        },
        * advAdv({payload, callback}, {call, put, select}) {
            const advAdvList = yield select((state: { adv: { advAdvList: AdvData["advAdvList"] }; }) => {
                return state.adv.advAdvList;
            });
            let response: { code?: number } = {};
            const advAdvItem = advAdvList.find((advAdv: AdvAdvListType) => advAdv.advId === payload.advId);
            try {
                advAdvItem.loading = true;
                yield put({
                    type: 'saveAdvAdvList',
                    payload: {advAdvList: [...advAdvList]}
                });
                response = yield call(advAdv, payload);
                if (response.code === 0) {
                    advAdvItem.state = payload.state;
                }
                advAdvItem.loading = false;
                yield put({
                    type: 'saveAdvAdvList',
                    payload: {advAdvList: [...advAdvList]}
                });
            } catch {
                advAdvItem.loading = false;
                yield put({
                    type: 'saveAdvAdvList',
                    payload: {advAdvList: [...advAdvList]}
                });
            }
            return response.code;
        },
        * advSet({payload, callback}, {call, put, select}) {
            const advSetList = yield select((state: { adv: { advSetList: AdvData["advSetList"] }; }) => {
                return state.adv.advSetList;
            });
            const advSetItem = advSetList.find((advset: AdvSetListType) => advset.setId === payload.setId);
            let response: { code?: number } = {};
            try {
                advSetItem.loading = true;
                yield put({
                    type: 'saveAdvSetList',
                    payload: {advSetList: [...advSetList]}
                });
                response = yield call(advSet, payload);
                if (response.code === 0) {
                    advSetItem.state = payload.state;
                }
                advSetItem.loading = false;
                yield put({
                    type: 'saveAdvSetList',
                    payload: {advSetList: [...advSetList]}
                });
            } catch {
                advSetItem.loading = false;
                yield put({
                    type: 'saveAdvSetList',
                    payload: {advSetList: [...advSetList]}
                });
            }
            return response.code;
        },
        advPack: function* ({payload, callback}, {call, put, select}) {
            const advPackList = yield select((state: { adv: { advPackList: AdvData["advPackList"] }; }) => {
                return state.adv.advPackList;
            });
            const advPackItem = advPackList.find((advPack: AdvPackListType) => advPack.packId === payload.packId);
            let response: { code?: number } = {};
            try {
                advPackItem.loading = true;
                yield put({
                    type: 'saveAdvPackList',
                    payload: {advPackList: [...advPackList]}
                });
                response = yield call(advPack, payload);
                if (response.code === 0) {
                    advPackItem.state = payload.state;
                }
                advPackItem.loading = false;
                yield put({
                    type: 'saveAdvPackList',
                    payload: {advPackList: [...advPackList]}
                });
            }catch (e){
                advPackItem.loading = false;
                yield put({
                    type: 'saveAdvPackList',
                    payload: {advPackList: [...advPackList]}
                });
            }
            return response.code;
        }
    },
    reducers: {
        saveAdvPackList(state, {payload}) {
            return {...state, ...payload}
        },
        saveAdvPackTotal(state, {payload}) {
            return {...state, ...payload}
        },
        saveAdvSetList(state, {payload}) {
            return {...state, ...payload}
        },
        saveAdvSetTotal(state, {payload}) {
            return {...state, ...payload}
        },
        saveAdvAdvList(state, {payload}) {
            return {...state, ...payload}
        },
        saveAdvAdvTotal(state, {payload}) {
            return {...state, ...payload}
        },
        saveAdvSetListForTreeView(state, {payload}) {
            return {...state, ...payload}
        },
        saveAdvAdvListForTreeView(state, {payload}) {
            return {...state, ...payload}
        },

    }
}

export default AdvModal