import React, {FC, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Table, Button, Select, Input, Row, Col, Space} from 'antd';
import styles from "@/pages/dashboard/index.less";
import {ColumnsType} from "antd/es/table";
import { history } from 'umi';

const { Search } = Input;
const { Option } = Select;

interface SummaryProps {
  isLoading: boolean;

}

const Summary: FC<SummaryProps> = (props) => {
  const { isLoading } = props
  const columns: ColumnsType<object> = [
    {
      title: '状态',
      width: 180,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '战术名称',
      width: 120,
      dataIndex: 'resultName',
      key: 'resultName',
    },
    {
      title: '作者',
      dataIndex: 'reach',
      key: 'reach',
      width: 120,
    },
    {
      title: '正在/实体上',
      dataIndex: 'impression',
      key: 'impression',
      width: 120,
    },
    {
      title: '点击数',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 120,
    },
    {
      title: '最后触发',
      dataIndex: 'pfee',
      key: 'pfee',
      width: 120,
    }
  ];

  // todo: actions可以用于，当没有自动化策略时，提示用户去创建自动化策略
  const actions = [
    <Search placeholder="input search text" />,

  ]

  const title = (
    <div>
      <Row justify="space-between">
        <Col>
          管理xxx的自动化策略
        </Col>
        <Col span={2}><Button onClick={() => history.push('/automation/wizard')}>创造战术</Button></Col>
      </Row>
      <Space size="large">
        <Search placeholder="搜索策略" />
        <label>
          看法：
          <Select style={{width: 120}}>
            <Option value="all">所有作者</Option>
          </Select>
        </label>
        <label>
          展示：
          <Select style={{width: 120}}>
            <Option value="all">所有状态</Option>
          </Select>
        </label>
      </Space>
    </div>
  )

  return (
    <PageContainer>
      <Card
        className={`${styles.totalCard}`}
        title={title}
        loading={isLoading}
      >
        <Table
          columns={columns}
          rowKey="id"
        />
      </Card>
    </PageContainer>
  )
}

export default Summary;
