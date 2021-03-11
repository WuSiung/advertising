/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
const allApiStr = ['/code', '/admin', '/ads', '/auth', '/file']
const api2Str = [{ key: '/subApi', rewrite: '/subApi' }, { key: '/autoTactic', rewrite: '/autoTactic'}]
const apiProxyConfig = {}
const urls = {
  'dev': 'https://dev.tanwanai.com/',
  'local': 'http://192.168.43.66:9999/', //http://192.168.31.24:9999/
  'test': 'https://dev.tanwanai.com/'
}

// const localTestConfig = {
//   url: 'http://119.8.237.139:9191/'
// }

const localTestConfig = {
  subApi: 'http://119.8.237.139:9191/',
  autoTactic: 'http://34.96.168.247:31222/'
}

allApiStr.map(str => {
  return apiProxyConfig[str] = {
    target: urls[process.env.REACT_APP_ENV || 'dev'],
    changeOrigin: true,
    pathRewrite: { '^/': '/' },
  }
})
// api2Str.map(str => {
//   return apiProxyConfig[str.key] = {
//     target: localTestConfig.url,
//     changeOrigin: true,
//     pathRewrite: { ['^' + str.key]: '/' },
//   }
// })

api2Str.map(str => {
  return apiProxyConfig[str.key] = {
    target: localTestConfig[str.key.replace('/', '')],
    changeOrigin: true,
    pathRewrite: { ['^' + str.key]: '/' },
  }
})
export default {
  dev: apiProxyConfig,
  local: apiProxyConfig,
  test: apiProxyConfig,
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
