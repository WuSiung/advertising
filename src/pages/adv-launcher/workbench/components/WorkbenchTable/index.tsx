import { Button } from 'antd'
import { create } from 'lodash'
import React, { FC, useState } from 'react'
import { connect } from 'umi'
import { WorkbenchDataType, ImgDataType, TextDataType } from '../../data.d'

import styles from './index.less'

interface WorkbenchTableProps {
    imgList: ImgDataType[],
    textList: TextDataType[]
}

interface CreateBlockProps {
    X: number,
    Y: number
}

const RenderImgList: FC<ImgDataType> = (props) => {
    return <th key={props.imgId} className={styles.container}>
        <div className={styles.mediaBox}>
            <span className="del-icon" onClick={() => { console.log() }}>
                <i className="el-icon-delete"></i>
            </span>
            {
                props.type == 0 ? <img src={props.url} className="img-item" width="80" height="80" v-if="item.type==0" />
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
const createS = (X: number, Y: number) => {
    // console.log(1)
}

const RenderCreateBlock: FC<CreateBlockProps> = (props) => {
    const { X, Y } = props
    const [checkX,setCheckX] = useState<number>(-1);
    const [checkY,setCheckY] = useState<number>(-1);
    const setXY = (checkX: number, checkY: number) => {
        setCheckX(checkX)
        setCheckY(checkY)
    }
    return <td className={`${styles.creatBlock} ${X==checkX&&Y==checkY?styles.active:""}`} onClick={e => createS(X, Y)} onMouseEnter={e => setXY(X, Y)} onMouseLeave={e => setXY(-1, -1)}>
        <div className={styles.add}>+</div>
    </td>
}

const WorkbenchTable: FC<WorkbenchTableProps> = (props) => {
    const { imgList, textList } = props
    const tenBlock = 10 - imgList.length > 0 ? new Array(10 - imgList.length) : []
    tenBlock.map(item => {
        console.log(item)
    })
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
                            tenBlock.map(() => {
                                return <th className={styles.container}></th>
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
                                    imgList.map((img, X) => (<RenderCreateBlock key={img.imgId + ' ' + text.textId} X={X} Y={Y} />))
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default connect(({ workbench }: { workbench: WorkbenchDataType }) => ({
    imgList: workbench.uploadImgList,
    textList: workbench.uploadTextList
}))(WorkbenchTable)