export type TStatisticParams = {
  start: string;
  end: string;
};

export type TStatistic = {
  name: string; // 名字
  id: number;
  resultName: string; // 结果(安装,应用,购买)
  results: string; // "结果(安装,应用,购买)
  reach: string; // 送达数
  impression: string; // 展示数(印象数)
  clicks: string; // 点击数
  pfee: number; // 每结果成本
  approas: number; // 移动应用回报率
  spent: number; // 消费金额
  ctr: number; // 点击率
  frequency: number; // 频率
  cpm: number; // 费用/前次
  octr: number; // 出站点击率
  oclicks: number; // 出站点击数
  cpc: number; // 每次点击费用
  installs: number; // 安装数
  installfee: number; // 每次安装费用
  createdDate: string; // 创建时间
};

export type TTarget = {
  target: string;
  name: string;
};

export type TDetail = {
  name: string;
  id: number;
  list: TStatistic[];
};

export type TTab = {
  key: string;
  tab: string;
};

export type TOption = {
  value: string;
  name: string;
};

export type TData = {
  x: string;
  y: number;
  target: string;
  targetValue: string;
};

export type TColumn = {
  key: string;
  dataIndex: string;
  title: string;
  width?: number;
  fixed?: string;
};

export type TState = {
  rangeValues?: [moment.Moment, moment.Moment];
  target1?: string;
  target2?: string;
  activeTabKey?: string;
  targetList?: TOption[];
  tabList?: TTab[];
  totalList?: TStatistic[];
  detailDataList?: TData[][];
};
