import { Button } from 'antd'
import { create } from 'lodash'
import React, { FC, useState } from 'react'
import { connect, Dispatch } from 'umi'
import { WorkbenchDataType, ImgDataType, TextDataType, PreviewAdvType } from '../../data.d'

import styles from './index.less'

interface WorkbenchTableProps {
    imgList: ImgDataType[],
    textList: TextDataType[],
    previewAdvs: PreviewAdvType[],
    dispatch: Dispatch
}

interface CreateBlockProps {
    X: number,
    Y: number,
    classNames?: string,
    createAdv(X: number, Y: number): void,
}

const RenderImgList: FC<ImgDataType> = (props) => {
    return <th key={props.imgId} className={styles.container}>
        <div className={styles.mediaBox}>
            <span className="del-icon" onClick={() => { console.log() }}>
                <i className="el-icon-delete"></i>
            </span>
            {
                props.type == 0 ? <img src={props.url} className="img-item" v-if="item.type==0" />
                    : <video src={props.url} />
            }
            {
                props.type == 1 && <i className="el-icon-video-play" v-if="item.type == 1" onClick={() => "playVideo(item.fileId)"}></i>
            }
        </div>
    </th>
}

const RenderTextList: FC<TextDataType> = (props) => {
    return <td className={styles.tdtext}>
        <div className={styles.textBox}>
            {props.content + '&&' + props.title}
            <span>删除</span>
            <span>复制</span>
            <span>编辑</span>
        </div>
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
    return <td className={`${styles.creatBlock}  ${X == checkX && Y == checkY ? styles.hover : ''} ${classNames}`}
        onClick={e => createAdv(X, Y)} onMouseEnter={e => setXY(X, Y)} onMouseLeave={e => setXY(-1, -1)}>
        <div className={styles.add}>+</div>
    </td>
}

const WorkbenchTable: FC<WorkbenchTableProps> = (props) => {
    const { imgList, textList, previewAdvs, dispatch } = props
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
        await dispatch({
            type: 'workbench/savePreviewAdvs',
            payload: { previewAdvs: newPreviewAdvs }
        })
    }
    return (
        <div className={styles.tableContainer}>
            <table className={styles.workbenchTable}>
                <thead>
                    <tr>
                        <th className={styles.firsttd}>
                            <Button type='primary'>清空素材</Button>
                            <div className={styles.bestText}>最佳文案素材</div>
                        </th>
                        {
                            imgList.map(img => {
                                return <RenderImgList key={img.imgId} {...img} />
                            })
                        }
                        {
                            tenBlock.map((empty, index) => {
                                return <th className={styles.container} key={index}></th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        textList.map((text, Y) => {
                            return <tr key={text.textId}>
                                <RenderTextList {...text} />
                                {
                                    imgList.map((img, X) => (
                                        <RenderCreateBlock classNames={`${isActive(previewAdvs, img.imgId, text.textId) && styles.active}`}
                                            createAdv={saveToPreviewAdvs} key={img.imgId + ' ' + text.textId} X={X} Y={Y} />)
                                    )
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const isActive = (previewAdvs: PreviewAdvType[], imgId: number, textId: number): boolean => {
    return previewAdvs.some(adv => {
        return adv.imgId == imgId && adv.textId == textId
    })
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
    previewAdvs: workbench.previewAdvs,
}))(WorkbenchTable)