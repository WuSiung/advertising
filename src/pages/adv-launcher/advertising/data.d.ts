import type { ImgDataType, TextDataType, HasAdvs, AdvDataType } from '@/pages/adv-launcher/workbench/data'


export interface AdvedDataType {
    advImg: ImgDataType,
    advText: TextDataType,
    data: AdvDataType,
    checked?: boolean
}

export interface AdvModelStateType {
    advertisingList: AdvedDataType[],
    count: number,
}