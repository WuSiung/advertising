import React from 'react';
import { Dispatch } from "@@/plugin-dva/connect";
import {TTacticEditInfo} from "@/pages/automation/data";

export type TStateTactic<T> = {
  Name?: string;
  ActionInfo?: T;
  ActionObj?: string[];
}

export interface ITacticBase {
  dispatch: Dispatch;
  step: number;
  editInfo: TTacticEditInfo;
}

export interface ITactic<T> extends ITacticBase {
  refInstance: React.MutableRefObject<any>;
  tacticInfo: TStateTactic<T>;
  onActionObjChange: (isSelected: boolean) => void;
}

interface  ITacticForwardRef extends ITacticBase {
  ref: React.MutableRefObject<any>
}

export type TStaticItemValue = {
  staticMetricValue?: number;
  value?: number;
  lastDays?: string|number;
  mertricType?: number;
}
