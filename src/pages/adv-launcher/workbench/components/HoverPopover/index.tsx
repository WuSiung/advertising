import { Popover } from 'antd'
import React, { FC } from 'react'

import styles from './index.less'

interface PopoverDataProps {
    cost: string | number, // 平均点击消耗金额
    octr: string | number, // 点击转换比
    installs: number | string, // 安装次数
    impressions: number, // 展示次数
    spend: number, // 消费总金额
    roas: string, // 广告支出回报率
    income: string, // 广告收益
}

const PopoverContent: FC<PopoverDataProps> = (props) => {
    return <div className={styles.datas}>
        <div className={styles.line}>
            <div className={styles.name}>广告收益</div>
            <div className={styles.value}>${props.income || '0'}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>展示次数</div>
            <div className={styles.value}>{props.impressions || '0'}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>广告支出回报率(ROAS)</div>
            <div className={styles.value}>{Number(props.roas).toFixed(2) || '0'}倍</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>平均点击消耗金额</div>
            <div className={styles.value}>${Number(props.cost).toFixed(2) || '0'}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>消费总金额</div>
            <div className={styles.value}>${Number(props.spend).toFixed(2) || '0'}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>点击转换比</div>
            <div className={styles.value}>{Number(props.octr).toFixed(2) || '0'}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>安装次数</div>
            <div className={styles.value}>{props.installs || '0'}</div>
        </div>
    </div>
}

const HoverPopover: FC<PopoverDataProps> = (props) => {
    return <Popover content={PopoverContent.bind(null, { ...props })} title="数据明细" trigger="hover" placement='bottom'>
        {props.children}
    </Popover>
}

export default HoverPopover