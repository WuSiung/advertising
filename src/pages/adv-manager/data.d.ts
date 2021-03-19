export interface AdvPackParam {
    current: number,
    size: number,
    appName: string,
    startT: string,
    endT: string
}
export interface AdvSetParam {
    current: number,
    size: number,
    setName: string,
    startT: string,
    endT: string
}
export interface AdvAdvParam {
    current: number,
    size: number,
    advName: string,
    startT: string,
    endT: string
}

export interface AdvParam {
    fdId: string,
    state: string
}

export interface ManagerDataType{
    clicks: string,
    cpa: number,
    cpc: number,
    cpm: number,
    createdDate: string,
    ctr: number,
    delFlag: string,
    fbId: string,
    frequency: string,
    impressions: string,
    income: number,
    installName: string,
    installVal: string,
    installfee: string,
    mobileAppPurchaseRoas: number,
    spend: number,
    installs: string,
    oclicks: string,
    octr: number,
    packId: number,
    pfee: number,
    reach: string,

}

export interface AdvPackListType{
    appName: string,
    brandName: string,
    brandVal: string,
    budget: string,
    delFlag: string,
    fbId: string,
    packId: number,
    spendName: string,
    spendNum: string,
    spendVal: string,
    state: string,
    status: string,
    statusDesc: string,
    targetName: string,
    targetVal: string,
    tokenId: number,
    updatetime: string,
    loading?: boolean,
    dataVO: ManagerDataType
}

export interface AdvSetListType{
    setId:number,
    setName: string,
    appName:string,
    brandName: string,
    brandVal: string,
    budget: string,
    resultName: string,
    fbId: string,
    spendName: string,
    spendNum: string,
    spendVal: string,
    state: string,
    status: string,
    statusDesc: string,
    targetName: string,
    targetVal: string,
    tokenId: number,
    updatetime: string,
    loading?: boolean,
    dataVO: ManagerDataType
}
export interface AdvAdvListType{
    advName: string,
    advId: number,
    approas: number,
    brandName: string,
    brandVal: string,
    budget: string,
    packId: number,
    dataVO: ManagerDataType
    spendName: string,
    spendNum: string,
    spendVal: string,
    state: string,
    status: string,
    statusDesc: string,
    targetName: string,
    targetVal: string,
    tokenId: number,
    updatetime: string,
    imgTextList: Array<any>,
    checked?: boolean,
    loading?:boolean
}
export interface AdvData {
    advPackList: AdvPackListType[],
    advSetList: AdvSetListType[],
    advAdvList: AdvAdvListType[],
    advSetListForTreeView:AdvSetListType[],
    advAdvListForTreeView:AdvAdvListType[],
    advPackTotal:number,
    advSetTotal:number,
    advAdvTotal:number
}

