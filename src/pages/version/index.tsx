import { Card } from 'antd'
import React, { FC } from 'react'
var pjson = require('../../../package.json');

import styles from './index.less'

const Version = () => {
    const versionDetail: string[] = [
        '底部新增服务条款、隐私政策',
        '更换logo、平台名称',
        '公共素材库标签筛选',
        '去除国际化语言选择'
    ]
    return <Card>
        <div className={styles.title}>最新版本{pjson.version}更新说明</div>
        <div className={styles.time}>2021-03-06 18:30</div>
        <div className={styles.detail}>
            <ol>
                {
                    versionDetail.map(item => {
                        return <li key={item}>{item}</li>
                    })
                }
            </ol>
        </div>
    </Card>
}

export default Version