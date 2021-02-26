import {Card, Tabs, Table, Popover, Checkbox, Button, Row, Col, Pagination, Input, DatePicker} from 'antd'
import React, {FC, ReactNode, useEffect, useState} from 'react'
import moment from 'moment'
import {connect, Dispatch} from 'umi'
import {AdvPackTree, DataNode} from './components/AdvPackTree'
import {AdvAdvListType, AdvData, AdvPackListType, AdvSetListType} from './data.d'
import {useDidMountEffect} from "@/utils/customerHooks";
import styles from './index.less';

type EventValue<DateType> = DateType | null;

type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;

type CheckboxValueType = string | number | boolean;

const {TabPane} = Tabs

interface AdvPropsType {
    advPackList: AdvPackListType[],
    advPackTotal: number,
    loadingAdvPack: boolean,
    dispatch: Dispatch
}

interface Columns {
    title: string,
    key: string,
    dataIndex: string,
    width?:number,
    render?: (param: number | string, _: AdvPackListType) => string | number | ReactNode
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
    const [dates, setDates] = useState<RangeValue<moment.Moment>>();
    const [hackValue, setHackValue] = useState<RangeValue<moment.Moment>>();
    const [value, setValue] = useState<RangeValue<moment.Moment>>();
    const disabledDate: (currentDate: moment.Moment) => boolean = current => {
        if (!dates || (dates as Array<moment.Moment>).length === 0) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
        return !!(tooEarly || tooLate);
    };
    const onOpenChange = (open: boolean) => {
        if (open) {
            setHackValue(null);
            setDates(null);
        } else {
            setHackValue(undefined);
        }
    };

    const advpackOriginColumns: Columns[] = [
        {
            title: '名称',
            dataIndex: 'appName',
            key: 'appName',
            width:450,
            render: (text, _) => {
                const getAdvSetListForTreeView:(key:string)=>Promise<{res:AdvSetListType[]|AdvPackListType[]|AdvAdvListType[],isAdv:boolean}>= (key: string) => {
                    return new Promise((resolve,reject) => {
                        if(key.toString().indexOf("adv_")!==-1){
                            reject();
                            return;
                        }
                        if(key.toString().indexOf("set_")!==-1){
                            dispatch({
                                type: 'adv/fetchAdvAdvListForTreeView',
                                payload: {
                                    setId: key.split("_")[1]
                                }
                            }).then((result:AdvSetListType[])=>{
                                resolve({res:result,isAdv:true});
                            });
                        }else{
                            dispatch({
                                type: 'adv/fetchAdvSetListForTreeView',
                                payload: {
                                    packId: key
                                }
                            }).then((result:AdvSetListType[])=>{
                                resolve({res:result,isAdv:false});
                            });
                        }

                    })
                }


                const advAdv:(param:{node:DataNode,isOn:boolean})=>Promise<boolean>= (param) => {
                    const {node,isOn} = param;
                    return new Promise((resolve,reject) => {
                        if(node.key.toString().indexOf("adv_")!==-1){
                            dispatch({
                                type: 'adv/advAdv',
                                payload: {
                                    fbId: node.fbId,
                                    state:isOn?"1":"0"
                                }
                            }).then((result:boolean)=>{
                                resolve(result);
                            })
                            return;
                        }
                        if(node.key.toString().indexOf("set_")!==-1){
                            dispatch({
                                type: 'adv/advSet',
                                payload: {
                                    fbId:node.fbId,
                                    state:isOn?"1":"0"
                                }
                            }).then((result:boolean)=>{
                                resolve(result);
                            })
                        }else{
                            dispatch({
                                type: 'adv/advPack',
                                payload: {
                                    fbId:node.fbId,
                                    state:isOn?"1":"0"
                                }
                            }).then((result:boolean)=>{
                                resolve(result);
                            })
                        }
                    })
                }
                return (<AdvPackTree _={_} text={text} getAdvSetListForTreeView={getAdvSetListForTreeView} advAdv={advAdv}/>)
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
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
    const [serachText, setSearchText] = useState<string>("");
    const {advPackList, loadingAdvPack, advPackTotal, dispatch} = props;
    useEffect(() => {
        dispatch({
            type: 'adv/fetchAdvPackList', payload: {
                current: advpackPageindex,
                size: advpackPagesize,
                appName: serachText,
                startT: value && value[0] ? (value[0] as moment.Moment).format("yyyy-MM-dd") : "",
                endT: value && value[1] ? (value[1] as moment.Moment).format("yyyy-MM-dd") : "",
            }
        })
    }, [advpackPageindex]);
    useDidMountEffect(() => {
        dispatch({
            type: 'adv/fetchAdvPackList', payload: {
                current: advpackPageindex,
                size: advpackPagesize,
                appName: serachText,
                startT: value && value[0] ? (value[0] as moment.Moment).format("yyyy-MM-dd") : "",
                endT: value && value[1] ? (value[1] as moment.Moment).format("yyyy-MM-dd") : "",
            }
        })
    }, [advpackPagesize]);


    return (
        <>
            <div className={styles.advManager}>
            <Card>
                <Tabs defaultActiveKey="1"
                      tabBarExtraContent={<CheckboxListPopover columns={advpackOriginColumns} title="列筛选"
                                                               onChange={selectedValues => {
                                                                   setAdvpackColumns(advpackOriginColumns.filter(item => selectedValues.find(value => value === item.dataIndex)));
                                                               }}>
                          <Button type="link">列筛选</Button>
                      </CheckboxListPopover>}>
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
                                            startT: value && value[0] ? (value[0] as moment.Moment).format("yyyy-MM-dd") : "",
                                            endT: value && value[1] ? (value[1] as moment.Moment).format("yyyy-MM-dd") : "",
                                        }
                                    })
                                }} style={{width: 300}}/>
                            </Col>
                            <Col span={12} style={{textAlign: "right"}}>
                                <DatePicker.RangePicker
                                    value={hackValue || value}
                                    disabledDate={disabledDate}
                                    onCalendarChange={val => setDates(val)}
                                    onChange={val => setValue(val)}
                                    onOpenChange={onOpenChange}
                                />
                            </Col>
                        </Row>
                        <Table className="adv-tb" pagination={false} loading={loadingAdvPack} columns={advpackColumns} rowKey="packId"
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
                        广告集
                    </TabPane>
                    <TabPane tab="广告" key="3">
                        广告
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
    advPackList: adv.advPackList,
    loadingAdvPack: loading.effects['adv/fetchAdvPackList']
}))(AdvManager)