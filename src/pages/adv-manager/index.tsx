import {Card, Tabs, Table, Popover, Checkbox, Button, Row, Col, Pagination, Input} from 'antd'
import React, {FC, ReactNode, useEffect, useState} from 'react'
import moment from 'moment'
import {connect, Dispatch} from 'umi'
import {AdvPackTree, DataNode} from './components/AdvPackTree'
import {AdvAdvListType, AdvData, AdvPackListType, AdvSetListType} from './data.d'
import {useDidMountEffect} from "@/utils/customerHooks";
import DateRange from "../adv-launcher/components/DateRange";
import styles from './index.less';

type EventValue<DateType> = DateType | null;

type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;

type CheckboxValueType = string | number | boolean;

const {TabPane} = Tabs

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
    title: string,
    key: string,
    dataIndex: string,
    width?: number,
    render?: (param: number | string, _: AdvPackListType | AdvSetListType | AdvAdvListType) => string | number | ReactNode
}

export interface CheckboxListPopoverPropsType {
    columns: Columns[],
    title: string,
    onChange: (checkValues: CheckboxValueType[]) => void
}

const CheckboxListPopover: FC<CheckboxListPopoverPropsType> = props => {
    const options = props.columns.map(col => {
        return {label: col.title, value: col.dataIndex ? col.dataIndex : "1"};
    });
    return (<Popover trigger="click" title={props.title} placement="bottomLeft" content={(<div>
        <Checkbox.Group
            options={options}
            defaultValue={options.map(item => item.value)}
            onChange={props.onChange}
        />
    </div>)}>
        {props.children}
    </Popover>);
}

