import { message, Modal, Select } from 'antd'
import { ConnectState } from '@/models/connect'
import React, { useState } from 'react'
import { connect, Dispatch } from 'umi'
import type { OnlineFbAcccountType, FacebookAccount } from '@/models/user'
import type { QueryOnlineAccountParams } from './FacebookAccount'

export type AddAccountPropsType = {
    isModalVisible: boolean,
    accounts?: OnlineFbAcccountType[],
    dispatch?: Dispatch,
    handleVisible(visible: boolean): void,
    fbLoginParams?: QueryOnlineAccountParams
}

const AddAccountModal: React.FC<AddAccountPropsType> = (props) => {
    const { isModalVisible, handleVisible, accounts, dispatch, fbLoginParams } = props
    const [selectAccount, setSelectAccount] = useState<string>('')

    const bindAccount = () => {
        if (selectAccount) {
            const bindAccount = accounts?.filter(account => account.account_id == selectAccount) || []
            const params: FacebookAccount = {
                accountName: bindAccount[0].name,
                accountId: bindAccount[0].account_id,
                accessToken: fbLoginParams?.access_token,
                fbid: fbLoginParams?.fbid
            }
            if (dispatch) {
                dispatch({
                    type: 'global/bindFbAccount',
                    payload: { ...params, type: 0 },
                }).then(() => {
                    handleVisible(false)
                    dispatch({ type: 'user/fetchFbAccounts' })
                })
            }
        } else {
            message.error('请选择账号', 2)
        }
    }
    return (
        <>
            <Modal title="添加绑定账号" visible={isModalVisible} onCancel={() => handleVisible(false)} onOk={bindAccount}>
                <Select placeholder="选择账号" style={{ minWidth: 200 }} allowClear onChange={(value: string) => setSelectAccount(value)}>
                    {
                        accounts?.map(account => {
                            return <Select.Option value={account.account_id} key={account.account_id}>{account.name}</Select.Option>
                        })
                    }
                </Select>
            </Modal>
        </>
    )
}

AddAccountModal.defaultProps = {
    isModalVisible: false
}


export default connect(({ user, loading }: ConnectState) => ({
    accounts: user.fbOnlineAccounts,
    submitting: loading.effects['global/bindFbAccount'],
}))(AddAccountModal)