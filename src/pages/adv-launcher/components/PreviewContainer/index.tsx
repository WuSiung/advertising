import React, { FC } from 'react'

import styles from './index.less'

const PreviewContainer: FC<any> = (props) => {
    console.log(props)
    return <div className={styles.class}></div>
}

export default PreviewContainer 