import React, { FC, useRef, useState } from 'react'
import { Button, Image } from 'antd'

import { PreviewAdvType } from '../../workbench/data'

import styles from './index.less'
import type { AppInfo } from '@/models/user'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'

type AdvPreviewProps = {
    appInfo?: AppInfo,
    classNames?: string
} & PreviewAdvType

const AdvPreview: FC<AdvPreviewProps> = (props) => {
    const { appInfo, classNames, type, ...ohterProps } = props
    const video = useRef<HTMLVideoElement>(null)
    const [isPlay, setIsPlay] = useState(false)
    return <div className={`${styles.previewAdv} ${classNames || ''}`}>
        <div className={styles.header}>
            <Image src={appInfo?.logo} preview={false} width={28} />
            <div className={styles.info}>
                <span className={styles.appName}>{appInfo?.appName}</span>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.contentText} dangerouslySetInnerHTML={{ __html: ohterProps.content.replace(/\n/g, '<br/>') }}></div>
            <div className={styles.media}>
                {
                    type == 0 ? <Image src={ohterProps.url} preview={false} /> : <video src={ohterProps.url} ref={video}></video>
                }
                {
                    type != 0 && !isPlay && <span className={`${styles.videoBtn} video-btn`}>
                        <PlayCircleOutlined className={styles.play} onClick={() => { video.current?.play(); setIsPlay(true) }} />
                    </span>
                }
                {
                    type != 0 && isPlay && <span className={`${styles.videoBtn} video-btn`}>
                        <PauseCircleOutlined className={styles.pause} onClick={() => { video.current?.pause(); setIsPlay(false) }} />
                    </span>
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