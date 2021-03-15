import {TModelAdSelector} from "@/pages/automation/wizard/components/step3/ad-selector/data";
import {getAdList} from "@/pages/automation/wizard/components/step3/ad-selector/service";

const AdSelectorModel: TModelAdSelector = {
  namespace: 'adSelector',
  state: {
    adList: []
  },
  reducers: {
    updateAdList(state,{payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *getAdList({payload}, {call, put}) {
      const response = yield call(getAdList, payload);
      yield put({
        type: 'updateAdList',
        payload: {
          adList: response.data.records
        }
      });
    }
  }
}

export default AdSelectorModel;
