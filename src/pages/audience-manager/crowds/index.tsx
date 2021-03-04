import React, { FC } from 'react'
import { Card } from 'antd'

import FilterTree from './components/tree'
import Packs from './components/packs'
import styles from './index.less'
import { PageContainer } from '@ant-design/pro-layout'

interface CrowdsProps {
    onToCreate?: () => void
}

const crowdTip = '覆盖尽可能多的不同受众群体可帮助您定位最有利可图的受众，并决定下一步的最佳行动。让您尝试尽可能多的受众，并做出以数据为依掘依托的决策。您的下一个利基受众的广告系列只需点击几下就能完成。'

const Crowds: FC<CrowdsProps> = (props) => {
    const { onToCreate } = props
    return <div>
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