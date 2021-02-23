export interface TargetType{
    description: string,
    label: string,
    sort: number,
    id: number,
    type: string,
    value: string
}

export interface MarketType{
    description: string,
    label: string,
    sort: number,
    id: number,
    type: string,
    value: string
}

export interface CountryRecordType{
    cname: string
    code: string
    countryId: string
    countryName: string
}

export interface FacebookStateType{
    countryList: CountryRecordType[],
    marketList: MarketType[],
    targetList: TargetType[]
}