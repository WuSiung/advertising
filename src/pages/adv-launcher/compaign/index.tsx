import { StarFilled } from '@ant-design/icons'
import { Card, Input, message, Modal, Select, Switch } from 'antd'
import { Button } from 'antd'
import e from 'express'
import React, { FC, useState, useEffect } from 'react'
import { connect, Dispatch, history } from 'umi'
import Steps from '../components/Steps'
import { PreviewAdvType, WorkbenchDataType } from '../workbench/data'
import { CompaignsData, CompaignsListType, CreateCompaignDataType } from './data'
import { postCreateCompaign } from './service'

import styles from './index.less'

interface CompaignProps {
    previewAds: PreviewAdvType[],
    compaignsList: CompaignsListType[],
    dispatch: Dispatch,
    creating: boolean
}

interface CompaignBoxProps {
    isChecked: boolean,
    className: string,
    title: string,
    dec: string,
    onClick?: Function
}

const RenderCompaign: FC<CompaignBoxProps> = (props) => {
    const { isChecked, className, title, dec, children, onClick } = props

    const setType = () => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <div className={className} onClick={setType}>
            <div className={`${styles.checkbox} ${isChecked ? styles.active : ''}`}>
                {
                    isChecked && <StarFilled style={{ color: '#ccc' }} />
                }
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{title}</div>
                <div className={styles.dec}>{dec}</div>
                {children}
            </div>
        </div>
    )
}

interface TableProps {
    length: number,
    budget?: number | string,
    compaignsList?: CompaignsListType[],
}

const AutoCompaignTable: FC<TableProps> = (props) => {
    const [cbo, setCbo] = useState<boolean>(false)
    const defaultName = initName()
    return <table>
        <thead>
            <tr>
                <td className={styles.num}>已选广告数量</td>
                <td>CBO优化</td>
                <td>名称</td>
                <td className={styles.type}>转换类型</td>
                <td className={styles.cboNum}>广告预算</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{props.length || 0}</td>
                <td><Switch checked={cbo} onChange={() => setCbo(!cbo)}></Switch></td>
                <td><Input value={defaultName} placeholder='请输入名称' /></td>
                <td><Select placeholder='请选择' disabled></Select></td>
                <td>
                    {
                        cbo ? <Input prefix="$" suffix="USD" /> : '预算在广告集设置'
                    }
                </td>
            </tr>
        </tbody>
    </table>
}
const SelectHasCompaign: FC<TableProps> = (props) => {
    const { compaignsList } = props
    const defaultValue = compaignsList?.length ? compaignsList[0].appName : '';
    return <table>
        <thead>
            <tr>
                <td className={styles.num}>已选广告数量</td>
                <td>名称</td>
                <td className={styles.cboNum}>广告预算</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{props.length || 0}</td>
                <td>
                    <Select defaultValue={defaultValue} placeholder='请选择已有系列' style={{ width: '100%' }}>
                        {
                            compaignsList?.map(compaign => {
                                return <Select.Option key={compaign.packId} value={compaign.appName}>{compaign.appName}</Select.Option>
                            })
                        }
                    </Select>
                </td>
                <td>
                    {/* {
                    cbo ? <Input prefix="$" suffix="USD" /> : '预算在广告集设置'
                } */}
                </td>
            </tr>
        </tbody>
    </table>
}

const Compaign: FC<CompaignProps> = (props) => {
    const { dispatch, previewAds, compaignsList } = props
    const [chooseType, setChooseType] = useState<number>(0)
    const [newCompaignVisible, setNewCompaignVisible] = useState<boolean>(false)
    const [newCompaignParams, setNewCompaignParams] = useState<CreateCompaignDataType>({ budget: 0, spendNum: '', appName: initName() })
    useEffect(() => {
        dispatch({ type: 'compaigns/fetchCompaignsList' })
    }, [])

    const changeNewCompaignBudget = (e: boolean) => {
        setNewCompaignParams({ ...newCompaignParams, budget: Number(e) })
    }

    const createCompaign = () => {
        const { spendNum, budget } = newCompaignParams
        if (budget && (spendNum == '' || spendNum <= 0)) {
            message.error('开启cbo后请输入预算金额')
            return
        }
        postCreateCompaign(newCompaignParams).then(() => {
            setNewCompaignVisible(false);
            dispatch({ type: 'compaigns/fetchCompaignsList' })
        })
    }
    return (
        <Card>
            <Steps stepNum={0} />
            <div className={styles.btns}>
                <Button type='primary' onClick={() => history.goBack()}>返回</Button>
                <Button type='primary' style={{ marginLeft: 10 }}>下一步</Button>
            </div>
            <div className={styles.chooseCompaigns}>
                <RenderCompaign className={styles.compaignBox} title='选择平台推荐策略'
                    dec='建议将不同的广告投放到不同的广告系列' isChecked={chooseType == 0} onClick={() => setChooseType(0)}>
                    <AutoCompaignTable length={previewAds.length}></AutoCompaignTable>
                </RenderCompaign>
                <RenderCompaign className={styles.compaignBox} title='选择已有广告系列发布' onClick={() => setChooseType(1)}
                    dec='将所有广告投放到一个广告系列' isChecked={chooseType == 1} >
                    <SelectHasCompaign length={previewAds.length} compaignsList={compaignsList} />
                </RenderCompaign>
                <Button type='primary' onClick={() => setNewCompaignVisible(true)}>新建广告系列</Button>
            </div>
            <Modal visible={newCompaignVisible} title='新建广告系列' onCancel={() => setNewCompaignVisible(false)} onOk={createCompaign}>
                <Input placeholder='请输入系列名称' style={{ marginBottom: 10 }} value={newCompaignParams.appName} onChange={e => setNewCompaignParams({ ...newCompaignParams, appName: e.target.value })}></Input>
                <Switch onChange={changeNewCompaignBudget} checked={Boolean(newCompaignParams.budget)}></Switch>开启CBO
                {
                    newCompaignParams.budget &&
                    <Input defaultValue={newCompaignParams.spendNum} placeholder="请输入预算金额" prefix='$' suffix='USD'
                        style={{ marginTop: 20 }} type='number' onChange={e => setNewCompaignParams({ ...newCompaignParams, spendNum: e.target.value })}></Input>
                }
            </Modal>
        </Card>
    )
}

const initName = (): string => {
    return 'yx'
}

export default connect(({ workbench, compaigns, loading }: { workbench: WorkbenchDataType, compaigns: CompaignsData, loading: { effects: { [key: string]: boolean } } }) => ({
    previewAds: workbench.previewAdvs,
    compaignsList: compaigns.compaignsList,
    creating: loading.effects['']
}))(Compaign)