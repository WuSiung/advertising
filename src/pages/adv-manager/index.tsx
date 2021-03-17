import { Card, Tabs, Table, Popover, Select, Row, Col, Pagination, Switch, Button, Space, Dropdown, Menu } from 'antd'
import React, { FC, ReactNode, useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { connect, Dispatch, history } from 'umi'
import { AdvAdvListType, AdvData, AdvPackListType, AdvSetListType } from './data.d'
import { SearchOutlined, CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { useDidMountEffect } from "@/utils/customerHooks";
import DateRange from "../adv-launcher/components/DateRange";
import styles from './index.less';
import InputTag from './components/InputTags';
import { advadvOriginColumnsOnlyLabelAndDataIndex, advpackOriginColumnsOnlyLabelAndDataIndex, advsetOriginColumnsOnlyLabelAndDataIndex } from './tableConfig'

type EventValue<DateType> = DateType | null;

type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;


const { TabPane } = Tabs

interface AdvPropsType {
    advPackList: AdvPackListType[],
    advSetList: AdvSetListType[],
    advAdvList: AdvAdvListType[],
    advPackTotal: number,
    advSetTotal: number,
    advAdvTotal: number,
    loadingAdvPack: boolean,
    loadingAdvSet: boolean,
    loadingAdvAdv: boolean,
    dispatch: Dispatch
}

interface Columns {
    idx?: number,
    title?: ReactNode,
    titleString?: string,
    key: string,
    dataIndex: string,
    width?: number,
    fixed?: boolean,
    render?: (param: number | string, _: AdvPackListType | AdvSetListType | AdvAdvListType) => string | number | ReactNode,
    onCell?: any
}

export interface SearchColsPopoverPropsType {
    currentColumnDataIndex: string,
    columns: { titleString: string | undefined, dataIndex: string, show: boolean }[],
    onChange: (value: string) => void
}

const SearchColsPopover: FC<SearchColsPopoverPropsType> = props => {
    const options = props.columns.filter(col => !col.show).map(col => {
        return { label: col.titleString, value: col.dataIndex ? col.dataIndex : "1" };
    });
    return (<><Select onSelect={(value: string) => {
        props.onChange(value);
    }} showSearch style={{ width: 200 }}
        filterOption={
            (input, option) => {
                return option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        }
        placeholder="搜索列">
        {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
                {option.label}
            </Select.Option>
        ))}
    </Select></>);
}

const AdvManager: FC<AdvPropsType> = (props) => {
    const {
        advPackList,
        loadingAdvPack,
        loadingAdvSet,
        loadingAdvAdv,
        advPackTotal,
        advSetTotal,
        advAdvTotal,
        advAdvList,
        advSetList,
        dispatch
    } = props;
    const [value, setValue] = useState<RangeValue<moment.Moment> | undefined>([moment(new Date()).subtract(1, 'months'), moment()]);
    const [valueFSet, setValueFSet] = useState<RangeValue<moment.Moment> | undefined>([moment(new Date()).subtract(1, 'months'), moment()]);
    const [valueFAdv, setValueFAdv] = useState<RangeValue<moment.Moment> | undefined>([moment(new Date()).subtract(1, 'months'), moment()]);
    
    const advpackOriginColumns: Columns[] = [
        {
            idx: 0,
            title: <div className="th-title">名称 </div>,
            titleString: "名称",
            dataIndex: 'appName',
            key: 'appName',
            fixed: true,
            width: 450,
            onCell: (record: AdvPackListType) => {
                return {
                    onClick: () => {
                        onRowClick(record, "pack")
                    }, // 点击行
                };
            },
            render: (t, _) => {
                const text = (_ as AdvPackListType).appName;
                const advAdv: (param: { key: string, id: number, isOn: boolean }) => void = (param) => {
                    const { key, id, isOn } = param;
                    if (key.toString().indexOf("adv_") !== -1) {
                        dispatch({
                            type: 'adv/advAdv',
                            payload: {
                                advId: id,
                                state: isOn ? "1" : "0"
                            }
                        })
                    }
                    if (key.toString().indexOf("set_") !== -1) {
                        dispatch({
                            type: 'adv/advSet',
                            payload: {
                                setId: id,
                                state: isOn ? "1" : "0"
                            }
                        })
                    } else {
                        dispatch({
                            type: 'adv/advPack',
                            payload: {
                                packId: id,
                                state: isOn ? "1" : "0"
                            }
                        })
                    }
                }
                return (<div className={styles.advName}>
                    <div>{text}</div>
                    <Switch onClick={(val, event) => {
                        event.stopPropagation();
                        advAdv({ key: "pack_", id: _.packId, isOn: !(_.state === "1") });
                    }
                    } loading={!!(_ as AdvPackListType).loading} disabled={_.status != "3"} checked={_.state === "1"} />
                </div>)
            }
        },
        {
            idx: 1,
            title: <div className="th-title">状态</div>,
            titleString: "状态",
            dataIndex: 'status',
            fixed: true,
            key: 'status',
            render: (t, _) => {
                const status = (_ as AdvPackListType).status;
                switch (status) {
                    case "0":
                        return "草稿"
                    case "1":
                        return "发送中"
                    case "2":
                        return "失败"
                    case "3":
                        return "成功"
                    default:
                        return null;

                }
            }
        },
        {
            idx: 2,
            title: <div className="th-title">展示数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'impression');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '展示数',
            dataIndex: 'impression',
            key: 'impression',
        },
        {
            idx: 3,
            title: <div className="th-title">点击数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'clicks');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '点击数',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            idx: 4,
            title: <div className="th-title">每结果成本 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'pfee');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每结果成本',
            dataIndex: 'pfee',
            key: 'pfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 5,
            title: <div className="th-title">移动应用回报率 <Popover style={{ minHeight: "300px" }} placement="bottom"
                title="更换列" content={<SearchColsPopover
                    currentColumnDataIndex="impression" columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'approas');
                    }
                    } />} trigger="click"><CaretDownOutlined className="th-icon" /></Popover></div>,
            titleString: '移动应用回报率',
            dataIndex: 'approas',
            key: 'approas',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 6,
            title: <div className="th-title">消费金额 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'apet');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '消费金额',
            dataIndex: 'apet',
            key: 'apet',

            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 7,
            title: <div className="th-title">点击率 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'ctr');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '点击率',
            dataIndex: 'ctr',
            key: 'ctr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 8,
            title: <div className="th-title">频率 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'frequency');
                    }
                    } />}
                trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '频率',
            dataIndex: 'frequency',
            key: 'frequency',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 9,
            title: <div className="th-title">费用/千次 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'cpm');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '费用/千次',
            dataIndex: 'cpm',
            key: 'cpm',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 10,
            title: <div className="th-title">展示数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'octr');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '出站点击率',
            dataIndex: 'octr',
            key: 'octr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 11,
            title: <div className="th-title">每次点击费用 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'cpc');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每次点击费用',
            dataIndex: 'cpc',
            key: 'cpc',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 12,
            title: <div className="th-title">安装数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'installs');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '安装数',
            dataIndex: 'installs',
            key: 'installs',
        },
        {
            idx: 13,
            title: <div className="th-title">每次安装费用 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advpackOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onPackColumnFilter(value, 'installfee');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每次安装费用',
            dataIndex: 'installfee',
            key: 'installfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 14,
            title: "操作",
            titleString: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, _) => {
                return (<><Button type="link">复制广告系列</Button><Dropdown key={2} overlay={() => {
                    return (<Menu>
                        <Menu.Item>
                            <a rel="noopener noreferrer" onClick={() => {

                            }}>
                                在FACEBOOK打开
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a rel="noopener noreferrer" onClick={() => {

                            }}>
                                打开故事详情
                            </a>
                        </Menu.Item>
                    </Menu>)
                }}>
                    <span>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <DownOutlined />
                        </a>
                    </span>
                </Dropdown></>)
            }
        },
    ];
    const advSetOriginColumns: Columns[] = [
        {
            idx: 0,
            title: <div className="th-title">名称 </div>,
            titleString: "名称",
            dataIndex: 'setName',
            key: 'setName',
            fixed: true,
            width: 450,
            onCell: (record: AdvSetListType) => {
                return {
                    onClick: () => {
                        onRowClick(record, "set")
                    }, // 点击行
                };
            },
            render: (t, _) => {
                const text = (_ as AdvSetListType).setName;
                const advAdv: (param: { key: string, id: number, isOn: boolean }) => void = (param) => {
                    const { key, id, isOn } = param;
                    if (key.toString().indexOf("adv_") !== -1) {
                        dispatch({
                            type: 'adv/advAdv',
                            payload: {
                                advId: id,
                                state: isOn ? "1" : "0"
                            }
                        })
                    }
                    if (key.toString().indexOf("set_") !== -1) {
                        dispatch({
                            type: 'adv/advSet',
                            payload: {
                                setId: id,
                                state: isOn ? "1" : "0"
                            }
                        })
                    } else {
                        dispatch({
                            type: 'adv/advPack',
                            payload: {
                                packId: id,
                                state: isOn ? "1" : "0"
                            }
                        })
                    }
                }
                return (<div className={styles.advName}>
                    <div>{text}</div>
                    <Switch onClick={(val, event) => {
                        event.stopPropagation();
                        advAdv({ key: "set_", id: (_ as AdvSetListType).setId, isOn: !(_.state === "1") });
                    }
                    } loading={!!(_ as AdvSetListType).loading} disabled={_.status != "3"} checked={_.state === "1"} />
                </div>)
            }
        },
        {
            idx: 1,
            title: <div className="th-title">状态</div>,
            titleString: "状态",
            dataIndex: 'status',
            fixed: true,
            key: 'status',
            render: (t, _) => {
                const status = (_ as AdvPackListType).status;
                switch (status) {
                    case "0":
                        return "草稿"
                    case "1":
                        return "发送中"
                    case "2":
                        return "失败"
                    case "3":
                        return "成功"
                    default:
                        return null;

                }
            }
        },
        {
            idx: 2,
            title: <div className="th-title">展示数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'impression');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '展示数',
            dataIndex: 'impression',
            key: 'impression',
        },
        {
            idx: 3,
            title: <div className="th-title">点击数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'clicks');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '点击数',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            idx: 4,
            title: <div className="th-title">每结果成本 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'pfee');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每结果成本',
            dataIndex: 'pfee',
            key: 'pfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 5,
            title: <div className="th-title">移动应用回报率 <Popover style={{ minHeight: "300px" }} placement="bottom"
                title="更换列" content={<SearchColsPopover
                    currentColumnDataIndex="impression" columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'approas');
                    }
                    } />} trigger="click"><CaretDownOutlined className="th-icon" /></Popover></div>,
            titleString: '移动应用回报率',
            dataIndex: 'approas',
            key: 'approas',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 6,
            title: <div className="th-title">消费金额 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'apet');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '消费金额',
            dataIndex: 'apet',
            key: 'apet',

            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 7,
            title: <div className="th-title">点击率 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'ctr');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '点击率',
            dataIndex: 'ctr',
            key: 'ctr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 8,
            title: <div className="th-title">频率 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'frequency');
                    }
                    } />}
                trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '频率',
            dataIndex: 'frequency',
            key: 'frequency',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 9,
            title: <div className="th-title">费用/千次 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'cpm');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '费用/千次',
            dataIndex: 'cpm',
            key: 'cpm',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 10,
            title: <div className="th-title">展示数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'octr');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '出站点击率',
            dataIndex: 'octr',
            key: 'octr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 11,
            title: <div className="th-title">每次点击费用 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'cpc');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每次点击费用',
            dataIndex: 'cpc',
            key: 'cpc',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 12,
            title: <div className="th-title">安装数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'installs');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '安装数',
            dataIndex: 'installs',
            key: 'installs',
        },
        {
            idx: 13,
            title: <div className="th-title">每次安装费用 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advsetOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onSetColumnFilter(value, 'installfee');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每次安装费用',
            dataIndex: 'installfee',
            key: 'installfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 14,
            title: "操作",
            titleString: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, _) => {
                return (<><Button type="link">复制广告集</Button><Dropdown key={2} overlay={() => {
                    return (<Menu>
                        <Menu.Item>
                            <a rel="noopener noreferrer" onClick={() => {

                            }}>
                                复制广告集条件新建
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a rel="noopener noreferrer" onClick={() => {

                            }}>
                                在FACEBOOK打开
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a rel="noopener noreferrer" onClick={() => {

                            }}>
                                打开故事详情
                            </a>
                        </Menu.Item>
                    </Menu>)
                }}>
                    <span>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <DownOutlined />
                        </a>
                    </span>
                </Dropdown></>)
            }
        },
    ];
    const advAdvOriginColumns: Columns[] = [
        {
            idx: 0,
            title: <div className="th-title">名称 </div>,
            titleString: "名称",
            dataIndex: 'advName',
            key: 'advName',
            fixed: true,
            width: 450,
            render: (t, _) => {
                const text = (_ as AdvAdvListType).advName;
                const advAdv: (param: { key: string, id: number, isOn: boolean }) => void = (param) => {
                    const { key, id, isOn } = param;
                    if (key.toString().indexOf("adv_") !== -1) {
                        dispatch({
                            type: 'adv/advAdv',
                            payload: {
                                advId: id,
                                state: isOn ? "1" : "0"
                            }
                        })

                    } else if (key.toString().indexOf("set_") !== -1) {
                        dispatch({
                            type: 'adv/advSet',
                            payload: {
                                setId: id,
                                state: isOn ? "1" : "0"
                            }
                        })
                    } else {
                        dispatch({
                            type: 'adv/advPack',
                            payload: {
                                packId: id,
                                state: isOn ? "1" : "0"
                            }
                        })
                    }
                }
                return (<div className={styles.advName}>
                    <div>{text}</div>
                    <Switch onClick={() => {
                        advAdv({ key: "adv_", id: (_ as AdvAdvListType).advId, isOn: !(_.state === "1") });
                    }
                    } loading={!!(_ as AdvAdvListType).loading} disabled={_.status != "3"} checked={_.state === "1"} />
                </div>)
            }
        },
        {
            idx: 1,
            title: <div className="th-title">状态</div>,
            titleString: "状态",
            dataIndex: 'status',
            fixed: true,
            key: 'status',
            render: (t, _) => {
                const status = (_ as AdvPackListType).status;
                switch (status) {
                    case "0":
                        return "草稿"
                    case "1":
                        return "发送中"
                    case "2":
                        return "失败"
                    case "3":
                        return "成功"
                    default:
                        return null;

                }
            }
        },
        {
            idx: 2,
            title: <div className="th-title">展示数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'impression');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '展示数',
            dataIndex: 'impression',
            key: 'impression',
        },
        {
            idx: 3,
            title: <div className="th-title">点击数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'clicks');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '点击数',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            idx: 4,
            title: <div className="th-title">每结果成本 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'pfee');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每结果成本',
            dataIndex: 'pfee',
            key: 'pfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 5,
            title: <div className="th-title">移动应用回报率 <Popover style={{ minHeight: "300px" }} placement="bottom"
                title="更换列" content={<SearchColsPopover
                    currentColumnDataIndex="impression" columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'approas');
                    }
                    } />} trigger="click"><CaretDownOutlined className="th-icon" /></Popover></div>,
            titleString: '移动应用回报率',
            dataIndex: 'approas',
            key: 'approas',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 6,
            title: <div className="th-title">消费金额 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'apet');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '消费金额',
            dataIndex: 'apet',
            key: 'apet',

            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 7,
            title: <div className="th-title">点击率 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'ctr');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '点击率',
            dataIndex: 'ctr',
            key: 'ctr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 8,
            title: <div className="th-title">频率 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'frequency');
                    }
                    } />}
                trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '频率',
            dataIndex: 'frequency',
            key: 'frequency',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 9,
            title: <div className="th-title">费用/千次 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'cpm');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '费用/千次',
            dataIndex: 'cpm',
            key: 'cpm',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 10,
            title: <div className="th-title">展示数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'octr');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '出站点击率',
            dataIndex: 'octr',
            key: 'octr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 11,
            title: <div className="th-title">每次点击费用 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'cpc');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每次点击费用',
            dataIndex: 'cpc',
            key: 'cpc',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 12,
            title: <div className="th-title">安装数 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'installs');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '安装数',
            dataIndex: 'installs',
            key: 'installs',
        },
        {
            idx: 13,
            title: <div className="th-title">每次安装费用 <Popover style={{ minHeight: "300px" }} placement="bottom" title="更换列"
                content={<SearchColsPopover
                    currentColumnDataIndex="impression"
                    columns={advadvOriginColumnsOnlyLabelAndDataIndex}
                    onChange={value => {
                        onAdvColumnFilter(value, 'installfee');
                    }
                    } />} trigger="click"><CaretDownOutlined
                    className="th-icon" /></Popover></div>,
            titleString: '每次安装费用',
            dataIndex: 'installfee',
            key: 'installfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            idx: 14,
            title: "操作",
            titleString: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, _) => {
                return (<><Button type="link">复制广告</Button><Dropdown key={2} overlay={() => {
                    return (<Menu>
                        <Menu.Item>
                            <a rel="noopener noreferrer" onClick={() => {

                            }}>
                                复制广告素材新建
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a rel="noopener noreferrer" onClick={() => {

                            }}>
                                在FACEBOOK打开
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a rel="noopener noreferrer" onClick={() => {

                            }}>
                                打开故事详情
                            </a>
                        </Menu.Item>
                    </Menu>)
                }}>
                    <span>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <DownOutlined />
                        </a>
                    </span>
                </Dropdown></>)
            }
        },
    ];

    let oAdvsColumns = advSetOriginColumns.filter(col => !!advsetOriginColumnsOnlyLabelAndDataIndex.find(icol => icol.dataIndex === col.dataIndex && icol.show));
    oAdvsColumns.sort((a, b) => {
        const aitem = advsetOriginColumnsOnlyLabelAndDataIndex.find(icol => a.dataIndex === icol.dataIndex);
        const bitem = advsetOriginColumnsOnlyLabelAndDataIndex.find(icol => b.dataIndex === icol.dataIndex);
        return (aitem?.sortIdx as number) - (bitem?.sortIdx as number);
    });

    let oAdvaColumns = advAdvOriginColumns.filter(col => !!advadvOriginColumnsOnlyLabelAndDataIndex.find(icol => icol.dataIndex === col.dataIndex && icol.show));
    oAdvaColumns.sort((a, b) => {
        const aitem = advadvOriginColumnsOnlyLabelAndDataIndex.find(icol => a.dataIndex === icol.dataIndex);
        const bitem = advadvOriginColumnsOnlyLabelAndDataIndex.find(icol => b.dataIndex === icol.dataIndex);
        return (aitem?.sortIdx as number) - (bitem?.sortIdx as number);
    });

    let oAdvpColumns = advpackOriginColumns.filter(col => !!advpackOriginColumnsOnlyLabelAndDataIndex.find(icol => icol.dataIndex === col.dataIndex && icol.show));
    oAdvpColumns.sort((a, b) => {
        const aitem = advpackOriginColumnsOnlyLabelAndDataIndex.find(icol => a.dataIndex === icol.dataIndex);
        const bitem = advpackOriginColumnsOnlyLabelAndDataIndex.find(icol => b.dataIndex === icol.dataIndex);
        return (aitem?.sortIdx as number) - (bitem?.sortIdx as number);
    });

    const [advpackColumns, setAdvpackColumns] = useState<Columns[]>([...oAdvpColumns]);
    const [advpackPagesize, setAdvpackPagesize] = useState<number>(10);
    const [advpackPageindex, setAdvpackPageindex] = useState<number>(1);

    const [advSetColumns, setAdvSetColumns] = useState<Columns[]>([...oAdvsColumns]);
    const [advSetPagesize, setAdvSetPagesize] = useState<number>(10);
    const [advSetPageindex, setAdvSetPageindex] = useState<number>(1);

    const [advAdvColumns, setAdvAdvColumns] = useState<Columns[]>([...oAdvaColumns]);
    const [advAdvPagesize, setAdvAdvPagesize] = useState<number>(10);
    const [advAdvPageindex, setAdvAdvPageindex] = useState<number>(1);

    const [serachText, setSearchText] = useState<string | Array<string> | undefined>([]);
    const [serachTextForSet, setSerachTextForSet] = useState<string | Array<string> | undefined>([]);
    const [serachTextForAdv, setSerachTextForAdv] = useState<string | Array<string> | undefined>([]);

    const onPackColumnFilter: (newKey: string, originKey: string) => void = (newKey, originKey) => {
        setAdvpackColumns(advpCols => {

            let newItem: Columns | undefined = advpackOriginColumns.find(item => item.dataIndex === newKey);
            let originItem: Columns | undefined = advpackOriginColumns.find(item => item.dataIndex === originKey);
            const col = advpackOriginColumnsOnlyLabelAndDataIndex.find(col => col.dataIndex === newItem?.dataIndex);

            const ocol = advpackOriginColumnsOnlyLabelAndDataIndex.find(col => col.dataIndex === originItem?.dataIndex);

            if (!!col && !!ocol) {
                col.show = true;
                col.sortIdx = ocol.sortIdx;
                ocol.show = false;
                ocol.sortIdx = col.sortIdx;
            }
            let oAdvpColumns = advpackOriginColumns.filter(col => !!advpackOriginColumnsOnlyLabelAndDataIndex.find(icol => icol.dataIndex === col.dataIndex && icol.show));
            oAdvpColumns.sort((a, b) => {
                const aitem = advpackOriginColumnsOnlyLabelAndDataIndex.find(icol => a.dataIndex === icol.dataIndex);
                const bitem = advpackOriginColumnsOnlyLabelAndDataIndex.find(icol => b.dataIndex === icol.dataIndex);
                return (aitem?.sortIdx as number) - (bitem?.sortIdx as number);
            });
            return [...oAdvpColumns]
        })


    }

    const onSetColumnFilter: (newKey: string, originKey: string) => void = (newKey, originKey) => {
        setAdvSetColumns(advpCols => {

            let newItem: Columns | undefined = advSetOriginColumns.find(item => item.dataIndex === newKey);
            let originItem: Columns | undefined = advSetOriginColumns.find(item => item.dataIndex === originKey);
            const col = advsetOriginColumnsOnlyLabelAndDataIndex.find(col => col.dataIndex === newItem?.dataIndex);

            const ocol = advsetOriginColumnsOnlyLabelAndDataIndex.find(col => col.dataIndex === originItem?.dataIndex);

            if (!!col && !!ocol) {
                col.show = true;
                col.sortIdx = ocol.sortIdx;
                ocol.show = false;
                ocol.sortIdx = col.sortIdx;
            }
            let oAdvsColumns = advSetOriginColumns.filter(col => !!advsetOriginColumnsOnlyLabelAndDataIndex.find(icol => icol.dataIndex === col.dataIndex && icol.show));
            oAdvsColumns.sort((a, b) => {
                const aitem = advsetOriginColumnsOnlyLabelAndDataIndex.find(icol => a.dataIndex === icol.dataIndex);
                const bitem = advsetOriginColumnsOnlyLabelAndDataIndex.find(icol => b.dataIndex === icol.dataIndex);
                return (aitem?.sortIdx as number) - (bitem?.sortIdx as number);
            });
            return [...oAdvsColumns]
        })


    }

    const onAdvColumnFilter: (newKey: string, originKey: string) => void = (newKey, originKey) => {
        setAdvAdvColumns(advpCols => {

            let newItem: Columns | undefined = advAdvOriginColumns.find(item => item.dataIndex === newKey);
            let originItem: Columns | undefined = advAdvOriginColumns.find(item => item.dataIndex === originKey);
            const col = advadvOriginColumnsOnlyLabelAndDataIndex.find(col => col.dataIndex === newItem?.dataIndex);

            const ocol = advadvOriginColumnsOnlyLabelAndDataIndex.find(col => col.dataIndex === originItem?.dataIndex);

            if (!!col && !!ocol) {
                col.show = true;
                col.sortIdx = ocol.sortIdx;
                ocol.show = false;
                ocol.sortIdx = col.sortIdx;
            }
            let oAdvaColumns = advAdvOriginColumns.filter(col => !!advadvOriginColumnsOnlyLabelAndDataIndex.find(icol => icol.dataIndex === col.dataIndex && icol.show));
            oAdvaColumns.sort((a, b) => {
                const aitem = advadvOriginColumnsOnlyLabelAndDataIndex.find(icol => a.dataIndex === icol.dataIndex);
                const bitem = advadvOriginColumnsOnlyLabelAndDataIndex.find(icol => b.dataIndex === icol.dataIndex);
                return (aitem?.sortIdx as number) - (bitem?.sortIdx as number);
            });
            return [...oAdvaColumns]
        })


    }

    useEffect(() => {
        let sText = serachText;
        dispatch({
            type: 'adv/fetchAdvPackList', payload: {
                current: advpackPageindex,
                size: advpackPagesize,
                appName: Array.isArray(sText) ? sText.join(" ") : "",
                startT: value && value[0] ? (value[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: value && value[1] ? (value[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advpackPageindex]);
    useDidMountEffect(() => {
        let sText = serachText;
        dispatch({
            type: 'adv/fetchAdvPackList', payload: {
                current: advpackPageindex,
                size: advpackPagesize,
                appName: Array.isArray(sText) ? sText.join(" ") : "",
                startT: value && value[0] ? (value[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: value && value[1] ? (value[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advpackPagesize]);

    useEffect(() => {
        let sText = serachTextForSet;
        sText = sText as string[];
        sText = Array.from(new Set(sText))
        const sIds: Array<number> = [];
        if (sText && sText[0]) {
            sText.forEach(st => {
                if (st.indexOf("#^*_") != -1) {
                    const sId = Number.parseInt(st.split("#^*_")[0], 10);
                    sIds.push(sId);
                }
            })
        }
        setSerachTextForSet(sText);
        dispatch({
            type: 'adv/fetchAdvSetList', payload: {
                current: advSetPageindex,
                size: advpackPagesize,
                packids: sIds.join(","),
                setName: Array.isArray(sText) ? sText.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                startT: valueFSet && valueFSet[0] ? (valueFSet[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: valueFSet && valueFSet[1] ? (valueFSet[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advSetPageindex]);
    useDidMountEffect(() => {
        let sText = serachTextForSet;
        sText = sText as string[];
        sText = Array.from(new Set(sText))
        const sIds: Array<number> = [];
        if (sText && sText[0]) {
            sText.forEach(st => {
                if (st.indexOf("#^*_") != -1) {
                    const sId = Number.parseInt(st.split("#^*_")[0], 10);
                    sIds.push(sId);
                }
            })
        }
        setSerachTextForSet(sText);
        dispatch({
            type: 'adv/fetchAdvSetList', payload: {
                current: advSetPageindex,
                size: advpackPagesize,
                packids: sIds.join(","),
                setName: Array.isArray(sText) ? sText.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                startT: valueFSet && valueFSet[0] ? (valueFSet[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: valueFSet && valueFSet[1] ? (valueFSet[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advSetPagesize]);


    useEffect(() => {

        let sText = advInputTagRef.current?.changeVal();
        sText = sText as string[];
        sText = Array.from(new Set(sText));
        const sIds: Array<number> = [];
        if (sText && sText[0]) {
            sText.forEach(st => {
                if (st.indexOf("#^*_") != -1) {
                    const sId = Number.parseInt(st.split("#^*_")[0], 10);
                    sIds.push(sId);
                }
            })
        }
        setSerachTextForAdv(sText);
        dispatch({
            type: 'adv/fetchAdvAdvList', payload: {
                current: advAdvPageindex,
                size: advpackPagesize,
                setids: sIds.join(","),
                advName: Array.isArray(sText) ? sText.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                startT: valueFAdv && valueFAdv[0] ? (valueFAdv[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: valueFAdv && valueFAdv[1] ? (valueFAdv[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advAdvPageindex]);
    useDidMountEffect(() => {
        let sText = advInputTagRef.current?.changeVal();
        sText = sText as string[];
        sText = Array.from(new Set(sText));
        const sIds: Array<number> = [];
        if (sText && sText[0]) {
            sText.forEach(st => {
                if (st.indexOf("#^*_") != -1) {
                    const sId = Number.parseInt(st.split("#^*_")[0], 10);
                    sIds.push(sId);
                }
            })
        }
        setSerachTextForAdv(sText);
        dispatch({
            type: 'adv/fetchAdvAdvList', payload: {
                current: advAdvPageindex,
                size: advpackPagesize,
                setids: sIds.join(","),
                advName: Array.isArray(sText) ? sText.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                startT: valueFAdv && valueFAdv[0] ? (valueFAdv[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: valueFAdv && valueFAdv[1] ? (valueFAdv[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advAdvPagesize]);


    const onRowClick = (record: AdvAdvListType | AdvSetListType | AdvPackListType, tabType: string) => {
        if (tabType === "set") {
            const rec = record as AdvSetListType;
            let advt: Array<string> = [];
            setSerachTextForAdv(advtext => {
                advtext = (advtext as string[]);
                if (Array.isArray(advtext)) advtext.unshift(`${rec.setId}#^*_广告集-${rec.setName}`);
                else advtext = [`${rec.setId}#^*_广告集-${rec.setName}`]
                advt = [...advtext];
                return [...advtext]
            });
            advt = Array.from(new Set(advt));
            const sIds: Array<number> = [];
            if (advt && advt[0]) {
                advt.forEach(st => {
                    if (st.indexOf("#^*_") != -1) {
                        const sId = Number.parseInt(st.split("#^*_")[0], 10);
                        sIds.push(sId);
                    }
                })
            }
            setTabKey("3");
            dispatch({
                type: 'adv/fetchAdvAdvList', payload: {
                    current: advAdvPageindex,
                    size: advAdvPagesize,
                    setids: sIds.join(","),
                    advName: Array.isArray(advt) ? advt.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                    startT: valueFAdv && valueFAdv[0] ? (valueFAdv[0] as moment.Moment).format("YYYY-MM-DD") : "",
                    endT: valueFAdv && valueFAdv[1] ? (valueFAdv[1] as moment.Moment).format("YYYY-MM-DD") : "",
                }
            })
        } else if (tabType === "pack") {
            const rec = record as AdvPackListType;
            let advt: Array<string> = [];
            setSerachTextForSet(advtext => {
                advtext = (advtext as string[]);
                if (Array.isArray(advtext)) advtext.unshift(`${rec.packId}#^*_广告系列-${rec.appName}`);
                else advtext = [`${rec.packId}#^*_广告集-${rec.appName}`]
                advt = [...advtext];
                return [...advtext]
            });
            advt = Array.from(new Set(advt))
            const sIds: Array<number> = [];
            if (advt && advt[0]) {
                advt.forEach(st => {
                    if (st.indexOf("#^*_") != -1) {
                        const sId = Number.parseInt(st.split("#^*_")[0], 10);
                        sIds.push(sId);
                    }
                })
            }
            setTabKey("2");
            dispatch({
                type: 'adv/fetchAdvSetList', payload: {
                    current: 1,
                    size: advSetPagesize,
                    packids: sIds.join(","),
                    setName: Array.isArray(advt) ? advt.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                    startT: valueFSet && valueFSet[0] ? (valueFSet[0] as moment.Moment).format("YYYY-MM-DD") : "",
                    endT: valueFSet && valueFSet[1] ? (valueFSet[1] as moment.Moment).format("YYYY-MM-DD") : "",
                }
            })
        }
    }

    const packInputTagRef = useRef<{ changeVal: () => Array<string>; }>();
    const setInputTagRef = useRef<{ changeVal: () => Array<string>; }>();
    const advInputTagRef = useRef<{ changeVal: () => Array<string>; }>();

    const [tabKey, setTabKey] = useState("1");
    return (
        <>
            <div className={styles.advManager}>
                <Card>
                    <Tabs className={styles.advTabs} activeKey={tabKey} onChange={(key) => {
                        setTabKey(key);
                    }} defaultActiveKey="1">
                        <TabPane tab="广告系列" key="1">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Space>
                                        <InputTag onChange={(val: string[]) => {
                                            setSearchText(val);
                                        }} ref={packInputTagRef} placeholder="广告系列名称关键词搜索" value={serachText}
                                            enterButton={true} style={{ width: 300 }} />
                                        <Button type="primary" icon={<SearchOutlined />} onClick={() => {
                                            let sText = packInputTagRef.current?.changeVal();
                                            setSearchText(sText);
                                            dispatch({
                                                type: 'adv/fetchAdvPackList', payload: {
                                                    current: 1,
                                                    size: advpackPagesize,
                                                    appName: Array.isArray(sText) ? sText.join(" ") : "",
                                                    startT: value && value[0] ? (value[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                    endT: value && value[1] ? (value[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                                }
                                            })
                                        }}>
                                            搜索
                                        </Button>
                                    </Space>
                                </Col>
                                <Col span={12} style={{ textAlign: "right" }}>
                                    <Button type="primary" onClick={() => {
                                        history.push('/advlauncher/workbench');
                                    }}>创建新的</Button>
                                    &nbsp;
                                    &nbsp;
                                    <DateRange
                                        defaultValue={[moment(new Date()).subtract(1, 'months'), moment()]}
                                        onChange={(dateString, dateObj) => {
                                            setValue(dateObj)
                                            let sText = serachText;
                                            dispatch({
                                                type: 'adv/fetchAdvPackList', payload: {
                                                    current: advpackPageindex,
                                                    size: advpackPagesize,
                                                    appName: Array.isArray(sText) ? sText.join(" ") : "",
                                                    startT: dateObj && dateObj[0] ? (dateObj[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                    endT: dateObj && dateObj[1] ? (dateObj[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                                }
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Table scroll={{ x: 1300 }} className={styles.advTb} pagination={false}
                                loading={loadingAdvPack}
                                columns={advpackColumns}
                                rowKey="packId"
                                dataSource={advPackList}
                                footer={() =>
                                (<Pagination defaultCurrent={1}
                                    total={advPackTotal}
                                    pageSize={advpackPagesize}
                                    current={advpackPageindex}
                                    onChange={(pi) => {
                                        setAdvpackPageindex(pi);
                                    }}
                                    onShowSizeChange={(pi, pz) => {
                                        setAdvpackPagesize(pz);
                                    }}

                                />)
                                }
                            >
                            </Table>
                        </TabPane>
                        <TabPane tab="广告集" key="2">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Space key={serachTextForSet ? serachTextForSet[0] : "1"}>

                                        <InputTag onChange={(val: string[]) => {
                                            setSerachTextForSet(val);
                                        }} key="2" ref={setInputTagRef} placeholder="广告集名称关键词搜索"
                                            value={serachTextForSet} enterButton={true} style={{ width: 300 }} />
                                        <Button type="primary" icon={<SearchOutlined />} onClick={() => {
                                            let sText = setInputTagRef.current?.changeVal();
                                            sText = sText as string[];
                                            sText = Array.from(new Set(sText))
                                            const sIds: Array<number> = [];
                                            if (sText && sText[0]) {
                                                sText.forEach(st => {
                                                    if (st.indexOf("#^*_") != -1) {
                                                        const sId = Number.parseInt(st.split("#^*_")[0], 10);
                                                        sIds.push(sId);
                                                    }
                                                })
                                            }
                                            setSerachTextForSet(sText);
                                            dispatch({
                                                type: 'adv/fetchAdvSetList', payload: {
                                                    current: 1,
                                                    size: advpackPagesize,
                                                    packids: sIds.join(","),
                                                    setName: Array.isArray(sText) ? sText.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                                                    startT: valueFSet && valueFSet[0] ? (valueFSet[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                    endT: valueFSet && valueFSet[1] ? (valueFSet[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                                }
                                            })
                                        }}>
                                            搜索
                                        </Button>
                                    </Space>
                                </Col>
                                <Col span={12} style={{ textAlign: "right" }}>
                                    <Button type="primary" onClick={() => {
                                        history.push('/advlauncher/workbench');
                                    }}>创建新的</Button>
                                    &nbsp;
                                    &nbsp;
                                    <DateRange
                                        defaultValue={[moment(new Date()).subtract(1, 'months'), moment()]}
                                        onChange={(dateString, dateObj) => {
                                            setValueFSet(dateObj)
                                            let sText = serachTextForSet;
                                            sText = sText as string[];
                                            sText = Array.from(new Set(sText))
                                            const sIds: Array<number> = [];
                                            if (sText && sText[0]) {
                                                sText.forEach(st => {
                                                    if (st.indexOf("#^*_") != -1) {
                                                        const sId = Number.parseInt(st.split("#^*_")[0], 10);
                                                        sIds.push(sId);
                                                    }
                                                })
                                            }
                                            setSerachTextForSet(sText);
                                            dispatch({
                                                type: 'adv/fetchAdvSetList', payload: {
                                                    current: 1,
                                                    size: advpackPagesize,
                                                    packids: sIds.join(","),
                                                    setName: Array.isArray(sText) ? sText.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                                                    startT: dateObj && dateObj[0] ? (dateObj[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                    endT: dateObj && dateObj[1] ? (dateObj[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                                }
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Table className="adv-tb" pagination={false} loading={loadingAdvSet} columns={advSetColumns}
                                rowKey="setId"
                                scroll={{ x: 1300 }}
                                dataSource={advSetList}
                                footer={() =>
                                (<Pagination defaultCurrent={1}
                                    total={advSetTotal}
                                    pageSize={advSetPagesize}
                                    current={advSetPageindex}
                                    onChange={(pi) => {
                                        setAdvSetPageindex(pi);
                                    }}
                                    onShowSizeChange={(pi, pz) => {
                                        setAdvSetPagesize(pz);
                                    }}

                                />)
                                }
                            >
                            </Table>
                        </TabPane>
                        <TabPane tab="广告" key="3">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Space key={serachTextForAdv ? serachTextForAdv[0] : "1"}>
                                        <InputTag onChange={(val: string[]) => {
                                            setSerachTextForAdv(val);
                                        }} key="3" ref={advInputTagRef} placeholder="广告名称关键词搜索" value={serachTextForAdv}
                                            enterButton={true} style={{ width: 300 }} />
                                        <Button type="primary" icon={<SearchOutlined />} onClick={() => {
                                            let sText = advInputTagRef.current?.changeVal();
                                            sText = sText as string[];
                                            sText = Array.from(new Set(sText));
                                            const sIds: Array<number> = [];
                                            if (sText && sText[0]) {
                                                sText.forEach(st => {
                                                    if (st.indexOf("#^*_") != -1) {
                                                        const sId = Number.parseInt(st.split("#^*_")[0], 10);
                                                        sIds.push(sId);
                                                    }
                                                })
                                            }
                                            setSerachTextForAdv(sText);
                                            dispatch({
                                                type: 'adv/fetchAdvAdvList', payload: {
                                                    current: 1,
                                                    size: advpackPagesize,
                                                    setids: sIds.join(","),
                                                    advName: Array.isArray(sText) ? sText.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                                                    startT: valueFAdv && valueFAdv[0] ? (valueFAdv[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                    endT: valueFAdv && valueFAdv[1] ? (valueFAdv[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                                }
                                            })
                                        }}>
                                            搜索
                                        </Button>
                                    </Space>
                                </Col>
                                <Col span={12} style={{ textAlign: "right" }}>
                                    <Button type="primary" onClick={() => {
                                        history.push('/advlauncher/workbench');
                                    }}>创建新的</Button>
                                    &nbsp;
                                    &nbsp;
                                    <DateRange
                                        defaultValue={[moment(new Date()).subtract(1, 'months'), moment()]}
                                        onChange={(dateString, dateObj) => {
                                            setValueFAdv(dateObj)
                                            let sText = advInputTagRef.current?.changeVal();
                                            sText = sText as string[];
                                            sText = Array.from(new Set(sText));
                                            const sIds: Array<number> = [];
                                            if (sText && sText[0]) {
                                                sText.forEach(st => {
                                                    if (st.indexOf("#^*_") != -1) {
                                                        const sId = Number.parseInt(st.split("#^*_")[0], 10);
                                                        sIds.push(sId);
                                                    }
                                                })
                                            }
                                            setSerachTextForAdv(sText);
                                            dispatch({
                                                type: 'adv/fetchAdvAdvList', payload: {
                                                    current: 1,
                                                    size: advpackPagesize,
                                                    setids: sIds.join(","),
                                                    advName: Array.isArray(sText) ? sText.filter(st => st.indexOf("#^*_") === -1).join(" ") : "",
                                                    startT: dateObj && dateObj[0] ? (dateObj[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                    endT: dateObj && dateObj[1] ? (dateObj[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                                }
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Table className="adv-tb" pagination={false} loading={loadingAdvAdv} columns={advAdvColumns}
                                rowKey="setId"
                                dataSource={advAdvList}
                                scroll={{ x: 1300 }}
                                footer={() =>
                                (<Pagination defaultCurrent={1}
                                    total={advAdvTotal}
                                    pageSize={advAdvPagesize}
                                    current={advAdvPageindex}
                                    onChange={(pi) => {
                                        setAdvAdvPageindex(pi);
                                    }}
                                    onShowSizeChange={(pi, pz) => {
                                        setAdvAdvPagesize(pz);
                                    }}

                                />)
                                }
                            >
                            </Table>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}
export default connect(({ adv, loading }: { adv: AdvData, loading: { effects: { [key: string]: boolean } } }) => ({
    adv: adv,
    advPackTotal: adv.advPackTotal,
    advSetTotal: adv.advSetTotal,
    advAdvTotal: adv.advAdvTotal,
    advPackList: adv.advPackList,
    advSetList: adv.advSetList,
    advAdvList: adv.advAdvList,
    loadingAdvPack: loading.effects['adv/fetchAdvPackList'],
    loadingAdvSet: loading.effects['adv/fetchAdvSetList'],
    loadingAdvAdv: loading.effects['adv/fetchAdvAdvList'],
}))(AdvManager)