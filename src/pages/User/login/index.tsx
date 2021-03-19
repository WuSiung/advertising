import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { connect, history } from 'umi';
import { randomLenNum } from '@/utils/utils'
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';
import { RandomCode } from '@/pages/User/components/RandomCode'

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const [codeRandom, setCodeRandom] = useState<Number>(randomLenNum(4, true))
  const memoRandom = useMemo(() => codeRandom, [codeRandom])

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, randomStr: codeRandom },
    });
  };
  // loading结束后更新code 
  useEffect(() => { if (submitting == false) { setCodeRandom(randomLenNum(4, true)) } }, [submitting])

  const changeRandom = useCallback((random: number) => { setCodeRandom(random) }, [codeRandom])

  return (
    <div className={styles.main}>
      <div className={styles.title}>账号登陆</div>
      <Form
        name="basic"
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder='请输入用户名' allowClear prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder='请输入密码' prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]} noStyle><Input placeholder='请输入验证码' allowClear /></Form.Item>
          <RandomCode random={memoRandom} changeRandom={changeRandom} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">登陆</Button>
          <div className={styles.register} onClick={() => history.push('/user/register')}>没有账号？快来注册吧</div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
