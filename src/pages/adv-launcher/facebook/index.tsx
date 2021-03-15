import React, { FC, useEffect, useState } from 'react'
import { Button, Card, Input, message, Select, Slider, Table, Tag } from 'antd'
import { AppInfo, connect, Dispatch, UserModelState } from 'umi'
import { PreviewAdvType, SaveFacebookSettingType, WorkbenchDataType } from '../workbench/data'
import { CompaignsData, SaveChooseCompaignDataType } from '../compaign/data'
import { FacebookStateType, MarketType, TargetType } from './data'
import { sex, advPosition } from './static'
import Steps from '../components/Steps'
import RenderAdvs from '../components/RenderAdvs'

import styles from './index.less'
import { CountryType } from '@/utils/countrys'

interface SetFacebookProps {
    previewAdvs: PreviewAdvType[],
    dispatch: Dispatch,
    appInfo?: AppInfo,
    compaignParams: SaveChooseCompaignDataType,
    countryList: CountryType[],
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

    let count = 0;
    let setCount = 0;
    let isCheckAll: boolean = false;// 是否全选了
    let isFinished: boolean = false;// 是否设置完成
    let isNeedSetCrowd: boolean = false;// 是否需要设置相似度和新近度
    previewAdvs.map(adv => {
        if (adv.checked) {
            count++
        }
        if (adv.checked && adv.bassInfo?.length) {
            isNeedSetCrowd = true
        }
        if (adv.facebookSetting) {
            setCount++
        }
        if (count == previewAdvs.length) {
            isCheckAll = true
        }
        if (setCount == previewAdvs.length) {
            isFinished = true
        }
    })

    const [spendNum, setSpendNum] = useState<string>('')
    const [defaultTarget, setTarget] = useState<TargetType>(targetList[0]);
    const [defaultMarket, setMarket] = useState<TargetType>(marketList[0]);
    const [defaultAge, setDefaultAge] = useState<[number, number]>([18, 55])
    const [defaultSex, setSex] = useState<number>(0)
    const [defaultPosition, setPosition] = useState<string[]>(advPosition.map(position => position.label))
    const [includeArea, setIncludeArea] = useState<string[]>([])
    const [excludeArea, setExcludeArea] = useState<string[]>([])
    const [newProcess, setNewProcess] = useState<number>(1)

    useEffect(() => {
        dispatch({ type: 'facebook/fetchCountry' })
        dispatch({ type: 'facebook/fetchMarket' })
        dispatch({ type: 'facebook/fetchTarget' })
        let checkedAdv = previewAdvs.filter(adv => adv.checked)
        if (checkedAdv.length > 0) {
            if (checkedAdv[0].facebookSetting) {
                initData(checkedAdv[0].facebookSetting)
            }
        }
    }, [])

    const initData = (params: SaveFacebookSettingType) => {
        setSpendNum(params.budget);
        setMarket(marketList.filter(market => market.value == params.market_type)[0] || [])
        setTarget(targetList.filter(tartget => tartget.value == params.target_type)[0] || [])
        setPosition(params.position)
        setDefaultAge(params.age)
        setSex(params.sex)
        setIncludeArea(params.include)
        setExcludeArea(params.exclude)
        setNewProcess(params.retentionDays)
    }

