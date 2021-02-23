export interface CompaignsListType {
    packId: number,
    appName: string,
    budget: number,
    spendNum: number | string
}

export interface CreateCompaignDataType {
    appName: string,
    budget: number,
    spendNum: number | string
}

export interface SaveChooseCompaignDataType {
    packId?: number,
    appName: string,
    budget: number,
    spendNum: number | string
}


export interface CompaignsData {
    compaignsList: CompaignsListType[],
    compaignParams: SaveChooseCompaignDataType
}