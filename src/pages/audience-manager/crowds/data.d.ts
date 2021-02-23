import type {AudienceModelDataType} from '../data'

export interface TreeDataType {
    title: string,
    key: number | string,
    children?: TreeDataType[]
}


export interface CrowdStateType{
    crowdsList: Array<AudienceModelDataType>
}