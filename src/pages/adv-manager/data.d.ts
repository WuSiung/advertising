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
export interface AdvPackListType{
    appName: string,
    approas: number,
    brandName: string,
    brandVal: string,
    budget: string,
    clicks: string,
    cpc: number,
    cpm: number,
    createtime: string,
    ctr: number,
    delFlag: string,
    fbId: string,
    frequency: string,
    impression: string,
    installName: string,
    installVal: string,
    installfee: string,
    installs: string,
    oclicks: string,
    octr: number,
    packId: number,
    pfee: number,
    reach: string,
    resultName: string,
    results: string,
    spendName: string,
    spendNum: string,
    spendVal: string,
    spent: number,
    state: string,
    status: string,
    statusDesc: string,
    targetName: string,
    targetVal: string,
    tokenId: number,
    updatetime: string
}

export interface AdvSetListType{
    setId:number,
    setName: string,
    approas: number,
    brandName: string,
    brandVal: string,
    budget: string,
    clicks: string,
    cpc: number,
    cpm: number,
    createtime: string,
    ctr: number,
    delFlag: string,
    fbId: string,
    frequency: string,
    impression: string,
    installName: string,
    installVal: string,
    installfee: string,
    installs: string,
    oclicks: string,
    octr: number,
    packId: number,
    pfee: number,
    reach: string,
    resultName: string,
    results: string,
    spendName: string,
    spendNum: string,
    spendVal: string,
    spent: number,
    state: string,
    status: string,
    statusDesc: string,
    targetName: string,
    targetVal: string,
    tokenId: number,
    updatetime: string
}
export interface AdvAdvListType{
    advName: string,
<<<<<<< HEAD
    advId: number,
=======
>>>>>>> e91af4a (feat:广告管理功能页面)
    approas: number,
    brandName: string,
    brandVal: string,
    budget: string,
    clicks: string,
    cpc: number,
    cpm: number,
    createtime: string,
    ctr: number,
    delFlag: string,
    fbId: string,
    frequency: string,
    impression: string,
    installName: string,
    installVal: string,
    installfee: string,
    installs: string,
    oclicks: string,
    octr: number,
    packId: number,
    pfee: number,
    reach: string,
    resultName: string,
    results: string,
    spendName: string,
    spendNum: string,
    spendVal: string,
    spent: number,
    state: string,
    status: string,
    statusDesc: string,
    targetName: string,
    targetVal: string,
    tokenId: number,
    updatetime: string,
    imgTextList:Array<any>
}
export interface AdvData {
    advPackList: AdvPackListType[],
    advSetListForTreeView:AdvSetListType[],
    advAdvListForTreeView:AdvAdvListType[],
    advPackTotal:number
}

