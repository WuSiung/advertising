import { CloseCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { AdvPreview } from '@/pages/adv-launcher/components/AdvPreview'
import { PreviewAdvType } from '../../workbench/data'
import type { AppInfo, UserModelState } from '@/models/user'

import styles from './index.less'
import { Dispatch, connect } from 'umi'

interface PreviewContainerProps {
    visible: boolean,
    handleVisible(visible: boolean): void,
    previewAdvs?: PreviewAdvType[],
    appInfo?: AppInfo,
    dispatch: Dispatch
}

const PreviewContainer: FC<PreviewContainerProps> = (props) => {
    const { visible, handleVisible, previewAdvs, appInfo, dispatch } = props

    const deletePreviewAdvs = (index: number) => {
        const newPreviewAdvs = previewAdvs
        newPreviewAdvs?.splice(index, 1)

        dispatch({
            type: 'workbench/savePreviewAdvs',
            payload: { previewAdvs: newPreviewAdvs }
        })

    }
    return <div className={`${styles.previewContainer}`}>
        <div className={`${styles.previewMenu} ${visible ? styles.visibleMenu : ''}`} onClick={() => handleVisible(!visible)}>
            {
                visible ? <RightOutlined /> : <LeftOutlined />
            }
            <span className={styles.text}>广告选择预览({previewAdvs?.length})</span>
        </div>
        <div className={`${styles.preivewContent}  ${visible ? styles.showContent : ''}`}>
            <div className={styles.previewTitle}>工作台</div>
            <div className={styles.container}>
                {
                    previewAdvs?.map((adv, index) => {
                        return !adv.kinds && <div className={styles.previewItem} key={adv.imgId + '&' + adv.textId + '&' + index}>
                            <CloseCircleOutlined className={styles.delete} onClick={() => deletePreviewAdvs(index)} />
                            <AdvPreview {...adv} appInfo={appInfo} />
                        </div>
                    })
                }
            </div>
            <div className={styles.previewTitle}>广告创意</div>
            <div className={styles.container}>
                {
                    previewAdvs?.map((adv, index) => {
                        return adv.kinds && <div className={styles.previewItem} key={adv.imgId + '&' + adv.textId + '&' + index}>
                            <CloseCircleOutlined className={styles.delete} onClick={() => deletePreviewAdvs(index)} />
                            <AdvPreview {...adv} appInfo={appInfo} />
                        </div>
                    })
                }
            </div>
        </div>
        {
            visible && <div className={styles.modal} onClick={() => handleVisible(false)}></div>
        }
    </div>
}

export default connect(({ workbench, user, loading }: { workbench: any, user: UserModelState, loading: { effects: { [key: string]: boolean } } }) => ({
    previewAdvs: workbench.previewAdvs,
    appInfo: user.appInfo
}))(PreviewContainer)