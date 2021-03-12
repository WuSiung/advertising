import { Effect, Reducer } from 'umi'
import { MaterialStateType } from './data';
import { getMediaTag, getTextTag, queryMediaList, queryTextList, uploadText } from './service'

interface MediaModelType {
    namespace: string,
    state: MaterialStateType,
    effects: {
        fetchMedias: Effect,
        fetchTexts: Effect,
        fetchMediaTags: Effect,
        fetchTextTags: Effect,
        uploadTexts: Effect,
    },
    reducers: {
        saveMedias: Reducer<MaterialStateType['mediaList']>,
        saveTexts: Reducer<MaterialStateType['textList']>,
        saveMediaTags: Reducer<MaterialStateType['mediaTags']>,
        saveTextTags: Reducer<MaterialStateType['textTags']>,
    }
}

const MediaModel: MediaModelType = {
    namespace: 'material',
    state: {
        mediaList: [],
        textList: [],
        mediaTags: [],
        textTags: [],
    },
    effects: {
        *fetchMedias({ payload }, { call, put, select }) {
            const response = yield call(queryMediaList, payload);
            let concatArr: any;
            if (payload.page > 1) {
                const { mediaList } = yield select((_: any) => _.material)
                concatArr = mediaList.concat(response.value.data)
            } else {
                concatArr = response.value.data
            }
            yield put({
                type: 'saveMedias',
                payload: { mediaList: concatArr }
            })
        },
        *fetchTexts({ payload }, { call, put, select }) {
            const response = yield call(queryTextList, payload);
            let concatArr: any;
            if (payload.page > 1) {
                const { textList } = yield select((_: any) => _.material)
                concatArr = textList.concat(response.value.data)
            } else {
                concatArr = response.value.data
            }
            yield put({
                type: 'saveTexts',
                payload: { textList: concatArr }
            })
        },
        *fetchMediaTags({ payload }, { call, put }) {
            const res = yield call(getMediaTag, payload)
            yield put({
                type: 'saveMediaTags',
                payload: { mediaTags: res.value.data || [] }
            })
        },
        *fetchTextTags({ payload }, { call, put }) {
            const res = yield call(getTextTag, payload)
            yield put({
                type: 'saveTextTags',
                payload: { textTags: res.value.data || [] }
            })
        },
        *uploadTexts({ payload }, { call }) {
            yield call(uploadText, payload);
        },
    },
    reducers: {
        saveMedias(state, { payload }) {
            return { ...state, ...payload }
        },
        saveTexts(state, { payload }) {
            return { ...state, ...payload }
        },
        saveMediaTags(state, { payload }) {
            return { ...state, ...payload }
        },
        saveTextTags(state, { payload }) {
            return { ...state, ...payload }
        }
    }
}

export default MediaModel