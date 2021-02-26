import { AdvAdvParam } from '@/pages/adv-manager/data';
import { Card } from 'antd'
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react'
import { connect, Dispatch } from 'umi';
import { AdvPreview } from '../components/AdvPreview';
import DateRange from '../components/DateRange';
import { AdvModelStateType } from './data';

import styles from './index.less'

type AdvertisingProps = {
    dispatch: Dispatch
} & Pick<AdvModelStateType, 'advertisingList'>

type QueryType = {
    rangeStart: string,
    rangeEnd: string
} & AdvAdvParam
const Advertising: FC<AdvertisingProps> = (props) => {
    const initQueryParmas: QueryType = {
        rangeStart: moment().format('YYYY-MM-DD'),
        rangeEnd: moment().format('YYYY-MM-DD'),
        startT: moment().format('YYYY-MM-DD'),
        endT: moment().format('YYYY-MM-DD'),
        current: 1,
        size: 10,
        advName: ''
    }
    const { advertisingList, dispatch } = props
    const [queryParams, setQuryParams] = useState<QueryType>(initQueryParmas)
    console.log(advertisingList)
    useEffect(() => {
        dispatch({
            type: 'advertising/fetchAdvList',
            payload: queryParams
        })
    }, [])
    const changeRoundDate = (values: [string, string]) => {
        setQuryParams({ ...queryParams, rangeStart: values[0], rangeEnd: values[1] })
    }
    return (
        <Card>
            <div className={styles.filter}>
                <span className={styles.date}>发布范围筛选： <DateRange onChange={changeRoundDate} /></span>
                <span className={styles.date}>统计数据过滤： <DateRange /></span>
            </div>
            <div className={styles.list}>
                {
                    advertisingList.map(adv => {
                        console.log(adv)
                        return <div key={adv.advId}>
                            {/* <AdvPreview url={adv.imgTextList} /> */}
                        </div>
                    })
                }
            </div>
        </Card>
    )
}

export default connect(({ advertising }: { advertising: AdvModelStateType }) => ({
    advertisingList: advertising.advertisingList
}))(Advertising)