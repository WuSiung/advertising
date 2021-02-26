import { Card } from 'antd'
import React, { FC } from 'react'
import DateRange from '../components/DateRange';

import styles from './index.less'

const Advertising: FC<any> = (props) => {
    return (
        <Card>
            <div className={styles.filter}>
                <span className={styles.date}>发布范围筛选： <DateRange /></span>
                <span className={styles.date}>统计数据过滤： <DateRange /></span>
            </div>
        </Card>
    )
}

export default Advertising