export interface TextDataType {
    content: string,
    md5: number | string,
    textId: number,
    title: string
}

export interface ImgDataType {
    fileId: string,
    imgId: number,
    type: string | number,
    url: string,
    url2: string
}

export interface PostMediaDataType {
    id: string,
    link: string,
    type?: number | string
}

export interface TemplateDataType {
    templateId: number,
    templateName: string
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
    facebookSetting?: SaveFacebookSettingType,
    setName?: string,
    advName?: string,
    campaignName?: string
}

export interface SaveFacebookSettingType {
    age: [number, number],
    budget: string,
    exclude: string[],
    include: string[],
    market_type: string,
    position: string[],
    sex: number,
    target_type: string
}

export interface TemplateDetailDataType {
    imgList: ImgDataType[],
    textList: TextDataType[],
    advTemplateRelList: PreviewAdvType[]
}

export interface WorkbenchDataType {
    uploadImgList: ImgDataType[],
    uploadTextList: TextDataType[],
    previewAdvs: PreviewAdvType[],
    savePreviewAdvsRecord: PreviewAdvType[],
    templateDetailData?: TemplateDetailDataType,
    templateList: TemplateDataType[]
}