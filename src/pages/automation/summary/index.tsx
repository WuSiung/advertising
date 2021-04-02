import React, {FC, useState, useEffect} from 'react';
import {connect, Dispatch} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Table, Button, Select, Input, Row, Col, Space, Modal, List, Collapse, Badge, Switch, DatePicker} from 'antd';
import {ColumnsType} from "antd/es/table";
import {history, Link} from 'umi';
import {TStateTacticSummary, TTactic} from "@/pages/automation/summary/data";
import {EditTwoTone, ExclamationCircleOutlined, PauseCircleTwoTone, PlayCircleTwoTone} from "@ant-design/icons";
import {deleteTactic, pauseTactic, restoreTactic} from "@/pages/automation/summary/service";
import {DeleteTwoTone} from '@ant-design/icons'
import {EActionTypeName} from "@/pages/automation/data.d";
import styles from './index.less';
import moment, {Moment} from "moment";
import {RangeValue} from "@/pages/dashboard/data";

const {RangePicker} = DatePicker;
const {Search} = Input;
const {Option} = Select;
const { Panel } = Collapse;

interface SummaryProps {
  dispatch: Dispatch;
  isLoading: boolean;
  isExpandLoading: boolean;
  tacticSummary: TStateTacticSummary;
}

const Summary: FC<SummaryProps> = (props) => {
  const {isLoading, isExpandLoading, dispatch, tacticSummary} = props;
  const [searchTxt, setSearchTxt] = useState('');
  const [actionType, setActionType] = useState('all');
  const [status, setStatus] = useState('all');
  const [isAutoRefresh, setAutoRefresh] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isChanged, setIsRangeChanged] = useState(true);
  const [rangeValue, setRangeValue] = useState([moment().subtract(30, 'days'), moment()] as RangeValue<moment.Moment>);
  // const [isTypeChange, setIsTypeChange] = useState(false);
  const handleRefresh = () => {
    // console.log('isAutoRefresh', isAutoRefresh);
    let [act, start, end] = [actionType, '', ''];

    if (act === 'all') {
      act = '';
    }

    // if (sts === 'all') {
    //   sts = '';
    // }

    if (rangeValue) {
      if (rangeValue[0]) {
        start = rangeValue[0].format('YYYY-MM-DD 00:00:00');
      }

      if (rangeValue[1]) {
        end = rangeValue[1]?.format('YYYY-MM-DD 23:59:59');
      }
    }
    dispatch({
      type: 'tacticSummary/getTacticList',
      payload: {
        Name: searchTxt,
        ActionType: act,
        StartTime: start,
        EndTime: end
      }
    });
  }

  const handleAutoRefresh = () => {
    if (isAutoRefresh) {
      handleRefresh()
    }
  }

  useEffect(() => {
    handleRefresh();
  }, [isOpen, actionType]);

  // 所有查询参数的改变，都要放入依赖
  useEffect(() => {
    const intervalId = setInterval(handleAutoRefresh, 60000);

    return function cleanInterval() {
      clearInterval(intervalId);
    }
  }, [searchTxt, actionType, rangeValue, isAutoRefresh]);

  const handleTypeChange = (value: string) => {
    setActionType(value);
    // setIsTypeChange(true);
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleRangeChange = (dates: RangeValue<Moment>, dataStrings: [string, string]) => {
    setRangeValue(dates)
    setIsRangeChanged(true);
  };

  const handleDelete = (recored: TTactic, rowIndex: number) => {
    // console.log('recored', recored, 'rowIndex: ', rowIndex);
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined/>,
      content: '是否确认删除？',
      okText: '确认',
      okType: 'primary',
      cancelText: '取消',
      async onOk() {
        // todo: 调用接口删除策略，删除成功之后，再本地删除
        const res = await deleteTactic(recored);
        if (res) {
          dispatch({
            type: 'tacticSummary/getTacticList',
            payload: {}
          });
        }
      }
    });
  }

  const handlePause = async (record: TTactic, rowIndex: number) => {
    if (record.Status === '0') {
      return;
    }
    const res = await pauseTactic(record);

    if (res) {
      if (tacticSummary.tacticList) {
        tacticSummary.tacticList[rowIndex].Status = '0';
      }
      dispatch({
        type: 'tacticSummary/updateTacticList',
        payload: {
          ...tacticSummary
        }
      })
    }
  }

  const handleRestore = async (record: TTactic, rowIndex: number) => {
    if (record.Status === '1') {
      return;
    }
    const res = await restoreTactic(record);

    if (res) {
      if (tacticSummary.tacticList) {
        tacticSummary.tacticList[rowIndex].Status = '1';
      }
      dispatch({
        type: 'tacticSummary/updateTacticList',
        payload: {
          ...tacticSummary
        }
      });
    }
  }

  const columns: ColumnsType<TTactic> = [
    {
      title: '策略名称',
      dataIndex: 'Name',
      key: 'Name',
      render: (text: string, record: TTactic, rowIndex) => {
        return <Space><Badge status={record.Status === '1' ? 'success': 'error'} /><span>{record.Name}</span></Space>
      }
    },
    {
      title: '策略ID',
      dataIndex: 'ObjectID',
      key: 'ObjectID',
      width: 200,
    },
    // {
    //   title: '作者',
    //   dataIndex: 'PlatformId',
    //   key: 'PlatformId',
    //   width: 120,
    // },
    {
      title: '策略类型',
      dataIndex: 'ActionTypeName',
      key: 'ActionTypeName',
      width: 160,
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      key: 'CreateTime',
      width: 200,
    },
    {
      title: '操作',
      key: 'operation',
      width: 120,
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <PlayCircleTwoTone title="恢复" onClick={async () => await handleRestore(record, index)} disabled={record.Status === '0'}
                               twoToneColor={record.Status === '1' ? '#9d9d9d' : ''}/>
            <PauseCircleTwoTone title="暂停" onClick={async () => await handlePause(record, index)} disabled={record.Status === '1'}
                                twoToneColor={record.Status === '0' ? '#9d9d9d' : ''}/>
            <Link title="编辑" to={{pathname: '/automation/wizard', state: {record}}}><EditTwoTone/></Link>
            <DeleteTwoTone title="删除" onClick={() => handleDelete(record, index)} twoToneColor="#ff4d4f"/>
          </Space>
        )
      }
    }
  ];


  // todo: Card 的 actions可以用于，当没有自动化策略时，提示用户去创建自动化策略
  // const actions = [
  //   <Search placeholder="input search text" />,
  //
  // ]

  const typeList = [
    {
      value: 'all',
      name: '所有类型'
    },
    {
      value: 'Surf_AdSetLevel',
      name: '冲浪-广告集',
    },
    {
      value: 'Surf_CampaignLevel',
      name: '冲浪-广告系列'
    },
    {
      value: 'StopLoss_AdSetLevel',
      name: '止损-广告集'
    },
    {
      value: 'StopLoss_AdLevel',
      name: '止损-广告'
    },
    {
      value: 'Revive_AdSetLevel',
      name: '复活-广告集'
    },
    {
      value: 'Revive_AdLevel',
      name: '复活-广告'
    }
  ];

  const statusList = [
    {
      value: 'all',
      name: '所有状态'
    },
    {
      value: '0',
      name: '暂停'
    },
    {
      value: '1',
      name: '启动'
    }
  ];

  let tacticList: TTactic[] = [];

  if (tacticSummary.tacticList) {
    for (let i = 0; i < tacticSummary.tacticList.length; i += 1) {
      const tactic = tacticSummary.tacticList[i];
      tactic.ActionTypeName = EActionTypeName[tactic.ActionType];
    }

    // 以下为前端，根据搜索内容，和策略类型过滤
    // tacticList = tacticSummary.tacticList.filter(t => t.Name.indexOf(searchTxt) > -1)

    tacticList = tacticSummary.tacticList.concat()
    // if (actionType !== 'all') {
    //   tacticList = tacticList.filter(t => t.ActionType === actionType);
    // }

    if (status !== 'all') {
      tacticList = tacticList.filter(t => t.Status === status)
    }

    // 按创建时间倒叙排序
      tacticList.sort((t1, t2) => {
        const d1 = new Date(t1.CreateTime).getTime();
        const d2 = new Date(t2.CreateTime).getTime();
        return d2 - d1;
      });
  }





  // let tacticList = tacticSummary.tacticList.filter(t => t.Name.indexOf(searchTxt) > -1)



  // const [tacticListShow, setTacticListShow] = useState([...tacticList]);
  // console.log('tacticListShow', tacticListShow);

  const title = (
    <div>
      <Row justify="end" style={{marginBottom: 10}}>
        <Space size="large">
          <span><Switch checked={isAutoRefresh} onChange={v => setAutoRefresh(v)} />&nbsp;是否自动刷新</span>
          <Button type="primary" onClick={() => handleRefresh()}>刷新</Button>
          <Button type="primary" onClick={() => history.push('/automation/wizard')}>创建策略</Button>
        </Space>
      </Row>
      <Row justify="start">
        <Col>
          <Space size="large">
            <Search placeholder="搜索策略" value={searchTxt} onChange={e => setSearchTxt(e.target.value)} onSearch={handleRefresh} />
            <label>
              类型：
              <Select value={actionType} onChange={handleTypeChange}>
                {
                  typeList.map(t => <Option key={t.value} value={t.value}>{t.name}</Option>)
                }
              </Select>
            </label>
            <label>
              状态：
              <Select value={status} onChange={value => setStatus(value)}>
                {
                  statusList.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)
                }
              </Select>
            </label>
            <label>
              创建时间：
              <RangePicker value={rangeValue}
                 onChange={handleRangeChange}
                 onOpenChange={handleOpenChange}
                 ranges={{
                   '今天': [moment(), moment()],
                   '昨天': [moment(new Date()).add(-1, 'days'), moment(new Date()).add(-1, 'days')],
                   '最近7天': [moment(new Date()).add(-7, 'days'), moment()],
                   '最近14天': [moment(new Date()).add(-14, 'days'), moment()],
                   '最近1个月': [moment(new Date()).subtract(1, 'months'), moment()],
                   '最近3个月': [moment(new Date()).subtract(3, 'months'), moment()],
                   '最近6个月': [moment(new Date()).subtract(6, 'months'), moment()],
                   '最近一年': [moment(new Date()).subtract(1, 'years'), moment()],
                 }}
              />
            </label>
          </Space>
        </Col>
        <Col>
          {/*<Space size="large">*/}
          {/*  <span><Switch checked={isAutoRefresh} onChange={v => setAutoRefresh(v)} />&nbsp;是否自动刷新</span>*/}
          {/*  <Button type="primary" onClick={() => handleRefresh()}>刷新</Button>*/}
          {/*  <Button type="primary" onClick={() => history.push('/automation/wizard')}>创建策略</Button>*/}
          {/*</Space>*/}
        </Col>
      </Row>

    </div>
  )

  return (
    <PageContainer header={{title: '策略管理', breadcrumb: {}}} content='这些自动化策略构建的系统可以通过主动干预来优化您的广告支出，从而最大限度地提高投产比和投放量，减少了低效重复操作，使自主媒体购买和扩展广告运营成为可能，获得更多时间投入创造。'>
      <Card
        className={`${styles.main}`}
        title={title}
        loading={isLoading}
      >
        <Table
          columns={columns}
          dataSource={tacticList}
          rowKey="ObjectID"
          expandable={{
            expandedRowRender: (record: TTactic) => {
              return (
                <List loading={isExpandLoading}>
                  {
                    record.AdvObjs.map(a =>
                      <List.Item key={a.AdvID}>
                          <Collapse ghost>
                            <Panel key={a.AdvID} header={<Space size="large"><span>{a.AdvName ? a.AdvName : a.AdvID}</span><span>{a.FBID}</span><span>检查次数：{a.CheckTimes}</span><span>执行次数：{a.ExecTimes}</span></Space>}>
                              {
                                a.ExecLog.length > 0 ? a.ExecLog.map((l, i) => <p key={i}>{l}</p>) : <p>暂无执行记录</p>
                              }
                            </Panel>
                          </Collapse>
                      </List.Item>
                    )
                  }
                </List>
              )
            },
            rowExpandable: record => record.Name !== 'Not Expandable',
            onExpand: async (expanded, record) => {
              // if (expanded && !record.IsLoaded && record.AdvObjs && record.AdvObjs.length) {
              //   if (!record.IsLoaded) {
              //     dispatch({
              //       type: 'tacticSummary/getObjInfo',
              //       payload: {
              //         objectID: record.ObjectID,
              //         actionType: record.ActionType,
              //         objIds: record.AdvObjs.map(o => o.AdvID),
              //       }
              //     });
              //   }
              // }
            }
          }}
        />
      </Card>
    </PageContainer>
  )
}

// export default Summary;
export default connect(({tacticSummary, loading}: { tacticSummary: TStateTacticSummary, loading: any }) => ({
  isExpandLoading: loading.effects['tacticSummary/getObjInfo'],
  isLoading: loading.effects['tacticSummary/getTacticList'],
  tacticSummary
}))(Summary);
