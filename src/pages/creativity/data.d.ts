export interface PublicMaterialDataType {
    contentType: string,
    createdTime: string,
    googleMediaLink: string,
    id: string,
    description: string,
    release: boolean,
    tags: TagType[],
    mediaName: string,
    md5Hex?: string,
    title: string,
    checked: boolean
}

export interface TagType {
    id: string,
    name: string
}

interface MaterialStateType {
    mediaList: Array<PublicMaterialDataType>,
    textList: Array<PublicMaterialDataType>,
    mediaTags: Array<TagType>,
    textTags: Array<TagType>,
}
