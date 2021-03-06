import { showConfirm } from '@/components/Confrim'
import { CopyOutlined, DeleteFilled, EditOutlined, PauseCircleOutlined, PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Empty, Input, message, Modal, Popover } from 'antd'
import React, { FC, useRef, useState } from 'react'
import { connect, Dispatch } from 'umi'
import { WorkbenchDataType, ImgDataType, TextDataType, PreviewAdvType, HasAdvs } from '../../data.d'
import { deleteMedia, deleteText, editText } from '../../service'
import HoverPopover from '../HoverPopover'

import styles from './index.less'

interface WorkbenchTableProps {
    imgList: ImgDataType[],
    textList: TextDataType[],
    previewAdvs: PreviewAdvType[],
    previewAdvsRecord: Array<Array<PreviewAdvType>>,
    hasAdvs: Array<Array<HasAdvs>>,
    dispatch: Dispatch
}

interface CreateBlockProps {
    X: number,
    Y: number,
    classNames?: string,
    createAdv(X: number, Y: number): void,
}

type RenderImgListProps = {
    onDelete?: (params: ImgDataType) => void
} & ImgDataType

type RenderTextListProps = {
    onDelete?: (params: TextDataType) => void,
    onCopy?: (params: TextDataType) => void,
    onEdit?: (params: TextDataType) => void,
} & TextDataType

const RenderImgList: FC<RenderImgListProps> = (props) => {
    const video = useRef<HTMLVideoElement>(null)
    const [isPlay, setIsPlay] = useState(false)
    return <th key={props.imgId} className={styles.container}>
        <HoverPopover {...props}>
            <div className={styles.mediaBox}>
                <span className={styles.delText} onClick={() => props.onDelete && props.onDelete(props)}><DeleteFilled /></span>
                {
                    props.type == 0 ? <img src={props.url} className="img-item" v-if="item.type==0" />
                        : <video src={props.url} ref={video} />
                }
                {
                    props.type != 0 && !isPlay && <span className={styles.videoBtn}><PlayCircleOutlined className={styles.play} onClick={() => { video.current?.play(); setIsPlay(true) }} /></span>
                }
                {
                    props.type != 0 && isPlay && <span className={styles.videoBtn}><PauseCircleOutlined className={styles.pause} onClick={() => { video.current?.pause(); setIsPlay(false) }} /></span>
                }
                {
                    props.type == 1 && <i className="el-icon-video-play" v-if="item.type == 1" onClick={() => "playVideo(item.fileId)"}></i>
                }
            </div>
        </HoverPopover>
    </th>
}

const RenderTextList: FC<RenderTextListProps> = (props) => {
    const { onCopy, onDelete, onEdit } = props
    let content = props.content.replace(/\n/g, '<br/>') || ''
    return <td className={styles.tdtext}>
        <HoverPopover {...props} placement='right'>
            <div className={styles.textBox}>

                {props.title}<div dangerouslySetInnerHTML={{ __html: content }}></div>
                <span className={styles.delText} onClick={() => onDelete && onDelete(props)}><DeleteFilled /></span>
                <span className={styles.copyText} onClick={() => onCopy && onCopy(props)}><CopyOutlined /></span>
                <span className={styles.editText} onClick={() => onEdit && onEdit(props)}><EditOutlined /></span>
            </div>
        </HoverPopover>
    </td>
}

const RenderCreateBlock: FC<CreateBlockProps> = (props) => {
    const { X, Y, createAdv, classNames } = props
    const [checkX, setCheckX] = useState<number>(-1);
    const [checkY, setCheckY] = useState<number>(-1);
    const setXY = (checkX: number, checkY: number) => {
        setCheckX(checkX)
        setCheckY(checkY)
    }
    return <div className={`${styles.creatBlock}  ${X == checkX && Y == checkY ? styles.hover : ''} ${classNames}`}
        onClick={e => createAdv(X, Y)} onMouseEnter={e => setXY(X, Y)} onMouseLeave={e => setXY(-1, -1)}>
        <div className={styles.add}>
            <span><PlusOutlined /></span>
        </div>
    </div>
}

