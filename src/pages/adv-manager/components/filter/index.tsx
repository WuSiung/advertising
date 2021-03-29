import React, { FC, useState } from 'react'
import { Checkbox, Col, Popover, Row, Select, Button } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { allCountry } from '@/utils/countrys'


type SelectValueType = string | number;

const ManagerFilter: FC = (props) => {
    
    const [age, setAge] = useState<CheckboxValueType[] | undefined>();
    const [sex, setSex] = useState<CheckboxValueType[] | undefined>();
    const [device, setDevice] = useState<CheckboxValueType[] | undefined>();
    const [publishLocation, setPublishLocation] = useState<CheckboxValueType[] | undefined>();
    const [country, setCountry] = useState<SelectValueType[] | undefined>();
    
    return <div>
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

    </div>
}

export default ManagerFilter