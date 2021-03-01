import React, { FC, useState } from 'react'
import { Button, Card, Input, message } from 'antd'
import { CaretDownOutlined, CaretRightOutlined, StarFilled } from '@ant-design/icons'
import { connect, Dispatch, history } from 'umi'
import Steps from '../components/Steps'
import { PreviewAdvType, SaveFacebookSettingType, WorkbenchDataType } from '../workbench/data'
import { CompaignsData, SaveChooseCompaignDataType } from '../compaign/data'
import { Adv } from '../components/RenderAdvs'
import { postLauncherAdv } from './service'

import styles from './index.less'
import Loading from '@/components/Loading'


interface LuancherProps {
    previewAdvs: PreviewAdvType[],
    compaignParams: SaveChooseCompaignDataType,
    dispatch: Dispatch
}

const StartIcon: FC<{ active?: boolean }> = (props) => {
    return <span className={`${styles.radio} ${props.active ? styles.active : ''}`}>
        {props.active && <StarFilled className={styles.icon} />}
    </span>
}
StartIcon.defaultProps = {
    active: false
}

const DetailTree: FC<LuancherProps> = (props) => {
    const { previewAdvs, dispatch, compaignParams } = props
    const openAdv = (i: number) => {
        previewAdvs[i].checked = !previewAdvs[i].checked
        setAdvs(dispatch, previewAdvs)
    }

    const setName = (value: string, i: number) => {
        previewAdvs[i].setName = value
        setAdvs(dispatch, previewAdvs)
    }
    const setBudget = (value: string, i: number) => {
        let editFacebook = previewAdvs[i].facebookSetting
        previewAdvs[i].facebookSetting = { ...editFacebook, budget: value } as SaveFacebookSettingType
        setAdvs(dispatch, previewAdvs)
    }

    const setCompaignBudget = (value: string) => {
        dispatch({
            type: 'compaigns/saveCompaignChooseParams',
            payload: { compaignParams: { ...compaignParams, spendNum: value } }
        })
    }

    return <>
        {
            previewAdvs.map((adv, i) => {
                return <div key={`${adv.textId}&${adv.imgId}`} className={styles.infoList}>
                    <div className={styles.compaignName} onClick={() => openAdv(i)}>
                        <div className={styles.left}>
                            <span className={styles.label}>广告系列名称</span>
                            <Input value={adv.campaignName} onClick={e => e.stopPropagation()}
                                onChange={e => { previewAdvs[i].campaignName = e.target.value; setAdvs(dispatch, previewAdvs) }} ></Input>
                        </div>
                        {
                            adv.checked ? <CaretDownOutlined /> : <CaretRightOutlined />
                        }

                    </div>
                    <div className={`${styles.content} ${adv.checked ? styles.opened : ''}`}>
                        <div className={styles.line}>
                            <span className={styles.label}>广告集名称</span>
                            <Input value={adv.setName} onChange={e => setName(e.target.value, i)}></Input>
                        </div>
                        <div className={styles.line}>
                            <span className={styles.label}>{compaignParams.budget == 0 ? '广告集预算' : '广告系列预算'}</span>
                            {compaignParams.budget == 0 ? <Input value={adv.facebookSetting?.budget} onChange={e => setBudget(e.target.value, i)} prefix='$' suffix='USD'></Input>
                                : <Input value={compaignParams.spendNum} onChange={e => setCompaignBudget(e.target.value)} />
                            }

                        </div>
                        <div className={styles.line}>
                            <span className={styles.label}>广告名称</span>
                            <Input value={adv.advName} onChange={e => { previewAdvs[i].advName = e.target.value; setAdvs(dispatch, previewAdvs) }}></Input>
                        </div>
                    </div>
                </div>
            })
        }
    </>
}

