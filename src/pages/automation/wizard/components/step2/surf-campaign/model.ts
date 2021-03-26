import { TStateSurfCampaign, TSurfCampaignModel } from "@/pages/automation/wizard/components/step2/surf-campaign/data";
import moment from 'moment';

const TACTIC_NAME = '冲浪-广告系列层级 || 检查';
const DOUBEL_CHECK = ' w\\二次检查'
const FORMAT = 'HH:mm';

const SurfCampaignModel: TSurfCampaignModel = {
  namespace: 'surfCampaign',
  state: {
    Name: `${TACTIC_NAME} @{25, 75, 125}${DOUBEL_CHECK}`,
    ActionInfo: {
      FullCheck: true,
      CheckPoint: [25, 50, 75, 100, 125, 150],
      // CheckPoint: [
      //   {
      //     CheckPoint: 25,
      //     DoubleCheck: 50
      //   },
      //   {
      //     CheckPoint: 75,
      //     DoubleCheck: 100
      //   },
      //   {
      //     CheckPoint: 125,
      //     DoubleCheck: 150
      //   }
      // ],
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
      const res: TStateSurfCampaign = {
        ...state,
        ActionInfo: {
          ...state?.ActionInfo,
          ...payload
        }
      }
      // 更新CheckPoint
      // if (res.ActionInfo?.CheckPoint.length === 3) {
      //   res.ActionInfo?.CheckPoint.forEach((c, idx) => {
      //     if (res.ActionInfo) {
      //       res.ActionInfo.CheckPoint[idx].CheckPoint = res.ActionInfo?.CheckPoint[idx];
      //       res.ActionInfo.CheckPoint[idx].DoubleCheck = 0;
      //     }
      //   });
      // }

      // if (res.ActionInfo?.CheckPoint.length === 6) {
      //   res.ActionInfo?.CheckPoint.forEach((c, idx) => {
      //     if (res.ActionInfo && idx % 2 === 0) {
      //       let index = 0
      //       if (idx === 2) {
      //         index = 1;
      //       }
      //       if (idx === 4) {
      //         index = 2;
      //       }
      //       res.ActionInfo.CheckPoint[index].CheckPoint = res.ActionInfo?.CheckPoint[idx];
      //       res.ActionInfo.CheckPoint[index].DoubleCheck = res.ActionInfo?.CheckPoint[idx + 1];
      //     }
      //   });
      // }

      let list: number[] = [];

      if (res.ActionInfo?.CheckPoint.length === 3) {
        list = [...res.ActionInfo.CheckPoint];
      }

      if (res.ActionInfo?.CheckPoint.length === 6) {
        list = [res.ActionInfo.CheckPoint[0], res.ActionInfo.CheckPoint[2], res.ActionInfo.CheckPoint[4]];
      }

      // res.Name = `${TACTIC_NAME} @{${res.ActionInfo?.CheckPoint[0].CheckPoint}, ${res.ActionInfo?.CheckPoint[1].CheckPoint}, ${res.ActionInfo?.CheckPoint[2].CheckPoint}}`;
      res.Name = `${TACTIC_NAME} @{${list[0]}, ${list[1]}, ${list[2]}}`;
      if (res.ActionInfo?.CheckPoint.length === 6) {
        res.Name += DOUBEL_CHECK;
      }
      return res;
    },
    updateActionObj(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    init(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default SurfCampaignModel;
