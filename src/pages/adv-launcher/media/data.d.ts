interface PublicMaterialDataType {
    contentType: string,
    createdTime: string,
    googleMediaLink: string,
    id: string,
    description: string,
    release: boolean,
    mediaName: string,
    title: string,
    checked: boolean
}

interface MaterialStateType{
    mediaList: Array<PublicMaterialDataType>,
    textList: Array<PublicMaterialDataType>,
}
