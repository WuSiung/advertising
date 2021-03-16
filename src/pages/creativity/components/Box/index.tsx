import { isVideo, isImage } from '@/utils/fileType'
import React, { FC } from 'react'
import { Image, Tag } from 'antd'
import { CheckOutlined, CloseCircleOutlined, EditOutlined } from '@ant-design/icons'

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
    return <div className={`${styles.materialBox} ${type == 'media' ? styles.isMedia : styles.isText} ${checked ? styles.active : ''}`}
        onClick={() => onClick && onClick(index)}>
        {
            type == 'media' && <div className={styles.imgOrVideo}>
                {
                    isImage(props.contentType) ? <Image src={props.googleMediaLink} preview={false} />
                        : <video src={props.googleMediaLink}></video>
                }
            </div>
        }
        {
            type == 'text' && <div className={styles.text}>{props.description + '&&' + props.title}</div>
        }
        <span className={styles.edit} onClick={e => { e.stopPropagation(); onEdit && onEdit(index) }}><EditOutlined /></span>
        <span className={styles.close} onClick={e => { e.stopPropagation(); onDelete && onDelete(index) }}><CloseCircleOutlined /></span>
        <div className={styles.tag}>
            {
                tags.map((tag, index) => {
                    return index < 3 && <Tag color="magenta" key={tag.id}>{tag.name}</Tag>
                })
            }
            {
                tags.length > 3 && <Tag color="magenta">...</Tag>
            }
        </div>
    </div>
}

MaterialBox.defaultProps = {
    type: 'media'
}

export default MaterialBox