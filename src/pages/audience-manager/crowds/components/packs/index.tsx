import { AudienceModelDataType } from '@/pages/audience-manager/data'
import { Spin } from 'antd'
import React, { FC, useEffect } from 'react'
import { connect, Dispatch, history } from 'umi'
import { baseAudienceDataType, CrowdStateType } from '../../data'
import { formatterPersonNum } from '@/utils/countTrans'

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
        <div style={{ textAlign: 'center' }}>{props.audName}</div>
        <div className={styles.popover}>
            {
                props.advAudLoveList.some(love => love.type == 0) && <div className={styles.exname} style={{color: 'green'}}>包含</div>
            }
            {

                props.advAudLoveList.map(love => {
                    return <div style={{ paddingLeft: 20 }} key={love.audLoveId}>{love.type == 0 && love.audName}</div>
                })
            }
            {
                props.advAudLoveList.some(love => love.type != 0) && <div className={styles.exname} style={{color: '#f05525'}}>排除</div>
            }
            {

                props.advAudLoveList.map(love => {
                    return <div style={{ paddingLeft: 20 }} key={love.audLoveId}>{love.type != 0 && love.audName}</div>
                })
            }
        </div>
        <div className={styles.count}>覆盖总人数： {formatterPersonNum(count)}</div>
    </div>
}

const BasePack: FC<basePackProps> = (props) => {
    return <div className={`${styles.item} ${props.active ? styles.active : ''}`} onClick={() => props.onClick(props.audienceBaseId)}>
        {props.name}
        <div className={styles.baseDesc}>{props.des}</div>
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
                        <div className={styles.desc}>此处展示的是在“创建人群包”界面进行编辑混合的人群包，进行分类显示。</div>
                    </div>
                }
                {
                    treeCheck.includes(4) && newset.length > 0 && <div className={styles.packs}>
                        <div className={styles.title}><span className={styles.text} style={{ background: '#02b2c9' }}>最新人群包</span></div>
                        <div className={styles.desc}>下面展示的是你在创建人群包界面最新保存的5个人群包。</div>
                        <div className={styles.packList}>
                            <div className={styles.item} onClick={toCreateCrowd} style={{ color: '#409eff', fontSize: 24 }}>
                                + <div className={styles.baseDesc} style={{marginTop: 20}}>点击前往创建新的人群包</div>
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
                        <div className={styles.title}><span className={styles.text} style={{ background: '#7655c9' }}>兴趣人群包</span></div>
                        <div className={styles.desc}>下面展示的是你在创建人群包界面最新编辑保存的只有兴趣类型的人群包。</div>
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
                        <div className={styles.title}><span className={styles.text} style={{ background: '#c481eb' }}>自定义人群包</span></div>
                        <div className={styles.desc}>下面展示的是你在创建人群包界面最新编辑保存的只有自定义人群类型的人群包</div>
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
                        <div className={styles.title}><span className={styles.text} style={{ background: '#1eb1f4' }}>混合人群包</span></div>
                        <div className={styles.desc}>下面展示的是你在创建人群包界面最新编辑保存的含有兴趣，自定义，相似人群的混合人群包。</div>
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
                        <div className={styles.title}><span className={styles.text} style={{ background: '#5586ef' }}>重新定位</span></div>
                        <div className={styles.desc}>下面展示的是你在创建人群包界面最新编辑保存的含有兴趣，自定义，相似人群的混合人群包。</div>
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
                        <div className={styles.title}><span className={styles.text} style={{ background: '#1890ff' }}>重新参与</span></div>
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
                        <div className={styles.title}><span className={styles.text} style={{ background: '#663399' }}>保留</span></div>
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