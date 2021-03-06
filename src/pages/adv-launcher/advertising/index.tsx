import { Card, Button, Empty, Modal, Image, message, Select, InputNumber, Popover, Checkbox, Row, Col, Space } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import DateRange from '../components/DateRange';
import { AdvPreview } from "../components/AdvPreview";
import { allCountry } from '@/utils/countrys'

import styles from './index.less'
import { connect, AppInfo, history } from "umi";
import { AdvModelStateType } from "./data";
import { AdvAdvListType } from "@/pages/adv-manager/data";
import { Dispatch, UserModelState } from "@@/plugin-dva/connect";
import PreviewContainer from '../components/PreviewContainer';
import { PreviewAdvType, WorkbenchDataType } from '../workbench/data';

interface AdvPropsType {
    advertisingList: AdvAdvListType[],
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

const pageSize: number = 20;
const Advertising: FC<AdvPropsType> = (props) => {
    const { dispatch, advertisingList, appInfo, loadingAdvList, count, loadingAdvListAddMore, previews } = props;
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [date, setDate] = useState<[string, string]>();
    const [dateT, setDateT] = useState<[string, string]>();
    const [age, setAge] = useState<CheckboxValueType[] | undefined>();
    const [sex, setSex] = useState<CheckboxValueType[] | undefined>();
    const [device, setDevice] = useState<CheckboxValueType[] | undefined>();
    const [publishLocation, setPublishLocation] = useState<CheckboxValueType[] | undefined>();
    const [country, setCountry] = useState<SelectValueType[] | undefined>();
    const [activeAdv, setActiveAdv] = useState<AdvAdvListType & { showPreviewModal: boolean }>();
    const actImgtext = activeAdv?.imgTextList[0] ? activeAdv?.imgTextList[0] : null;
    const [PreiviewVisible, setPreviewVisible] = useState<boolean>(false)

    useEffect(() => {
        dispatch({
            type: 'advertising/fetchAdvList',
            payload: {
                current: 1,
                size: pageSize
            }
        });
    }, [])
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
        let editList: AdvAdvListType[] = JSON.parse(JSON.stringify(advertisingList));
        editList[i].checked = !editList[i].checked;
        if (editList[i].checked) {
            if (!editList[i].imgTextList[0]) {
                message.warning('素材缺失，无法添加创建广告')
                return
            }
            const createParams: PreviewAdvType = {
                imgId: editList[i].imgTextList[0].advImg.imgId as number,
                content: editList[i].imgTextList[0].advText.content,
                title: editList[i].imgTextList[0].advText.title,
                textId: editList[i].imgTextList[0].advText.textId,
                type: editList[i].imgTextList[0].advImg.type,
                url: editList[i].imgTextList[0].advImg.url,
                advId: editList[i].advId
            }
            previews.push(createParams)
            dispatch({
                type: 'workbench/savePreviewAdvs',
                payload: { previewAdvs: previews }
            })
        } else {
            let emptyArr: PreviewAdvType[] = []
            previews.map(adv => {
                if (adv.advId != editList[i].advId) {
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

    return (
        <Card>
            {activeAdv ? <Modal
                width={402}
                visible={!!activeAdv?.showPreviewModal}
                onOk={() => {
                    setActiveAdv(adv => {
                        if (adv)
                            return { ...adv, showPreviewModal: false };
                        else
                            return;
                    })
                }}
                onCancel={() => {
                    setActiveAdv(adv => {
                        if (adv)
                            return { ...adv, showPreviewModal: false };
                        else
                            return;
                    })
                }}
                okText="确认"
            >
                <div className={`${styles.previewAdv}`}>
                    <div className={styles.header}>
                        <Image src={appInfo?.logo} preview={false} width={28} />
                        <div className={styles.info}>
                            <span className={styles.appName}>{appInfo?.appName}</span>
                        </div>
                    </div>
                    {actImgtext ? <div className={styles.content}>
                        <div className={styles.contentText}>
                            {actImgtext?.advText.content}
                        </div>
                        <div className={styles.media}>
                            {
                                actImgtext?.advImg.type == 0 ? <Image src={actImgtext?.advImg.url} preview={false} /> :
                                    <video src={actImgtext.advImg.url}></video>
                            }
                        </div>
                    </div> : <></>}
                    {actImgtext ? <div className={styles.footer}>
                        <span className={styles.title}>{actImgtext?.advText.title}</span>
                        <Button className={styles.download}>下载</Button>
                    </div> : <></>}
                </div>
            </Modal> : <></>}
            <div className={styles.filter}>
                <Row>
                    <Col xxl={12} span={24}>
                        <div style={{ minWidth: "525px", marginBottom: "10px" }}>
                            评分排序 :&nbsp;
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择排序字段"
                                optionFilterProp="children"
                                filterOption={(input: string, option) =>
                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Select.Option value="approas">广告回报率</Select.Option>
                                <Select.Option value="ctr">点击率</Select.Option>
                                <Select.Option value="frequency">频率</Select.Option>
                                <Select.Option value="impression">展示数</Select.Option>
                                <Select.Option value="cpc">每次点击费用</Select.Option>
                                <Select.Option value="cpm">费用/千次</Select.Option>
                                <Select.Option value="installs">安装次数</Select.Option>
                                <Select.Option value="installfee">每次安装费用</Select.Option>
                            </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;最小花费 :&nbsp;
                            <Space><InputNumber defaultValue={0} /><Button type="primary">确定</Button></Space>
                            <Button style={{marginLeft: 10}} type='primary' onClick={toCompaign}>创建广告</Button>
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
                            <span className={styles.date}>发布范围筛选： <DateRange onChange={(dateStr) => {
                                setDate(dateStr);
                                setPageIndex(1);
                                dispatch({
                                    type: 'advertising/fetchAdvList',
                                    payload: {
                                        current: 1,
                                        start: dateStr[0],
                                        end: dateStr[1],
                                        size: pageSize
                                    }
                                });
                            }} /></span>
                            <span className={styles.date}>统计数据过滤： <DateRange onChange={(dateStr) => {
                                setDateT(dateStr);
                                setPageIndex(1);
                                dispatch({
                                    type: 'advertising/fetchAdvList',
                                    payload: {
                                        current: 1,
                                        startT: dateStr[0],
                                        endT: dateStr[1],
                                        size: pageSize
                                    }
                                });
                            }} /></span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.advContainer}>
                <div className={styles.advWarp} >
                    {
                        advertisingList.length > 0 ? advertisingList.map((advertings, i) => {
                            const imgtext = advertings.imgTextList[0] ? advertings.imgTextList[0] : null;
                            return (<div key={advertings.advId} style={{ border: "1px solid #d9d9d9" }}
                                className={`${styles.advPreviewWrap} ${advertings.checked ? styles.active : ''}`} onClick={() => createAdv(i)}>

                                <AdvPreview appInfo={appInfo} classNames={styles.advPreview} url={imgtext?.advImg.url}
                                    content={imgtext?.advText.content}
                                    title={imgtext?.advText.title} type={imgtext?.advImg.type}
                                    imgId={imgtext?.advImg.imgId} textId={imgtext?.advText.textId} />
                                <div className={styles.mask}>
                                    <div className={styles.top}>
                                        消费金额 : {advertings.spent} 点击率 ：{advertings.ctr} <br /> 广告支出回报率
                                        : {advertings.approas}
                                    </div>
                                    <div className={styles.bottom} onClick={e => {
                                        e.stopPropagation()
                                        setActiveAdv({ ...advertings, showPreviewModal: true });
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
                        dispatch({
                            type: 'advertising/fetchAdvListAddMore',
                            payload: {
                                startT: dateT ? dateT[0] : "",
                                endT: dateT ? dateT[1] : "",
                                start: date ? date[0] : "",
                                end: date ? date[1] : "",
                                current: pageIndex + 1,
                                size: pageSize
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