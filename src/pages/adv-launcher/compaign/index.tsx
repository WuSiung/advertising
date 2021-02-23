import { StarFilled } from '@ant-design/icons'
import { Card, Input, message, Modal, Select, Switch } from 'antd'
import { Button } from 'antd'
import React, { FC, useState, useEffect, useMemo } from 'react'
import { connect, Dispatch, history } from 'umi'
import Steps from '../components/Steps'
import { PreviewAdvType, WorkbenchDataType } from '../workbench/data'
import { CompaignsData, CompaignsListType, CreateCompaignDataType, SaveChooseCompaignDataType } from './data'
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

type AutoTableProps = {
    length: number,
    compaignsList?: CompaignsListType[],
    onChangeName: (name: string) => void,
    onSetCbo: (budget: number) => void,
    onSetSpend: (spendNum: number | string) => void
} & SaveChooseCompaignDataType

type TableProps = {
    length: number,
    compaignsList?: CompaignsListType[],
    onSetParams: (params: SaveChooseCompaignDataType) => void
} & SaveChooseCompaignDataType

const AutoCompaignTable: FC<AutoTableProps> = (props) => {
    const { onChangeName, onSetCbo, onSetSpend, budget } = props
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeName(e.target.value)
    }
    const setCbo = () => {
        const bl = Boolean(budget)
        onSetCbo(Number(!bl))
    }
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
                <td><Switch checked={Boolean(props.budget)} onChange={setCbo}></Switch></td>
                <td><Input value={props.appName} placeholder='请输入名称' onChange={changeName} /></td>
                <td><Select placeholder='请选择' disabled></Select></td>
                <td>
                    {
                        budget ? <Input prefix="$" suffix="USD" onChange={e => onSetSpend(e.target.value)} /> : '预算在广告集设置'
                    }
                </td>
            </tr>
        </tbody>
    </table>
}
const SelectHasCompaign: FC<TableProps> = (props) => {
    const { compaignsList, budget } = props
    const defaultValue = compaignsList?.length ? compaignsList[0].appName : '';

    const selectCompaign = (value: string, options: any) => {
        compaignsList?.some(compaign => {
            if (compaign.packId == options.key) {
                props.onSetParams(compaign)
            }
        })
    }
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
                    <Select defaultValue={defaultValue} placeholder='请选择已有系列' style={{ width: '100%' }} onSelect={selectCompaign}>
                        {
                            compaignsList?.map(compaign => {
                                return <Select.Option key={compaign.packId} value={compaign.appName}>{compaign.appName}</Select.Option>
                            })
                        }
                    </Select>
                </td>
                <td>
                    {
                        Boolean(Number(budget)) ? <Input prefix="$" suffix="USD" value={props.spendNum} disabled /> : '预算在广告集设置'
                    }
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
    const [autoParams, setAutoParams] = useState<SaveChooseCompaignDataType>({ budget: 0, spendNum: '', appName: initName() })
    const [hasParams, setHasPramas] = useState<SaveChooseCompaignDataType>({ budget: 0, spendNum: '', appName: initName(), packId: -1 })
    let memoAutoParams = useMemo(() => {
        return autoParams
    }, [autoParams])
    useEffect(() => {
        dispatch({ type: 'compaigns/fetchCompaignsList' })
    }, [])

    const changeNewCompaignBudget = (e: boolean) => {
        setNewCompaignParams({ ...newCompaignParams, budget: Number(e) || 0 })
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

    const nextStep = async () => {
        let params: SaveChooseCompaignDataType;
        if (chooseType == 0) {
            if (autoParams.budget && autoParams.spendNum == '') {
                message.warning('开启cbo后请输入预算金额')
            }
            params = autoParams
        } else {
            if (hasParams.packId == -1) {
                message.warning('请选择已有系列')
            }
            params = hasParams
        }
        await dispatch({
            type: 'compaigns/saveCompaignChooseParams',
            payload: { compaignParams: params }
        })
        history.push('/advlauncher/crowds')
    }
    return (
        <Card>
            <Steps stepNum={0} />
            <div className={styles.btns}>
                <Button type='primary' onClick={() => history.goBack()}>返回</Button>
                <Button type='primary' style={{ marginLeft: 10 }} onClick={nextStep}>下一步</Button>
            </div>
            <div className={styles.chooseCompaigns}>
                <RenderCompaign className={styles.compaignBox} title='选择平台推荐策略'
                    dec='建议将不同的广告投放到不同的广告系列' isChecked={chooseType == 0} onClick={() => setChooseType(0)}>
                    <AutoCompaignTable length={previewAds.length} {...memoAutoParams} onChangeName={e => { setAutoParams({ ...autoParams, appName: e }) }}
                        onSetCbo={e => { setAutoParams({ ...autoParams, budget: e }) }} onSetSpend={e => { setAutoParams({ ...autoParams, spendNum: e }) }} />
                </RenderCompaign>
                <RenderCompaign className={styles.compaignBox} title='选择已有广告系列发布' onClick={() => setChooseType(1)}
                    dec='将所有广告投放到一个广告系列' isChecked={chooseType == 1} >
                    <SelectHasCompaign length={previewAds.length} compaignsList={compaignsList} {...hasParams} onSetParams={e => { setHasPramas({ ...hasParams, ...e }) }} />
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