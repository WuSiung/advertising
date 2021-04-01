// 触发条件结构(就是每次点+号添加一个的逻辑条件)
export type TCondition = {
  target: string; // 指标
  timePeriod: string; // 时间段
  operator: string; // 比较运算符
  value: number; // 值
}

// 触发条件组结构（就是每次点+号添加一个的逻辑条件组）
export type TGroup = {
  logical: 'or' | 'and' // 逻辑运算关系
  conditions: TCondition[] // 条件列表
  children?: TGroup[] // 子组列表
}

// action数据结构
export type TAction = {
  task: string; // 选择的任务
  group: TGroup; // 该任务的触发条件组
}

// 策略有效时间数据结构
export type TEffectiveTime = {
  isFromNowON: boolean; // 策略是否从今天开始生效
  timePeriod: string[]; // 策略有效时间段
}

// 每天的执行计划（时间段安排）
export type TDailyPlan = {
  numTimePeriod: number; // 有多少个时间段
  timePeriods: number[]; // 具体的时间段如[1, 3, 5, 8]表示，在1点——3点，和5点——8点执行
}

export type TWeeklyPlan = {
  isChecked: boolean; // 是否选中每周的这一天天
  dailyPlan: TDailyPlan;  // 这天的执行时间安排
}

// 策略调度计划数据结构
export type TSchedule = {
  isContinuous: boolean; // 是否连续运行
  target: string; // 绩效衡量标准
  timePeriod: string; // 大体时间
  isRunDaily: boolean; // 是否在每天的固定时间点执行
  dailyPlan: TDailyPlan; // 日计划
  weeklyPlan: TWeeklyPlan[]; // 周计划
}

// 最终的requestInfo
export type requestInfo = {
  actions: TAction[]; // 行动数组
  effectiveTime: TEffectiveTime; // 策略有效时间
  schedule: TSchedule; // 策略执行调度计划
}

export type TActionInfoCustom = {
  actions: TAction[];
  effectiveTime: TEffectiveTime;
  schedule: TSchedule;
}
