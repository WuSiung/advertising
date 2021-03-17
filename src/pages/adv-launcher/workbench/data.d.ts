export type TextDataType = {
    content: string,
    md5: number | string,
    textId: number,
    title: string,
    data?: AdvDataType
}

export type ImgDataType = {
    fileId: string,
    imgId: number,
    type: string | number,
    url: string,
    url2: string,
    data?: AdvDataType
}

export interface PostMediaDataType {
    id: string,
    link: string,
    md5Hex: string,
    type?: number | string
}

export interface TemplateDataType {
    templateId: number,
    templateName: string
}

interface AdvDataType {
    cost: string | number, // 平均点击消耗金额
    octr: string | number, // 点击转换比
    installs: number | string, // 安装次数
    impressions: number, // 展示次数
    spend: number, // 消费总金额
    roas: string, // 广告支出回报率
    income: string, // 广告收益
}

export interface PreviewAdvType {
    url: string,
    content: string,
    title: string,
    imgId: number,
    textId: number,
    type?: number | string,
    checked?: boolean,
    audsInfo?: { audId: number; audName: string; }[],
    bassInfo?: { audienceBaseId: number, type: '0' | '1' | '2' | '3' }[],
    facebookSetting?: SaveFacebookSettingType,
    setName?: string,
    advName?: string,
    campaignName?: string,
    kinds?: 0 | 1
}

export interface SaveFacebookSettingType {
    age: [number, number],
    budget: string,
    exclude: string[],
    include: string[],
    market_type: string,
    position: string[],
    sex: number,
    target_type: string,
    retentionDays: number,
    ratioStart: number,
    ratioEnd: number
}

export interface TemplateDetailDataType {
    imgList: ImgDataType[],
    textList: TextDataType[],
    advTemplateRelList: PreviewAdvType[]
}

export type HasAdvs = {
    ads: number,
    total: number,
    data?: AdvDataType
}

export interface WorkbenchDataType {
    uploadImgList: ImgDataType[],
    uploadTextList: TextDataType[],
    previewAdvs: PreviewAdvType[],
    savePreviewAdvsRecord: PreviewAdvType[],
    templateDetailData?: TemplateDetailDataType,
    templateList: TemplateDataType[],
    hasAdvs: Array<Array<HasAdvs>>
}