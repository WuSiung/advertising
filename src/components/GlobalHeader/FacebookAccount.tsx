import React, { useEffect, useState } from 'react'
import { ConnectState } from '@/models/connect'
import { connect, ConnectProps } from 'umi'
import type { Dispatch } from 'umi'
import type { FacebookAccount, AppInfo } from '@/models/user'
import HeaderDropdown from '../HeaderDropdown';
import { Avatar, Menu, Spin, message } from 'antd';
import styles from './index.less';
import { DownOutlined, FacebookFilled, GoogleCircleFilled } from '@ant-design/icons';
import FBLogin, { loadAndInitFB } from '@/utils/fblogin'
import AddAccountModal from './AddAccountModal'


export type GlobalHeaderRightProps = {
    facebookAccounts?: FacebookAccount[],
    appInfo?: AppInfo,
    dispatch?: Dispatch,
    changeAccounting?: boolean
} & Partial<ConnectProps>;

export type QueryOnlineAccountParams = {
    access_token: string,
    fbid: string
}

const FacebookAccountLists: React.FC<GlobalHeaderRightProps> = (props) => {
    const { facebookAccounts, appInfo, dispatch, changeAccounting } = props;
    const [showModal, setShowModal] = useState<boolean>(false)
    const [facebookLoginParam, setFacebookLoginParam] = useState<QueryOnlineAccountParams>()

    useEffect(() => {
        loadAndInitFB()
    }, [])

    const changeAccount = async ({ key }: { key: string }) => {
        switch (key) {
            case 'addFacebookAccount':
                FBLogin().then(async (res: fb.StatusResponse) => {
                    const params: QueryOnlineAccountParams = {
                        access_token: res.authResponse.accessToken,
                        fbid: res.authResponse.userID
                    }
                    // 保存accesstoken
                    setFacebookLoginParam(params)
                    if (dispatch) {
                        message.loading({key: params.access_token, duration: 0, content: '获取Facebook账号中，请稍等'})
                        await dispatch({
                            type: 'user/fetchFbOnlineAccounts',
                            payload: params
                        }).then(() => { setShowModal(true) })
                        message.destroy(params.access_token)
                    }
                })
                break;
            default:
                const changeAccount = facebookAccounts?.filter(account => account.accountId == key) || [];
                dispatchChangeAccount(dispatch, changeAccount)
                break;
        }
    }

    let checkAccount: FacebookAccount | undefined;
    const accounts = facebookAccounts?.map((item: FacebookAccount) => {
        if (item.checked == '1') {
            checkAccount = item
            return
        } else {
            return (<Menu.Item key={item.accountId}>
                <Avatar size='small' className={styles.avatar} src={appInfo?.logo} alt='appLogo'></Avatar>
                <span style={{ marginLeft: 10 }}>{item?.accountName}</span>
            </Menu.Item>)
        }
    }) || []

    const overlayMenu = <Menu className={styles.menu} selectedKeys={[]} onClick={(key: any) => changeAccount(key)}>
        {accounts}
        <Menu.Item key='addFacebookAccount'>
            <div className={styles.addAccount}>
                <FacebookFilled className={ styles.iconlogo } style={{ color: "#3b5998" }}/> 添加Facebook账号
            </div>
        </Menu.Item>
        <Menu.Item key='addGoogleAccount'>
        <div className={styles.addAccount}>
                <GoogleCircleFilled className={ styles.iconlogo } style={{ color: "#dd4b39" }}/> 添加Google账号
            </div>
        </Menu.Item>
    </Menu >
    return (
        <div>
            <HeaderDropdown overlay={overlayMenu} arrow disabled={changeAccounting}>
                <Spin spinning={!!changeAccounting} wrapperClassName={styles.spin}>
                    <span className={`${styles.action} ${styles.account}`}>
                        {
                            checkAccount&&<Avatar size='small' className={styles.avatar} src={appInfo?.logo} alt='appLogo'></Avatar>
                        }
                        <span className={`${styles.name} anticon`}>{checkAccount? checkAccount.accountName : '选择Facebook账号'}</span>
                        <DownOutlined />
                    </span>
                </Spin>
            </HeaderDropdown>
            <AddAccountModal isModalVisible={showModal} handleVisible={setShowModal} fbLoginParams={facebookLoginParam}></AddAccountModal>
        </div>
    )
}

const dispatchChangeAccount = (dispatch: Dispatch | undefined,changeAccount: FacebookAccount[]) =>{
    if (dispatch && changeAccount?.length > 0) {
        dispatch({
            type: 'global/changeFbAccount',
            payload: changeAccount[0]
        }).then(() => {
            // 切换成功后获取所有账号列表
            dispatch({ type: 'user/fetchFbAccounts' })
        }).catch(() => {
        })
    }
}

export default connect(({ user, loading }: ConnectState) => ({
    facebookAccounts: user.facebookAccounts,
    appInfo: user.appInfo,
    changeAccounting: loading.effects['global/changeFbAccount'],
}))(FacebookAccountLists)