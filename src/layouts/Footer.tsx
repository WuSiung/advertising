import React, { FC } from 'react'
import { SelectLang } from 'umi'

import styles from './Footer.less'

const DefaultFooter: FC = () => {
    return <div className={styles.footer}>
        <a href="" style={{marginRight:10}}>隐私政策</a>
        <a href="" style={{marginRight:10}}>服务条款</a>
        <SelectLang/>
    </div>
}

export default DefaultFooter