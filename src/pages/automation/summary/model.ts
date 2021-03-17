import {TModelTacticSummary} from "@/pages/automation/summary/data";
import { getTacticList } from "@/pages/automation/summary/service";

const TacticSummaryModel: TModelTacticSummary = {
  namespace: 'tacticSummary',
  state: {
    tacticList: []
  },
  reducers: {
    updateTacticList(state, { payload }) {
      console.log('updateTacticList', payload);
      return {
        ...state,
        ...payload
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
    }
  }
}

export default TacticSummaryModel
