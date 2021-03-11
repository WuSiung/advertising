import { TStateSurfCampaign, TSurfCampaignModel } from "@/pages/automation/wizard/components/step2/surf-campaign/data";
import moment from 'moment';

const TACTIC_NAME = '冲浪 CBO || 检查';
const DOUBEL_CHECK = ' w\\二次检查'
const OPERATOR = '>= '
const FORMAT = 'HH:mm';

const SurfCampaignModel: TSurfCampaignModel = {
  namespace: 'surfCampaign',
  state: {
    Name: `${TACTIC_NAME} @{25, 75, 125}${DOUBEL_CHECK}`,
    ActionInfo: {
      CheckPoints: [25, 50, 75, 100, 125, 150],
      CheckPoint: [
        {
          CheckPoint: 25,
          DoubleCheck: 50
        },
        {
          CheckPoint: 75,
          DoubleCheck: 100
        },
        {
          CheckPoint: 125,
          DoubleCheck: 150
        }
      ],
      DoubleCheckRoasWeb: 20,
      RoasWebIncres: [
        {
          MinX: 1,
          MaxX: 1.9,
          Increase: 30
        },
        {
          MinX: 1.9,
          MaxX: 3,
          Increase: 50
        },
        {
          MinX: 3,
          MaxX: Infinity,
          Increase: 100
        }
      ],
      LimitPerCheck: 50,
      LimitPerDay: 300,
      ResetBudgetTime: moment('00:00', FORMAT)
    },
    ActionObj: []
  },
  reducers: {
    updateActionInfo(state, { payload }) {
      // console.log('updateActionInfo', JSON.stringify(payload));
      const res: TStateSurfCampaign = {
        ActionInfo: {
          ...state?.ActionInfo,
          ...payload
        }
      }

      if (res.ActionInfo?.CheckPoints.length === 3) {
        res.ActionInfo?.CheckPoints.forEach((c, idx) => {
          if (res.ActionInfo) {
            res.ActionInfo.CheckPoint[idx].CheckPoint = res.ActionInfo?.CheckPoints[idx];
            res.ActionInfo.CheckPoint[idx].DoubleCheck = 0;
          }
        });
      }

      if (res.ActionInfo?.CheckPoints.length === 6) {
        res.ActionInfo?.CheckPoints.forEach((c, idx) => {
          if (res.ActionInfo && idx % 2 === 0) {
            let index = 0
            if (idx === 2) {
              index = 1;
            }
            if (idx === 4) {
              index = 2;
            }
            res.ActionInfo.CheckPoint[index].CheckPoint = res.ActionInfo?.CheckPoints[idx];
            res.ActionInfo.CheckPoint[index].DoubleCheck = res.ActionInfo?.CheckPoints[idx + 1];
          }
        });
      }
      // todo: 更新CheckPoint
      res.Name = `${TACTIC_NAME} @{${res.ActionInfo?.CheckPoint[0].CheckPoint}, ${res.ActionInfo?.CheckPoint[1].CheckPoint}, ${res.ActionInfo?.CheckPoint[2].CheckPoint}}`;
      if (res.ActionInfo?.CheckPoints.length === 6) {
        res.Name += DOUBEL_CHECK;
      }
      return res;
    },
    updateActionObj(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default SurfCampaignModel;