const AdvManager: FC<AdvPropsType> = (props) => {
    /*const [dates, setDates] = useState<RangeValue<moment.Moment>>();*/
    const [value, setValue] = useState<RangeValue<moment.Moment>>();
    const [valueFSet, setValueFSet] = useState<RangeValue<moment.Moment>>();
    const [valueFAdv, setValueFAdv] = useState<RangeValue<moment.Moment>>();
    /*const disabledDate: (currentDate: moment.Moment) => boolean = current => {
        if (!dates || (dates as Array<moment.Moment>).length === 0) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
        return !!(tooEarly || tooLate);
    };*/
    /*const onOpenChange = (open: boolean) => {
        if (open) {
            setDates(null);
        } else {
        }
    };*/

    const advpackOriginColumns: Columns[] = [
        {
            title: '名称',
            dataIndex: 'appName',
            key: 'appName',
            width: 450,
            render: (t, _) => {
                const text = (_ as AdvPackListType).appName;
                const getAdvSetListForTreeView: (key: string) => Promise<{ res: AdvSetListType[] | AdvPackListType[] | AdvAdvListType[], isAdv: boolean }> = (key: string) => {
                    return new Promise((resolve, reject) => {
                        if (key.toString().indexOf("adv_") !== -1) {
                            reject();
                            return;
                        }
                        if (key.toString().indexOf("set_") !== -1) {
                            dispatch({
                                type: 'adv/fetchAdvAdvListForTreeView',
                                payload: {
                                    setId: key.split("_")[1]
                                }
                            }).then((result: AdvAdvListType[]) => {
                                resolve({res: result, isAdv: true});
                            });
                        } else {
                            dispatch({
                                type: 'adv/fetchAdvSetListForTreeView',
                                payload: {
                                    packId: key
                                }
                            }).then((result: AdvSetListType[]) => {
                                resolve({res: result, isAdv: false});
                            });
                        }

                    })
                }


                const advAdv: (param: { node: DataNode, isOn: boolean }) => Promise<boolean> = (param) => {
                    const {node, isOn} = param;
                    return new Promise((resolve, reject) => {
                        if (node.key.toString().indexOf("adv_") !== -1) {
                            dispatch({
                                type: 'adv/advAdv',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                            return;
                        }
                        if (node.key.toString().indexOf("set_") !== -1) {
                            dispatch({
                                type: 'adv/advSet',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                        } else {
                            dispatch({
                                type: 'adv/advPack',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                        }
                    })
                }
                return (<AdvPackTree isPack _={_} text={text} getAdvSetListForTreeView={getAdvSetListForTreeView}
                                     advAdv={advAdv}/>)
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
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
            title: '展示数',
            dataIndex: 'impression',
            key: 'impression',
        },
        {
            title: '点击数',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            title: '每结果成本',
            dataIndex: 'pfee',
            key: 'pfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '移动应用回报率',
            dataIndex: 'approas',
            key: 'approas',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '消费金额',
            dataIndex: 'apet',
            key: 'apet',

            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '点击率',
            dataIndex: 'ctr',
            key: 'ctr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '频率',
            dataIndex: 'frequency',
            key: 'frequency',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '费用/千次',
            dataIndex: 'cpm',
            key: 'cpm',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '出站点击率',
            dataIndex: 'octr',
            key: 'octr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '每次点击费用',
            dataIndex: 'cpc',
            key: 'cpc',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '安装数',
            dataIndex: 'installs',
            key: 'installs',
        },
        {
            title: '每次安装费用',
            dataIndex: 'installfee',
            key: 'installfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
    ];
    const advSetOriginColumns: Columns[] = [
        {
            title: '名称',
            dataIndex: 'setName',
            key: 'setName',
            width: 450,
            render: (t, _) => {
                const text = (_ as AdvSetListType).setName;
                const getAdvSetListForTreeView: (key: string) => Promise<{ res: AdvSetListType[] | AdvPackListType[] | AdvAdvListType[], isAdv: boolean }> = (key: string) => {
                    return new Promise((resolve, reject) => {
                        if (key.toString().indexOf("adv_") !== -1) {
                            reject();
                            return;
                        }
                        if (key.toString().indexOf("set_") !== -1) {
                            dispatch({
                                type: 'adv/fetchAdvAdvListForTreeView',
                                payload: {
                                    setId: key.split("_")[1]
                                }
                            }).then((result: AdvSetListType[]) => {
                                resolve({res: result, isAdv: true});
                            });
                        } else {
                            dispatch({
                                type: 'adv/fetchAdvSetListForTreeView',
                                payload: {
                                    packId: key
                                }
                            }).then((result: AdvSetListType[]) => {
                                resolve({res: result, isAdv: false});
                            });
                        }

                    })
                }


                const advAdv: (param: { node: DataNode, isOn: boolean }) => Promise<boolean> = (param) => {
                    const {node, isOn} = param;
                    return new Promise((resolve, reject) => {
                        if (node.key.toString().indexOf("adv_") !== -1) {
                            dispatch({
                                type: 'adv/advAdv',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                            return;
                        }
                        if (node.key.toString().indexOf("set_") !== -1) {
                            dispatch({
                                type: 'adv/advSet',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                        } else {
                            dispatch({
                                type: 'adv/advPack',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                        }
                    })
                }
                return (<AdvPackTree _={_} text={text} getAdvSetListForTreeView={getAdvSetListForTreeView}
                                     advAdv={advAdv}/>)
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (t, _) => {
                const status = (_ as AdvSetListType).status;
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
            title: '展示数',
            dataIndex: 'impression',
            key: 'impression',
        },

        {
            title: '点击数',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            title: '每结果成本',
            dataIndex: 'pfee',
            key: 'pfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '移动应用回报率',
            dataIndex: 'approas',
            key: 'approas',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '消费金额',
            dataIndex: 'apet',
            key: 'apet',

            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '点击率',
            dataIndex: 'ctr',
            key: 'ctr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '频率',
            dataIndex: 'frequency',
            key: 'frequency',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '费用/千次',
            dataIndex: 'cpm',
            key: 'cpm',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '出站点击率',
            dataIndex: 'octr',
            key: 'octr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '每次点击费用',
            dataIndex: 'cpc',
            key: 'cpc',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '安装数',
            dataIndex: 'installs',
            key: 'installs',
        },
        {
            title: '每次安装费用',
            dataIndex: 'installfee',
            key: 'installfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
    ];
    const advAdvOriginColumns: Columns[] = [
        {
            title: '名称',
            dataIndex: 'advName',
            key: 'advName',
            width: 450,
            render: (t, _) => {
                const text = (_ as AdvAdvListType).advName;
                const getAdvSetListForTreeView: (key: string) => Promise<{ res: AdvSetListType[] | AdvPackListType[] | AdvAdvListType[], isAdv: boolean }> = (key: string) => {
                    return new Promise((resolve, reject) => {
                        if (key.toString().indexOf("adv_") !== -1) {
                            reject();
                            return;
                        }
                        if (key.toString().indexOf("set_") !== -1) {
                            dispatch({
                                type: 'adv/fetchAdvAdvListForTreeView',
                                payload: {
                                    setId: key.split("_")[1]
                                }
                            }).then((result: AdvSetListType[]) => {
                                resolve({res: result, isAdv: true});
                            });
                        } else {
                            dispatch({
                                type: 'adv/fetchAdvSetListForTreeView',
                                payload: {
                                    packId: key
                                }
                            }).then((result: AdvSetListType[]) => {
                                resolve({res: result, isAdv: false});
                            });
                        }

                    })
                }


                const advAdv: (param: { node: DataNode, isOn: boolean }) => Promise<boolean> = (param) => {
                    const {node, isOn} = param;
                    return new Promise((resolve, reject) => {
                        if (node.key.toString().indexOf("adv_") !== -1) {
                            dispatch({
                                type: 'adv/advAdv',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                            return;
                        }
                        if (node.key.toString().indexOf("set_") !== -1) {
                            dispatch({
                                type: 'adv/advSet',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                        } else {
                            dispatch({
                                type: 'adv/advPack',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                        }
                    })
                }
                return (
                    <AdvPackTree _={_} text={text} getAdvSetListForTreeView={getAdvSetListForTreeView} advAdv={advAdv}
                                 isAdv={true}/>)
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (t, _) => {
                const status = (_ as AdvAdvListType).status;
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
            title: '展示数',
            dataIndex: 'impression',
            key: 'impression',
        },

        {
            title: '点击数',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            title: '每结果成本',
            dataIndex: 'pfee',
            key: 'pfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '移动应用回报率',
            dataIndex: 'approas',
            key: 'approas',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '消费金额',
            dataIndex: 'apet',
            key: 'apet',

            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '点击率',
            dataIndex: 'ctr',
            key: 'ctr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '频率',
            dataIndex: 'frequency',
            key: 'frequency',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '费用/千次',
            dataIndex: 'cpm',
            key: 'cpm',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '出站点击率',
            dataIndex: 'octr',
            key: 'octr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '每次点击费用',
            dataIndex: 'cpc',
            key: 'cpc',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '安装数',
            dataIndex: 'installs',
            key: 'installs',
        },
        {
            title: '每次安装费用',
            dataIndex: 'installfee',
            key: 'installfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
    ];
    const advAdvOriginColumns: Columns[] = [
        {
            title: '名称',
            dataIndex: 'advName',
            key: 'advName',
            width: 450,
            render: (t, _) => {
                const text = (_ as AdvAdvListType).advName;
                const getAdvSetListForTreeView: (key: string) => Promise<{ res: AdvSetListType[] | AdvPackListType[] | AdvAdvListType[], isAdv: boolean }> = (key: string) => {
                    return new Promise((resolve, reject) => {
                        if (key.toString().indexOf("adv_") !== -1) {
                            reject();
                            return;
                        }
                        if (key.toString().indexOf("set_") !== -1) {
                            dispatch({
                                type: 'adv/fetchAdvAdvListForTreeView',
                                payload: {
                                    setId: key.split("_")[1]
                                }
                            }).then((result: AdvSetListType[]) => {
                                resolve({res: result, isAdv: true});
                            });
                        } else {
                            dispatch({
                                type: 'adv/fetchAdvSetListForTreeView',
                                payload: {
                                    packId: key
                                }
                            }).then((result: AdvSetListType[]) => {
                                resolve({res: result, isAdv: false});
                            });
                        }

                    })
                }


                const advAdv: (param: { node: DataNode, isOn: boolean }) => Promise<boolean> = (param) => {
                    const {node, isOn} = param;
                    return new Promise((resolve, reject) => {
                        if (node.key.toString().indexOf("adv_") !== -1) {
                            dispatch({
                                type: 'adv/advAdv',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                            return;
                        }
                        if (node.key.toString().indexOf("set_") !== -1) {
                            dispatch({
                                type: 'adv/advSet',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                        } else {
                            dispatch({
                                type: 'adv/advPack',
                                payload: {
                                    fbId: node.fbId,
                                    state: isOn ? "1" : "0"
                                }
                            }).then((result: boolean) => {
                                resolve(result);
                            })
                        }
                    })
                }
                return (
                    <AdvPackTree _={_} text={text} getAdvSetListForTreeView={getAdvSetListForTreeView} advAdv={advAdv}
                                 isAdv={true}/>)
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (t, _) => {
                const status = (_ as AdvAdvListType).status;
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
            title: '展示数',
            dataIndex: 'impression',
            key: 'impression',
        },
        {
            title: '点击数',
            dataIndex: 'clicks',
            key: 'clicks',
        },
        {
            title: '每结果成本',
            dataIndex: 'pfee',
            key: 'pfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '移动应用回报率',
            dataIndex: 'approas',
            key: 'approas',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '消费金额',
            dataIndex: 'apet',
            key: 'apet',

            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '点击率',
            dataIndex: 'ctr',
            key: 'ctr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '频率',
            dataIndex: 'frequency',
            key: 'frequency',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '费用/千次',
            dataIndex: 'cpm',
            key: 'cpm',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '出站点击率',
            dataIndex: 'octr',
            key: 'octr',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '每次点击费用',
            dataIndex: 'cpc',
            key: 'cpc',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
        {
            title: '安装数',
            dataIndex: 'installs',
            key: 'installs',
        },
        {
            title: '每次安装费用',
            dataIndex: 'installfee',
            key: 'installfee',
            render: (number) => {
                return number && (number as number).toFixed(2) || 0
            }
        },
    ];
    const [advpackColumns, setAdvpackColumns] = useState<Columns[]>(advpackOriginColumns);
    const [advpackPagesize, setAdvpackPagesize] = useState<number>(10);
    const [advpackPageindex, setAdvpackPageindex] = useState<number>(1);

    const [advSetColumns, setAdvSetColumns] = useState<Columns[]>(advSetOriginColumns);
    const [advSetPagesize, setAdvSetPagesize] = useState<number>(10);
    const [advSetPageindex, setAdvSetPageindex] = useState<number>(1);

    const [advAdvColumns, setAdvAdvColumns] = useState<Columns[]>(advAdvOriginColumns);
    const [advAdvPagesize, setAdvAdvPagesize] = useState<number>(10);
    const [advAdvPageindex, setAdvAdvPageindex] = useState<number>(1);

    const [serachText, setSearchText] = useState<string>("");
    const [serachTextForSet, setSerachTextForSet] = useState<string>("");
    const [serachTextForAdv, setSerachTextForAdv] = useState<string>("");
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
    useEffect(() => {
        dispatch({
            type: 'adv/fetchAdvPackList', payload: {
                current: advpackPageindex,
                size: advpackPagesize,
                appName: serachText,
                startT: value && value[0] ? (value[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: value && value[1] ? (value[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advpackPageindex]);
    useDidMountEffect(() => {
        dispatch({
            type: 'adv/fetchAdvPackList', payload: {
                current: advpackPageindex,
                size: advpackPagesize,
                appName: serachText,
                startT: value && value[0] ? (value[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: value && value[1] ? (value[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advpackPagesize]);

    useEffect(() => {
        dispatch({
            type: 'adv/fetchAdvSetList', payload: {
                current: advSetPageindex,
                size: advSetPagesize,
                setName: serachTextForSet,
                startT: valueFSet && valueFSet[0] ? (valueFSet[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: valueFSet && valueFSet[1] ? (valueFSet[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advSetPageindex]);
    useDidMountEffect(() => {
        dispatch({
            type: 'adv/fetchAdvSetList', payload: {
                current: advSetPageindex,
                size: advSetPagesize,
                setName: serachTextForSet,
                startT: valueFSet && valueFSet[0] ? (valueFSet[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: valueFSet && valueFSet[1] ? (valueFSet[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advSetPagesize]);


    useEffect(() => {
        dispatch({
            type: 'adv/fetchAdvAdvList', payload: {
                current: advAdvPageindex,
                size: advAdvPagesize,
                advName: serachTextForAdv,
                startT: valueFAdv && valueFAdv[0] ? (valueFAdv[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: valueFAdv && valueFAdv[1] ? (valueFAdv[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advAdvPageindex]);
    useDidMountEffect(() => {
        dispatch({
            type: 'adv/fetchAdvAdvList', payload: {
                current: advAdvPageindex,
                size: advAdvPagesize,
                advName: serachTextForAdv,
                startT: valueFAdv && valueFAdv[0] ? (valueFAdv[0] as moment.Moment).format("YYYY-MM-DD") : "",
                endT: valueFAdv && valueFAdv[1] ? (valueFAdv[1] as moment.Moment).format("YYYY-MM-DD") : "",
            }
        })
    }, [advAdvPagesize]);


    const [tabKey, setTabKey] = useState("1");
    return (
        <>
            <div className={styles.advManager}>
                <Card>
                    <Tabs onChange={(key) => {
                        setTabKey(key)

                    }} defaultActiveKey="1"
                          tabBarExtraContent={
                                <><div style={{display:tabKey=="1"?"block":"none"}} ><CheckboxListPopover columns={advpackOriginColumns}
                                                     title="列筛选"
                                                      onChange={selectedValues => {
                                                          setAdvpackColumns(advpackOriginColumns.filter(item => selectedValues.find(value => value === item.dataIndex)));
                                                      }}>
                                    <Button type="link">列筛选</Button>
                                </CheckboxListPopover></div><div style={{display:tabKey=="2"?"block":"none"}} ><CheckboxListPopover columns={advSetOriginColumns}
                                                                                         title="列筛选"
                                                                                         onChange={selectedValues => {
                                                                                             setAdvSetColumns(advSetOriginColumns.filter(item => selectedValues.find(value => value === item.dataIndex)));
                                                                                         }}>
                                    <Button type="link">列筛选</Button>
                                </CheckboxListPopover></div><div style={{display:tabKey=="3"?"block":"none"}} ><CheckboxListPopover columns={advAdvOriginColumns}
                                                                             title="列筛选"
                                                                             onChange={selectedValues => {
                                                                                 setAdvAdvColumns(advAdvOriginColumns.filter(item => selectedValues.find(value => value === item.dataIndex)));
                                                                             }}>
                                    <Button type="link">列筛选</Button>
                                </CheckboxListPopover></div></>
                          }>
                        <TabPane tab="广告系列" key="1">
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Input.Search placeholder="广告系列名称关键词搜索" enterButton={true} onChange={event => {
                                        setSearchText(event.target.value);
                                    }} onSearch={text => {
                                        dispatch({
                                            type: 'adv/fetchAdvPackList', payload: {
                                                current: advpackPageindex,
                                                size: advpackPagesize,
                                                appName: text,
                                                startT: value && value[0] ? (value[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                endT: value && value[1] ? (value[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                            }
                                        })
                                    }} style={{width: 300}}/>
                                </Col>
                                <Col span={12} style={{textAlign: "right"}}>
                                    <DateRange
                                        onChange={(dateString, dateObj) => {
                                            setValue(dateObj)
                                            dispatch({
                                                type: 'adv/fetchAdvPackList', payload: {
                                                    current: advpackPageindex,
                                                    size: advpackPagesize,
                                                    appName: serachText,
                                                    startT: dateObj && dateObj[0] ? (dateObj[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                    endT: dateObj && dateObj[1] ? (dateObj[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                                }
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Table className="adv-tb" pagination={false} loading={loadingAdvPack}
                                   columns={advpackColumns} rowKey="packId"
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
                                    <Input.Search placeholder="广告集名称关键词搜索" enterButton={true} onChange={event => {
                                        setSerachTextForSet(event.target.value);
                                    }} onSearch={text => {
                                        dispatch({
                                            type: 'adv/fetchAdvSetList', payload: {
                                                current: advSetPageindex,
                                                size: advSetPagesize,
                                                setName: text,
                                                startT: valueFSet && valueFSet[0] ? (valueFSet[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                endT: valueFSet && valueFSet[1] ? (valueFSet[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                            }
                                        })
                                    }} style={{width: 300}}/>
                                </Col>
                                <Col span={12} style={{textAlign: "right"}}>
                                    <DateRange
                                        onChange={(dateString, dateObj) => {
                                            setValueFSet(dateObj)
                                            dispatch({
                                                type: 'adv/fetchAdvSetList', payload: {
                                                    current: advSetPageindex,
                                                    size: advSetPagesize,
                                                    setName: serachTextForSet,
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
                                    <Input.Search placeholder="广告名称关键词搜索" enterButton={true} onChange={event => {
                                        setSerachTextForAdv(event.target.value);
                                    }} onSearch={text => {
                                        dispatch({
                                            type: 'adv/fetchAdvAdvList', payload: {
                                                current: advAdvPageindex,
                                                size: advAdvPagesize,
                                                advName: text,
                                                startT: valueFAdv && valueFAdv[0] ? (valueFAdv[0] as moment.Moment).format("YYYY-MM-DD") : "",
                                                endT: valueFAdv && valueFAdv[1] ? (valueFAdv[1] as moment.Moment).format("YYYY-MM-DD") : "",
                                            }
                                        })
                                    }} style={{width: 300}}/>
                                </Col>
                                <Col span={12} style={{textAlign: "right"}}>
                                    <DateRange
                                        onChange={(dateString, dateObj) => {
                                            setValueFAdv(dateObj)
                                            dispatch({
                                                type: 'adv/fetchAdvAdvList', payload: {
                                                    current: advAdvPageindex,
                                                    size: advAdvPagesize,
                                                    advName: serachTextForAdv,
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
export default connect(({adv, loading}: { adv: AdvData, loading: { effects: { [key: string]: boolean } } }) => ({
    adv: adv,
    advPackTotal: adv.advPackTotal,
    advSetTotal: adv.advSetTotal,
    advAdvTotal: adv.advAdvTotal,
    advPackList: adv.advPackList,
    advSetList: adv.advSetList,
    advAdvList: adv.advAdvList,
    loadingAdvPack: loading.effects['adv/fetchAdvPackList'],
    loadingAdvSet: loading.effects['adv/fetchAdvSetList'],
    loadingAdvAdv: loading.effects['adv/fetchAdvAdvList']
}))(AdvManager)