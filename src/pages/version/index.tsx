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
        '登陆页底部样式',
        '广告管理新增预算展示及修改',
        '人群包列表人数及提示位置调整',
        '替换新的页面描述',
        '工作台文本素材数据显示位置',
        '创建广告过程中的预览卡片显示不全',
        '仪表盘时间筛选置顶及策略标签居中',
    ]

    return <Card>
        <div className={styles.title}>最新版本{pjson.version}更新说明</div>
        <div className={styles.time}>2021-03-23 21:03</div>
        <div className={styles.detail}>
            <ol>
                {
                    v_1_1_39.map(item => {
                        return <li key={item}>{item}</li>
                    })
                }
            </ol>
        </div>
        <div className={styles.title}>v.1.1.38更新说明</div>
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
