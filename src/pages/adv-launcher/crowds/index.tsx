import React, { FC, useEffect } from 'react'
import Crowds from '@/pages/audience-manager/crowds'
import { Card, Button, message } from 'antd'
import { AppInfo, connect, Dispatch, UserModelState, history } from 'umi'
import Steps from '../components/Steps'
import type { PreviewAdvType, WorkbenchDataType } from '../workbench/data'
import type { CrowdStateType } from '@/pages/audience-manager/crowds/data'
import type { AudienceModelDataType } from '@/pages/audience-manager/data'
import RenderAdvs from '../components/RenderAdvs'

import styles from './index.less'

interface BindCrowdsProps {
    previewAdvs: PreviewAdvType[],
    crowdsList: Array<AudienceModelDataType>,
    appInfo?: AppInfo,
    dispatch: Dispatch
}

const BindCrowds: FC<BindCrowdsProps> = (props) => {
    const { previewAdvs, crowdsList, appInfo, dispatch } = props
    // 是否全选了
    let isCheckAll = previewAdvs.every(adv => adv.checked);
    let isFinished = previewAdvs.every(adv => adv.audsInfo);

    useEffect(() => {
        let editAdvs = previewAdvs
        if (editAdvs.length <= 0) return
        editAdvs[0].checked = true;

        setAdvs(dispatch, editAdvs)
    }, [])
    const checkAdv = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) => {
        let editAdvs = previewAdvs;
        if (e.shiftKey) {
            editAdvs[i].checked = true;
        } else {
            editAdvs.map((adv, advIndex) => {
                if (i == advIndex) {
                    setCrowds(dispatch, adv.audsInfo, crowdsList)
                    editAdvs[i].checked = true;
                } else {
                    editAdvs[advIndex].checked = false
                }
            })
        }
        setAdvs(dispatch, editAdvs)
    }
    const checkAll = () => {
        let editAdvs = previewAdvs
        editAdvs.map(adv => {
            adv.checked = !isCheckAll
        })
        setAdvs(dispatch, editAdvs)
    }
    const copyAdv = (index: number, adv: PreviewAdvType) => {
        let editAdvs = previewAdvs
        editAdvs.splice(index, 0, JSON.parse(JSON.stringify(adv)))
        setAdvs(dispatch, editAdvs)
    }
    const deleteAdv = (i: number) => {
        let editAdvs = previewAdvs
        editAdvs.splice(i, 1)
        setAdvs(dispatch, editAdvs)
    }
    const saveCrowd = () => {
        const crowdIds = crowdsList.filter(crowd => { return crowd.active }).map(item => { return { audId: item.audId, audName: item.audName } })
        if (crowdIds.length <= 0) {
            message.warning('请选择人群包')
        }
        const isChecked = previewAdvs.some(item => item.checked)
        if (!isChecked) {
            message.warning('请选择至少一个广告素材')
        }
        let editAdvs = previewAdvs;
        let autoNextIndex = 0;
        editAdvs = editAdvs.map((adv, index) => {
            if (adv.checked) {
                adv.audsInfo = crowdIds;
                adv.checked = false;
                autoNextIndex = index + 1
            }
            return adv
        })
        // 自动选择下一项
        if (autoNextIndex < editAdvs.length) {
            editAdvs[autoNextIndex].checked = true
        }
        setAdvs(dispatch, editAdvs)
    }
    return <Card className={styles.bindCrowds}>
        <Steps stepNum={1} />
        <RenderAdvs title='请为发布的广告选择人群包' onCheckAll={checkAll} isCheckAll={isCheckAll} isFinished={isFinished} showCopy showDelete
            onCheckAdv={checkAdv} onCopy={copyAdv} onDelete={deleteAdv} nextUrl='/advlauncher/facebook'></RenderAdvs>
        <div className={styles.save}>
            <Button type='primary' onClick={saveCrowd}>保存</Button>
        </div>
        <Crowds />
    </Card>
}

const setAdvs = (dispatch: Dispatch, params: PreviewAdvType[]) => {
    dispatch({
        type: 'workbench/savePreviewAdvs',
        payload: { previewAdvs: params }
    })
}


const setCrowds = (dispatch: Dispatch, auds: { audId: number; audName: string }[] | undefined, crowdsList: Array<AudienceModelDataType>) => {
    auds = auds || []
    let newAuds = auds.map(aud => {
        return aud.audId
    })
    const newCrowds = crowdsList.map(crowd => {
        if (newAuds.includes(crowd.audId)) {
            crowd.active = true
        } else {
            crowd.active = false
        }
        return crowd
    })
    dispatch({
        type: 'crowds/saveCrowdsList',
        payload: { crowdsList: JSON.parse(JSON.stringify(newCrowds)) }
    })
}

export default connect(({ crowds, workbench, user }: { crowds: CrowdStateType, workbench: WorkbenchDataType, user: UserModelState }) => ({
    previewAdvs: workbench.previewAdvs,
    crowdsList: crowds.crowdsList,
    appInfo: user.appInfo
}))(BindCrowds)