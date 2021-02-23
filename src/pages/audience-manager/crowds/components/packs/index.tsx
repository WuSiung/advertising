import { AudienceModelDataType } from '@/pages/audience-manager/data'
import { Spin } from 'antd'
import React, { FC, useEffect } from 'react'
import { connect, Dispatch, history } from 'umi'
import { CrowdStateType } from '../../data'

import styles from './index.less'

interface PacksProps {
    title?: string,
    crowdList: Array<AudienceModelDataType>,
    dispatch: Dispatch,
    loading: boolean
}

type OnePackProps = {
    onClick(id: number): void,
} & AudienceModelDataType

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
                    return <div key={love.audLoveId}>包含：{love.audName}</div>
                })
            }
            <div>覆盖总人数： {count}</div>
        </div>
    </div>
}

const Packs: FC<PacksProps> = (props) => {
    const { title, crowdList, dispatch, loading } = props
    useEffect(() => {
        dispatch({
            type: 'crowds/fetchCrowdsList',
            payload: { size: 1000 }
        })
    }, [])
    const newset = crowdList.slice(0, 5)

    const toCreateCrowd = () => {
        history.push('/audience/manager')
    }

    const choose = (id: number) => {
        const newArr = crowdList.map(crowd => {
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
            type: 'crowds/saveCrowdsList',
            payload: { crowdsList: newArr }
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
                         <div className={styles.popover}>
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
                <div className={styles.packs}>
                    <div className={styles.title}>人群包</div>
                    <div className={styles.packList}>
                        {
                            crowdList.map(crowd => {
                                return <Pack {...crowd} key={crowd.audId} onClick={choose}></Pack>
                            })
                        }
                    </div>
                </div>
            </div>
        </Spin>
    </>
}

Packs.defaultProps = {
    title: '自定义'
}

export default connect(({ crowds, loading }: { crowds: CrowdStateType, loading: { effects: { [key: string]: boolean } } }) => ({
    crowdList: crowds.crowdsList,
    loading: loading.effects['crowds/fetchCrowdsList']
}))(Packs)