export type TCondition = {
  target: string;
  time: string;
  operator: string; // todo: 用字面量类型
  value: number;
}

export type TGroup = {
  logical: 'or' | 'and'
  conditions: TCondition[]
  children?: TGroup[]
}

export type TAction = {
  task: string;
  group: TGroup;
}
