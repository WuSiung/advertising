import { Card, Tabs, Input } from 'antd'
import React, { FC, useEffect } from 'react'
import { connect, Dispatch } from 'umi'
import { InterestDataType, AudienceDataType, ManagerDataType } from './data'

import styles from './index.less'

interface AudienceManagerProps {
    interests: InterestDataType[],
    audiences: AudienceDataType[],
    dispatch: Dispatch
}

interface InterestTableProps {
    list: InterestDataType[],
}

const InterestTable: FC<InterestTableProps> = (props) => {
    return <table className={styles.tables}>
        <thead>
            <tr>
                <th className='check'>包括</th>
                <th className='check'>排除</th>
                <th className='interest'>兴趣爱好</th>
                <th className='num'>兴趣人数</th>
                <th className='type'>类别</th>
                <th className='path'>兴趣路径</th>
            </tr>
        </thead>
    </table>
}
const AudienceManager: FC<AudienceManagerProps> = (props) => {
    const { interests, audiences, dispatch } = props
    console.log(interests, audiences)
    useEffect(() => {
        dispatch({
            type: 'audienceManager/fetchInterestList',
            payload: { size: 1000 }
        })

    }, [])
    useEffect(() => {
        dispatch({
            type: 'audienceManager/fetchAudienceList',
            payload: { size: 1000 }
        })
    }, [])
    const onSearch = (e: any) => {
        console.log(e)
    }
    return <Card>
        <Tabs defaultActiveKey='interest'>
            <Tabs.TabPane key='interest' tab='兴趣列表'>
                <Input.Search placeholder="关键词搜索" allowClear onSearch={onSearch} style={{ width: 300 }} />
                <InterestTable list={interests} />
            </Tabs.TabPane>
            <Tabs.TabPane key='audiences' tab='人群受众'>
                <Input.Search placeholder="关键词搜索" allowClear onSearch={onSearch} style={{ width: 300 }} />
            </Tabs.TabPane>
        </Tabs>
    </Card>
}

export default connect(({ audienceManager, loading }: { audienceManager: ManagerDataType, loading: { [key: string]: boolean } }) => ({
    interests: audienceManager.interestList,
    audiences: audienceManager.audienceList
}))(AudienceManager)