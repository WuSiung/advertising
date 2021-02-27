import React, { FC } from 'react'
import { Card } from 'antd'

import FilterTree from './components/tree'
import Packs from './components/packs'
import styles from './index.less'

interface CrowdsProps {
    onToCreate?: () => void
}
const Crowds: FC<CrowdsProps> = (props) => {
    return <Card>
        <div className={styles.crowds}>
            <div className={styles.left}>
                <FilterTree />
            </div>
            <div className={styles.right}>
                <Packs toCreateType={props.onToCreate} />
            </div>
        </div>
    </Card>
}

export default Crowds