import Store from '@/utils/store';
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { Context, extend, ResponseError } from 'umi-request';
import { history } from 'umi'
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序 */
const errorHandler = (error: ResponseError): Response => {
  const { response, type } = error;
  if (type == 'Timeout') {
    notification.error({
      message: `请求超时,本程序使用谷歌云存储文件，请优化网络`,
    });
    throw Error('请求超时');
  }
  return response;
};
const { NODE_ENV } = process.env;
// console.log(NODE_ENV, process.env)
/** 配置request请求时的默认参数 */
const request = extend({
  // headers,
  errorHandler,
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 60000,
});
/** 中间件对请求前后做处理 */
request.use(async (ctx: Context, next: Function): Promise<void> => {
  const { req } = ctx;
  const { url, options } = req;
  // 添加代理前缀
  // if (url.indexOf('/proxyApi') !== 0) {
  //   ctx.req.url = '/proxyApi' + url
  // }
  let headers = {}
  const dataObj = Object.assign(options.data || {}, options.params || {}) //合并参数检查是否需要token
  if (dataObj.isToken === false) {
    headers = {
      Authorization: 'Basic cGlnOnBpZw==',
      isToken: false,
    }
  } else {
    headers = {
      Authorization: `Bearer ${Store.GetToken()}`
    }
  }

  ctx.req.options.headers = headers
  await next()
})

/** 拦截器 */
request.interceptors.response.use(async (response: Response) => {
  const { ok, status } = response;
  const res = await response.clone().json();
  if (!ok) {
    if (status == 401) {
      notification.error({
        message: '登陆过期，请重新登陆',
        key: 'errorOne'
      })
      history.replace('/user/login')
      throw new Error(String(status));
    } else if (res.code == 1) {
      notification.error({
        message: res.msg,
        key: 'errorOne'
      })
      throw new Error(JSON.stringify(res));
    } else if (codeMessage[status]) {
      notification.error({
        message: codeMessage[status],
        key: 'errorOne'
      })
      throw new Error(String(status));
    }
  } else {
    if (res.code == 1) {
      notification.error({
        message: res.msg,
        key: 'errorOne'
      })
      throw new Error(JSON.stringify(res));
    }
  }
  return response;
});

export default request;
