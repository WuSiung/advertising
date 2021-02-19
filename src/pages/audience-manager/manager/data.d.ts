export interface QueryListDataType {
    size: number,
    name?: string,
    id?: string | number
}

export interface InterestDataType{
    loveId: string,
    loveName: string,
    loveCname?: string,
    path: string,
    count: number|string,
    type: string,
    ctype?: string,
    pid: string,
    level: number
}
export interface AudienceDataType{
    audienceId: string,
    audienceName: string,
    approximateCount: string,
    type: string,
    deliveryStatus: string|null,
    deliveryDesc: string|null,
    operationStatus: string|null,
    ratio_start: string|null,
    ratio_end: string|null,
    retention: number
}

export interface ManagerDataType{
    interestList: InterestDataType[],
    audienceList: AudienceDataType[]
}