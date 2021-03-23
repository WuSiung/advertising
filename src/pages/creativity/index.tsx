import { Card, Tabs } from 'antd'
import React, { FC } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import MediaCreativity from './components/media'
import TextCreativity from './components/text'
import { history } from 'umi'

import styles from './index.less'


interface CreativityProps {
    location: {
        pathname: string,
        query: {
            key: any
        }
    }
}

const pageTip = '公共素材库能够实现所有素材和标题资源的上传和储存，实现时间，类型，效果等形式的筛选排序，并能同时实现多账号资源共享，还能加载到工作台进行广告快速发布。'
const Creativity: FC<CreativityProps> = (props) => {
    const { location } = props
    const tabClick = (activeKey: string) => {
        history.replace('/creativity?key=' + activeKey)
    }

    return <PageContainer content={pageTip} title='公共素材库'>
        <Card className={styles.creativity}>
            <Tabs defaultActiveKey={location.query.key} onTabClick={tabClick}>
                <Tabs.TabPane tab="媒体素材库" key="1">
                    <MediaCreativity />
                </Tabs.TabPane>
                <Tabs.TabPane tab="文字素材库" key="2">
                    <TextCreativity />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    </PageContainer>
}

export default Creativity