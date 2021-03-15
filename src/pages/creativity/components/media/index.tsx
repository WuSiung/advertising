import { postOneRecordToWorkbench } from '@/pages/adv-launcher/workbench/service'
import { isImage } from '@/utils/fileType'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { message, Modal, Spin } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { connect, CurrentUser, Dispatch, UserModelState } from 'umi'
import { addTag, createContainer, deletResource, delTag, getMediaTag, getSouceTag, uploadMedia } from '../../service'
import MaterialBox from '../Box'
import PublicHeader from '../PublicHeader'
import { MaterialStateType, PublicMaterialDataType, TagType } from '../../data';
import Loading from '@/components/Loading';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditTag from '../EditTag';

import styles from './index.less'
import { showConfirm } from '@/components/Confrim';
import Store from '@/utils/store';

type MediaCreativityProps = {
    dispatch: Dispatch,
    userInfo?: CurrentUser,
    mediaGetLoading: boolean,
} & Omit<MaterialStateType, 'textList' | "textTags">

interface PageProps {
    page: number,
    size: number
}

let promistUploadFileArray: Array<Promise<unknown>> = [];
let uploadProcess: number = 0
const MediaCreativity: FC<MediaCreativityProps> = (props) => {
    const { mediaList, dispatch, userInfo, mediaGetLoading, mediaTags } = props

    const mediaRef = useRef<HTMLDivElement>(null)
    const [mediaToWorkbenchLoading, setMediaToWorkbenchLoading] = useState(false)
    const [mediaUploading, setMediaLoading] = useState(false)
    const [mediaQueryParams, setMediaQuery] = useState<PageProps>({ page: 1, size: 10 })
    const [filterDate, setFilterDate] = useState<[string, string]>(['', ''])
    const [mediaSort, setMediaSort] = useState('Default')
    const [filterTagId, setFilterTagId] = useState<string[]>([])
    const [filterTagSearch, setFilterTagSearch] = useState('')
    const [mediaSouceFilter, setmediaSouceFilte] = useState('All')
    const [tagParams, setTagParams] = useState<{ id: string, tagList: TagType[] }>({ id: '', tagList: [] })
    const [tagVisible, setTagVisible] = useState(false)
    const [tagName, setTagName] = useState('')

    useEffect(() => {
        if (userInfo?.userId) {
            dispatch({
                type: 'material/fetchMedias',
                payload: {
                    ...mediaQueryParams, id: userInfo.userId, resourceType: mediaSouceFilter, sortForResource: mediaSort,
                    tagIds: filterTagId, beginTime: filterDate[0], endTime: filterDate[1]
                }
            })
        }
    }, [userInfo?.userId, mediaQueryParams, mediaSort, mediaSouceFilter, filterDate, filterTagId])

    useEffect(() => {
        dispatch({ type: 'material/fetchMediaTags' })
    }, [])

    const clearMediaCheck = () => {
        let editList = mediaList.map(media => {
            media.checked = false
            return media
        })
        dispatch({
            type: 'material/saveMedias',
            payload: { mediaList: JSON.parse(JSON.stringify(editList)) }
        })
    }

    const addMediaToWorkbench = () => {
        const addArr: Array<Promise<unknown>> = []
        if (mediaList.every(meida => !meida.checked)) {
            message.warning('请选择素材')
            return
        }
        setMediaToWorkbenchLoading(true)
        mediaList.map(media => {
            if (media.checked) {
                addArr.push(postOneRecordToWorkbench({ id: media.id, type: isImage(media.contentType) ? 0 : 1, link: media.googleMediaLink, md5Hex: media.md5Hex || '' }))
            }
        })
        Promise.all(addArr).then(() => {
            setMediaToWorkbenchLoading(false)
            message.success('添加成功')
        })
    }

    const onUploadMedias = (e: RcCustomRequestOptions, allLenth: number) => {
        createContainer({ id: userInfo?.userId || 1, description: '无', title: '无' }).then(res => {
            const fromData: FormData = new FormData()
            uploadProcess++
            fromData.append('media', e.file)
            promistUploadFileArray.push(uploadFunction(res.value, fromData))
            if (uploadProcess == allLenth) {
                setMediaLoading(true)
                Promise.all(promistUploadFileArray).then((res) => {
                    promistUploadFileArray = []
                    uploadProcess = 0
                    allLenth = 0
                    setMediaLoading(false)
                    setMediaQuery({ page: 1, size: 10 })
                }).catch(() => {
                    setMediaLoading(false)
                })
            }
        })
    }

    const scrollMedia = () => {
        const clientHeight = mediaRef.current?.clientHeight || 0;
        const scrollTop = mediaRef.current?.scrollTop || 0;
        const scrollHeight = mediaRef.current?.scrollHeight || 0;
        if ((clientHeight + scrollTop) == scrollHeight) {
            const newQueryParams: PageProps = { page: mediaQueryParams.page + 1, size: mediaQueryParams.size }
            setMediaQuery(newQueryParams)
        }
    }

    const checkedMedia = (i: number) => {
        let editList = mediaList
        editList[i].checked = !editList[i].checked;
        dispatch({
            type: 'material/saveMedias',
            payload: { mediaList: JSON.parse(JSON.stringify(editList)) }
        })
    }

    const deleteMedia = (i: number) => {
        let deleteInfo = mediaList[i]
        const newArr = JSON.parse(JSON.stringify(mediaList))
        newArr.splice(i, 1)
        showDeleteConfirm(dispatch, deleteInfo, newArr)
    }

    const handleAiLib = () => {
        setTagParams({ id: 'all', tagList: mediaTags })
        setTagName('')
        setTagVisible(true)
    }

    const editTag = (i: number) => {
        let editInfo = mediaList[i]
        setTagParams({ id: editInfo.id, tagList: editInfo.tags })
        setTagVisible(true)
    }

    const editTagOk = async () => {
        if (tagParams.id == 'all') {
            message.warning('暂时无法添加到标签库，您可以通过资源添加标签')
            return
        } else {
            const flag = tagParams.tagList.some(tag => tagName == tag.name)
            if (flag) {
                message.warning('标签已存在，请重新输入')
                return
            }
        }
        await addTag({ soureceId: tagParams.id == 'all' ? '' : tagParams.id, userId: userInfo?.userId, name: tagName })
        setTagName('')
        updateTag()
        dispatch({
            type: 'material/fetchMediaTags'
        })
        message.success('添加成功')
    }

    const deleteTag = async (id: string) => {
        showConfirm({ onOk: delTag.bind(null, id) }).then(() => { message.success('删除成功'); updateTag() })
    }

    const chooseTagId = (value: string[], options: any) => {
        const storageValue: { key?: string; label: React.ReactNode; value: string | number }[] = []
        const allIds = options?.map((item: any) => {
            storageValue.push({ key: item.key, label: item.name, value: item.value })
            return item.key
        })
        setFilterTagId(allIds)
        Store.SetMediaTagIds(storageValue)
    }

    const updateTag = () => {
        getSouceTag(tagParams.id).then(res => {
            setTagParams({ ...tagParams, tagList: res.value.tags })
            const setMediaList = mediaList.map(media => {
                if (media.id == tagParams.id) {
                    media.tags = res.value.tags
                }
                return media
            })
            dispatch({
                type: 'material/saveMedias',
                payload: { mediaList: setMediaList }
            })
        })
    }

    const changeSearch = (v: string, o: any) => {
        if (tagParams.id == 'all') {
            message.warning('请不要重复添加噢~')
        } else {
            setTagName(v)
        }
    }

    return <div>
        <PublicHeader onClear={clearMediaCheck} clearDisable={mediaList.some(media => media.checked)} tags={mediaTags} onSelectTag={chooseTagId} type='media'
            onAddToWorkbench={addMediaToWorkbench} onSort={setMediaSort} onSource={setmediaSouceFilte} fetchTag={getMediaTag}
            openFolder={handleAiLib} onUpload={onUploadMedias} uploading={mediaUploading} onChangeDate={setFilterDate} onFilterTagValue={setFilterTagSearch} />
        <Spin spinning={!!mediaGetLoading}>
            <div className={`${styles.mediaContent} ${styles.mediaList}`} onScroll={scrollMedia} ref={mediaRef}>
                {
                    mediaList.map((media, i) => {
                        return <MaterialBox {...media} key={media.id} index={i} type='media' onClick={checkedMedia} onDelete={deleteMedia} onEdit={editTag} />
                    })
                }
            </div>
        </Spin>
        {
            (mediaUploading || mediaToWorkbenchLoading) && <Loading showMask tips='上传中，请稍后...' />
        }
        <EditTag visible={tagVisible} tagList={tagParams.tagList} tagName={tagName} setTagName={setTagName} onAdd={editTagOk} fetchTags={getMediaTag}
            onCancel={() => setTagVisible(false)} onDelete={deleteTag} type={tagParams.id} onChangeResult={changeSearch} />
    </div>
}

const showDeleteConfirm = (dispatch: Dispatch, deleteInfo: PublicMaterialDataType, setArr: PublicMaterialDataType[]) => {
    Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '是否确认删除？',
        okText: '确认',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
            return deletResource(deleteInfo.id).then(() => {
                dispatch({
                    type: 'material/saveMedias',
                    payload: { mediaList: JSON.parse(JSON.stringify(setArr)) }
                })
            })
        }
    });
}

const uploadFunction = async (value: string, media: FormData) => {
    await uploadMedia({ id: value as string, media })
}

export default connect(({ material, user, loading }: { material: MaterialStateType, user: UserModelState, loading: { effects: { [key: string]: boolean } } }) => ({
    mediaList: material.mediaList,
    mediaTags: material.mediaTags,
    mediaGetLoading: loading.effects['material/fetchMedias'],
    userInfo: user.currentUser
}))(MediaCreativity)