const WorkbenchTable: FC<WorkbenchTableProps> = (props) => {
    const { imgList, textList, previewAdvs, dispatch, hasAdvs, previewAdvsRecord } = props
    const [textInfo, setTextInfo] = useState<string>('')
    const [showTextEdit, setShowTextEdit] = useState<{ id: number, show: boolean }>({ id: -1, show: false })
    let tenBlock = 10 - imgList.length > 0 ? new Array(10 - imgList.length) : [];
    tenBlock = Array.apply(null, tenBlock)


    const saveToPreviewAdvs = async (X: number, Y: number) => {
        const previewAdvItem: PreviewAdvType = {
            type: imgList[X].type || 0,
            url: imgList[X].url,
            imgId: imgList[X].imgId,
            content: textList[Y].content,
            title: textList[Y].title,
            textId: textList[Y].textId,
        }

        let newPreviewAdvs = saveAdvs(previewAdvs, previewAdvItem);
        if (previewAdvs.length > 0) {
            previewAdvsRecord.push(previewAdvs)
            // 数据深拷贝
            let newParams = JSON.parse(JSON.stringify(previewAdvsRecord))
            await dispatch({
                type: 'workbench/savePreviewAdvsRecord',
                payload: { previewAdvsRecord: newParams }
            })
        }
        await dispatch({
            type: 'workbench/savePreviewAdvs',
            payload: { previewAdvs: newPreviewAdvs }
        })
    }
    const clearAll = () => [
        dispatch({ type: 'workbench/clearWorkbench' })
    ]

    const deleteImg = (info: ImgDataType) => {
        showConfirm({ onOk: deleteMedia.bind(null, info.imgId) }).then(async () => {
            let newPreview = previewAdvs.filter(adv => adv.imgId != info.imgId)
            await dispatch({ type: 'workbench/fetchAllList' })
            dispatch({
                type: 'workbench/savePreviewAdvs',
                payload: { previewAdvs: newPreview }
            })
        })
    }

    const onDeleteText = (info: TextDataType) => {
        showConfirm({ onOk: deleteText.bind(null, info.textId) }).then(() => {
            let newPreview = previewAdvs.filter(adv => adv.textId != info.textId)
            dispatch({ type: 'workbench/fetchAllList' })
            dispatch({
                type: 'workbench/savePreviewAdvs',
                payload: { previewAdvs: newPreview }
            })
        })
    }
    const onCopyText = async (info: TextDataType) => {
        const postArr: Array<TextDataType | Omit<TextDataType, 'textId'>> = [];
        textList.map(text => {
            postArr.push(text)
            if (text.textId == info.textId) {
                const { textId, ...copyParams } = text
                postArr.push(copyParams)
            }
        })
        await dispatch({
            type: 'workbench/uploadText',
            payload: postArr
        })
        message.success('复制成功')
        dispatch({ type: 'workbench/fetchAllList' })
    }

    const onEditText = (info: TextDataType) => {
        setTextInfo(info.content + '&&' + info.title)
        setShowTextEdit({ id: info.textId, show: true })
    }

    const onChangeTextInfo = () => {
        const text = textInfo.split('&&')
        editText({ title: text[1], content: text[0], textId: showTextEdit.id }).then(res => {
            console.log(res)
            if (res.code == 0) {
                setShowTextEdit({ id: -1, show: false })
                dispatch({ type: 'workbench/fetchAllList' })
            }
        })
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.workbenchTable}>
                <thead>
                    <tr>
                        <th className={styles.firsttd}>
                            <Button type='primary' onClick={clearAll}>清空素材</Button>
                            {/* <div className={styles.bestText}>最佳文案素材</div> */}
                        </th>
                        {
                            imgList.map(img => {
                                return <RenderImgList key={img.imgId} {...img} onDelete={deleteImg} />
                            })
                        }
                        {
                            imgList.length <= 0 && [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                                return <th key={index} className={styles.container}>
                                    <div className={styles.mediaBox} style={{ background: 'none', boxShadow: 'none' }}>
                                        {
                                            index == 2 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ color: '#fff' }} description='暂无媒体数据' />
                                        }
                                    </div>
                                </th>
                            })
                        }
                        {
                            imgList.length > 0 && tenBlock.map((empty, index) => {
                                return <th className={styles.container} key={index}></th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        textList.map((text, Y) => {
                            return <tr key={text.textId}>
                                <RenderTextList {...text} onDelete={onDeleteText} onCopy={onCopyText} onEdit={onEditText} />
                                {
                                    imgList.map((img, X) => {
                                        let type = 0
                                        if (hasAdvs.length > 0 && hasAdvs[X][Y] && hasAdvs[X][Y].ads > 0) {
                                            let roas = Number(hasAdvs[X][Y].data?.mobileAppPurchaseRoas)
                                            if (roas > 1) {
                                                type = 3
                                            } else if (roas < 1 && roas > 0.5) {
                                                type = 2
                                            } else if (roas < 0.5 && roas > 0.1) {
                                                type = 1
                                            } else if (roas < 0.1) {
                                                type = 0
                                            }
                                        }
                                        return hasAdvs.length > 0 && hasAdvs[X][Y] && hasAdvs[X][Y].ads > 0 ? <HoverPopover placement='top'  {...hasAdvs[X][Y]} key={img.imgId + '&' + text.textId} >
                                            <td>
                                                <RenderCreateBlock classNames={`${isActive(previewAdvs, img.imgId, text.textId) && styles.active} ${'has-adv' + type}`}
                                                    createAdv={saveToPreviewAdvs} X={X} Y={Y} />
                                            </td>
                                        </HoverPopover>
                                            : <Popover content='组合创建新广告' placement='bottom' className={styles.popsname} key={img.imgId + '&' + text.textId}>
                                                <td>
                                                    <RenderCreateBlock classNames={`${isActive(previewAdvs, img.imgId, text.textId) && styles.active}`}
                                                        createAdv={saveToPreviewAdvs} X={X} Y={Y} />
                                                </td>
                                            </Popover>
                                    }
                                    )
                                }
                            </tr>
                        })
                    }
                    {
                        textList.length <= 0 && [1, 1, 1, 1].map((item, index) => {
                            return <tr key={index}>
                                <td className={styles.tdtext}>
                                    <div className={styles.textBox} style={{ background: 'none', boxShadow: 'none', overflow: 'hidden' }}>
                                        {
                                            index == 1 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ color: '#fff' }} description='暂无文本数据' />
                                        }
                                    </div>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
            <Modal title='编辑文本' visible={showTextEdit.show} onCancel={() => setShowTextEdit({ show: false, id: -1 })} onOk={onChangeTextInfo}>
                <Input.TextArea value={textInfo} className={styles.textcontent} onChange={e => setTextInfo(e.target.value)} />
            </Modal>
        </div>
    )
}

const isActive = (previewAdvs: PreviewAdvType[], imgId: number, textId: number): boolean => {
    let flag = previewAdvs.some(adv => {
        return adv.imgId == imgId && adv.textId == textId
    })
    return flag
}

const saveAdvs = (previewAdvs: PreviewAdvType[], addAdv: PreviewAdvType): PreviewAdvType[] => {
    if (previewAdvs.length <= 0) {
        previewAdvs.push(addAdv)
        return previewAdvs
    } else {
        let i = -1
        const status = previewAdvs.some((adv, index) => {
            i = index
            return adv.imgId == addAdv.imgId && adv.textId == addAdv.textId
        })
        status ? previewAdvs.splice(i, 1) : previewAdvs.push(addAdv)
        return previewAdvs
    }
}

export default connect(({ workbench }: { workbench: WorkbenchDataType }) => ({
    imgList: workbench.uploadImgList,
    textList: workbench.uploadTextList,
    hasAdvs: workbench.hasAdvs,
    previewAdvs: workbench.previewAdvs,
    previewAdvsRecord: workbench.previewAdvsRecord
}))(WorkbenchTable)