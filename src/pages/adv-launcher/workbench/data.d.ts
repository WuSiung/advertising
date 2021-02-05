export interface TextDataType {
    content: string,
    md5: number | string,
    textId: number,
    title: string
}

export interface ImgDataType {
    fileId: string,
    imgId: string | number,
    type: string | number,
    url: string,
    url2: string
}

export interface PostMediaDataType {
    id: string,
    link: string
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
    textId: number
}

export interface TemplateDetailDataType {
    imgList: ImgDataType[],
    textList: TextDataType[],
    advTemplateRelList: PreviewAdvType[]
}

export interface WorkbenchDataType{
    uploadImgList: ImgDataType[],
    uploadTextList: TextDataType[],
    savePreviewAdv: PreviewAdvType[],
    templateDetailData?: TemplateDetailDataType,
    templateList: TemplateDataType[]
}