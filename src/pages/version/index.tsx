import { Card } from 'antd'
import React, { FC } from 'react'
var pjson = require('../../../package.json');

import styles from './index.less'

const Version = () => {
  const versionDetail: string[] = [
    '人群包列表滚动调整及样式修改',
    '广告创意接口再次变更',
    '公共素材库样式修改',
    '修复若干bug'
  ]
  const now: string[] = [
    '新增服务条款、隐私政策、cookie政策对应页面',
    '广告创意接口变更',
    '广告发布成功跳转广告创意',
    '修复若干bug'
  ]

  const v_1_1_36: string[] = [
    '仪表盘表格固定头2列不参与列切换',
    '广告与广告集复活页面对接服务端数据',
    '自动化策略主页，策略展开时，异步加载策略作用对象，并展示，操作按钮，鼠标悬停显示文字',
    '冲浪广告活动等级设置页面滑动输入条的联动功能',
    '修改冲浪广告集水平设置页面文字描述错误'
  ]

  const v_1_1_37: string[] = [
    '策略管理页面增加创建时间列',
    '完善所有策略的编辑功能',
    '广告管理新增ROI',
    '登录页样式版调整',
    'bug修复',
    '新增文件资源过大报错',
  ]

  const v_1_1_38: string[] = [
    '人群包列表修改',
    '修改登录页样式',
    '仪表盘增加roi列，消费金额和roi挪到前面显示',
    '策略管理主页，策略作用对象展开可查看执行记录',
  ]

  const v_1_1_39: string[] = [
    '修改仪表盘表格列切换混乱的问题',
    '修改时间选择变动后有时候不更新数据的问题',
    '自动化策略，广告、广告集数据筛选的问题',
    '文本素材数据显示位置',
    '颜色区分人群包',
    '创建广告过程中广告卡片过小导致的显示不全',
    '人数及基础包提示语位置',
    '文本素材数据显示位置',
    '时间位置及居中',
    '修改页面描述语',
    '新增预算展示及修改'
  ]

  const v_1_1_40: string[] = [
    '公共素材库无数据及视频素材播放',
    '人群包排除包含间隔',
    '修改预算，搜索关键词溢出省略号',
    '全局刷新加载缺省页去除ant design痕迹',
    '自动化策略接口统一错误处理',
    '自动化策略主页去掉作者列，增加策略ID',
    '已启动的或暂停的策略再执行自动或暂停，直接忽视',
    '修改止损广告集，数据筛选错误',
    '修改冲浪2个页面的文字描述，并增加相应的提示'
  ]

  const v_1_1_41: string[] = [
    '自动化策略主页增加策略状态标志，定期刷新以及手动刷新功能',
    '止损复活四个页面文字描述修改，和增加提示信息，以及增加卡片隐藏编辑功能',
    '已有广告新增视频播放，筛选实时刷新',
    '广告管理新增id',
    '广告管理修改图片大小',
  ]

  const v_1_1_42: string[] = [
    '修改止损广告层级页面编辑报错的问题',
    '修改自动化主页，操作按钮大小，和状态图标大小',
    '修改新建策略时的策略名称',
    '策略展开显示对象时增加fbId显示',
    '修改复活策略页面符号错误',
    '仪表盘自定义列',
    '上传文件指定后缀过滤文件',
    '系列命名规则修改',
    '新增未绑定账号弹窗(功能已有，样式待调整)'
  ]
  const v_1_1_43: string[] = [
    '修复公共素材库无标签bug',
    '工作台坐标紊乱及样式调整',
    '未绑定账号弹窗',
    '人群包弹出动画、广告创意日期超出页面',
    '修改复活策略页面符号错误',
    '修改复活策略页面符号错误',
    '修改复活策略页面符号错误',
    '修改复活策略页面符号错误',
    '修改复活策略页面符号错误',
    '自动化策略按创建时间倒序',
    '自动化策略主页，按时间搜索策略',
    '自动化策略启动暂停，删除断网时，客户端界面也显示操作成功的问题',
    '修改从编辑策略界面退回到策略选择界面，然后再点击其他策略时，页面混乱的问题',
    '修改复活止损四个策略的编辑页面的开关按钮，不能回显的问题'
  ]

  return <Card>
    <div className={styles.title}>最新版本{pjson.version}更新说明</div>
    <div className={styles.time}>2021-03-27 18:32</div>
    <div className={styles.detail}>
      <ol>
        {
          v_1_1_43.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.42更新说明</div>
    <div className={styles.time}>2021-03-26 21:06</div>
    <div className={styles.detail}>
      <ol>
        {
          v_1_1_42.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.41更新说明</div>
    <div className={styles.time}>2021-03-25 19:25</div>
    <div className={styles.detail}>
      <ol>
        {
          v_1_1_41.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.40更新说明</div>
    <div className={styles.time}>2021-03-24 21:15</div>
    <div className={styles.detail}>
      <ol>
        {
          v_1_1_40.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.39更新说明</div>
    <div className={styles.time}>2021-03-23 21:21</div>
    <div className={styles.detail}>
      <ol>
        {
          v_1_1_39.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.38更新说明</div>
    <div className={styles.time}>2021-03-22 21:30</div>
    <div className={styles.detail}>
      <ol>
        {
          v_1_1_38.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.37更新说明</div>
    <div className={styles.time}>2021-03-19 18:39</div>
    <div className={styles.detail}>
      <ol>
        {
          v_1_1_37.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.36更新说明</div>
    <div className={styles.time}>2021-03-19 09:16</div>
    <div className={styles.detail}>
      <ol>
        {
          v_1_1_36.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.35更新说明</div>
    <div className={styles.time}>2021-03-16 18:24</div>
    <div className={styles.detail}>
      <ol>
        {
          versionDetail.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
    <div className={styles.title}>1.1.34更新说明</div>
    <div className={styles.time}>2021-03-13 18:30</div>
    <div className={styles.detail}>
      <ol>
        {
          now.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ol>
    </div>
  </Card>
}

export default Version
