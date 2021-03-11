import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, encryption } from '@/utils/utils';
import { message } from 'antd';
import Store from '@/utils/store'
import { logout } from '@/services/user';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginAndRegisterPublicType = {
  grant_type: string,
  scope: string
}

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const loginPublicParams: LoginAndRegisterPublicType = {
        grant_type: 'password',
        scope: 'server'
      }
      const user = encryption(
        {
          data: payload,
          key: 'yixiawangluo2020',
          param: ['password']
        }
      )
      const response = yield call(fakeAccountLogin, {...user, ...loginPublicParams});
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.access_token) {
        Store.SetToken(response.access_token)
        Store.SetRefreshToken(response.refresh_token)
        Store.SetTokenId(response.token_id);
        Store.SetUserId(response.user_id);
        Store.SetUserName(response.username);
        Store.SetExpiresIn(response.expires_in);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

    *logout(_,{call}) {
      const { redirect } = getPageQuery();
      yield call(logout)
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        Store.clearStorage();
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
