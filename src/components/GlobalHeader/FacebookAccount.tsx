import React, { useEffect, useState } from 'react'
import { ConnectState } from '@/models/connect'
import { connect, ConnectProps } from 'umi'
import type { Dispatch } from 'umi'
import type { FacebookAccount, AppInfo } from '@/models/user'
import HeaderDropdown from '../HeaderDropdown';
import { Avatar, Menu, Spin, message, Modal, Button, Image } from 'antd';
import styles from './index.less';
import { DownOutlined, FacebookFilled, GoogleCircleFilled } from '@ant-design/icons';
import FBLogin, { loadAndInitFB } from '@/utils/fblogin'
import AddAccountModal from './AddAccountModal'
import { getFbId, refreshToekn } from '@/services/user'
import Store from '@/utils/store'


export type GlobalHeaderRightProps = {
    facebookAccounts?: FacebookAccount[],
    appInfo?: AppInfo,
    dispatch?: Dispatch,
    changeAccounting?: boolean,
    getAccountLoading?: boolean
} & Partial<ConnectProps>;

export type QueryOnlineAccountParams = {
    access_token: string,
    fbid: string
}

const FacebookAccountLists: React.FC<GlobalHeaderRightProps> = (props) => {
    const { facebookAccounts, appInfo, dispatch, changeAccounting, getAccountLoading } = props;
    const [showModal, setShowModal] = useState<boolean>(false)
    const [facebookLoginParam, setFacebookLoginParam] = useState<QueryOnlineAccountParams>()
    const [hasBindAddcount, setHasBindAddcount] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            let res: any = await getFbId()
            loadAndInitFB(res.data as string)
        })()
    }, [])

    const changeAccount = async ({ key }: { key: string | number }) => {
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
                        message.loading({ key: params.access_token, duration: 0, content: '获取Facebook账号中，请稍等' })
                        await dispatch({
                            type: 'user/fetchFbOnlineAccounts',
                            payload: params
                        })
                        setShowModal(true)
                        setHasBindAddcount(false)
                        message.destroy(params.access_token)
                    }
                })
                break;
            default:
                const changeAccounts = facebookAccounts?.filter(account => account.tokenId == key) || [];
                dispatchChangeAccount(dispatch, changeAccounts)
                break;
        }
    }

    let checkAccount: FacebookAccount | undefined;
    const accounts = facebookAccounts?.map((item: FacebookAccount) => {
        if (item.checked == '1') {
            checkAccount = item
            return
        } else {
            return (<Menu.Item key={item.tokenId}>
                <Avatar size='small' className={styles.avatar} src={appInfo?.logo} alt='appLogo'></Avatar>
                <span style={{ marginLeft: 10 }}>{item?.accountName}</span>
            </Menu.Item>)
        }
    }) || []

    const overlayMenu = <Menu className={styles.menu} selectedKeys={[]} onClick={(key: any) => changeAccount(key)}>
        {accounts}
        <Menu.Item key='addFacebookAccount'>
            <div className={styles.addAccount}>
                <FacebookFilled className={styles.iconlogo} style={{ color: "#3b5998" }} /> 添加Facebook账号
            </div>
        </Menu.Item>
        {/* <Menu.Item key='addGoogleAccount'>
            <div className={styles.addAccount}>
                <GoogleCircleFilled className={styles.iconlogo} style={{ color: "#dd4b39" }} /> 添加Google账号
            </div>
        </Menu.Item> */}
    </Menu >
    return (
        <div>
            <HeaderDropdown overlay={overlayMenu} arrow disabled={changeAccounting}>
                <Spin spinning={!!changeAccounting} wrapperClassName={styles.spin}>
                    <span className={`${styles.action} ${styles.account}`}>
                        {
                            checkAccount && <Avatar size='small' className={styles.avatar} src={appInfo?.logo} alt='appLogo'></Avatar>
                        }
                        <span className={`${styles.name} anticon`}>{checkAccount ? checkAccount.accountName : '选择Facebook账号'}</span>
                        <DownOutlined />
                    </span>
                </Spin>
            </HeaderDropdown>
            <AddAccountModal isModalVisible={showModal} handleVisible={setShowModal} fbLoginParams={facebookLoginParam}></AddAccountModal>
            {
                hasBindAddcount && <Modal visible={(!getAccountLoading) && facebookAccounts?.length == 0} footer={null} className={styles.tips} onCancel={() => setHasBindAddcount(false)}>
                    <Image src={require('@/assets/fbIcon.jpg')} width={120} preview={false}></Image>
                    <div className={styles.title}>智能广告投放解决方案</div>
                    <div className={styles.item}>自动同步Facebook广告列表数据</div>
                    <div className={styles.item}>通过广告工作台批量发布广告</div>
                    <div className={styles.item}>制定自动化策略实时监控优化广告效果</div>
                    <div className={styles.item}>一站式管理批量上传广告素材资源</div>
                    <Button onClick={() => changeAccount({ key: 'addFacebookAccount' })} type='primary' style={{ marginTop: 10 }}>添加Facebook账号</Button>
                </Modal>
            }
        </div>
    )
}

const dispatchChangeAccount = (dispatch: Dispatch | undefined, changeAccount: FacebookAccount[]) => {
    if (dispatch && changeAccount?.length > 0) {
        dispatch({
            type: 'global/changeFbAccount',
            payload: changeAccount[0]
        }).then(async () => {
            // 切换成功后获取所有账号列表
            // await dispatch({ type: 'user/refreshToken' })
            await dispatch({ type: 'user/fetchFbAccounts' })
            window.location.reload()
        }).catch(() => {
        })
    }
}

export default connect(({ user, loading }: ConnectState) => ({
    facebookAccounts: user.facebookAccounts,
    appInfo: user.appInfo,
    changeAccounting: loading.effects['global/changeFbAccount'],
    getAccountLoading: loading.effects['user/fetchFbAccounts'],
}))(FacebookAccountLists)