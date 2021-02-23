import { Card, Tabs, Input, Button, Spin } from 'antd'
import React, { FC, useEffect } from 'react'
import { connect, Dispatch } from 'umi'
import { InterestDataType, AudienceDataType, ManagerDataType } from './data'
import { AudienceModelDataType } from '../data'
import CheckInfoShow from './components/CheckInfoShow'
import { formatterPersonNum } from '@/utils/countTrans'

import styles from './index.less'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface AudienceManagerProps {
    interests: InterestDataType[],
    audiences: AudienceDataType[],
    dispatch: Dispatch,
    excludeList: Array<InterestDataType & AudienceDataType>,
    includeList: Array<InterestDataType & AudienceDataType>,
    modelList: Array<AudienceModelDataType>,
    gettingInterest: boolean,
    changeSelect: boolean
}

interface InterestTableProps {
    list: InterestDataType[],
    dispatch: Dispatch,
    excludeList: Array<InterestDataType & AudienceDataType>,
    includeList: Array<InterestDataType & AudienceDataType>,
}
interface AudienceTableProps {
    list: AudienceDataType[],
    dispatch: Dispatch,
    excludeList: Array<InterestDataType & AudienceDataType>,
    includeList: Array<InterestDataType & AudienceDataType>,
}

const InterestTable: FC<InterestTableProps> = (props) => {
    const { list, dispatch, excludeList, includeList } = props
    const changeCludes = async (index: number, type: 'include' | 'exclude') => {
        let newIncludes: any = includeList, newExcludes: any = excludeList
        if (type == 'include' && list[index].checked) {
            list[index].checked = undefined
            newIncludes = includeList.filter((item) => item.loveId != list[index].loveId)
        } else if (type == 'include') {
            list[index].checked = true
            newIncludes.push(list[index])
            newExcludes = excludeList.filter(item => item.loveId != list[index].loveId)
        } else if (type == 'exclude' && list[index].checked == false) {
            list[index].checked = undefined
            newExcludes = excludeList.filter(item => item.loveId != list[index].loveId)
        } else if (type == 'exclude') {
            list[index].checked = false
            newExcludes.push(list[index])
            newIncludes = includeList.filter(item => item.loveId != list[index].loveId)
        } else {
            list[index].checked = undefined
        }
        await dispatch({
            type: 'audienceManager/saveInterestList',
            payload: { interestList: JSON.parse(JSON.stringify(list)) }
        })
        dispatch({
            type: 'audienceManager/saveIncludeList',
            payload: { includeList: JSON.parse(JSON.stringify(newIncludes)) }
        })
        dispatch({
            type: 'audienceManager/saveExcludeList',
            payload: { excludeList: JSON.parse(JSON.stringify(newExcludes)) }
        })
    }
    return <table className={styles.tables}>
        <thead>
            <tr>
                <th className={styles.check}>包括</th>
                <th className={styles.check}>排除</th>
                <th className={styles.interest}>兴趣爱好</th>
                <th className='num'>兴趣人数</th>
                <th className='type'>类别</th>
                <th className={styles.path}>兴趣路径</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map((interest, index) => {
                    return <tr key={interest.loveId}>
                        <td className={styles.check}>
                            <span className={styles.iconBox} onClick={() => changeCludes(index, 'include')}>
                                {
                                    interest.checked && <CheckOutlined className={styles.icon} />
                                }
                            </span>
                        </td>
                        <td className={styles.check}>
                            <span className={styles.iconBox} onClick={() => changeCludes(index, 'exclude')}>
                                {
                                    // 不可以使用!, 值可能为undefined
                                    interest.checked == false && <CloseOutlined className={styles.icon} />
                                }
                            </span>
                        </td>
                        <td>{interest.loveName}</td>
                        <td>{formatterPersonNum(Number(interest.count))}</td>
                        <td>{interest.type}</td>
                        <td className={styles.path}>{interest.path}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}

const AudienceTable: FC<AudienceTableProps> = (props) => {
    const { list, dispatch, excludeList, includeList } = props
    const changeCludes = async (index: number, type: 'include' | 'exclude') => {
        let newIncludes: any = includeList, newExcludes: any = excludeList
        if (type == 'include' && list[index].checked) {
            list[index].checked = undefined
            newIncludes = includeList.filter(item => item.audienceId != list[index].audienceId)
        } else if (type == 'include') {
            list[index].checked = true
            newIncludes.push(list[index])
            newExcludes = excludeList.filter(item => item.audienceId != list[index].audienceId)
        } else if (type == 'exclude' && list[index].checked == false) {
            list[index].checked = undefined
            newExcludes = excludeList.filter(item => item.audienceId != list[index].audienceId)
        } else if (type == 'exclude') {
            list[index].checked = false
            newExcludes.push(list[index])
            newIncludes = includeList.filter(item => item.audienceId != list[index].audienceId)
        } else {
            list[index].checked = undefined
        }
        await dispatch({
            type: 'audienceManager/saveAudienceList',
            payload: { audienceList: JSON.parse(JSON.stringify(list)) }
        })
        dispatch({
            type: 'audienceManager/saveIncludeList',
            payload: { includeList: JSON.parse(JSON.stringify(newIncludes)) }
        })
        dispatch({
            type: 'audienceManager/saveExcludeList',
            payload: { excludeList: JSON.parse(JSON.stringify(newExcludes)) }
        })
    }
    return <table className={styles.tables}>
        <thead>
            <tr>
                <th className={styles.check}>包括</th>
                <th className={styles.check}>排除</th>
                <th className={styles.interest}>受众名称</th>
                <th className={styles.num}>类型</th>
                <th className={styles.type}>消费金额</th>
                <th>广告支出回报率</th>
                <th>每次移动应用安装费用</th>
                <th>每千次展示费用</th>
                <th>受众人数</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map((interest, index) => {
                    return <tr key={interest.audienceId}>
                        <td className={styles.check}>
                            <span className={styles.iconBox} onClick={() => changeCludes(index, 'include')}>
                                {
                                    interest.checked && <CheckOutlined className={styles.icon} />
                                }
                            </span>
                        </td>
                        <td className={styles.check}>
                            <span className={styles.iconBox} onClick={() => changeCludes(index, 'exclude')}>
                                {
                                    // 不可以使用!, 值可能为undefined
                                    interest.checked == false && <CloseOutlined className={styles.icon} />
                                }
                            </span>
                        </td>
                        <td>{interest.audienceName}</td>
                        <td>{interest.type}</td>
                        <td>{interest.retention || 0}</td>
                        <td>{interest.retention || 0}</td>
                        <td>{interest.retention || 0}</td>
                        <td>{interest.retention || 0}</td>
                        <td>{formatterPersonNum(Number(interest.approximateCount)) || 0}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}
const AudienceManager: FC<AudienceManagerProps> = (props) => {
    const { interests, audiences, dispatch, gettingInterest, includeList, excludeList, modelList, changeSelect } = props
    useEffect(() => {
        dispatch({
            type: 'audienceManager/fetchInterestList',
            payload: { size: 1000 }
        })
        dispatch({
            type: 'audienceManager/fetchAudienceList',
            payload: { size: 1000 }
        })
        dispatch({
            type: 'audienceManager/fetchAudienceModelList',
            payload: { size: 1000 }
        })
    }, [])
    const onSearchInterest = (e: string) => {
        dispatch({
            type: 'audienceManager/fetchInterestList',
            payload: { size: 1000, name: e }
        })
    }
    const onSearchAudience = (e: string) => {
        dispatch({
            type: 'audienceManager/fetchAudienceList',
            payload: { size: 1000, name: e }
        })
    }
    const deleteIncludes = (params: InterestDataType & AudienceDataType) => {
        let newIncludes: any = [];
        if (params.audienceId) {
            let newAudiences = audiences.map(audience => {
                if (audience.audienceId == params.audienceId) {
                    audience.checked = undefined
                }
                return audience
            })
            newIncludes = includeList.filter(include => {
                return include.audienceId != params.audienceId
            })
            dispatch({
                type: 'audienceManager/saveAudienceList',
                payload: { audienceList: JSON.parse(JSON.stringify(newAudiences)) }
            })
        } else if (params.loveId) {
            let newInterests = interests.map(interest => {
                if (interest.loveId == params.loveId) {
                    interest.checked = undefined
                }
                return interest
            })
            newIncludes = includeList.filter(include => {
                return include.loveId != params.loveId
            })
            dispatch({
                type: 'audienceManager/saveInterestList',
                payload: { interestList: JSON.parse(JSON.stringify(newInterests)) }
            })
        }
        dispatch({
            type: 'audienceManager/saveIncludeList',
            payload: { includeList: JSON.parse(JSON.stringify(newIncludes)) }
        })
    }

    const deleteExcludes = (params: InterestDataType & AudienceDataType) => {
        let newExcludes: any = [];
        if (params.audienceId) {
            let newAudiences = audiences.map(audience => {
                if (audience.audienceId == params.audienceId) {
                    audience.checked = undefined
                }
                return audience
            })
            newExcludes = excludeList.filter(exclude => {
                return exclude.audienceId != params.audienceId
            })
            dispatch({
                type: 'audienceManager/saveAudienceList',
                payload: { audienceList: JSON.parse(JSON.stringify(newAudiences)) }
            })
        } else if (params.loveId) {
            let newInterests = interests.map(interest => {
                if (interest.loveId == params.loveId) {
                    interest.checked = undefined
                }
                return interest
            })
            newExcludes = excludeList.filter(exclude => {
                return exclude.loveId != params.loveId
            })
            dispatch({
                type: 'audienceManager/saveInterestList',
                payload: { interestList: JSON.parse(JSON.stringify(newInterests)) }
            })
        }
        dispatch({
            type: 'audienceManager/saveExcludeList',
            payload: { excludeList: JSON.parse(JSON.stringify(newExcludes)) }
        })
    }
    return <Card>
        <Tabs defaultActiveKey='interest'>
            <Tabs.TabPane key='interest' tab='兴趣列表'>
                <Input.Search placeholder="关键词搜索" allowClear onSearch={onSearchInterest} style={{ width: 300, marginBottom: 10 }} />
                <Spin spinning={gettingInterest}>
                    <div className={styles.tableContainer}><InterestTable list={interests} dispatch={dispatch} excludeList={excludeList} includeList={includeList} /></div>
                </Spin>
            </Tabs.TabPane>
            <Tabs.TabPane key='audiences' tab='人群受众'>
                <Input.Search placeholder="关键词搜索" allowClear onSearch={onSearchAudience} style={{ width: 300, marginBottom: 10 }} />
                <Spin spinning={gettingInterest}>
                    <div className={styles.tableContainer}><AudienceTable list={audiences} dispatch={dispatch} excludeList={excludeList} includeList={includeList} /></div>
                </Spin>
            </Tabs.TabPane>
        </Tabs>
        <CheckInfoShow includeList={includeList} excludeList={excludeList} deleteIn={params => deleteIncludes(params)} dispatch={dispatch}
            deleteEx={params => deleteExcludes(params)} modelList={modelList} changeSelect={changeSelect}/>
    </Card>
}



export default connect(({ audienceManager, loading }: { audienceManager: ManagerDataType, loading: { effects: { [key: string]: boolean } } }) => ({
    interests: audienceManager.interestList,
    audiences: audienceManager.audienceList,
    excludeList: audienceManager.excludeList,
    includeList: audienceManager.includeList,
    modelList: audienceManager.modelList,
    gettingInterest: loading.effects['audienceManager/fetchInterestList'],
    changeSelect: loading.effects['audienceManager/fetchAudienceModelDetail'] || loading.effects['audienceManager/fetchAudienceModelList'],
}))(AudienceManager)