/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
const allApiStr = ['/code', '/admin', '/ads', '/auth', '/subApi']
const apiProxyConfig = {}
const proxyUrl = process.env.REACT_APP_ENV == 'dev' ? 'https://dev.tanwanai.com/' : 'https://dev.tanwanai.com/'
allApiStr.map(str => {
  return apiProxyConfig[str] = {
    target: proxyUrl,
    changeOrigin: true,
    pathRewrite: { '^/': '/' },
  }
})

export default {
  dev: apiProxyConfig,
  test: apiProxyConfig,
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
