import React, { FC } from 'react'
// import { SelectLang } from 'umi'
import { Link } from 'umi';

import styles from './Footer.less'

const DefaultFooter: FC = () => {
    return <div className={styles.footer}>
        <Link to='/user/PrivacyPolicy' style={{ marginRight: 10 }}>隐私政策</Link>
        <Link to='/user/terms' style={{ marginRight: 10 }}>服务条款</Link>
        <Link to='/user/cookie' style={{ marginRight: 10 }}>cookie条款</Link>
        <div className={styles.copyRight}>Copyright © 2020-2021 Hunan YIXIA Network Technology Co., Ltd.</div>
        {/* <SelectLang/> */}
    </div>
}

export default DefaultFooter