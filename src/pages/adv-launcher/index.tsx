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
    'workbench': '通过广告创作功能，您可以在工作台启动新广告。这是您的内容中心，您还可以在广告创意里面直接选择效果优秀的创意组合批量生成全新广告，也可以将公共素材库的素材添加到工作台来进行批量生成全新广告，也可以选择热门广告和上传广告素材重新组合广告进行批量发布。',
    'advertising': '创意是Facebook Ad战略的重要组成部分。“广告创意”功能可提供基于大数据的洞察力，以准确地显示哪些内容有效，哪些无效。了解哪些广告能够在目标受众以及渠道的哪个部分引起共鸣，找出正在产生高效益但未被充分利用的创意元素，并找出浪费的支出。为设计师提供可靠的素材参考。',
}

const AdvLauncher: FC<AdvLauncher> = (props) => {
    const { children, match, location } = props
    const url = match.url === '/' ? '' : match.url
    const tabList = [
        { key: 'workbench', tab: '广告工作台' },
        { key: 'advertising', tab: '广告创意' }
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
                isTabPage ? <PageContainer header={header} content={tabContent[tableKey]} onTabChange={handleTabChange}>
                    {children}
                </PageContainer>
                    : <div>{children}</div>
            }

        </div>
    )
}

export default AdvLauncher