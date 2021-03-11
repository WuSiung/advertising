import { PageContainer } from '@ant-design/pro-layout';
import React, { FC, useState } from 'react';
import { history } from 'umi'

import styles from './index.less'

interface AdvLauncher {
    match: {
        url: string;
        path: string;
    };
    location: {
        pathname: string
    }
}

const tabContent = {
    'workbench': '通过广告启动器，您可以在工作台和已有广告系列中启动新广告或现有广告。这是您的内容中心，您可以在公共素材库选择最新的素材在工作台批量生成全新广告，也可以选择热门广告和保存的广告素材重新组合广告。在这里，您还可以查看广告素材和广告文案的效果，并将最佳效果组合成可盈利的新广告，设置覆盖人群和facebook设置进行批量投放。',
    'advertising': '创意是Facebook Ad战略的重要组成部分。”创意见解“可提供基于大数据的洞素力，以准确地显示哪些内容有效，哪些无效。了解哪些广告能够在目标受众以及渠道的哪个部分引起共鸣，找出什么创意正在产生高效益但未被充分利用，并找出浪费的支出。为设计师提供可靠的素材参考。',
}

const AdvLauncher: FC<AdvLauncher> = (props) => {
    const { children, match, location } = props
    const url = match.url === '/' ? '' : match.url
    const tabList = [
        { key: 'workbench', tab: '广告工作台' },
        { key: 'advertising', tab: '已有广告' }
    ]

    const handleTabChange = (key: string) => {
        switch (key) {
            case 'workbench':
                history.push(`${url}/workbench`);
                break;
            case 'advertising':
                history.push(`${url}/advertising`);
                break;
            default:
                break;
        }
    }

    const getTabKey = () => {
        const tabKey = location.pathname.replace(`${url}/`, '');
        if (tabKey && tabKey != '/') {
            return tabKey
        }
        return 'workbench'
    }
    const tableKey = getTabKey()
    let pageTitle = ''
    const isTabPage = tabList.some(tab => {
        if (tab.key == tableKey) {
            pageTitle = tab.tab
        }
        return tab.key == tableKey
    })
    const header = {
        title: pageTitle,
        breadcrumb: {} // 必须为空，去除面包屑
    }
    return (
        <div className={styles.advlauncher}>
            {
                isTabPage ? <PageContainer header={header} content={tabContent[tableKey]} tabList={tabList} tabActiveKey={tableKey} onTabChange={handleTabChange}>
                    {children}
                </PageContainer>
                    : <div>{children}</div>
            }

        </div>
    )
}

export default AdvLauncher