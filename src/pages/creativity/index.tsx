import { Card, Tabs } from 'antd'
import React, { FC } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import MediaCreativity from './components/media'
import TextCreativity from './components/text'

const pageTip = '公共素材库能够实现所有素材和标题资源的上传和储存，实现时间，效果，类型筛选排序，能同时实现多账号资源共享，加载到工作台进行广告发布。'
const Creativity: FC = (props) => {
    return <PageContainer content={pageTip} title='公共素材库'>
        <Card>
            <Tabs defaultActiveKey="1" >
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