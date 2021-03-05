import { Card } from 'antd'
import React, { FC } from 'react'
var pjson = require('../../../package.json');

import styles from './index.less'

const Version = () => {
    const versionDetail: string[] = [
        '新增版本说明页面',
        '22',
        '33'
    ]
    return <Card>
        <div className={styles.title}>最新版本{pjson.version}更新说明</div>
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