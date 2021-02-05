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


const AdvLauncher: FC<AdvLauncher> = (props) => {
    const { children, match, location } = props
    const url = match.url === '/' ? '' : match.url
    const tabList = [
        { key: 'workbench', tab: '广告工作台' },
        { key: 'advertising', tab: '已有广告' },
        { key: 'media', tab: '公共素材库' },
    ]

    const handleTabChange = (key: string) => {
        switch (key) {
            case 'workbench':
                history.push(`${url}/workbench`);
                break;
            case 'advertising': 
                history.push(`${url}/advertising`);
                break;
            case 'media': 
                history.push(`${url}/media`);
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
    const header = {
        title: '',
        breadcrumb: {} // 必须为空，去除面包屑
    }
    return (
        <div className={styles.advlauncher}>
            <PageContainer header={header} tabList={tabList} tabActiveKey={ getTabKey() } onTabChange={handleTabChange}>
                {children}
            </PageContainer>
        </div>
    )
}

export default AdvLauncher