const OneCompaignTree: FC<LuancherProps> = (props) => {
    const { previewAdvs, compaignParams, dispatch } = props
    const [open, setOpen] = useState(false)
    const setBudget = (value: string, i: number) => {
        let editFacebook = previewAdvs[i].facebookSetting
        previewAdvs[i].facebookSetting = { ...editFacebook, budget: value } as SaveFacebookSettingType
        setAdvs(dispatch, previewAdvs)
    }
    return <div className={styles.infoList}>
        <div className={styles.compaignName} onClick={() => setOpen(!open)}>
            <div className={styles.left}>
                <span className={styles.label}>广告系列名称</span>
                <Input value={compaignParams.appName} onClick={e => e.stopPropagation()} disabled></Input>
            </div>
            {
                open ? <CaretDownOutlined /> : <CaretRightOutlined />
            }
        </div>
        {
            previewAdvs.map((adv, i) => {
                return <div className={`${styles.content} ${open ? styles.opened : ''} ${styles.oneContent}`} key={`${adv.textId}&${adv.imgId}`}>
                    <div className={styles.compaignName} style={{ paddingLeft: 30 }} onClick={() => { previewAdvs[i].checked = !previewAdvs[i].checked; setAdvs(dispatch, previewAdvs) }}>
                        <div className={styles.left}>
                            <span className={styles.label}>广告集名称</span>
                            <Input value={adv.setName} onChange={e => { previewAdvs[i].setName = e.target.value; setAdvs(dispatch, previewAdvs) }}
                                onClick={e => e.stopPropagation()}></Input>
                        </div>
                        {
                            adv.checked ? <CaretDownOutlined /> : <CaretRightOutlined />
                        }
                    </div>
                    <div className={`${styles.content} ${adv.checked ? styles.opened : ''}`}>
                        <div className={styles.line}>
                            <span className={styles.label}>{compaignParams.budget == 0 ? '广告集预算' : '广告系列预算'}</span>
                            {
                                compaignParams.budget == 0 ? <Input value={adv.facebookSetting?.budget} onChange={e => setBudget(e.target.value, i)} prefix='$' suffix='USD'></Input>
                                    : <Input value={compaignParams.spendNum} disabled prefix='$' suffix='USD'></Input>
                            }

                        </div>
                        <div className={styles.line}>
                            <span className={styles.label}>广告名称</span>
                            <Input value={adv.advName} onChange={e => { previewAdvs[i].advName = e.target.value; setAdvs(dispatch, previewAdvs) }}></Input>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}

interface postParamsType {
    advs: PreviewAdvType[],
    campaignType: number,
    campaignName: string,
    time: 'now' | 'other',
    packId?: number,
    budget: number,
    spendNum: string
}
const Launcher: FC<LuancherProps> = (props) => {
    const { previewAdvs, compaignParams, dispatch } = props

    const [sumitting, setSubmitting] = useState(false)
    const checkAdv = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) => {
        let editAdvs = previewAdvs;
        if (e.shiftKey) {
            editAdvs[i].checked = true;
        } else {
            editAdvs.map((adv, advIndex) => {
                if (i == advIndex) {
                    editAdvs[i].checked = true;
                } else {
                    editAdvs[advIndex].checked = false
                }
            })
        }
        setAdvs(dispatch, editAdvs)
    }



    const submitAdvs = () => {
        let params: postParamsType;
        let campaignType = compaignParams.packId && compaignParams.packId != -1 ? 1 : 0
        if (compaignParams.packId && compaignParams.packId != -1) {
            params = {
                advs: previewAdvs, campaignType, campaignName: compaignParams.appName, packId: compaignParams.packId, time: 'now',
                budget: Number(compaignParams.budget), spendNum: String(compaignParams.spendNum)
            }
        } else {
            params = {
                advs: previewAdvs, campaignType, campaignName: compaignParams.appName, time: 'now',
                budget: Number(compaignParams.budget), spendNum: String(compaignParams.spendNum)
            }
        }
        setSubmitting(true)
        postLauncherAdv({ data: JSON.stringify(params) }).then(res => {
            setSubmitting(false)
            message.success('广告创建成功')
            history.replace('/advlauncher/workbench')
        }).catch(() => {
            setSubmitting(false)
        })
    }
    return <Card className={styles.launcher}>
        <Steps stepNum={3} />
        <div className={styles.btns}>
            <Button type='primary' onClick={() => history.goBack()} style={{ marginRight: 10 }}>返回</Button>
            <Button type='primary' onClick={submitAdvs} loading={sumitting}>发布</Button>
        </div>
        <div className={styles.when}>
            <div className={styles.ask}>何时启动</div>
            <div className={styles.times}><StartIcon active /> <div className={styles.text}>现在启动</div></div>
            <div className={`${styles.times} ${styles.disable}`}><StartIcon /> <div className={styles.text}>启动时间优化</div></div>
            <div className={`${styles.times} ${styles.disable}`}><StartIcon /> <div className={styles.text}>午夜</div></div>
            <div className={`${styles.times} ${styles.disable}`}><StartIcon /> <div className={styles.text}>排程时间</div></div>
        </div>
        {/* <div className={styles.title}>点击可查看详细信息</div> */}
        <div className={styles.list}>
            {
                previewAdvs.map((adv, i) => {
                    return <Adv advInfo={adv} key={`${adv.imgId}&${adv.textId}`} onClick={e => checkAdv(e, i)} />
                })
            }
        </div>
        <div className={styles.detail}>
            {
                compaignParams.packId && compaignParams.packId != -1 ? <OneCompaignTree {...props} />
                    : <DetailTree {...props} />
            }
        </div>
        {
            sumitting && <Loading showMask tips='上传中，请稍等' />
        }
    </Card>
}

const setAdvs = (dispatch: Dispatch, params: PreviewAdvType[]) => {
    dispatch({
        type: 'workbench/savePreviewAdvs',
        payload: { previewAdvs: params }
    })
}


export default connect(({ workbench, compaigns }: { workbench: WorkbenchDataType, compaigns: CompaignsData }) => ({
    previewAdvs: workbench.previewAdvs,
    compaignParams: compaigns.compaignParams
}))(Launcher)