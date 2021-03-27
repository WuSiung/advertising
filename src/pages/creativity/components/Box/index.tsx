import { isVideo, isImage } from '@/utils/fileType'
import React, { FC, useRef, useState } from 'react'
import { Image, Tag } from 'antd'
import { CheckOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'

import styles from './index.less'
import { PublicMaterialDataType, TagType } from '../../data'

type MaterialBox = {
    index: number,
    type?: 'media' | 'text',
    onClick?: (i: number) => void,
    onDelete?: (i: number) => void,
    onEdit?: (i: number) => void,
    tags: TagType[]
} & PublicMaterialDataType
const MaterialBox: FC<MaterialBox> = (props) => {
    const { type, onClick, checked, index, onDelete, onEdit, tags } = props
    const [isPlay, setIsPlay] = useState(false)
    const video = useRef<HTMLVideoElement>(null)

    return <div className={`${styles.materialBox} ${type == 'media' ? styles.isMedia : styles.isText} ${checked ? styles.active : ''}`}
        onClick={() => onClick && onClick(index)}>
        {
            type == 'media' && <div className={styles.imgOrVideo}>
                {
                    isImage(props.contentType) ? <Image src={props.googleMediaLink} preview={false} />
                        : <video src={props.googleMediaLink} ref={video}></video>
                }
                {
                    !isImage(props.contentType) && !isPlay && <span className={styles.videoBtn}>
                        <PlayCircleOutlined className={styles.play} onClick={() => { video.current?.play(); setIsPlay(true) }} />
                    </span>
                }
                {
                    !isImage(props.contentType) && isPlay && <span className={styles.videoBtn}>
                        <PauseCircleOutlined className={styles.pause} onClick={() => { video.current?.pause(); setIsPlay(false) }} />
                    </span>
                }
            </div>
        }
        {
            type == 'text' && <div className={styles.text}>{props.description + '&&' + props.title}</div>
        }
        <span className={styles.edit} onClick={e => { e.stopPropagation(); onEdit && onEdit(index) }}><EditOutlined /></span>
        <span className={styles.close} onClick={e => { e.stopPropagation(); onDelete && onDelete(index) }}><DeleteOutlined /></span>
        <div className={styles.tag}>
            {
                Array.isArray(tags) && tags.map((tag, index) => {
                    return index < 3 && <Tag color="magenta" key={tag.id}>{tag.name}</Tag>
                })
            }
            {
                Array.isArray(tags) && tags.length > 3 && <Tag color="magenta">...</Tag>
            }
        </div>
    </div>
}

MaterialBox.defaultProps = {
    type: 'media'
}

export default MaterialBox