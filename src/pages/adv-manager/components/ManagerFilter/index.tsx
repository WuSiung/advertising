import React, { FC, useState } from 'react'
import { Checkbox, Col, Popover, Row, Select, Button, Radio, RadioChangeEvent, Input, message } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { allCountry } from '@/utils/countrys'
import { ageAround, paramsFilter } from './config'

import styles from './index.less'

interface ManagerFilterProps {
    onFilter: (params: ParamsType) => void
}

export type ParamsType = {
    age?: string,
    sex?: RadioChangeEvent,
    device?: CheckboxValueType[],
    publishLocation?: CheckboxValueType[],
    country?: SelectValueType[],
    status?: string,
    spend?: NumType,
    roi?: NumType,
    clicks?: NumType,
    show?: NumType,
}

type SelectValueType = string | number;

type NumType = {
    type?: '0' | '1' | '2' | '3' | '4',
    value: string
}

const ManagerFilter: FC<ManagerFilterProps> = (props) => {

    const [visible, setVisible] = useState(false)
    const [age, setAge] = useState<CheckboxValueType[] | undefined>();
    const [sex, setSex] = useState<RadioChangeEvent | undefined>();
    const [device, setDevice] = useState<CheckboxValueType[] | undefined>();
    const [publishLocation, setPublishLocation] = useState<CheckboxValueType[] | undefined>();
    const [country, setCountry] = useState<SelectValueType[] | undefined>();
    const [status, setStatus] = useState<string>()
    const [spend, setSpend] = useState<NumType>()
    const [roi, setRoi] = useState<NumType>()
    const [clicks, setClicks] = useState<NumType>()
    const [show, setShow] = useState<NumType>()

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const confirmFilter = () => {
        const newAge = age?.map(item => {
            let a = (item as string).replace('age', '')
            return Number(a)
        }) || []
        if (!isContinuationInteger(newAge)) {
            message.error('请选择连续的年龄段')
            return
        }


        let agemin = '',
            ageNum = '',
            agemax = ''
        ageAround.map(ages => {
            if (age?.includes(ages.value)) {
                if (ageNum == '' && ages.value != 'age7') {
                    ageNum = ages.label.replaceAll('岁', '')
                } else if (ageNum == '' && ages.value == 'age7') {
                    ageNum = '65'
                } else if (ageNum != '' && ages.value != 'age7') {
                    ageNum = (ageNum.split('-')[0] + '-' + ages.label.split('-')[1]).replaceAll('岁', '')
                } else if (ageNum != '' && ages.value == 'age7') {
                    ageNum = ageNum.split('-')[0] + '-65'
                }
            }
        })
        if (ageNum == '65') {
            agemin = agemax = ageNum
        } else {
            agemin = ageNum.split('-')[0]
            agemax = ageNum.split('-')[1]
        }
        let params = {
            agemin, agemax, sex, device, publishLocation, country, status, spend, roi, clicks, show
        }
        if (sex == '0') {
            delete params.sex
        }

        console.log(params)
        return

        props.onFilter(params)
        setVisible(false)
    }

    return <>
        <Popover placement="bottomRight" title="筛选器" content={<div style={{ width: "600px" }}>
            <Row>
                <Col span={5}>
                    <div style={{ paddingLeft: "2px" }}>年龄:</div>
                    <Checkbox.Group
                        value={age}
                        onChange={(value) => {
                            setAge(value);
                        }}
                        style={{ width: '100%' }}
                        options={ageAround}
                    >
                    </Checkbox.Group>
                </Col>
                <Col span={4}>
                    <div style={{ paddingLeft: "2px" }}>姓别:</div>
                    <Radio.Group value={sex} style={{ width: '100%' }} onChange={(value) => { setSex(value.target.value); }}>
                        {
                            [
                                { value: "1", label: "男" },
                                { value: "2", label: "女" },
                                { value: "0", label: "所有" },
                            ].map(item => {
                                return <Radio style={radioStyle} key={item.value} value={item.value}>
                                    {item.label}
                                </Radio>
                            })
                        }
                    </Radio.Group>
                </Col>
                <Col span={4}>
                    <div style={{ paddingLeft: "2px" }}>状态:</div>
                    <Radio.Group value={status} style={{ width: '100%' }} onChange={(value) => { setStatus(value.target.value); }}>
                        {
                            [
                                { value: "0", label: "草稿" },
                                { value: "1", label: "发送中" },
                                { value: "2", label: "失败" },
                                { value: "3", label: "成功" },
                                { value: "", label: "所有" },
                            ].map(item => {
                                return <Radio style={radioStyle} key={item.value} value={item.value}>
                                    {item.label}
                                </Radio>
                            })
                        }
                    </Radio.Group>
                </Col>
                <Col span={4}>
                    <div style={{ paddingLeft: "2px" }}>设备:</div>
                    <Checkbox.Group
                        value={device}
                        onChange={(value) => {
                            setDevice(value);
                        }}
                        style={{ width: '100%' }}
                        options={
                            [
                                { value: "1", label: "桌面" },
                                { value: "0", label: "移动" }
                            ]
                        }
                    >
                    </Checkbox.Group>
                </Col>
                <Col span={7}>
                    <div style={{ paddingLeft: "2px" }}>刊登位置:</div>
                    <Checkbox.Group
                        value={publishLocation}
                        onChange={(value) => {
                            setPublishLocation(value);
                        }}
                        style={{ width: '100%' }}
                        options={
                            [
                                { value: "facebook_positions", label: "facebook" },
                                { value: "instagram_positions", label: "instagram" },
                                { value: "messenger_positions", label: "messenger" },
                                { value: "audience_network_positions", label: "audienceNetwork" }
                            ]
                        }
                    >
                    </Checkbox.Group>
                </Col>
            </Row>
            {/* <Row style={{ paddingTop: "20px" }}>
                <Col span={24}>
                    <span className={styles.label}>消费金额：</span>
                    <Select placeholder='选择符号' onChange={(value) => {
                        setSpend({ type: (value as unknown as NumType['type']), value: spend?.value || '' });
                    }} style={{ width: 120 }} value={spend?.type} showSearch options={paramsFilter} key={'key'}>
                    </Select>
                    <Input placeholder='请输入' value={spend?.value} style={{ display: 'inline-block', width: 200, marginLeft: 10 }}
                        onChange={e => setSpend({ type: spend?.type, value: e.target.value })} />
                </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
                <Col span={24}>
                    <span className={styles.label}>ROI:</span><Select placeholder='选择符号' onChange={(value) => {
                        setRoi({ type: (value as unknown as NumType['type']), value: roi?.value || '' });
                    }} style={{ width: 120 }} value={roi?.type} showSearch options={paramsFilter} key={'key'}>
                    </Select>
                    <Input placeholder='请输入' value={roi?.value} style={{ display: 'inline-block', width: 200, marginLeft: 10 }}
                        onChange={e => setRoi({ type: roi?.type, value: e.target.value })}></Input>
                </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
                <Col span={24}>
                    <span className={styles.label}>点击率：</span><Select placeholder='选择符号' onChange={(value) => {
                        setClicks({ type: (value as unknown as NumType['type']), value: clicks?.value || '' });
                    }} style={{ width: 120 }} value={clicks?.type} showSearch options={paramsFilter} key={'key'}>
                    </Select>
                    <Input placeholder='请输入' value={clicks?.value} style={{ display: 'inline-block', width: 200, marginLeft: 10 }}
                        onChange={e => setClicks({ type: clicks?.type, value: e.target.value })}></Input>
                </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
                <Col span={24}>
                    <span className={styles.label}>展示数：</span><Select placeholder='选择符号' onChange={(value) => {
                        setShow({ type: (value as unknown as NumType['type']), value: show?.value || '' });
                    }} style={{ width: 120 }} value={show?.type} showSearch options={paramsFilter} key={'key'}>
                    </Select>
                    <Input placeholder='请输入' value={show?.value} style={{ display: 'inline-block', width: 200, marginLeft: 10 }}
                        onChange={e => setShow({ type: show?.type, value: e.target.value })}></Input>
                </Col>
            </Row> */}
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
                            setSpend({ value: '' })
                            setRoi({ value: '' })
                            setClicks({ value: '' })
                            setShow({ value: '' })
                        }}>清除筛选</Button>
                        <Button type="primary" onClick={confirmFilter}>确认筛选</Button>
                    </div>
                </Col>
            </Row>
        </div>} trigger="click" visible={visible} onVisibleChange={setVisible}>
            <Button type="link">筛选</Button>
        </Popover>

    </>
}

const isContinuationInteger = (array: number[]) => {
    if (!array) {
        //数组为null
        return false;
    }
    if (array.length == 0) {
        //数组为[]
        return true;
    }
    var len = array.length;
    var n0 = array[0];
    var sortDirection = 1;//默认升序
    if (array[0] > array[len - 1]) {
        //降序
        sortDirection = -1;
    }
    if ((n0 * 1 + (len - 1) * sortDirection) !== array[len - 1]) {
        //筛除['3',4,5,6,7,8]
        return false;
    }
    var isContinuation = true;
    for (var i = 0; i < len; i++) {
        if (array[i] !== (i + n0 * sortDirection)) {
            isContinuation = false;
            break;
        }
    }
    return isContinuation;
}

export default ManagerFilter