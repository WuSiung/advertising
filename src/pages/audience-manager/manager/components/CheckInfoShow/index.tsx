import { formatterPersonNum } from '@/utils/countTrans'
import { DeleteOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Input, message, Modal, Select, Spin } from 'antd'
import React, { FC, useState } from 'react'
import { Dispatch } from 'umi'
import { AudienceDataType, InterestDataType } from '../../data'
import { AudienceModelDataType } from '@/pages/audience-manager/data'
import { postDelCrowd, postSaveCrowd } from '../../service'

import styles from './index.less'

interface CheckInfoShowPropsType {
    excludeList: Array<InterestDataType & AudienceDataType>,
    includeList: Array<InterestDataType & AudienceDataType>,
    deleteIn(params: InterestDataType & AudienceDataType): void,
    deleteEx(params: InterestDataType & AudienceDataType): void,
    modelList: Array<AudienceModelDataType>,
    changeSelect: boolean,
    dispatch: Dispatch,
    onFinished?: () => void
}

const CheckInfoShow: FC<CheckInfoShowPropsType> = (props) => {
    const { excludeList, includeList, deleteIn, deleteEx, modelList, dispatch, changeSelect, onFinished } = props
    const [defaultValue, setDefaultValue] = useState<string | undefined>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [delModal, setDelModal] = useState<boolean>(false)
    const [delId, setDelId] = useState<number>(-1)
    const [delLoading, setDelLoading] = useState<boolean>(false)
    const [saveLoading, setSaveLoading] = useState<boolean>(false)
    const [crowdName, setCrowdName] = useState<string>('')
    let allCount = 0;
    excludeList.map(item => {
        allCount += Number(item.count) || Number(item.approximateCount) || 0
    })
    includeList.map(item => {
        allCount += Number(item.count) || Number(item.approximateCount) || 0
    })
    const changeModel = (e: number | string) => {
        dispatch({
            type: 'audienceManager/fetchAudienceModelDetail',
            payload: { id: e }
        })
        setDefaultValue('')
    }
    const clearAll = () => {
        dispatch({ type: 'audienceManager/clearList' })
    }
    const saveCrowd = () => {
        if (crowdName == '') {
            message.error('请输入人群包名称')
        } else if (excludeList.length == 0 && includeList.length == 0) {
            message.error('请选择兴趣或人群后再创建')
        } else {
            let newArr = includeList.concat(excludeList);
            let postArr: any = [];
            let hasInterest = false; // 是否含有兴趣包
            let hasAudiences = false; // 是否含有受众包
            newArr.map(item => {
                if (item.checked) {
                    if (item.loveId) {
                        hasInterest = true
                        postArr.push({ type: '0', loveId: item.loveId, stype: 0 })
                    } else {
                        hasAudiences = true
                        postArr.push({ type: '0', loveId: item.audienceId, stype: 1 })
                    }
                } else if (item.checked == false) {
                    if (item.loveId) {
                        hasInterest = true
                        postArr.push({ type: '1', loveId: item.loveId, stype: 0 })
                    } else {
                        hasAudiences = true
                        postArr.push({ type: '1', loveId: item.audienceId, stype: 1 })
                    }
                }
            })

            let allType: number = -1; // 0混合包，1兴趣包，2受众包

            if (hasInterest && hasAudiences) {
                allType = 0
            } else if (hasInterest) {
                allType = 1
            } else if (hasAudiences) {
                allType = 2
            }
            setSaveLoading(true)
            postSaveCrowd({ loves: JSON.stringify(postArr), audName: crowdName, stype: allType }).then(res => {
                if (onFinished) {
                    onFinished()
                } else {
                    setShowModal(false)
                    setSaveLoading(false)
                    dispatch({
                        type: 'audienceManager/fetchAudienceModelList',
                        payload: { size: 1000 }
                    })
                }
            })
        }
    }
    const deleteCrowdModel = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, model: AudienceModelDataType) => {
        e.stopPropagation();
        setDelModal(true)
        setDelId(model.audId)
    }

    const deleteCrowd = () => {
        setDelLoading(true)
        postDelCrowd({ id: delId }).then(res => {
            setDelLoading(false)
            setDelModal(false)
            dispatch({
                type: 'audienceManager/fetchAudienceModelList',
                payload: { size: 1000 }
            })
        })
    }
    return <div className={styles.infos}>
        <div className={styles.topBtns}>
            <div className={styles.left}>
                <Button type='primary' style={{ marginRight: 10 }} onClick={clearAll}>清空选项</Button>
                <Button type='primary' style={{ marginRight: 10 }} onClick={() => setShowModal(true)}>保存人群包</Button>
                <span>已选择的人群覆盖总人数：{formatterPersonNum(allCount)}</span>
            </div>
            <div className={styles.right}>
                <Spin spinning={!!changeSelect} style={{ display: 'inline-block' }}>
                    <Select style={{ marginRight: 10, minWidth: 200 }} placeholder='读取已有人群包数据' onChange={changeModel} value={defaultValue}>
                        {
                            modelList.map(model => {
                                return <Select.Option value={model.audId} key={model.audId}>
                                    <div className={styles.selectItem}>
                                        {model.audName}
                                        <DeleteOutlined onClick={e => deleteCrowdModel(e, model)} />
                                    </div>
                                </Select.Option>

                            })
                        }
                    </Select>
                </Spin>
                <Button type='primary' disabled>创建广告</Button>
            </div>
        </div>
        <div className={styles.chooseList}>
            <div className={styles.includeList}>
                <div className={styles.title}>包含人群</div>
                <div className={styles.listContent}>
                    {
                        includeList.map(item => {
                            return <div key={item.loveId || item.audienceId} className={styles.line}>
                                <div className={styles.name}>{item.audienceName || item.loveName}</div>
                                <span className={styles.num}>{formatterPersonNum(Number(item.approximateCount || item.count)) || 0}</span>
                                <DeleteOutlined className={styles.delete} onClick={() => deleteIn(item)} />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={styles.and}><ShareAltOutlined /></div>
            <div className={styles.excludeList} style={{ marginLeft: 20 }}>
                <div className={styles.title}>排除人群</div>
                <div className={styles.listContent}>
                    {
                        excludeList.map(item => {
                            return <div key={item.loveId || item.audienceId} className={styles.line}>
                                <div className={styles.name}>{item.audienceName || item.loveName}</div>
                                <span className={styles.num}>{formatterPersonNum(Number(item.approximateCount || item.count)) || 0}</span>
                                <DeleteOutlined className={styles.delete} onClick={() => deleteEx(item)} />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
        <Modal title="保存人群包" visible={showModal} onOk={saveCrowd} onCancel={() => setShowModal(false)} footer={[
            <Button key="back" onClick={() => setShowModal(false)}>取消</Button>,
            <Button key="submit" type="primary" loading={saveLoading} onClick={saveCrowd}>确认</Button>,
        ]}>
            <Input placeholder='请输入人群包名称' value={crowdName} onChange={e => setCrowdName(e.target.value)}></Input>
        </Modal>
        <Modal title="提示" visible={delModal} onOk={deleteCrowd} onCancel={() => setDelModal(false)} footer={[
            <Button key="back" onClick={() => setDelModal(false)}>取消</Button>,
            <Button key="submit" type="primary" loading={delLoading} onClick={deleteCrowd}>确认</Button>,
        ]}>
            是否确认删除人群包?
        </Modal>
    </div>
}

export default CheckInfoShow