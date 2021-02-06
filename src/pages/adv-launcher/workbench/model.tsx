import { Effect, Reducer } from 'umi';
import { WorkbenchDataType, PostMediaDataType } from './data.d'
import { postTextsToWorkbench, queryAllList, uploadMediaToWorkbench } from './service'

export interface WorkbenchModalType {
    namespace: string,
    state: WorkbenchDataType,
    effects: {
        fetchAllList: Effect,
        uploadFile: Effect,
        uploadText: Effect,
    },
    reducers: {
        saveImgList: Reducer<WorkbenchDataType>,
        saveTextList: Reducer<WorkbenchModalType>,
        savePreviewAdvs: Reducer<WorkbenchModalType>,
    }
}

const initSate: WorkbenchDataType = {
    uploadImgList: [],
    uploadTextList: [],
    previewAdvs: [],
    templateDetailData: undefined,
    templateList: []
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
            yield call(postTextsToWorkbench, {data: JSON.stringify(payload)})
        }
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
    }
}

export default WorkbenchModal