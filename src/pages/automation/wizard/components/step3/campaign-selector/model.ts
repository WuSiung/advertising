import {TModelCampaignSelector} from "@/pages/automation/wizard/components/step3/campaign-selector/data";
import {getCampaignList} from "@/pages/automation/wizard/components/step3/campaign-selector/service";

const CampaignSelectorModel: TModelCampaignSelector = {
  namespace: 'campaignSelector',
  state: {
    total: 0,
    current: 1,
    campaignList: []
  },
  reducers: {
    updateCampaignList(state,{payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *getCampaignList({payload}, {call, put}) {
      const response = yield call(getCampaignList, payload);
      yield put({
        type: 'updateCampaignList',
        payload: {
          total: response.data.total,
          current: response.data.current,
          campaignList: response.data.records
        }
      });
    }
  }
}

export default CampaignSelectorModel;
