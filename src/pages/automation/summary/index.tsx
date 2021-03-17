import React, {FC, useState, useEffect} from 'react';
import { connect, Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Table, Button, Select, Input, Row, Col, Space, Modal} from 'antd';
import styles from "@/pages/dashboard/index.less";
import {ColumnsType} from "antd/es/table";
import { history, Link } from 'umi';
import {TStateTacticSummary, TTactic} from "@/pages/automation/summary/data";
import {EditTwoTone, ExclamationCircleOutlined, PauseCircleTwoTone, PlayCircleTwoTone} from "@ant-design/icons";
import {deleteTactic, pauseTactic, restoreTactic} from "@/pages/automation/summary/service";
import {DeleteTwoTone} from '@ant-design/icons'
import {EActionTypeName} from "@/pages/automation/data.d";

const { Search } = Input;
const { Option } = Select;

interface SummaryProps {
  dispatch: Dispatch;
  isLoading: boolean;
  tacticSummary: TStateTacticSummary;
}

const Summary: FC<SummaryProps> = (props) => {
  const { isLoading, dispatch, tacticSummary } = props;
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
      icon: <ExclamationCircleOutlined />,
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
    {
      title: '检查次数',
      dataIndex: 'checkCount',
      key: 'checkCount',
      width: 120,
    },
    {
      title: '执行次数',
      dataIndex: 'executeCount',
      key: 'executeCount',
      width: 120,
    },
    {
      title: '作者',
      dataIndex: 'PlatformId',
      key: 'PlatformId',
      width: 120,
    },
    {
      title: '策略类型',
      dataIndex: 'ActionTypeName',
      key: 'ActionTypeName',
      width: 160,
    },
    {
      title: '操作',
      key: 'operation',
      width: 120,
      render: (text, record, index) => {
        return (
          <Space>
          <PlayCircleTwoTone onClick={() => handleRestore(record, index)} disabled={record.Status === '0'} twoToneColor={record.Status === '1' ? '#9d9d9d' : ''} />
          <PauseCircleTwoTone onClick={() => handlePause(record, index)} disabled={record.Status === '1'} twoToneColor={record.Status === '0' ? '#9d9d9d' : ''} />
            {/*<EditTwoTone />*/}
            <Link to={{pathname: '/automation/wizard', state: {record}}}><EditTwoTone /></Link>
          <DeleteTwoTone onClick={() => handleDelete(record, index)} twoToneColor="#ff4d4f" />
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


  const title = (
    <div>
      <Row justify="space-between">
        <Col>
          <Space size="large">
            <Search placeholder="搜索策略" value={searchTxt} onChange={e => setSearchTxt(e.target.value)} />
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
    <PageContainer header={{title: '自动化概述', breadcrumb: {}}}>
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
            expandedRowRender: (record: TTactic) => <p style={{ margin: 0 }}>{record.PreProcessMsg}</p>,
            rowExpandable: record => record.Name !== 'Not Expandable',
          }}
        />
      </Card>
    </PageContainer>
  )
}

// export default Summary;
export default connect(({tacticSummary, loading}: {tacticSummary: TStateTacticSummary, loading: any}) => ({
  isLoading: loading['tacticSummary/getTacticList'],
  tacticSummary
}))(Summary);
