import { Reducer } from 'umi';
import { queryStatistics } from './service';
import { Effect } from '@@/plugin-dva/connect';
import { TData, TDetail, TOption, TState, TTab } from './data';
import moment from 'moment';
import { TARGET_LIST, ROI_TARGET_LIST } from './targets';

export type TDashboardModel = {
  namespace: string;
  state: TState;
  reducers: {
    changeRange: Reducer<TState>;
    changeSelect: Reducer<TState>;
    changeTab: Reducer<TState>;
    updateDashboard: Reducer<TState>;
    updateSummaryDataList: Reducer<TState>;
  };
  effects: {
    queryStatistics: Effect;
  };
};

interface IData {
  createdDate: string;
}

declare type List<T> = T[];

function mergeData(targetList: TOption[] = [], list: List<IData>) {
  // list先根据日期排序
  list.sort((l1, l2) => {
    const d1 = new Date(l1.createdDate).getTime();
    const d2 = new Date(l2.createdDate).getTime();
    return d1 - d2;
  });
  const dMergeList: IData[] = [];
  const xListMap: Record<string, IData> = {};
  list.forEach((s) => {
    if (!xListMap[s.createdDate]) {
      xListMap[s.createdDate] = s;
      targetList.forEach((t) => {
        // todo: 如果数据区间过大，需要将数据累加压缩
        xListMap[s.createdDate][t.value] = Math.round(parseFloat(s[t.value]) * 100) / 100;
      });
    } else if (targetList) {
      const statistic = xListMap[s.createdDate];
      targetList.forEach((o) => {
        // todo: 如果数据区间过大，需要将数据累加压缩
        statistic[o.value] +=
          Math.round((parseFloat(statistic[o.value]) + parseFloat(statistic[o.value])) * 100) / 100;
      });
    }
  });
  Object.values(xListMap).forEach((value) => {
    dMergeList.push(value);
  });
  return dMergeList;
}

function splitTarget(targetList: TOption[] = [], list: List<IData>) {
  const dMergeList = mergeData(targetList, list);
  const dList: TData[] = [];
  dMergeList.forEach((s) => {
    // todo: 构造用于绘图的数组
    targetList.forEach((o) => {
      // todo: 如果数据区间过大，需要将数据累加压缩
      const dt: TData = {
        x: s.createdDate,
        y: s[o.value],
        target: o.name,
        targetValue: o.value,
      };
      dList.push(dt);
    });
  });
  return dList;
}

const DashboardModel: TDashboardModel = {
  namespace: 'dashboard',
  state: {
    rangeValues: [moment().subtract(30, 'days'), moment()], // todo 初始化时间范围
    target1: 'pfee',
    target2: 'approas',
    audience: '0',
    activeTabKey: 'tab1',
    loading: true,
    tabList: [],
    totalList: [],
    detailDataList: [],
    roiDataRecord: {},
  },
  reducers: {
    changeRange(state, { payload }) {
      return {
        ...state,
        rangeValues: payload.dates,
      };
    },
    changeSelect(state, { payload }) {
      return {
        ...state,
        [payload.target]: payload.value,
      };
    },
    changeTab(state, { payload }) {
      return {
        ...state,
        activeTabKey: payload.activeTabKey,
      };
    },
    updateDashboard(state, { payload }) {
      // todo: payload.totalList保留2位小数
      const data: TState = {
        ...state,
        totalList: payload.totalList,
        loading: false,
      };
      if (data.totalList && Array.isArray(data.totalList)) {
        data.totalList.forEach((d, idx) => {
          TARGET_LIST.forEach((t) => {
            if (data.totalList && data.totalList[idx]) {
              data.totalList[idx][t.value] = Math.round(d[t.value] * 100) / 100;
            }
          });
        });
      }
      // todo: 构造数据
      // todo: 给data.detailList赋值假数据
      if (Array.isArray(payload.detailList)) {
        const tabList: TTab[] = [];
        const detailDataList: TData[][] = [];
        payload.detailList.forEach((d: TDetail, idx: number) => {
          // todo: 构造tabList
          const tab: TTab = {
            key: `tab${idx + 1}`,
            tab: d.name,
          };
          tabList.push(tab);

          const dList = splitTarget(TARGET_LIST, d.list);
          detailDataList.push(dList);

          // todo: 根据detailDataList更新summaryDataList
        });
        data.tabList = tabList;
        data.detailDataList = detailDataList;
      }

      const optionList: TOption[] = [];
      const roiDataList: TData[][] = [];

      // todo: 处理total
      // if (Array.isArray(payload.total)) {
      //   const option = {
      //     name: '总',
      //     value: '0',
      //   };
      //   optionList.push(option);
      //   // todo: 合并日期相同的数据
      //   const dList = splitTarget(ROI_TARGET_LIST, payload.total);
      //   roiDataList.push(dList);
      // }

      // todo: 处理group
      // if (Array.isArray(payload.group)) {
      //   payload.group.forEach((g: any) => {
      //     const option = {
      //       name: g.name,
      //       value: String(g.id),
      //     };
      //     optionList.push(option);
      //     const dList = splitTarget(ROI_TARGET_LIST, g.list);
      //     roiDataList.push(dList);
      //   });
      // }

      // 处理收入支出数据
      if (Array.isArray(payload.roiList)) {
        payload.roiList.forEach((g: any) => {
          const option = {
            name: g.name,
            value: String(g.id),
          };
          optionList.push(option);
          const dList = splitTarget(ROI_TARGET_LIST, g.list);
          roiDataList.push(dList);
        });
      }

      data.roiOptionList = optionList;
      const roiDataRecord: Record<string, TData[]> = {};
      roiDataList.forEach((l, idx) => {
        const key = optionList[idx].value;
        roiDataRecord[key] = roiDataList[idx];
      });
      data.roiDataRecord = roiDataRecord;

      return data;
    },
    updateSummaryDataList(state, { payload }) {
      const data: TState = {
        ...state,
        ...payload,
      };

      // todo 根据detailDataList生成summaryDataList

      return data;
    },
  },
  effects: {
    *queryStatistics({ payload }, { call, put }) {
      const response = yield call(queryStatistics, payload);
      // console.log('errects', JSON.stringify(response))
      // clicks oclicks installs 需要返回数值类型
      yield put({
        type: 'updateDashboard',
        payload: {
          totalList: response[0].data,
          // todo: 赋值detailList,inputoutput
          detailList: response[1].data,
          roiList: response[2].data,
        },
      });
    },
  },
};

export default DashboardModel;
