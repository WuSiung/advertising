import { Card, Button, Empty, Modal, message, Select, InputNumber, Popover, Checkbox, Row, Col, Space } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import DateRange from '../components/DateRange';
import moment from 'moment';
import { AdvPreview } from "../components/AdvPreview";
import { allCountry } from '@/utils/countrys'

import styles from './index.less'
import { connect, AppInfo, history } from "umi";
import { AdvedDataType, AdvModelStateType } from "./data";
import { Dispatch, UserModelState } from "@@/plugin-dva/connect";
import PreviewContainer from '../components/PreviewContainer';
import { PreviewAdvType, WorkbenchDataType } from '../workbench/data';
import { CheckCircleOutlined } from '@ant-design/icons';

interface AdvPropsType {
    advertisingList: AdvedDataType[],
    loadingAdvList: boolean,
    dispatch: Dispatch,
    appInfo: AppInfo | undefined,
    loadingAdvListAddMore: boolean,
    previews: PreviewAdvType[],
    count: number
}

let hideLoading: () => void;
const success = () => {
    return message.loading('加载广告列表中...', 0);
};

let hideLoadingMore: () => void;


type CheckboxValueType = string | number | boolean;

type SelectValueType = string | number;

const Advertising: FC<AdvPropsType> = (props) => {
    const { dispatch, advertisingList, appInfo, loadingAdvList, count, loadingAdvListAddMore, previews } = props;
    const [pageIndex, setPageIndex] = useState<number>(2);
    const [date, setDate] = useState<[string, string]>([moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]);
    const [cost, setCost] = useState<number>(0)
    const [age, setAge] = useState<CheckboxValueType[] | undefined>();
    const [sex, setSex] = useState<CheckboxValueType[] | undefined>();
    const [device, setDevice] = useState<CheckboxValueType[] | undefined>();
    const [publishLocation, setPublishLocation] = useState<CheckboxValueType[] | undefined>();
    const [orderType, setOrderType] = useState('')
    const [searchTime, setSearchTime] = useState(0)
    const [country, setCountry] = useState<SelectValueType[] | undefined>();
    const [activeAdv, setActiveAdv] = useState<PreviewAdvType & { showPreviewModal: boolean }>();
    const [PreiviewVisible, setPreviewVisible] = useState<boolean>(false)

    useEffect(() => {
        dispatch({
            type: 'advertising/fetchAdvList',
            payload: {
                start: date[0],
                end: date[1],
                cost,
                order: orderType,
                current: 1
            }
        });
    }, [searchTime])
    useEffect(() => {
        if (loadingAdvList) {
            hideLoading = success();
        } else {
            hideLoading && hideLoading();
        }
    }, [loadingAdvList]);
    useEffect(() => {
        if (loadingAdvListAddMore) {
            hideLoadingMore = success();
        } else {
            hideLoadingMore && hideLoadingMore();
        }
    }, [loadingAdvListAddMore])

    const createAdv = (i: number) => {
        let editList: AdvedDataType[] = JSON.parse(JSON.stringify(advertisingList));
        editList[i].checked = !editList[i].checked;
        if (editList[i].checked) {
            if (!editList[i].advImg.url) {
                message.warning('素材缺失，无法添加创建广告')
                return
            }
            const createParams: PreviewAdvType = {
                imgId: editList[i].advImg.imgId as number,
                content: editList[i].advText.content,
                title: editList[i].advText.title,
                textId: editList[i].advText.textId,
                type: editList[i].advImg.type,
                url: editList[i].advImg.url,
                kinds: 1
            }
            previews.push(createParams)
            dispatch({
                type: 'workbench/savePreviewAdvs',
                payload: { previewAdvs: previews }
            })
        } else {
            let emptyArr: PreviewAdvType[] = []
            previews.map(adv => {
                if (adv.imgId != editList[i].advImg.imgId || adv.textId != editList[i].advText.textId) {
                    emptyArr.push(adv)
                }
            })
            dispatch({
                type: 'workbench/savePreviewAdvs',
                payload: { previewAdvs: emptyArr }
            })
        }
        dispatch({
            type: 'advertising/saveAdvLis',
            payload: { advertisingList: editList }
        })
    }


    const toCompaign = () => {
        if (previews.length <= 0) {
            message.error('请选择广告')
        } else {
            history.push('/advlauncher/compaign')
        }
    }

    const changeDate = (value: [string, string]) => {
        setDate(value);
        setPageIndex(2);
        dispatch({
            type: 'advertising/fetchAdvList',
            payload: {
                start: value[0],
                end: value[1],
            }
        });
    }

    return (
        <Card>
            {activeAdv ? <Modal
                className={styles.previewModdal}
                visible={!!activeAdv?.showPreviewModal}
                onCancel={() => setActiveAdv({ ...activeAdv, showPreviewModal: false })}
                footer={null}
            >
                <AdvPreview appInfo={appInfo} classNames={styles.bigPreviews} {...activeAdv} />
            </Modal> : <></>}
            <div className={styles.filter}>
                <Row>
                    <Col xxl={12} span={24}>
                        <div style={{ minWidth: "525px", marginBottom: "10px" }}>
                            排序 :&nbsp;
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择排序字段"
                                optionFilterProp="children"
                                filterOption={(input: string, option) =>
                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={e => setOrderType(e as string)}
                            >
                                <Select.Option value="mobileAppPurchaseRoas">广告回报率</Select.Option>
                                <Select.Option value="octr">点击率</Select.Option>
                                <Select.Option value="frequency">频率</Select.Option>
                                <Select.Option value="impressions">展示数</Select.Option>
                                <Select.Option value="cpc">每次点击费用</Select.Option>
                                <Select.Option value="cpm">费用/千次</Select.Option>
                                <Select.Option value="installs">安装次数</Select.Option>
                                <Select.Option value="cpa">每次安装费用</Select.Option>
                            </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;最小花费 :&nbsp;
                            <Space><InputNumber defaultValue={cost} type='number' min={0} onChange={e => setCost(e as number)} />
                                <Button type="primary" onClick={() => { setPageIndex(2); setSearchTime(searchTime + 1) }}>确定</Button>
                            </Space>
                            <Button style={{ marginLeft: 10 }} type='primary' onClick={toCompaign}>创建广告</Button>
                        </div>
                    </Col>
                    <Col xxl={12} span={24}>
                        <div style={{ minWidth: "830px", marginBottom: "10px", textAlign: 'right' }}>
                            <Popover placement="bottomRight" title="筛选器" content={<div style={{ width: "500px" }}>
                                <Row>
                                    <Col span={6}>
                                        <div style={{ paddingLeft: "2px" }}>年龄:</div>
                                        <Checkbox.Group
                                            value={age}
                                            onChange={(value) => {
                                                setAge(value);
                                            }}
                                            style={{ width: '100%' }}
                                            options={
                                                [
                                                    { value: "age2", label: "18-24岁" },
                                                    { value: "age3", label: "25-34岁" },
                                                    { value: "age4", label: "35-44岁" },
                                                    { value: "age5", label: "45-54岁" },
                                                    { value: "age6", label: "55-64岁" },
                                                    { value: "age7", label: "65岁以上" }
                                                ]
                                            }
                                        >
                                        </Checkbox.Group>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ paddingLeft: "2px" }}>姓别:</div>
                                        <Checkbox.Group
                                            value={sex}
                                            style={{ width: '100%' }}
                                            onChange={(value) => {
                                                setSex(value);
                                            }}
                                            options={
                                                [
                                                    { value: "male", label: "男" },
                                                    { value: "female", label: "女" },
                                                    { value: "unkown", label: "未分类" },
                                                ]
                                            }
                                        >
                                        </Checkbox.Group>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ paddingLeft: "2px" }}>设备:</div>
                                        <Checkbox.Group
                                            value={device}
                                            onChange={(value) => {
                                                setDevice(value);
                                            }}
                                            style={{ width: '100%' }}
                                            options={
                                                [
                                                    { value: "pc", label: "桌面" },
                                                    { value: "mobile", label: "移动" }
                                                ]
                                            }
                                        >
                                        </Checkbox.Group>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ paddingLeft: "2px" }}>刊登位置:</div>
                                        <Checkbox.Group
                                            value={publishLocation}
                                            onChange={(value) => {
                                                setPublishLocation(value);
                                            }}
                                            style={{ width: '100%' }}
                                            options={
                                                [
                                                    { value: "facebook", label: "脸书" },
                                                    { value: "instagram", label: "移动" },
                                                    { value: "messenger", label: "信使" },
                                                    { value: "audnetwork", label: "观众网络" }
                                                ]
                                            }
                                        >
                                        </Checkbox.Group>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "20px" }}>
                                    <Col span={24}>
                                        <Select mode="tags" style={{ display: 'block' }} placeholder='选择国家' onChange={(value) => {
                                            setCountry(value);
                                        }} value={country} showSearch>
                                            {
                                                allCountry.map(country => {
                                                    return <Select.Option key={country.code}
                                                        value={country.value}>{country.value}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "20px" }}>
                                    <Col span={24}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Button onClick={() => {
                                                setAge(undefined);
                                                setSex(undefined);
                                                setDevice(undefined);
                                                setCountry(undefined);
                                                setPublishLocation(undefined);
                                            }}>清除筛选</Button>
                                            <Button type="primary">套用筛选器</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>} trigger="click">
                                <Button type="link">筛选器</Button>
                            </Popover>
                            <span className={styles.date}><DateRange onChange={changeDate} defaultValue={[moment(new Date()).subtract(1, 'months'), moment()]} /></span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.advContainer}>
                <div className={styles.advWarp} >
                    {
                        advertisingList.length > 0 ? advertisingList.map((advertings, i) => {
                            // const imgtext = advertings.imgTextList[0] ? advertings.imgTextList[0] : null;
                            const { dataVO, advImg, advText } = advertings
                            const params = {
                                title: advText.title,
                                content: advText.content,
                                textId: advText.textId,
                                imgId: advImg.imgId,
                                type: advImg.type,
                                url: advImg.url
                            }
                            return (<div key={advImg.imgId + '&' + advText.textId} style={{ border: "1px solid #d9d9d9" }}
                                className={`${styles.advPreviewWrap} ${advertings.checked ? styles.active : ''}`} onClick={() => createAdv(i)}>
                                {
                                    advertings.checked && <span className={styles.finished}><CheckCircleOutlined /></span>
                                }
                                <AdvPreview appInfo={appInfo} classNames={styles.advPreview} {...params} />

                                <div className={styles.mask}>
                                    <div className={styles.top}>
                                        消费金额 : {dataVO.spend || 0} 点击率 ：{dataVO.octr || 0} <br /> 广告支出回报率
                                        : {dataVO.roas || 0}
                                    </div>
                                    <div className={styles.bottom} onClick={e => {
                                        e.stopPropagation()
                                        setActiveAdv({ ...params, showPreviewModal: true });
                                    }}>
                                        预览广告
                                    </div>
                                </div>
                            </div>)
                        }) : <div
                            style={{ width: "100%", padding: "50px 0px", display: "flex", justifyContent: "center" }}>
                                <Empty
                                    description={
                                        <span>
                                            暂无数据
                                </span>
                                    }
                                /></div>
                    }
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>
                    <div style={{ height: "1px", width: "254px", margin: "0 7px" }}></div>

                </div>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                {
                    advertisingList.length < count ? <Button loading={loadingAdvListAddMore} onClick={() => {
                        console.log(date)
                        dispatch({
                            type: 'advertising/fetchAdvListAddMore',
                            payload: {
                                start: date ? date[0] : "",
                                end: date ? date[1] : "",
                                current: pageIndex
                            }
                        });
                        setPageIndex(pageIndex + 1);
                    }}>加载更多</Button> : <></>
                }
            </div>
            <PreviewContainer visible={PreiviewVisible} handleVisible={setPreviewVisible}></PreviewContainer>
        </Card>
    )
}

export default connect(({
    advertising,
    loading,
    workbench,
    user
}: { user: UserModelState, workbench: WorkbenchDataType, advertising: AdvModelStateType, loading: { effects: { [key: string]: boolean } } }) => ({
    advertising,
    advertisingList: advertising.advertisingList,
    appInfo: user.appInfo,
    previews: workbench.previewAdvs,
    count: advertising.count,
    loadingAdvList: loading.effects['advertising/fetchAdvList'],
    loadingAdvListAddMore: loading.effects['advertising/fetchAdvListAddMore']
}))(Advertising)