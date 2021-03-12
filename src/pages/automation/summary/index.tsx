import React, {FC, useState, useEffect} from 'react';
import { connect, Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Table, Button, Select, Input, Row, Col, Space, Modal} from 'antd';
import styles from "@/pages/dashboard/index.less";
import {ColumnsType} from "antd/es/table";
import { history } from 'umi';
import {TStateTacticSummary, TTactic} from "@/pages/automation/summary/data";
import Store from "@/utils/store";
import showComfirm from '@/components/Confrim';
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {deletResource} from "@/pages/adv-launcher/media/service";
import {deleteTactic} from "@/pages/automation/summary/service";

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
  useEffect(() => {
    dispatch({
      type: 'tacticSummary/getTacticList',
      payload: {}
    });
  }, []);

  const handleDelete = (recored: TTactic, rowIndex: number) => {
    console.log('recored', recored, 'rowIndex: ', rowIndex);
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

  const columns: ColumnsType<TTactic> = [
    // {
    //   title: '状态',
    //   width: 80,
    //   dataIndex: 'name',
    //   key: 'name',
    // },
    {
      title: '战术名称',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '作者',
      dataIndex: 'PlatformId',
      key: 'PlatformId',
      width: 120,
    },
    {
      title: '战术类型',
      dataIndex: 'ActionType',
      key: 'ActionType',
      width: 120,
    },
    {
      title: '操作',
      key: 'operation',
      width: 80,
      render: (text, record, index) => {
        return (<a style={{color: 'red'}} onClick={() => handleDelete(record, index)}>停止</a>)
      }
    },
    // {
    //   title: '最后触发',
    //   dataIndex: 'PreProcessMsg',
    //   key: 'PreProcessMsg',
    //   width: 120,
    // }
  ];


  // todo: actions可以用于，当没有自动化策略时，提示用户去创建自动化策略
  // const actions = [
  //   <Search placeholder="input search text" />,
  //
  // ]

  const tacticList = tacticSummary.tacticList.filter(t => t.Name.indexOf(searchTxt) > -1)

  const title = (
    <div>
      <Row justify="space-between">
        <Col>
          管理 {Store.GetUserName()} 的自动化策略
        </Col>
        <Col span={2}><Button type="primary" onClick={() => history.push('/automation/wizard')}>创造战术</Button></Col>
      </Row>
      <Space size="large">
        <Search placeholder="搜索策略" value={searchTxt} onChange={e => setSearchTxt(e.target.value)} />
        <label>
          看法：
          <Select style={{width: 120}} value="all">
            <Option value="all">所有作者</Option>
          </Select>
        </label>
        <label>
          展示：
          <Select style={{width: 120}} value="all">
            <Option value="all">所有状态</Option>
          </Select>
        </label>
      </Space>
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
