import React, {FC, useState, useEffect} from 'react';
import {connect, Dispatch} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Table, Button, Select, Input, Row, Col, Space, Modal, List, Collapse, Tag} from 'antd';
import styles from "@/pages/dashboard/index.less";
import {ColumnsType} from "antd/es/table";
import {history, Link} from 'umi';
import {TStateTacticSummary, TTactic} from "@/pages/automation/summary/data";
import {EditTwoTone, ExclamationCircleOutlined, PauseCircleTwoTone, PlayCircleTwoTone} from "@ant-design/icons";
import {deleteTactic, pauseTactic, restoreTactic} from "@/pages/automation/summary/service";
import {DeleteTwoTone} from '@ant-design/icons'
import {EActionTypeName} from "@/pages/automation/data.d";

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
  useEffect(() => {
    dispatch({
      type: 'tacticSummary/getTacticList',
      payload: {}
    });
  }, []);

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
        await deleteTactic(recored);
        dispatch({
          type: 'tacticSummary/getTacticList',
          payload: {}
        });

        // console.log('ok');
        // return deletResource(deleteInfo.id).then(() => {
        //   dispatch({
        //     type: 'material/saveMedias',
        //     payload: { mediaList: JSON.parse(JSON.stringify(setArr)) }
        //   })
        // })
      }
    });
  }

  const handlePause = async (record: TTactic, rowIndex: number) => {
    if (record.Status === '0') {
      return;
    }
    await pauseTactic(record);
    tacticSummary.tacticList[rowIndex].Status = '0';
    dispatch({
      type: 'tacticSummary/updateTacticList',
      payload: {
        ...tacticSummary
      }
    })
  }

  const handleRestore = async (record: TTactic, rowIndex: number) => {
    if (record.Status === '1') {
      return;
    }
    await restoreTactic(record);
    tacticSummary.tacticList[rowIndex].Status = '1';
    dispatch({
      type: 'tacticSummary/updateTacticList',
      payload: {
        ...tacticSummary
      }
    });
  }

  const columns: ColumnsType<TTactic> = [
    // {
    //   title: '状态',
    //   width: 80,
    //   dataIndex: 'name',
    //   key: 'name',
    // },
    {
      title: '策略名称',
      dataIndex: 'Name',
      key: 'Name',
    },
    // {
    //   title: '检查次数',
    //   dataIndex: 'checkCount',
    //   key: 'checkCount',
    //   width: 120,
    // },
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
            <PlayCircleTwoTone title="恢复" onClick={() => handleRestore(record, index)} disabled={record.Status === '0'}
                               twoToneColor={record.Status === '1' ? '#9d9d9d' : ''}/>
            <PauseCircleTwoTone title="暂停" onClick={() => handlePause(record, index)} disabled={record.Status === '1'}
                                twoToneColor={record.Status === '0' ? '#9d9d9d' : ''}/>
            <Link title="编辑" to={{pathname: '/automation/wizard', state: {record}}}><EditTwoTone/></Link>
            <DeleteTwoTone title="删除" onClick={() => handleDelete(record, index)} twoToneColor="#ff4d4f"/>
          </Space>
        )
      }
    },
    // {
    //   title: '最后触发',
    //   dataIndex: 'PreProcessMsg',
    //   key: 'PreProcessMsg',
    //   width: 120,
    // }
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

  for (let i = 0; i < tacticSummary.tacticList.length; i += 1) {
    const tactic = tacticSummary.tacticList[i];
    tactic.ActionTypeName = EActionTypeName[tactic.ActionType];

    // todo: 提取出作者列表和状态列表，用于做筛选
  }

  let tacticList = tacticSummary.tacticList.filter(t => t.Name.indexOf(searchTxt) > -1)

  if (actionType !== 'all') {
    tacticList = tacticList.filter(t => t.ActionType === actionType);
  }

  if (status !== 'all') {
    tacticList = tacticList.filter(t => t.Status === status)
  }

  // const [tacticListShow, setTacticListShow] = useState([...tacticList]);
  // console.log('tacticListShow', tacticListShow);

  const title = (
    <div>
      <Row justify="space-between">
        <Col>
          <Space size="large">
            <Search placeholder="搜索策略" value={searchTxt} onChange={e => setSearchTxt(e.target.value)}/>
            <label>
              类型：
              <Select style={{width: 120}} value={actionType} onChange={value => setActionType(value)}>
                {
                  typeList.map(t => <Option key={t.value} value={t.value}>{t.name}</Option>)
                }
              </Select>
            </label>
            <label>
              状态：
              <Select style={{width: 120}} value={status} onChange={value => setStatus(value)}>
                {
                  statusList.map(s => <Option key={s.value} value={s.value}>{s.name}</Option>)
                }
              </Select>
            </label>
          </Space>
        </Col>
        <Col span={2}><Button type="primary" onClick={() => history.push('/automation/wizard')}>创建策略</Button></Col>
      </Row>

    </div>
  )

  return (
    <PageContainer header={{title: '策略管理', breadcrumb: {}}} content='这些自动化策略构建的系统可以通过主动干预来优化您的广告支出，从而最大限度地提高投产比和投放量，减少了低效重复操作，使自主媒体购买和扩展广告运营成为可能，获得更多时间投入创造。'>
      <Card
        className={`${styles.totalCard}`}
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
                      <List.Item key={a.AdvID} style={{marginLeft: 55}}>
                          <Collapse ghost>
                            <Panel key={a.AdvID} header={<Space size="large"><span>{a.ObjName ? a.ObjName : a.AdvID}</span><span>检查次数：{a.CheckTimes}</span><span>执行次数：{a.ExecTimes}</span></Space>}>
                              {
                                a.ExecLog.length > 0 ? a.ExecLog.map(l => <p style={{marginLeft: 20}}>{l}</p>) : <p style={{marginLeft: 20}}>暂无执行记录</p>
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
              if (expanded && !record.IsLoaded && record.AdvObjs && record.AdvObjs.length) {
                // const res = await getActionObjList(record.ActionType, record.AdvObjs.map(o => o.AdvID));
                // const r = tacticSummary.tacticList.find(t => t.ObjectID === record.ObjectID);
                // if (r) {
                //   r.AdvObjs.forEach((o, idx) => {
                //     r.AdvObjs[idx].ObjName = res[idx]
                //   })
                //   r.IsLoaded = true;
                // }
                if (!record.IsLoaded) {
                  dispatch({
                    type: 'tacticSummary/getObjInfo',
                    payload: {
                      objectID: record.ObjectID,
                      actionType: record.ActionType,
                      objIds: record.AdvObjs.map(o => o.AdvID),
                    }
                  });
                }
              }
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
