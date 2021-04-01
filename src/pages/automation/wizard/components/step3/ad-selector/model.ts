import {TAd, TModelAdSelector} from "@/pages/automation/wizard/components/step3/ad-selector/data";
import {getAdList} from "@/pages/automation/wizard/components/step3/ad-selector/service";

const AdSelectorModel: TModelAdSelector = {
  namespace: 'adSelector',
  state: {
    total: 0,
    current: 1,
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
          total: response.data.total,
          current: response.data.current,
          adList: response.data.records
        }
      });
    }
  }
}

export default AdSelectorModel;
