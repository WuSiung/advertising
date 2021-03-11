import {TTacticWizardModel} from "@/pages/automation/wizard/data";
import { createTactic} from "@/pages/automation/wizard/service";

const TacticWizardModel: TTacticWizardModel = {
  namespace: 'tacticWizard',
  state: {
    Name: '',
    PlatformId: '',
    ActionInfo: '',
    ActionObj: [],
    Access: undefined,
    ActionType: undefined
  },
  effects: {
    *createTactic({ payload }, { call, put }) {
      yield call(createTactic, payload);
    }
  }
}

export default TacticWizardModel;
