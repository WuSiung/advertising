import { Popover, PopoverProps } from 'antd'
import React, { FC } from 'react'
import { AdvDataType } from '../../data'

import styles from './index.less'

type PopoverDataProps = {
    data?: AdvDataType
} & Pick<PopoverProps, 'placement'>

const PopoverContent: FC<PopoverDataProps> = (props) => {
    const { data } = props
    return <div className={styles.datas}>
        <div className={styles.line}>
            <div className={styles.name}>广告收益</div>
            <div className={styles.value}>${Number(data?.income).toFixed(2) || '0'}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>展示次数</div>
            <div className={styles.value}>{Number(data?.impressions) || '0'}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>广告支出回报率(ROAS)</div>
            <div className={styles.value}>{Number(data?.roas || '0').toFixed(2)}倍</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>平均点击消耗金额</div>
            <div className={styles.value}>${Number(data?.cost || '0').toFixed(2)}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>消费总金额</div>
            <div className={styles.value}>${Number(data?.spend || '0').toFixed(2)}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>点击转换比</div>
            <div className={styles.value}>{Number(data?.octr || '0').toFixed(2)}</div>
        </div>
        <div className={styles.line}>
            <div className={styles.name}>安装次数</div>
            <div className={styles.value}>{data?.installs || '0'}</div>
        </div>
    </div>
}

const HoverPopover: FC<PopoverDataProps> = (props) => {
    return <Popover content={PopoverContent.bind(null, { ...props })} title="数据明细" trigger="hover" placement={props.placement || 'bottom'}>
        {props.children}
    </Popover>
}

export default HoverPopover