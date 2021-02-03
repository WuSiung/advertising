import type { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers, queryFbAccounts } from '@/services/user';

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

export type UserModelState = {
  currentUser?: CurrentUser,
  appInfo?: AppInfo,
  facebookAccounts?: FacebookAccount[]
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    fetchFbAccounts: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState['currentUser']>;
    changeNotifyCount: Reducer<UserModelState>;
    saveAppInfo: Reducer<UserModelState['appInfo']>;
    saveFbAccounts: Reducer<UserModelState>
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
    appInfo: {},
    facebookAccounts: []
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
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveAppInfo(state, {payload}) {
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
