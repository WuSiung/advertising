import {TModelCampaignSelector} from "@/pages/automation/wizard/components/step3/campaign-selector/data";
import {getCampaignList} from "@/pages/automation/wizard/components/step3/campaign-selector/service";

const CampaignSelectorModel: TModelCampaignSelector = {
  namespace: 'campaignSelector',
  state: {
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
          campaignList: response.data.records
        }
      });
    }
  }
}

export default CampaignSelectorModel;
