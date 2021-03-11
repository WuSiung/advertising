import { Effect, Reducer } from 'umi'
import { MaterialStateType } from './data';
import { getAllTag, queryMediaList, queryTextList, uploadText } from './service'

interface MediaModelType {
    namespace: string,
    state: MaterialStateType,
    effects: {
        fetchMedias: Effect,
        fetchTexts: Effect,
        fetchTags: Effect,
        uploadTexts: Effect,
    },
    reducers: {
        saveMedias: Reducer<MaterialStateType['mediaList']>,
        saveTexts: Reducer<MaterialStateType['textList']>,
        saveTagList: Reducer<MaterialStateType['tagList']>,
    }
}

const MediaModel: MediaModelType = {
    namespace: 'material',
    state: {
        mediaList: [],
        textList: [],
        tagList: [],
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
        *fetchTags(_, { call, put }) {
            const res = yield call(getAllTag)
            yield put({
                type: 'saveTagList',
                payload: { tagList: res.value }
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
        saveTagList(state, { payload }) {
            return { ...state, ...payload }
        }
    }
}

export default MediaModel