    const checkAdv = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i: number) => {
        let editAdvs = previewAdvs;
        if (e.shiftKey) {
            editAdvs[i].checked = true;
        } else {
            editAdvs.map((adv, advIndex) => {
                if (i == advIndex) {
                    editAdvs[i].checked = true;
                    if (adv.facebookSetting) {
                        initData(adv.facebookSetting)
                    }
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
        let targetNow = targetList.filter(target => {
            return target.id == options.key
        })
        setTarget(targetNow[0])
    }

    const selectMarket = (_: string, options: any) => {
        let marketNow = marketList.filter(market => {
            return market.id == options.key
        })
        setMarket(marketNow[0])
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

    const setCrowdsDay = (value: string) => {
        if (Number(value) > 365) {
            setNewProcess(365)
        } else if (Number(value) < 1) {
            setNewProcess(1)
        } else {
            setNewProcess(Number(value))
        }
    }

    const saveFacebook = () => {
        let params: SaveFacebookSettingType = {
            age: defaultAge,
            budget: compaignParams.budget == 1 ? String(compaignParams.spendNum) : spendNum,
            exclude: excludeArea || [],
            include: includeArea || [],
            market_type: defaultMarket?.value || '',
            position: defaultPosition || [],
            sex: defaultSex,
            target_type: defaultTarget?.value || '',
            retentionDays: newProcess,
            ratioStart: 0.0,
            ratioEnd: 0.0
        }
        // 检测数据完整性
        if (params.budget == '' && !Boolean(compaignParams.budget)) {
            message.warning('请输入预算')
            return
        }
        if (params.exclude.length == 0 && params.include.length == 0) {
            message.warning('请选择地区')
            return
        }
        if (params.position.length == 0) {
            message.warning('请选择广告投放位置')
            return
        }
        if (!params.market_type || !params.target_type) {
            message.warning('请选择转换类型')
            return
        }


        let autoNextIndex = 0;
        let count = 0
        const newAdvs = previewAdvs.map((adv, i) => {
            const newAdv: PreviewAdvType = JSON.parse(JSON.stringify(adv))
            if (newAdv.checked) {
                newAdv.facebookSetting = params
                newAdv.checked = false
                newAdv.setName = setName(params, adv.audsInfo) + '-' + addZero(i + 1);
                newAdv.advName = advName(params, adv.type);
                newAdv.campaignName = compaignParams.appName + '-' + addZero(i + 1);
                autoNextIndex = i + 1
            } else {
                count++
            }
            return newAdv
        })
        if (count == newAdvs.length) {
            message.error('请选择至少一个广告素材')
            return
        }
        // 自动选择下一项
        if (autoNextIndex < newAdvs.length) {
            newAdvs[autoNextIndex].checked = true
        }
        setAdvs(dispatch, newAdvs)
        message.success('保存成功啦~')
    }
    return <Card>
        <Steps stepNum={2} />
        <RenderAdvs title='广告基础信息设置' isCheckAll={isCheckAll} isFinished={isFinished} nextUrl="/advlauncher/launcher" onCheckAdv={checkAdv}
            onCheckAll={checkAll} type='facebook'></RenderAdvs>
        <div className={styles.setting}>
            <div className={styles.tips}>
                <div className={styles.name}>Facebook流量<span>选中 {count}</span></div>
                <Button type='primary' onClick={saveFacebook}>保存更改</Button>
            </div>
            <div className={styles.settingls}>
                {
                    compaignParams.budget == 0 && <RenderFacebookBox title='广告集预算设置'>
                        <Input placeholder='请输入预算' value={spendNum} onChange={e => setSpendNum(e.target.value)}></Input>
                    </RenderFacebookBox>
                }
                {
                    isNeedSetCrowd && <RenderFacebookBox title='新近度设置'>
                        <Input style={{marginBottom: 10}} placeholder='请输入新近度(1-365天)' type='number' value={newProcess} onChange={e => setCrowdsDay(e.target.value)}></Input>
                        <Tag className={styles.dayTag} color="processing" onClick={()=>setNewProcess(30)}>30天</Tag>
                        <Tag className={styles.dayTag} color="processing" onClick={()=>setNewProcess(60)}>60天</Tag>
                        <Tag className={styles.dayTag} color="processing" onClick={()=>setNewProcess(90)}>90天</Tag>
                        <Tag className={styles.dayTag} color="processing" onClick={()=>setNewProcess(180)}>180天</Tag>
                        <Tag className={styles.dayTag} color="processing" onClick={()=>setNewProcess(360)}>360天</Tag>
                    </RenderFacebookBox>
                }
                <RenderFacebookBox title='选择转换类型'>
                    <Select style={{ display: 'block', marginBottom: 10 }} value={defaultTarget?.label} defaultValue={defaultTarget?.label} placeholder='请选择' onSelect={selectTarget}>
                        {
                            targetList.map(target => {
                                return <Select.Option value={target.label} key={target.id}>{target.label}</Select.Option>
                            })
                        }
                    </Select>
                    <Select style={{ display: 'block', marginBottom: 10 }} value={defaultMarket?.label} defaultValue={defaultMarket?.label} placeholder='请选择' onSelect={selectMarket}>
                        {
                            marketList.map(target => {
                                return <Select.Option value={target.label} key={target.id}>{target.label}</Select.Option>
                            })
                        }
                    </Select>
                </RenderFacebookBox>
                <RenderFacebookBox title='选择年龄'>
                    <Slider range marks={ageRange} min={15} max={80} value={defaultAge} defaultValue={defaultAge} onChange={e => setDefaultAge(e)}></Slider>
                </RenderFacebookBox>
                <RenderFacebookBox title='选择性别'>
                    <Table rowSelection={{ type: 'radio', selectedRowKeys: [defaultSex], onChange: e => setSex(e[0] as number) }} pagination={false}
                        columns={sexColumns} dataSource={sex} rowKey='type' />
                </RenderFacebookBox>
                <RenderFacebookBox title='选择展示位置'>
                    <Table rowSelection={{
                        type: 'checkbox', onChange: e => setPosition(e as string[]), selectedRowKeys: defaultPosition
                    }} pagination={false} columns={positionColums} dataSource={advPosition} rowKey='label' />
                </RenderFacebookBox>
                <RenderFacebookBox title='选择地区'>
                    <Select style={{ display: 'block' }} placeholder='选择包含地区' onSelect={selectInclude} showSearch>
                        {
                            countryList.map(country => {
                                return <Select.Option key={country.code} value={country.value}>{country.value}</Select.Option>
                            })
                        }
                    </Select>
                    <div className={styles.area}>
                        包含的地区：
                        {
                            includeArea.map((area, index) => {
                                return <Tag key={area} closable onClose={() => deleteInclude(index)}>{area}</Tag>
                            })
                        }
                    </div>
                    <Select style={{ display: 'block' }} placeholder='选择排除地区' onSelect={selectExclude} showSearch>
                        {
                            countryList.map(country => {
                                return <Select.Option key={country.code} value={country.value}>{country.value}</Select.Option>
                            })
                        }
                    </Select>
                    <div className={styles.area}>
                        排除的地区：
                        {
                            excludeArea.map((area, index) => {
                                return <Tag key={area} closable onClose={() => deleteExclude(index)}>{area}</Tag>
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

const setName = (settings: SaveFacebookSettingType, audsInfo?: { audId: number; audName: string; }[]) => {
    const { position } = settings
    const positionStr = position.map(item => item).join(',');
    const sex = ['男女', '男', '女'];
    const crowdName = audsInfo?.map(item => item.audName).join(',');
    return `yx-${positionStr}-${crowdName}-${settings.age}-${sex[settings.sex]}-${settings.target_type}-{${settings.include}，${settings.exclude}}`
}

const advName = (settings: SaveFacebookSettingType, type?: string | number) => {
    const include = settings.include.map(item => item).join(',');
    const exclude = settings.exclude.map(item => item).join(',');
    const mediaType = type == '0' ? '图片' : '视频';
    const transType = '应用安装'
    const random = Math.floor(Math.random() * 1000000) + 1;
    const now = new Date();
    const time = now.getFullYear() + '' + addZero(now.getMonth() + 1) + '' + addZero(now.getDate());
    return `${settings.market_type}-${mediaType}-{${include}，${exclude}}-${transType}-${random + time}`
}

const addZero = (num: number): string | number => {
    if (num < 10) {
        return '0' + num
    } else {
        return num
    }
}

export default connect(({ workbench, user, compaigns, facebook }: { workbench: WorkbenchDataType, user: UserModelState, compaigns: CompaignsData, facebook: FacebookStateType }) => ({
    previewAdvs: workbench.previewAdvs,
    compaignParams: compaigns.compaignParams,
    countryList: facebook.countryList,
    marketList: facebook.marketList,
    targetList: facebook.targetList,
    appInfo: user.appInfo
}))(SetFacebook)