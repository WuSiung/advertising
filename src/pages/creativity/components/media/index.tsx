import DateRange from '@/pages/adv-launcher/components/DateRange'
import { postOneRecordToWorkbench } from '@/pages/adv-launcher/workbench/service'
import { isImage } from '@/utils/fileType'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { message, Modal, Spin } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { connect, CurrentUser, Dispatch, UserModelState } from 'umi'
import { createContainer, deletResource, uploadMedia } from '../../service'
import MaterialBox from '../Box'
import PublicHeader from '../PublicHeader'

import styles from './index.less'
import { showConfirm } from '@/components/Confrim';
import Loading from '@/components/Loading';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type MediaCreativityProps = {
    dispatch: Dispatch,
    userInfo?: CurrentUser,
    mediaGetLoading: boolean,
} & Pick<MaterialStateType, 'mediaList'>

interface PageProps {
    page: number,
    size: number
}

let promistUploadFileArray: Array<Promise<unknown>> = [];
let uploadProcess: number = 0
const MediaCreativity: FC<MediaCreativityProps> = (props) => {
    const { mediaList, dispatch, userInfo, mediaGetLoading } = props

    const mediaRef = useRef<HTMLDivElement>(null)
    const [mediaToWorkbenchLoading, setMediaToWorkbenchLoading] = useState(false)
    const [mediaUploading, setMediaLoading] = useState(false)
    const [mediaQueryParams, setMediaQuery] = useState<PageProps>({ page: 1, size: 10 })
    const [filterDate, setFilterDate] = useState<[string, string]>(['', ''])
    const [mediaSort, setMediaSort] = useState('Default')
    const [mediaSouceFilter, setmediaSouceFilte] = useState('All')

    useEffect(() => {
        if (userInfo?.userId) {
            dispatch({
                type: 'material/fetchMedias',
                payload: {
                    ...mediaQueryParams, id: userInfo.userId, resourceType: mediaSouceFilter, sortForResource: mediaSort,
                    sortForTag: 'Default', beginTime: filterDate[0], endTime: filterDate[1]
                }
            })
        }
    }, [userInfo?.userId, mediaQueryParams, mediaSort, mediaSouceFilter, filterDate])

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
                    setMediaQuery({page: 1, size: 10})
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
        const newArr = mediaList
        newArr.splice(i, 1)
        showDeleteConfirm(dispatch, deleteInfo, 'media', newArr)
    }

    return <div>
        <div className={styles.rangeDate}>
        </div>
        <PublicHeader onClear={clearMediaCheck} type='media' onAddToWorkbench={addMediaToWorkbench} onSort={setMediaSort} onSource={setmediaSouceFilte}
            openFolder={() => { console.log('folder') }} onUpload={onUploadMedias} uploading={mediaUploading} onChangeDate={setFilterDate} />
        <Spin spinning={!!mediaGetLoading}>
            <div className={`${styles.mediaContent} ${styles.mediaList}`} onScroll={scrollMedia} ref={mediaRef}>
                {
                    mediaList.map((media, i) => {
                        return <MaterialBox {...media} key={media.id} index={i} type='media' onClick={checkedMedia} onDelete={deleteMedia} />
                    })
                }
            </div>
        </Spin>
        {
            (mediaUploading || mediaToWorkbenchLoading) && <Loading showMask tips='上传中，请稍后...' />
        }
    </div>
}

const showDeleteConfirm = (dispatch: Dispatch, deleteInfo: PublicMaterialDataType, type: 'text' | 'media', setArr: PublicMaterialDataType[]) => {
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
    mediaGetLoading: loading.effects['material/fetchMedias'],
    userInfo: user.currentUser
}))(MediaCreativity)
