export interface ModelListLoveType {
    audId: number,
    audCount: string | number,
    audLoveId: number,
    audName: string,
    loveId: string | number,
    stype: string | number,
    type: string | number,
}

export interface AudienceModelDataType {
    audId: number,
    audName: string,
    active?: boolean,
    stype: number | string,
    advAudLoveList: Array<ModelListLoveType>
}