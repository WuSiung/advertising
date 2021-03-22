import { AudienceModelDataType } from '@/pages/audience-manager/data'
import { Spin } from 'antd'
import React, { FC, useEffect } from 'react'
import { connect, Dispatch, history } from 'umi'
import { baseAudienceDataType, CrowdStateType } from '../../data'

import styles from './index.less'

interface PacksProps {
    customCrowd: Array<AudienceModelDataType>,
    baseCrowd: Array<baseAudienceDataType>,
    dispatch: Dispatch,
    toCreateType?: () => void,
    treeCheck: number[],
    loading: boolean
}

type OnePackProps = {
    onClick(id: number): void,
} & AudienceModelDataType

type basePackProps = {
    onClick(id: number): void,
} & baseAudienceDataType

const Pack: FC<OnePackProps> = (props) => {
    let count: number = 0;
    props.advAudLoveList.map(love => {
        count += Number(love.audCount)
    })
    return <div className={`${styles.item} ${props.active ? styles.active : ''}`} onClick={() => props.onClick(props.audId)}>
        {props.audName}
        <div className={styles.popover}>
            {

                props.advAudLoveList.map(love => {
                    return <div key={love.audLoveId}>{love.type == 0 ? '包含' : '排除'}：{love.audName}</div>
                })
            }
            <div>覆盖总人数： {count}</div>
        </div>
    </div>
}

const BasePack: FC<basePackProps> = (props) => {
    return <div className={`${styles.item} ${props.active ? styles.active : ''}`} onClick={() => props.onClick(props.audienceBaseId)}>
        {props.name}
        <div className={`${styles.popover} ${styles.base}`}>
            {props.des}
        </div>
    </div>
}


