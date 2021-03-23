export type TCondition = {
  target: string;
  time: string;
  operator: string;
  value: number;
}

export type TGroup = {
  conditionList: TCondition[]
  children?: TGroup[]
}
