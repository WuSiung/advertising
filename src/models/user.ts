import type { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers, queryFbAccounts, queryFbOnlineAccounts, refreshToekn } from '@/services/user';
import Store from '@/utils/store';

export type CurrentUser = {
  avatar?: string;
  username?: string;
  createTime?: string;
  delFlag?: string;
  deptId?: string;
  fbid?: string,
  lockFlag?: string,
  phone?: string
  userId?: number;
  unreadCount?: number;
};

export type AppInfo = {
  appId?: string,
  appName?: string,
  fbId?: string,
  logo?: string,
  type?: string,
  url?: string
}

export type FacebookAccount = {
  accessToken?: string,
  accountId?: string,
  accountName?: string,
  checked?: string,
  fbid?: string,
  deptId?: string,
  tokenId?: number
}

export type OnlineFbAcccountType = {
  account_id: string,
  account_status: number,
  age: number,
  amount_spent: string,
  balance: string,
  currency: string,
  id: string,
  name: string
}

export type UserModelState = {
  currentUser?: CurrentUser,
  appInfo?: AppInfo,
  facebookAccounts?: FacebookAccount[], // 已绑定的fb账号本地数据库
  fbOnlineAccounts?: OnlineFbAcccountType[], // fb线上账号
};


export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    fetchFbAccounts: Effect;
    fetchFbOnlineAccounts: Effect;
    refreshToken: Effect
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState['currentUser']>;
    changeNotifyCount: Reducer<UserModelState>;
    saveAppInfo: Reducer<UserModelState['appInfo']>;
    saveFbAccounts: Reducer<UserModelState>;
    saveFbOnlineAccounts: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
    appInfo: {},
    facebookAccounts: [],
    fbOnlineAccounts: []
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      try {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data.sysUser,
        });
        yield put({
          type: 'saveAppInfo',
          payload: response.data.advApp,
        });
      } catch (err) {
        console.log(err)
      }
    },
    *fetchFbAccounts(_, { call, put }) {
      const response = yield call(queryFbAccounts);
      yield put({
        type: 'saveFbAccounts',
        payload: response.data
      })
    },
    *fetchFbOnlineAccounts({ payload }, { call, put }) {
      const response = yield call(queryFbOnlineAccounts, { ...payload })
      yield put({
        type: 'saveFbOnlineAccounts',
        payload: response?.data?.data || []
      })
    },
    *refreshToken({ payload }, { call, put }) {
      const response = yield call(refreshToekn, Store.GetRefreshToken())
      if (response) {
        Store.SetRefreshToken(response.refresh_token)
        Store.SetToken(response.access_token)
      }
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveAppInfo(state, { payload }) {
      return {
        ...state,
        appInfo: payload || {}
      }
    },
    saveFbAccounts(state, { payload }) {
      return {
        ...state,
        facebookAccounts: payload
      }
    },
    saveFbOnlineAccounts(state, { payload }) {
      return {
        ...state,
        fbOnlineAccounts: payload
      }
    },
    changeNotifyCount(
      state = {
        currentUser: {},
        appInfo: {},
        facebookAccounts: [],
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
