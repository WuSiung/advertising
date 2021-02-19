export interface CompaignsListType {
    packId: number,
    appName: string,
    budget: number | string,
    spendNum: number | string
}

export interface CreateCompaignDataType {
    appName: string,
    budget: number,
    spendNum: number | string
}


export interface CompaignsData {
    compaignsList: CompaignsListType[]
}