const Packs: FC<PacksProps> = (props) => {
    const { customCrowd, dispatch, loading, toCreateType, baseCrowd, treeCheck } = props
    const newset = customCrowd.slice(0, 5)

    const toCreateCrowd = () => {
        if (toCreateType) {
            toCreateType()
        } else {
            history.push('/audience/manager')
        }
    }

    const choose = (id: number) => {
        const newArr = customCrowd.map(crowd => {
            let cloneObj: AudienceModelDataType = JSON.parse(JSON.stringify(crowd))
            if (cloneObj.audId == id) {
                if (cloneObj.active) {
                    cloneObj.active = false
                } else {
                    cloneObj.active = true
                }
            }
            return cloneObj
        })
        dispatch({
            type: 'crowds/saveBaseCrowd',
            payload: { customCrowd: newArr }
        })
    }
    const chooseBase = (id: number) => {
        const newArr = baseCrowd.map(crowd => {
            let cloneObj = JSON.parse(JSON.stringify(crowd))
            if (cloneObj.audienceBaseId == id) {
                if (cloneObj.active) {
                    cloneObj.active = false
                } else {
                    cloneObj.active = true
                }
            }
            return cloneObj
        })
        dispatch({
            type: 'crowds/saveCustomCrowd',
            payload: { baseCrowd: newArr }
        })
    }
    return <>
        {/* <div className={styles.navname}>全部</div> */}
        <Spin spinning={loading}>
            <div className={styles.crowdPack}>
                {
                    customCrowd.length > 0 && <div className={styles.navname}>自定义
                        <div className={styles.desc}>此处展示的是在“人群包管理”界面进行编辑混合的人群包，进行分类显示。</div>
                    </div>
                }
                {
                    treeCheck.includes(4) && newset.length > 0 && <div className={styles.packs}>
                        <div className={styles.title}><span className={styles.text}>最新人群包</span></div>
                        <div className={styles.desc}>下面展示的是你在人群包管理界面最新保存的5个人群包。</div>
                        <div className={styles.packList}>
                            <div className={styles.item} onClick={toCreateCrowd} style={{ color: '#409eff', fontSize: 24 }}>
                                +
                         <div className={styles.popover} style={{ textAlign: 'center', fontSize: 16 }}>
                                    点击前往创建新的人群包
                         </div>
                            </div>
                            {
                                newset.map((crowd, index) => {
                                    return <Pack {...crowd} key={crowd.audId} onClick={() => choose(crowd.audId)}></Pack>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    treeCheck.includes(5) && customCrowd.some(crowd => crowd.stype == '1') && customCrowd.length > 0 && <div className={styles.packs}>
                        <div className={styles.title}><span className={styles.text}>兴趣人群包</span></div>
                        <div className={styles.desc}>下面展示的是你在人群包管理界面最新编辑保存的只有兴趣类型的人群包。</div>
                        <div className={styles.packList}>
                            {
                                customCrowd.map(crowd => {
                                    return crowd.stype == '1' && <Pack {...crowd} key={crowd.audId} onClick={choose}></Pack>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    treeCheck.includes(6) && customCrowd.some(crowd => crowd.stype == '2') && customCrowd.length > 0 && <div className={styles.packs}>
                        <div className={styles.title}><span className={styles.text}>自定义人群包</span></div>
                        <div className={styles.desc}>下面展示的是你在人群包管理界面最新编辑保存的只有自定义人群类型的人群包</div>
                        <div className={styles.packList}>
                            {
                                customCrowd.map(crowd => {
                                    return crowd.stype == '2' && <Pack {...crowd} key={crowd.audId} onClick={choose}></Pack>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    treeCheck.includes(7) && customCrowd.some(crowd => crowd.stype == '0') && customCrowd.length > 0 && <div className={styles.packs}>
                        <div className={styles.title}><span className={styles.text}>混合人群包</span></div>
                        <div className={styles.desc}>下面展示的是你在人群包管理界面最新编辑保存的含有兴趣，自定义，相似人群的混合人群包。</div>
                        <div className={styles.packList}>
                            {
                                customCrowd.map(crowd => {
                                    return crowd.stype == '0' && <Pack {...crowd} key={crowd.audId} onClick={choose}></Pack>
                                })
                            }
                        </div>
                    </div>
                }

                {
                    baseCrowd.length > 0 && <div className={styles.navname}>官方库
                        <div className={styles.desc}>此处展示的是平台官方编辑规则的“自定义人群包”和“相似人群包”模板。</div>
                    </div>
                }
                {
                    treeCheck.includes(15) && baseCrowd.some(crowd => crowd.type == '2') && baseCrowd.length > 0 && <div className={styles.packs}>
                        <div className={styles.title}><span className={styles.text}>重新定位</span></div>
                        <div className={styles.desc}>下面展示的是你在人群包管理界面最新编辑保存的含有兴趣，自定义，相似人群的混合人群包。</div>
                        <div className={styles.packList}>
                            {
                                baseCrowd.map(crowd => {
                                    return crowd.type == '2' && <BasePack {...crowd} key={crowd.name} onClick={chooseBase}></BasePack>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    treeCheck.includes(16) && baseCrowd.some(crowd => crowd.type == '1') && baseCrowd.length > 0 && <div className={styles.packs}>
                        <div className={styles.title}><span className={styles.text}>重新参与</span></div>
                        <div className={styles.desc}>这些受众群体是与你的产品有过接触的用户，看过广告视频或与主页有过互动。</div>
                        <div className={styles.packList}>
                            {
                                baseCrowd.map(crowd => {
                                    return crowd.type == '1' && <BasePack {...crowd} key={crowd.name} onClick={chooseBase}></BasePack>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    treeCheck.includes(17) && baseCrowd.some(crowd => crowd.type == '3') && baseCrowd.length > 0 && <div className={styles.packs}>
                        <div className={styles.title}><span className={styles.text}>保留</span></div>
                        <div className={styles.packList}>
                            {
                                baseCrowd.map(crowd => {
                                    return crowd.type == '3' && <BasePack {...crowd} key={crowd.name} onClick={chooseBase}></BasePack>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </Spin>
    </>
}

export default connect(({ crowds, loading }: { crowds: CrowdStateType, loading: { effects: { [key: string]: boolean } } }) => ({
    customCrowd: crowds.customCrowd,
    baseCrowd: crowds.baseCrowd,
    loading: loading.effects['crowds/fetchCrowdsList'],
    treeCheck: crowds.treeCheck
}))(Packs)