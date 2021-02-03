import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { HomeOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, Input, Spin } from 'antd'
import { Dispatch, history, connect } from 'umi'
import { randomLenNum } from '@/utils/utils'
import { RandomCode } from '@/pages/User/components/RandomCode'
import { RegisterParamsType } from '@/services/register'

import styles from './index.less'

export type RegisterProps = {
    dispatch: Dispatch,
    submitting?: boolean,
    form: typeof Form
}
const Register: React.FC<RegisterProps> = (props) => {
    const { submitting, dispatch } = props
    
    const [random, setRandom] = useState<number>(randomLenNum(4, true))
    const memoRandom = useMemo(() => random, [random])
    const changeRandom = useCallback((random: number) => { setRandom(random) }, [setRandom])

    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };
    const sumitRegister = async (values: RegisterParamsType) => {
        let status = await dispatch({
            type: 'register/register',
            payload: { ...values, randomStr: random },
        })
        console.log(status)
    /** 清空输入框，重新获取code */
        // form.resetFields()
        setRandom(randomLenNum(4, true))
    }
    return (
        <div className={styles.main}>
            <Spin spinning={!!submitting}>
                <Form {...layout} name="basic" form={form} onFinish={(values) => { sumitRegister(values as RegisterParamsType); return Promise.resolve();}}>
                    <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]} hasFeedback>
                        <Input placeholder='请输入用户名' allowClear prefix={ <UserOutlined /> }/>
                    </Form.Item>
                    <Form.Item label="公司名称" name="companyName" rules={[{ required: true, message: '请输入公司名称' }]} hasFeedback>
                        <Input placeholder='请输入公司名称' allowClear prefix={ <HomeOutlined /> }/>
                    </Form.Item>
                    <Form.Item label="手机号码" name="phone" rules={[{ required: true, message: '请输入手机号码' }]} hasFeedback>
                        <Input placeholder='请输入手机号码' allowClear prefix={ <PhoneOutlined /> }/>
                    </Form.Item>
                    <Form.Item label="密码" name='password' rules={[{ required: true, message: '请输入密码' },{min:6, message: '密码最少6位'}]} hasFeedback>
                        <Input.Password placeholder='请输入密码'/>
                    </Form.Item>
                    <Form.Item label="确认密码" name='confirmPwd' hasFeedback dependencies={['password']} rules = {[{
                        required: true,message: '请输入确认密码', },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                                }
                                return Promise.reject('两次输入的密码不一致，请检查');
                            },
                            }),
                        ]}>
                        <Input.Password placeholder='请输入确认密码'/>
                    </Form.Item>
                    <Form.Item label="验证码">
                        <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]} noStyle>
                            <Input placeholder='请输入验证码' allowClear />
                        </Form.Item>
                        <RandomCode random={memoRandom} changeRandom={changeRandom} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" loading={submitting}>注册</Button>
                        <div className={styles.register} onClick={() => history.push('/user/login')}>已有账号，前往登陆</div>
                    </Form.Item>
                    </Form>
            </Spin>
        </div>
    )
}

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['register/register']
}))(Register)