import { Form, Input, Image, Button } from 'antd';
import React, { useState, useCallback, useMemo, useEffect} from 'react';
import { connect } from 'umi';
import {randomLenNum} from '@/utils/utils'
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};


const RandomCode: React.FC<{ random: Number, changeRandom: Function }> = ({ random, changeRandom }) => {
  return (<Image preview={false} src={'/code?randomStr=' + random} onClick={()=>changeRandom(randomLenNum(4, true))}></Image>)
}

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const [codeRandom, setCodeRandom] = useState<Number>()
  const memoRandom = useMemo(()=> codeRandom, [codeRandom])

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, randomStr: codeRandom},
    });
  };

  useEffect(() => {
    console.log(1)
    return function clearnUp() {
      setCodeRandom(randomLenNum(4, true))
      console.log('unmounting...');
    }
  }, [submitting])
  const changeRandom = useCallback((random: number) => {
    setCodeRandom(random)
  }, [codeRandom])
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };
  return (
    <div className={styles.main}>
      <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        handleSubmit(values as LoginParamsType);
        return Promise.resolve();
      }}
      >
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder='请输入用户名' allowClear/>
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder='请输入密码'/>
        </Form.Item>
        <Form.Item label="验证码" name="code" rules={[{ required: true, message: '请输入验证码' }]}>
          <Form.Item name="code" noStyle><Input placeholder='请输入验证码' allowClear /></Form.Item>
          <RandomCode random={memoRandom} changeRandom={ changeRandom }/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">登陆</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
