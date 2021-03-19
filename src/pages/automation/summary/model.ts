import {TModelTacticSummary} from "@/pages/automation/summary/data";
import {getActionObjList, getTacticList} from "@/pages/automation/summary/service";

const TacticSummaryModel: TModelTacticSummary = {
  namespace: 'tacticSummary',
  state: {
    tacticList: []
  },
  reducers: {
    updateTacticList(state, { payload }) {
      // console.log('updateTacticList', payload);
      return {
        ...state,
        ...payload
      }
    },
    updateObjInfo(state, { payload }) {
      if (state?.tacticList) {
        const r = state?.tacticList.find(t => t.ObjectID === payload.objectID);
        if (r) {
          r.AdvObjs.forEach((o, idx) => {
            r.AdvObjs[idx].ObjName = payload.objNames[idx]
          })
          r.IsLoaded = true;
        }
      }
      return {
        ...state
      }
    }
  },
  effects: {
    *getTacticList({payload}, {call, put}) {
      const response = yield call(getTacticList, payload);
      // todo: put
      yield put({
        type: 'updateTacticList',
        payload: {
          tacticList: response.data.tacticList,
        },
      });
    },
    *getObjInfo({payload}, {call, put}) {
      const response = yield call(getActionObjList, payload);
      yield put({
        type: 'updateObjInfo',
        payload: {
          ...payload,
          objNames: response
        }
      })

    }
  }
}

export default TacticSummaryModel
