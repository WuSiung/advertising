import {TModelAdSetSelector} from "@/pages/automation/wizard/components/step3/ad-set-selector/data";
import {getAdSetList} from "@/pages/automation/wizard/components/step3/ad-set-selector/service";

const AdSetSelectorModel: TModelAdSetSelector = {
  namespace: 'adSetSelector',
  state: {
    adSetList: []
  },
  reducers: {
    updateAdSetList(state,{payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *getAdSetList({payload}, {call, put}) {
      const response = yield call(getAdSetList, payload);
      yield put({
        type: 'updateAdSetList',
        payload: {
          adSetList: response.data.records
        }
      });
    }
  }
}

export default AdSetSelectorModel;
