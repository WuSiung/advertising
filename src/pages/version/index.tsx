import { Card } from 'antd'
import React, { FC } from 'react'
var pjson = require('../../../package.json');

import styles from './index.less'

const Version = () => {
    const versionDetail: string[] = [
        '新增服务条款、隐私政策、cookie政策对应页面',
        '已有广告接口变更',
        '广告发布成功跳转已有广告',
        '修复若干bug'
    ]
    return <Card>
        <div className={styles.title}>最新版本{pjson.version}更新说明</div>
        <div className={styles.time}>2021-03-13 18:30</div>
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