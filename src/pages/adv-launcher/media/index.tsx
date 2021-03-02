import React, { FC, useEffect, useRef, useState } from 'react'
import { Card, Modal, Spin, message } from 'antd'
import PublicHeader from './components/PublicHeader'
import moment from 'moment';
import { connect, CurrentUser, Dispatch, UserModelState } from 'umi'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Loading from '@/components/Loading';
import DateRange from '../components/DateRange';
import { createContainer, deletResource, uploadMedia } from './service'
import { postOneRecordToWorkbench, postOneTextsToWorkbench } from '../workbench/service';
import MaterialBox from './components/Box'

import styles from './index.less'
import { isImage } from '@/utils/fileType';

type PublicMediaProps = {
    dispatch: Dispatch,
    userInfo?: CurrentUser,
    mediaGetLoading: boolean,
    textGetLoading: boolean,
    textUploading: boolean
} & MaterialStateType

interface PageProps {
    page: number,
    size: number
}

let promistUploadFileArray: Array<Promise<unknown>> = [];
let uploadProcess: number = 0
const PublicMedia: FC<PublicMediaProps> = (props) => {
    const { textList, mediaList, dispatch, userInfo, textGetLoading, textUploading, mediaGetLoading } = props
    const mediaRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const [mediaQueryParams, setMediaQuery] = useState<PageProps>({ page: 1, size: 10 })
    const [textQueryParams, setTextQuery] = useState<PageProps>({ page: 1, size: 10 })
    const [filterDate, setFilterDate] = useState<[string, string]>([moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
    const [mediaUploading, setMediaLoading] = useState(false)
    const [textModelVisible, setTextModelVisible] = useState(false)
    const [mediaToWorkbenchLoading, setMediaToWorkbenchLoading] = useState(false)
    const [textToWorkbenchLoading, setTextToWorkbenchLoading] = useState(false)


    useEffect(() => {
        if (userInfo?.userId) {
            dispatch({
                type: 'material/fetchMedias',
                payload: { ...mediaQueryParams, id: userInfo.userId }
            })
        }
    }, [userInfo?.userId, mediaQueryParams])
    useEffect(() => {
        if (userInfo?.userId) {
            dispatch({
                type: 'material/fetchTexts',
                payload: { ...textQueryParams, id: userInfo.userId }
            })
        }
    }, [userInfo?.userId, textQueryParams])
    const changeDateRange = (value: [string, string]) => {
        setFilterDate(value)
        setTextQuery({ page: 1, size: 10 })
        setMediaQuery({ page: 1, size: 10 })
    }
    const checkedMedia = (i: number) => {
        let editList = mediaList
        editList[i].checked = !editList[i].checked;
        dispatch({
            type: 'material/saveMedias',
            payload: { mediaList: JSON.parse(JSON.stringify(editList)) }
        })
    }

    const checkText = (i: number) => {
        let editList = textList
        editList[i].checked = !editList[i].checked;
        dispatch({
            type: 'material/saveTexts',
            payload: { textList: JSON.parse(JSON.stringify(editList)) }
        })
    }

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
    const clearTextCheck = () => {
        let editList = textList.map(text => {
            text.checked = false
            return text
        })
        dispatch({
            type: 'material/saveMedias',
            payload: { textList: JSON.parse(JSON.stringify(editList)) }
        })
    }

    const deleteMedia = (i: number) => {
        let deleteInfo = mediaList[i]
        const newArr = mediaList
        newArr.splice(i, 1)
        showDeleteConfirm(dispatch, deleteInfo, 'media', newArr)
    }

    const deleteText = (i: number) => {
        let deleteInfo = textList[i]
        const newArr = textList
        newArr.splice(i, 1)
        showDeleteConfirm(dispatch, deleteInfo, 'text', newArr)
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
                    setMediaLoading(false)
                    dispatch({
                        type: 'material/fetchMedias',
                        payload: { ...mediaQueryParams, id: userInfo?.userId }
                    })
                }).catch(() => {
                    setMediaLoading(false)
                })
            }
        })
    }

    const submitTexts = async (values: string[]) => {
        const uploadParams = values.map(value => {
            let str = value.split('&&')
            return { title: str[1] || '', text: str[0] || '', id: generateUUID() }
        })
        await dispatch({
            type: 'material/uploadTexts',
            payload: { userId: userInfo?.userId || 1, arr: uploadParams }
        })
        setTextModelVisible(false)
        dispatch({
            type: 'material/fetchTexts',
            payload: { ...textQueryParams, id: userInfo!.userId }
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
    const addTextToWorkbench = () => {
        const addArr: Array<Promise<unknown>> = []
        if (textList.every(text => !text.checked)) {
            message.warning('请选择素材')
            return
        }
        setTextToWorkbenchLoading(true)
        textList.map(text => {
            if (text.checked) {
                addArr.push(postOneTextsToWorkbench({ title: text.title, content: text.description }))
            }
        })
        Promise.all(addArr).then(() => {
            setTextToWorkbenchLoading(false)
            message.success('添加成功')
        })
    }

    const scrollMedia = () => {
        console.log(mediaRef)
        const clientHeight = mediaRef.current?.clientHeight || 0;
        const scrollTop = mediaRef.current?.scrollTop || 0;
        const scrollHeight = mediaRef.current?.scrollHeight || 0;
        if ((clientHeight + scrollTop) == scrollHeight) {
            const newQueryParams: PageProps = { page: mediaQueryParams.page + 1, size: mediaQueryParams.size }
            setMediaQuery(newQueryParams)
        }
    }
    const scrollText = () => {
        const clientHeight = textRef.current?.clientHeight || 0;
        const scrollTop = textRef.current?.scrollTop || 0;
        const scrollHeight = textRef.current?.scrollHeight || 0;
        if ((clientHeight + scrollTop) == scrollHeight) {
            const newQueryParams: PageProps = { page: textQueryParams.page + 1, size: textQueryParams.size }
            setTextQuery(newQueryParams)
        }
    }
    return (
        <Card>
            <div className={styles.rangeDate}>
                <DateRange onChange={changeDateRange} />
            </div>
            <div className={styles.media}>
                <div className={styles.leftContainer}>
                    <PublicHeader onClear={clearMediaCheck} type='media' onAddToWorkbench={addMediaToWorkbench}
                        openFolder={() => { console.log('folder') }} onUpload={onUploadMedias} uploading={mediaUploading} />
                    <Spin spinning={!!mediaGetLoading}>
                        <div className={`${styles.mediaContent} ${styles.mediaList}`} onScroll={scrollMedia} ref={mediaRef}>
                            {
                                mediaList.map((media, i) => {
                                    return <MaterialBox {...media} key={media.id} index={i} type='media' onClick={checkedMedia} onDelete={deleteMedia} />
                                })
                            }
                        </div>
                    </Spin>
                </div>
                <div className={styles.textsContainer}>
                    <PublicHeader onClear={clearTextCheck} type='text' onAddToWorkbench={addTextToWorkbench}
                        onUploadText={submitTexts} uploading={textUploading} openText={setTextModelVisible} textVisible={textModelVisible} />
                    <Spin spinning={!!textGetLoading}>
                        <div className={`${styles.mediaContent} ${styles.textList}`} onScroll={scrollText} ref={textRef}>
                            {
                                textList.map((media, i) => {
                                    return <MaterialBox {...media} key={media.id} index={i} type='text' onDelete={deleteText} onClick={checkText} />
                                })
                            }
                        </div>
                    </Spin>
                </div>
            </div>
            {
                (mediaUploading || textToWorkbenchLoading || mediaToWorkbenchLoading) && <Loading showMask tips='上传中，请稍后...' />
            }
        </Card>
    )
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
            if (type == 'media') {
                return deletResource(deleteInfo.id).then(() => {
                    dispatch({
                        type: 'material/saveMedias',
                        payload: { mediaList: JSON.parse(JSON.stringify(setArr)) }
                    })
                })
            } else if (type == 'text') {
                deletResource(deleteInfo.id).then(() => {
                    dispatch({
                        type: 'material/saveTexts',
                        payload: { textList: JSON.parse(JSON.stringify(setArr)) }
                    })
                })
            }
        }
    });
}

const uploadFunction = async (value: string, media: FormData) => {
    await uploadMedia({ id: value as string, media })
}

const generateUUID = (): string => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


export default connect(({ material, user, loading }: { material: MaterialStateType, user: UserModelState, loading: { effects: { [key: string]: boolean } } }) => ({
    textList: material.textList,
    mediaList: material.mediaList,
    mediaGetLoading: loading.effects['material/fetchMedias'],
    textGetLoading: loading.effects['material/fetchTexts'],
    textUploading: loading.effects['material/uploadTexts'],
    userInfo: user.currentUser
}))(PublicMedia)