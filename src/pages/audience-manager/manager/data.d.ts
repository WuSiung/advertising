import type {AudienceModelDataType} from '../data'
export interface QueryListDataType {
    size: number,
    name?: string,
    id?: string | number
}

export interface InterestDataType {
    loveId: string,
    loveName: string,
    loveCname?: string,
    path: string,
    count: number | string,
    type: string,
    ctype?: string,
    pid: string,
    checked?: boolean | undefined
    level: number
}
export interface AudienceDataType {
    audienceId: string | number,
    audienceName: string,
    approximateCount: string,
    type: string,
    deliveryStatus: string | null,
    deliveryDesc: string | null,
    operationStatus: string | null,
    ratio_start: string | null,
    ratio_end: string | null,
    checked?: boolean | undefined,
    retention: number
}


export interface AudienceModelDetailType{
    audLoveId: number,
    loveCname: string,
    loveId: number,
    loveName: string,
    stype: string | number,
    type: string | number
}

export interface SaveCrowdParamsType{
    loves: string,
    audName: string,
    stype: number
}

export interface ManagerDataType {
    interestList: Array<InterestDataType>,
    audienceList: AudienceDataType[],
    includeList: Array<InterestDataType & AudienceDataType>,
    excludeList: Array<InterestDataType & AudienceDataType>,
    modelList: Array<AudienceModelDataType>
}