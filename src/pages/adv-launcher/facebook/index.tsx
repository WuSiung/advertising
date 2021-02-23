import React, { FC, useEffect, useState } from 'react'
import { Button, Card, Input, Select, Slider, Table, Tag } from 'antd'
import { AppInfo, connect, Dispatch, UserModelState } from 'umi'
import { allCountry } from '@/utils/countrys'
import { PreviewAdvType, WorkbenchDataType } from '../workbench/data'
import { CompaignsData, SaveChooseCompaignDataType } from '../compaign/data'
import { CountryRecordType, FacebookStateType, MarketType, TargetType } from './data'
import { sex, advPosition } from './static'
import Steps from '../components/Steps'
import RenderAdvs from '../components/RenderAdvs'

import styles from './index.less'

interface SetFacebookProps {
    previewAdvs: PreviewAdvType[],
    dispatch: Dispatch,
    appInfo?: AppInfo,
    compaignParams: SaveChooseCompaignDataType,
    countryList: CountryRecordType[],
    marketList: MarketType[],
    targetList: TargetType[]
}

interface RenderFacebookBoxProps {
    title: string
}

const RenderFacebookBox: FC<RenderFacebookBoxProps> = (props) => {
    return <div className={styles.box}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const SetFacebook: FC<SetFacebookProps> = (props) => {
    const { dispatch, previewAdvs, compaignParams, targetList, countryList, marketList } = props
    // 是否全选了
    let isCheckAll = previewAdvs.every(adv => adv.checked);
    let checkCount = 0
    let isFinished = previewAdvs.every(adv => { if (adv.checked) { checkCount++ } return adv });

    const [spendNum, setSpendNum] = useState<string>('')
    const [defaultTarget, setTarget] = useState<TargetType>(targetList[0]);
    const [defaultMarket, setMarket] = useState<TargetType>(marketList[0]);
    const [defaultAge, setDefaultAge] = useState<[number, number]>([18, 55])
    const [defaultSex, setSex] = useState<number>(0)
    const [defaultPosition, setPosition] = useState<number[]>(advPosition.map(position => position.id))
    const [includeArea, setIncludeArea] = useState<string[]>([])
    const [excludeArea, setExcludeArea] = useState<string[]>([])

    useEffect(() => {
        dispatch({ type: 'facebook/fetchCountry' })
        dispatch({ type: 'facebook/fetchMarket' })
        dispatch({ type: 'facebook/fetchTarget' })
    }, [])

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
    const checkAll = () => {
        let editAdvs = previewAdvs
        editAdvs.map(adv => {
            adv.checked = !isCheckAll
        })
        setAdvs(dispatch, editAdvs)
    }

    const selectTarget = (_: string, options: any) => {
        // selectTarget()
        console.log(options.key)
    }

    const selectInclude = (_: string, options: any) => {
        let newInclude: string[] = JSON.parse(JSON.stringify(includeArea)) || []
        if (!includeArea?.includes(options.key)) {
            newInclude?.push(options.key);
            setIncludeArea(newInclude)
        }
    }

    const deleteInclude = (i: number) => {
        let newInclude: string[] = JSON.parse(JSON.stringify(includeArea)) || []
        newInclude?.splice(i, 1)
        setIncludeArea(newInclude)
    }

    const selectExclude = (_: string, options: any) => {
        let newExclude: string[] = JSON.parse(JSON.stringify(excludeArea)) || []
        if (!excludeArea?.includes(options.key)) {
            newExclude?.push(options.key);
            setExcludeArea(newExclude)
        }
    }

    const deleteExclude = (i: number) => {
        let newExclude: string[] = JSON.parse(JSON.stringify(excludeArea)) || []
        newExclude?.splice(i, 1)
        setExcludeArea(newExclude)
    }

    return <Card>
        <Steps stepNum={2} />
        <RenderAdvs title='广告基础信息设置' isCheckAll={isCheckAll} isFinished nextUrl="/advlauncher/launcher" onCheckAdv={checkAdv} onCheckAll={checkAll}></RenderAdvs>
        <div className={styles.setting}>
            <div className={styles.tips}>
                <div className={styles.name}>Facebook流量<span>选中 {checkCount}</span></div>
                <Button type='primary'>保存更改</Button>
            </div>
            <div className={styles.settingls}>
                {
                    compaignParams.budget == 0 && <RenderFacebookBox title='广告集预算设置'>
                        <Input placeholder='请输入预算' value={spendNum} onChange={e => setSpendNum(e.target.value)}></Input>
                    </RenderFacebookBox>
                }
                <RenderFacebookBox title='选择转换类型'>
                    <Select style={{ display: 'block', marginBottom: 10 }} defaultValue={defaultTarget?.label} placeholder='请选择' onSelect={selectTarget}>
                        {
                            targetList.map(target => {
                                return <Select.Option value={target.label} key={target.id}>{target.label}</Select.Option>
                            })
                        }
                    </Select>
                    <Select style={{ display: 'block', marginBottom: 10 }} defaultValue={defaultMarket?.label} placeholder='请选择'>
                        {
                            marketList.map(target => {
                                return <Select.Option value={target.label} key={target.id}>{target.label}</Select.Option>
                            })
                        }
                    </Select>
                </RenderFacebookBox>
                <RenderFacebookBox title='选择年龄'>
                    <Slider range marks={ageRange} min={15} max={80} defaultValue={defaultAge} onChange={e => setDefaultAge(e)}></Slider>
                </RenderFacebookBox>
                <RenderFacebookBox title='选择性别'>
                    <Table rowSelection={{ type: 'radio', selectedRowKeys: [defaultSex], onChange: e => setSex(e[0] as number) }} pagination={false}
                        columns={sexColumns} dataSource={sex} rowKey='type' />
                </RenderFacebookBox>
                <RenderFacebookBox title='选择展示位置'>
                    <Table rowSelection={{
                        type: 'checkbox', onChange: e => setPosition(e as number[]), selectedRowKeys: defaultPosition
                    }} pagination={false} columns={positionColums} dataSource={advPosition} rowKey='id' />
                </RenderFacebookBox>
                <RenderFacebookBox title='选择地区'>
                    <Select style={{ display: 'block' }} placeholder='选择包含地区' onSelect={selectInclude} showSearch>
                        {
                            allCountry.map(country => {
                                return <Select.Option key={country.code} value={country.value}>{country.value}</Select.Option>
                            })
                        }
                    </Select>
                    <div className={styles.area}>
                        包含的地区：
                        {
                            includeArea.map((area, index) => {
                                return <Tag key={area} closable onClose={()=>deleteInclude(index)}>{area}</Tag>
                            })
                        }
                    </div>
                    <Select style={{ display: 'block' }} placeholder='选择排除地区' onSelect={selectExclude} showSearch>
                        {
                            allCountry.map(country => {
                                return <Select.Option key={country.code} value={country.value}>{country.value}</Select.Option>
                            })
                        }
                    </Select>
                    <div className={styles.area}>
                        排除的地区：
                        {
                            excludeArea.map((area, index) => {
                                return <Tag key={area} closable onClose={()=>deleteExclude(index)}>{area}</Tag>
                            })
                        }
                    </div>
                </RenderFacebookBox>
            </div>
        </div>
    </Card>
}

const setAdvs = (dispatch: Dispatch, params: PreviewAdvType[]) => {
    dispatch({
        type: 'workbench/savePreviewAdvs',
        payload: { previewAdvs: params }
    })
}

const sexColumns = [
    {
        title: '性别',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: '消费金额',
        dataIndex: 'money',
    },
    {
        title: '广告支出回报率',
        dataIndex: 'multiple',
    },
]

const positionColums = [
    {
        title: '平台与展示位置',
        dataIndex: 'label',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: '消费金额',
        dataIndex: 'money',
    },
    {
        title: '广告支出回报率',
        dataIndex: 'multiple',
    },
]

const ageRange = {
    15: '15岁',
    25: '25岁',
    35: '35岁',
    45: '45岁',
    55: '55岁',
    65: '65岁',
    75: '75岁',
}

export default connect(({ workbench, user, compaigns, facebook }: { workbench: WorkbenchDataType, user: UserModelState, compaigns: CompaignsData, facebook: FacebookStateType }) => ({
    previewAdvs: workbench.previewAdvs,
    compaignParams: compaigns.compaignParams,
    countryList: facebook.countryList,
    marketList: facebook.marketList,
    targetList: facebook.targetList,
    appInfo: user.appInfo
}))(SetFacebook)