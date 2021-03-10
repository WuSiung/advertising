import { AudienceModelDataType } from '@/pages/audience-manager/data'
import { Spin } from 'antd'
import React, { FC, useEffect } from 'react'
import { connect, Dispatch, history } from 'umi'
import { baseAudienceDataType, CrowdStateType } from '../../data'

import styles from './index.less'

interface PacksProps {
    title?: string,
    customCrowd: Array<AudienceModelDataType>,
    baseCrowd: Array<baseAudienceDataType>,
    dispatch: Dispatch,
    toCreateType?: () => void,
    kinds: 'all' | 'custom' | 'base',
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
    </div>
}


const Packs: FC<PacksProps> = (props) => {
    const { title, customCrowd, dispatch, loading, toCreateType, baseCrowd, kinds } = props
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
            if (crowd.audId == id) {
                if (crowd.active) {
                    crowd.active = false
                } else {
                    crowd.active = true
                }
            }
            return crowd
        })
        dispatch({
            type: 'crowds/saveCustomCrowd',
            payload: { customCrowd: newArr }
        })
    }
    return <>
        <div className={styles.navname}>{title}</div>
        <Spin spinning={loading}>
            <div className={styles.crowdPack}>
                <div className={styles.packs}>
                    <div className={styles.title}>最新人群包</div>
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
                {
                    kinds != 'base' && <div className={styles.packs}>
                        <div className={styles.title}>自定义人群包</div>
                        <div className={styles.packList}>
                            {
                                customCrowd.map(crowd => {
                                    return <Pack {...crowd} key={crowd.audId} onClick={choose}></Pack>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    kinds != 'custom' && <div className={styles.packs}>
                        <div className={styles.title}>官方人群包</div>
                        <div className={styles.packList}>
                            {
                                baseCrowd.map(crowd => {
                                    return <BasePack {...crowd} key={crowd.name} onClick={choose}></BasePack>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </Spin>
    </>
}

Packs.defaultProps = {
    title: '自定义'
}

export default connect(({ crowds, loading }: { crowds: CrowdStateType, loading: { effects: { [key: string]: boolean } } }) => ({
    customCrowd: crowds.customCrowd,
    baseCrowd: crowds.baseCrowd,
    loading: loading.effects['crowds/fetchCrowdsList'],
    title: crowds.title,
    kinds: crowds.kinds
}))(Packs)