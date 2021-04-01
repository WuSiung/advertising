import { showConfirm } from '@/components/Confrim';
import { ConnectState } from '@/models/connect';
import Store from '@/utils/store';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, message, notification } from 'antd'
import React, { FC, useState } from 'react'
import { connect, CurrentUser, Dispatch } from 'umi';

import styles from './index.less'
import { editPwdApi } from './service';

interface SettingProps {
    dispatch: Dispatch,
    currentUser: CurrentUser
}

const pageTip = '在系统设置中，您可以修改密码。'
const Setting: FC<SettingProps> = (props) => {
    const { dispatch, currentUser } = props
    const [oldPwd, setOldPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [newConfirmPwd, setNewConfirmPwd] = useState('')

    const editPwd = () => {
        editPwdApi({ newpassword1: newPwd, password: oldPwd, username: Store.GetUserName() || currentUser.username || '' }).then(res => {
            if (res.data) {
                message.success('密码修改成功，请重新登陆')
                logout()
            } else {
                notification.error({
                    message: res.msg,
                    key: 'errorOne'
                })
            }
        })
    }
    const logout = () => {
        const userLogout = () => {
            dispatch({
                type: 'login/logout',
            })
        }
        showConfirm({
            content: '是否确认退出登陆？',
            onOk: userLogout.bind(null)
        })
    }
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    }
    return <PageContainer content={pageTip} title='系统设置'><Card>
        <Form className={styles.setting} {...formItemLayout} onFinish={editPwd}>
            <Form.Item label="验证旧密码" name='oldpassword' rules={[{ required: true, message: '请输入您的旧密码!', }]}>
                <Input.Password placeholder='验证旧密码' onChange={e => setOldPwd(e.target.value)} />
            </Form.Item>
            <Form.Item label="请输入新密码" name="password" rules={[{ required: true, min: 6, message: '请输入6位以上的新密码!', }]} hasFeedback>
                <Input.Password placeholder='请输入新密码' onChange={e => setNewPwd(e.target.value)} />
            </Form.Item>
            <Form.Item label="请确认密码" name="confirm" dependencies={['password']} rules={[{ required: true, message: '请输入一致的确认密码!', }, ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致!'));
                },
            }),]} hasFeedback>
                <Input.Password placeholder='请确认密码' onChange={e => setNewConfirmPwd(e.target.value)} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button htmlType="submit" type='primary' style={{ marginRight: 10 }}>修改密码</Button>
                {/* <Button onClick={logout} type='primary'>退出登陆</Button> */}
            </Form.Item>
        </Form>

    </Card>
    </PageContainer>
}

export default connect(({ user }: ConnectState) => ({
    currentUser: user.currentUser,
}))(Setting);