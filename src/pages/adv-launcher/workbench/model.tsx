import { Effect, Reducer } from 'umi';
import { WorkbenchDataType, PostMediaDataType } from './data.d'
import { clearAllMaterial, postTextsToWorkbench, queryAllList, queryTemplate, saveTemp, uploadMediaToWorkbench } from './service'

export interface WorkbenchModalType {
    namespace: string,
    state: WorkbenchDataType,
    effects: {
        fetchAllList: Effect,
        uploadFile: Effect,
        uploadText: Effect,
        saveTemp: Effect,
        queryTemp: Effect,
        clearWorkbench: Effect,
    },
    reducers: {
        saveImgList: Reducer<WorkbenchDataType>,
        saveTextList: Reducer<WorkbenchModalType>,
        savePreviewAdvs: Reducer<WorkbenchModalType>,
        saveTempList: Reducer<WorkbenchModalType>,
    }
}

const initSate: WorkbenchDataType = {
    uploadImgList: [],
    uploadTextList: [],
    previewAdvs: [],
    templateDetailData: undefined,
    templateList: [],
    savePreviewAdvsRecord: []
}

const WorkbenchModal: WorkbenchModalType = {
    namespace: 'workbench',
    state: initSate,
    effects: {
        *fetchAllList(_, { call, put }) {
            const response = yield call(queryAllList)
            yield put({
                type: 'saveImgList',
                payload: { uploadImgList: response.data.img || [] }
            })
            yield put({
                type: 'saveTextList',
                payload: { uploadTextList: response.data.text || [] }
            })
        },
        *uploadFile({ payload }, { call }) {
            const response: any = yield call(uploadMediaToWorkbench, payload)
            return response.value
        },
        *uploadText({ payload }, { call }) {
            yield call(postTextsToWorkbench, { data: JSON.stringify(payload) })
        },
        *saveTemp({ payload }, { call }) {
            yield call(saveTemp, payload)
        },
        *queryTemp(_, { call, put }) {
            const response = yield call(queryTemplate)
            yield put({
                type: 'saveTempList',
                payload: { templateList: response.data.records }
            })
        },
        *clearWorkbench(_, { call, put }) {
            const response = yield call(clearAllMaterial)
            if (response.data) {
                yield put({
                    type: 'saveImgList',
                    payload: { uploadImgList: [] }
                })
                yield put({
                    type: 'saveTextList',
                    payload: { uploadTextList: [] }
                })
            }
        },
    },
    reducers: {
        saveImgList(state, { payload }) {
            return { ...state, ...payload }
        },
        saveTextList(state, { payload }) {
            return { ...state, ...payload }
        },
        savePreviewAdvs(state, { payload }) {
            // 数据深拷贝
            let newParams = JSON.parse(JSON.stringify(payload))
            return { ...state, ...newParams }
        },
        saveTempList(state, { payload }) {
            return { ...state, ...payload }
        },
    }
}

export default WorkbenchModal