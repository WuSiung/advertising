import React from 'react'
import { ConnectState } from '@/models/connect'
import { connect, ConnectProps } from 'umi'
import type {Dispatch} from 'umi'
import type { FacebookAccount, AppInfo } from '@/models/user'
import HeaderDropdown from '../HeaderDropdown';
import { Avatar, Menu } from 'antd';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';

export type GlobalHeaderRightProps = {
    facebookAccounts?: FacebookAccount[],
    appInfo?: AppInfo,
    dispatch?: Dispatch,
    changeAccounting?: boolean
} & Partial<ConnectProps>;

const FacebookAccountLists: React.FC<GlobalHeaderRightProps> = (props) => {
    const { facebookAccounts, appInfo, dispatch, changeAccounting } = props;

    const changeAccount = async ({ key }: { key: string }) => {
        const changeAccount: FacebookAccount[] = facebookAccounts?.filter(account => account.accountId == key) || []
        
        if (dispatch && changeAccount?.length>0) {
            dispatch({
                type: 'global/changeFbAccount',
                payload: changeAccount[0]
            }).then(() => {
                console.log(1)
                dispatch({ type: 'user/fetchFbAccounts' })
            }).catch(err => {
                console.error(err)
            })
        }
    }
    let checkAccount: FacebookAccount | undefined;
    const overlayMenu = <Menu className={styles.menu} selectedKeys={[]} onClick={(key: any)=>changeAccount(key)}>{
        facebookAccounts?.map((item: FacebookAccount) => {
            if (item.checked == '1') {
                checkAccount = item
                return
            } else {
                return (<Menu.Item key={item.accountId}>
                    <Avatar size='small' className={styles.avatar} src={appInfo?.logo} alt='appLogo'></Avatar>
                    <span className={`${styles.name} anticon`} style={{marginLeft: 10}}>{item?.accountName}</span>
                </Menu.Item>)
            }
        })
    }</Menu>
    return (
        <div>
            <HeaderDropdown overlay={overlayMenu} arrow>
                <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size='small' className={styles.avatar} src={appInfo?.logo} alt='appLogo'></Avatar>
                    <span className={`${styles.name} anticon`}>{checkAccount?.accountName}</span>
                    <DownOutlined />
                </span>
            </HeaderDropdown>
        </div>
        
    )
}

export default connect(({ user, loading }: ConnectState) => ({
    facebookAccounts: user.facebookAccounts,
    appInfo: user.appInfo,
    changeAccounting: loading.effects['global/changeFbAccount']
}))(FacebookAccountLists)