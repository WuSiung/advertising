import React, { FC } from 'react'
import { Card } from 'antd'

import FilterTree from './components/tree'
import Packs from './components/packs'
import styles from './index.less'
import { PageContainer } from '@ant-design/pro-layout'

interface CrowdsProps {
    onToCreate?: () => void
}

const crowdTip = '分类显示尽可能多的不同受众群体可帮助您定位最有价值的受众，并做出以数据为依据的决策，让您只需点击几下就能建立一个基于受众的广告系列。'

const Crowds: FC<CrowdsProps> = (props) => {
    const { onToCreate } = props
    return <div className={styles.crowdsContainer}>
        {
            !Boolean(onToCreate) ? <PageContainer content={crowdTip} breadcrumb={undefined}>
                <Card>
                    <div className={styles.crowds}>
                        <div className={styles.left}>
                            <FilterTree />
                        </div>
                        <div className={styles.right}>
                            <Packs toCreateType={props.onToCreate} />
                        </div>
                    </div>
                </Card>
            </PageContainer> : <Card>
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
    </div>
}

export default Crowds