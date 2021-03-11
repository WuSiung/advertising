import type { AudienceModelDataType } from '../data'

export interface TreeDataType {
    title: string,
    key: number | string,
    children?: TreeDataType[]
}

export interface baseAudienceDataType {
    audienceBaseId: number,
    delFlag: string,
    des: string,
    name: string,
    active?: boolean,
    type: '0' | '1' | '2' | '3'
}

export interface AllCrowdsType {
    custom: Array<AudienceModelDataType>,
    base: Array<baseAudienceDataType>,
}


export interface CrowdStateType {
    customCrowd: Array<AudienceModelDataType>,
    baseCrowd: Array<baseAudienceDataType>,
    treeCheck: number[]
}