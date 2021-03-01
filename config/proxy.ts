/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
const allApiStr = ['/code', '/admin', '/ads', '/auth', '/subApi']
const apiArr = {}
allApiStr.map(str => {
  return apiArr[str] = {
    target: 'https://dev.tanwanai.com/',
    changeOrigin: true,
    pathRewrite: { '^/': '/' },
  }
})

export default {
  dev: apiArr,
  test: {
    '/': {
      target: 'https://dev.tanwanai.com/',
      changeOrigin: true,
      pathRewrite: { '^/': '/' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
