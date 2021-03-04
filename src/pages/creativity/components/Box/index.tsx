import { isVideo, isImage } from '@/utils/fileType'
import React, { FC } from 'react'
import { Image } from 'antd'
import { CheckOutlined, CloseCircleOutlined } from '@ant-design/icons'

import styles from './index.less'

type MaterialBox = {
    index: number,
    type?: 'media' | 'text',
    onClick?: (i: number) => void,
    onDelete?: (i: number) => void,
} & PublicMaterialDataType
const MaterialBox: FC<MaterialBox> = (props) => {
    const { type, onClick, checked, index, onDelete } = props
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
        <span className={styles.rank}>{props.index + 1}</span>
        <span className={styles.close} onClick={e => { e.stopPropagation(); onDelete && onDelete(index) }}><CloseCircleOutlined /></span>
        <span className={styles.check}><CheckOutlined /></span>
    </div>
}

MaterialBox.defaultProps = {
    type: 'media'
}

export default MaterialBox