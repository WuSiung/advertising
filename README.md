# 广告平台 react 开发文档

## :star: 框架

- [ant design pro v4](https://pro.ant.design/)

- [umi v3](https://umijs.org/)

- typescript

## :computer: 开发环境

- node 版本大于 10.13, 且请勿使用最新版本，请使用稳定版
- 现代浏览器

## :books: 快速开始

```
npm i yarn tyarn -g
yarn add
yarn start
```

## :file_folder: 项目结构

|--config

​ |--config.ts 路由等配置

​ |--defaultSetting.ts 默认主题配置

​ |--proxy.ts 代理跨域配置

|--mock mock 数据

|--public html 公共资源

|--src

​ |--.umi 项目启动临时文件

​ |--assets 图片，icon 资源

​ |--components 公用组件文件夹

​ |--e2e 测试

​ |--layouts 公共网页结构

​ |--locales 多语言配置

​ |--models 公共 models

​ |--pages 页面

​ |--service 公共请求方法

​ |--utils 工具包

|--global.less 全局 css

|--global.tsx 全局 JS

## :bulb: 代码规范

- 组件命名首字母大写

- pages 页面首字母小写

- 变量

  使用 let 和 const，弃用 var

  ```
  // 驼峰命名
  let numberCount = 0;
  // 常量命名
  const PAGE_SIZE = 10;
  // 函数使用驼峰命名
  function getSize() { return PAGE_SIZE}
  ```

- 使用 import 引入

- 使用 promise, async/await 处理异步，避免回调

## :warning: git 提交规范

- 提交前先进行一次 pull 操作

  ```
  git pull origin branch --rebase
  ```

- 在本地分支修改后在合并至功能分支或主分支

- commit

  ```
  格式为：git commit -m <type>(<scope>): <subject>
  例如
  	git commit -m "fix(pages): test"
  	// scope可选
  	git commit -m "fix: test"
  ```

  type 类型

  - feat：新增功能
  - fix：bug 修复
  - docs：文档更新
  - style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
  - refactor：重构代码(既没有新增功能，也没有修复 bug)
  - perf：性能, 体验优化
  - test：新增测试用例或是更新现有测试
  - build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
  - ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交
  - chore：不属于以上类型的其他类，比如构建流程, 依赖管理
  - revert：回滚某个更早之前的提交
