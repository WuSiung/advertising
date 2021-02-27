import React, { FC } from 'react'
import { Button, Image } from 'antd'

import { PreviewAdvType } from '../../workbench/data'

import styles from './index.less'
import type { AppInfo } from '@/models/user'

type AdvPreviewProps = {
    appInfo?: AppInfo,
    classNames?: string
} & PreviewAdvType

const AdvPreview: FC<AdvPreviewProps> = (props) => {
    const { appInfo, classNames, type, ...ohterProps } = props
    return <div className={`${styles.previewAdv} ${classNames || ''}`}>
        <div className={styles.header}>
            <Image src={appInfo?.logo} preview={false} width={28} />
            <div className={styles.info}>
                <span className={styles.appName}>{appInfo?.appName}</span>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.contentText}>
                {ohterProps.content}
            </div>
            <div className={styles.media}>
                {
                    type == 0 ? <Image src={ohterProps.url} preview={false} /> : <video src={ohterProps.url}></video>
                }
            </div>
        </div>
        <div className={styles.footer}>
            <span className={styles.title}>{ohterProps.title}</span>
            <Button className={styles.download}>下载</Button>
        </div>
    </div>
}

export { AdvPreview }