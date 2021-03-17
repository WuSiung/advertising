import moment from 'moment';
import {TData} from "@/pages/dashboard/data";
import {AreaConfig} from "@ant-design/charts/es/area";

export const TARGET_LIST = [
  {
    name: '结果数',
    value: 'results',
  },
  {
    name: '送达数',
    value: 'reach',
  },
  {
    name: '印象数',
    value: 'impressions',
  },
  {
    name: '点击次数',
    value: 'clicks',
  },
  {
    name: '每结果成本',
    value: 'cpr',
  },
  {
    name: '移动应用回报率',
    value: 'mobileAppPurchaseRoas',
  },
  {
    name: '消费金额',
    value: 'spend',
  },
  {
    name: '点击率',
    value: 'ctr',
  },
  {
    name: '频率',
    value: 'frequency',
  },
  {
    name: '每千次展示费用',
    value: 'cpm',
  },
  {
    name: '出站点击率',
    value: 'octr',
  },
  {
    name: '购买回报率',
    value: 'purchaseRoas',
  },
  {
    name: '出站点击数',
    value: 'oclicks',
  },
  {
    name: '每次点击费用',
    value: 'cpc',
  },
  {
    name: '安装数',
    value: 'installs',
  },
  {
    name: '每次安装费用',
    value: 'cpa',
  }, // cpa暂时为null
];

export const ROI_TARGET_LIST = [
  {
    value: 'income',
    name: '收入',
  },
  {
    value: 'spend',
    name: '支出',
  },
];

const EMPTY_DATA: TData[] = [];

for (let i = moment().subtract(30, 'days'); new Date(i.format('YYYY-MM-DD')).getTime() < Date.now(); i.add(1, 'days')) {
  EMPTY_DATA.push({
    x: i.format('YYYY-MM-DD'),
    y: 10000,
    target: 'target',
    targetValue: 'target'
  })
}

export const EMPTY_CFG_SUM: AreaConfig = {
  // data: dashboard.detailDataList && dashboard.detailDataList[0] ? dashboard.detailDataList[0] : [],
  data: EMPTY_DATA,
  height: 200,
  appendPadding: [0, 20, 0, 20],
  xField: 'x',
  yField: 'y',
  seriesField: 'target',
  smooth: true,
  // style: {
  //   backgroundColor: '#fff',
  // },
  areaStyle: {
    fill: 'l(270) 0:#ffffff 0.5:#ffffff 1:#ffffff',
    opacity: 0
  },
  line: {
    color: '#ededed',
  },
  yAxis: {
    tickCount: 5
  },
  xAxis: {
    tickCount: 3,
    label: {
      // autoRotate: true
    }
  },
  tooltip: {
    customContent: () => ''
  },
  label: undefined,
  legend: false
};

export const EMPTY_CFG_DETAIL: AreaConfig = {
  // data: dashboard.detailDataList && dashboard.detailDataList[0] ? dashboard.detailDataList[0] : [],
  data: EMPTY_DATA,
  height: 300,
  xField: 'x',
  yField: 'y',
  seriesField: 'target',
  smooth: true,
  // style: {
  //   backgroundColor: '#fff',
  // },
  areaStyle: {
    fill: 'l(270) 0:#ffffff 0.5:#ffffff 1:#ffffff',
    opacity: 0
  },
  line: {
    color: '#ededed',
  },
  yAxis: {
    tickCount: 8
  },
  xAxis: {
    tickCount: 30,
    label: {
      autoRotate: true
    }
  },
  tooltip: {
    customContent: () => ''
  },
  label: undefined,
  legend: false
};

export const EMPTY_CFG_ROI = {
  data: EMPTY_DATA,
  height: 300,
  xField: 'x',
  yField: 'y',
  seriesField: 'target',
  point: null,
  yAxis: {
    tickCount: 8
  },
  xAxis: {
    tickCount: 30,
    label: {
      autoRotate: true,
    }
  },
  lineStyle: {
    stroke: '#ededed',
  },
  tooltip: {
    customContent: () => ''
  },
  label: undefined,
  legend: false
};
