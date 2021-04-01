import React, { FC } from 'react'
import { AppInfo, connect, Dispatch, history, UserModelState } from 'umi'
import { CheckCircleOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { PreviewAdvType, WorkbenchDataType } from '../../workbench/data'
import { AdvPreview } from '../AdvPreview'

import styles from './index.less'

export type RenderAdvsProps = {
    title: string,
    dec?: string,
    isFinished: boolean,
    onCheckAll?: () => void,
    isCheckAll: boolean,
    previewAdvs: PreviewAdvType[],
    nextUrl: string,
    appInfo?: AppInfo,
    onCheckAdv?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void,
    onCopy?: (index: number, adv: PreviewAdvType) => void,
    onDelete?: (index: number) => void,
    dispatch: Dispatch,
    type?: 'crowds' | 'facebook' | 'launcher',
    showCopy?: boolean,
    showDelete?: boolean
}

export type AdvProps = {
    appInfo?: AppInfo,
    onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void),
    onCopy?: () => void,
    onDelete?: () => void,
    showCopy?: boolean,
    showDelete?: boolean,
    isFinished?: boolean,
    advInfo: PreviewAdvType
}

export const Adv: FC<AdvProps> = (props) => {
    const { onClick, onCopy, onDelete, advInfo, appInfo, showCopy, showDelete, isFinished } = props
    return <div className={`${styles.item} ${advInfo.checked ? styles.active : ''}`} onClick={e => onClick && onClick(e)}>
        {
            showCopy && <span className={styles.copyIcon}><CopyOutlined className={styles.icon} onClick={(e) => { e.stopPropagation(); onCopy && onCopy() }} /></span>
        }
        {
            showDelete && <span className={styles.delIcon}><DeleteOutlined className={styles.icon} onClick={(e) => { e.stopPropagation(); onDelete && onDelete() }} /></span>
        }
        {
            isFinished && <span className={styles.finished}><CheckCircleOutlined /></span>
        }
        <AdvPreview {...advInfo} appInfo={appInfo} classNames={styles.preview} />
    </div>
}

Adv.defaultProps = {
    showCopy: false,
    showDelete: false
}

const RenderAdvs: FC<RenderAdvsProps> = (props) => {
    const { title, dec, isFinished, onCheckAll, isCheckAll, previewAdvs, appInfo, showCopy, showDelete, onCheckAdv, onCopy, onDelete, nextUrl, type, dispatch } = props

    const nextStep = () => {
        previewAdvs[0].checked = true
        dispatch({
            type: 'workbench/savePreviewAdvs',
            payload: { previewAdvs: previewAdvs }
        })
        history.push(nextUrl)
    }
    return <div className={styles.advList}>
        <div className={styles.topdec}>
            <div className={styles.text}>
                <div className={styles.title}>{title}</div>
                <i className={styles.dec}>{dec}</i>
            </div>
            <Button style={{ marginRight: 10 }} type='primary' onClick={onCheckAll}>{isCheckAll ? "取消全选" : "全选"}</Button>
            <Button style={{ marginRight: 10 }} type='primary' onClick={() => history.goBack()}>返回</Button>
            {
                type == 'crowds' &&
                <Button type='primary' style={{ marginRight: 10 }} onClick={() => history.push('/advlauncher/facebook')}>跳过</Button>
            }
            <Button type='primary' disabled={!isFinished} onClick={nextStep}>下一步</Button>
        </div>
        <div className={styles.lists}>
            {
                previewAdvs.map((adv, index) => {
                    return <Adv advInfo={adv} key={`${adv.imgId}&${adv.textId}&${index}`} appInfo={appInfo} onClick={e => onCheckAdv && onCheckAdv(e, index)}
                        showCopy={showCopy} showDelete={showDelete} onCopy={() => showCopy && onCopy && onCopy(index, adv)} onDelete={() => showDelete && onDelete && onDelete(index)}
                        isFinished={Boolean(type == 'facebook' && adv?.facebookSetting) || Boolean(type == 'crowds' && adv.audsInfo)} />
                })
            }
        </div>
    </div>
}

RenderAdvs.defaultProps = {
    title: '请为发布的广告选择人群包',
    dec: '按住shift可选择多个广告素材',
    isFinished: false,
    isCheckAll: false,
    showCopy: false,
    showDelete: false,
}

export default connect(({ workbench, user }: { workbench: WorkbenchDataType, user: UserModelState }) => ({
    previewAdvs: workbench.previewAdvs,
    appInfo: user.appInfo
}))(RenderAdvs)