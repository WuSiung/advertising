import Store from '@/utils/store';
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { Context, extend } from 'umi-request';
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

interface Headers{
  isToken: Boolean,
  Authorization: String
}

/** 异常处理程序 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};
const { NODE_ENV } = process.env;
// console.log(NODE_ENV, process.env)
/** 配置request请求时的默认参数 */
const request = extend({
  // headers,
  // errorHandler,
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 15000,
});
/** 中间件对请求前后做处理 */
request.use(async (ctx: Context, next: Function): Promise<void> => {
  const { req } = ctx;
  const { url, options } = req;
  // 添加代理前缀
  if (url.indexOf('/proxyApi') !== 0) {
    ctx.req.url = '/proxyApi' + url
  }
  let headers = {}
  const dataObj = Object.assign(options.data || {}, options.params || {}) //合并参数检查是否需要token
  if (dataObj.isToken === false) {
    headers = {
      Authorization: 'Basic cGlnOnBpZw==',
      isToken:false,
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
    notification.error({
      message: res.msg || res.message,
    })
    if (status == 401) {
      history.replace('/user/login')
      throw new Error(String(status));
    }
    // if (res.error&&res.error.message&&res.error.details) {
    //   notification.error({
    //     message: res.error.message,
    //     description:res.error.details
    //   })
    //   return res;
    // } else if (res.error&&res.error.message){
    //   notification.error({
    //     message: res.error.message,
    //   })
    //   return res;
    // } else if (res.error){
    //   notification.error({
    //     message: res.error,
    //   })
    //   return res;
    // }
    // return res;
    throw new Error(JSON.stringify(res));
  } else if(res.code == 1){
    notification.error({
      message: res.msg,
    })
    // return res
    throw new Error(JSON.stringify(res));
  }
  return response;
});

export default request;
