import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Card, Select, Space, Table, DatePicker } from 'antd';
// import {Line} from "@ant-design/charts";
import { Area } from '@ant-design/charts';

// const { TabPane } = Tabs;
import { TData, TState } from './data';
import { ColumnsType } from 'antd/es/table';

export type DashboardProps = {
  dispatch: Dispatch;
  dashboard: TState;
};

const { Option } = Select;
const { RangePicker } = DatePicker;

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { dispatch, dashboard } = props;
  useEffect(() => {
    dispatch({
      type: 'dashboard/queryStatistics',
      payload: {
        start: dashboard.rangeValues ? dashboard.rangeValues[0].format('yyyy-MM-DD') : '',
        end: dashboard.rangeValues ? dashboard.rangeValues[1].format('YYYY-MM-DD') : '',
      },
    });
  }, [dashboard.rangeValues]);

  const targetList = [
    {
      name: '每结果成本',
      value: 'pfee',
    },
    {
      name: '移动应用回报率',
      value: 'approas',
    },
    {
      name: '消费金额',
      value: 'spent',
    },
    {
      name: '点击率',
      value: 'ctr',
    },
    {
      name: '频率',
      value: 'frequency',
    },
    {
      name: '费用/前次',
      value: 'cpm',
    },
    {
      name: '出站点击率',
      value: 'octr',
    },
    {
      name: '出站点击数',
      value: 'oclicks',
    },
    {
      name: '每次点击费用',
      value: 'cpc',
    },
    {
      name: '安装数',
      value: 'installs',
    },
    // {
    //   name: '每次安装费用',
    //   value: 'installfee'
    // }, // installfee暂时为null
  ];

  const columns: ColumnsType<object> = [
    {
      title: '统计名称',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: '结果',
      width: 80,
      dataIndex: 'resultName',
      key: 'resultName',
    },
    {
      title: '送达数',
      dataIndex: 'reach',
      key: 'reach',
      width: 80,
    },
    {
      title: '展示数',
      dataIndex: 'impression',
      key: 'impression',
      width: 80,
    },
    {
      title: '点击数',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 80,
    },
    {
      title: '每结果成本',
      dataIndex: 'pfee',
      key: 'pfee',
      width: 120,
    },
    {
      title: '移动应用回报率',
      dataIndex: 'approas',
      key: 'approas',
      width: 150,
    },
    {
      title: '消费金额',
      dataIndex: 'spent',
      key: 'spent',
      width: 100,
    },
    {
      title: '点击率',
      dataIndex: 'ctr',
      key: 'ctr',
      width: 80,
    },
    {
      title: '频率',
      dataIndex: 'frequency',
      key: 'frequency',
      width: 80,
    },
    {
      title: '费用/前次',
      dataIndex: 'cpm',
      key: 'cpm',
      width: 100,
    },
    {
      title: '出站点击率',
      dataIndex: 'octr',
      key: 'octr',
      width: 120,
    },
    {
      title: '出站点击数',
      dataIndex: 'oclicks',
      key: 'oclicks',
      width: 120,
    },
    {
      title: '每次点击费用',
      dataIndex: 'cpc',
      key: 'cpc',
      width: 120,
    },
    {
      title: '安装数',
      dataIndex: 'installs',
      key: 'installs',
      width: 100,
    },
    {
      title: '每次安装费用',
      dataIndex: 'installfee',
      key: 'installfee',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 100,
    },
  ];

  // const data = [
  //   { month: '一月', temperature: 10000, city: '获得' },
  //   { month: '一月', temperature: 15000, city: '重新定位' },
  //   { month: '一月', temperature: 10000, city: '保留' },
  //   { month: '一月', temperature: 15000, city: '消费金额' },
  //   { month: '二月', temperature: 20000, city: '获得' },
  //   { month: '二月', temperature: 25000, city: '重新定位' },
  //   { month: '二月', temperature: 20000, city: '保留' },
  //   { month: '二月', temperature: 25000, city: '消费金额' },
  //   { month: '三月', temperature: 10000, city: '获得' },
  //   { month: '三月', temperature: 20000, city: '重新定位' },
  //   { month: '三月', temperature: 10000, city: '保留' },
  //   { month: '三月', temperature: 20000, city: '消费金额' },
  // ];
  const config = {
    data:
      dashboard.detailDataList && dashboard.detailDataList[0] ? dashboard.detailDataList[0] : [],
    height: 400,
    xField: 'x',
    yField: 'y',
    seriesField: 'target',
    smooth: true,
    area: {
      shape: 'smooth',
    },
    style: {
      backgroundColor: '#fff',
    },
  };

  // const dataInputOutput = [
  //   { month: '一月', temperature: 10000, city: '收入' },
  //   { month: '一月', temperature: 15000, city: '支出' },
  //   { month: '二月', temperature: 10000, city: '收入' },
  //   { month: '二月', temperature: 15000, city: '支出' },
  //   { month: '三月', temperature: 20000, city: '收入' },
  //   { month: '三月', temperature: 25000, city: '支出' },
  //   { month: '四月', temperature: 20000, city: '收入' },
  //   { month: '四月', temperature: 25000, city: '支出' },
  //   { month: '五月', temperature: 10000, city: '收入' },
  //   { month: '五月', temperature: 20000, city: '支出' },
  //   { month: '六月', temperature: 10000, city: '收入' },
  //   { month: '六月', temperature: 20000, city: '支出' },
  // ];

  // return (
  //   <PageContainer>
  //       <Row>
  //           <Col span={8}>
  //             <Area {...config} />
  //           </Col>
  //           <Col span={8}>
  //             <Area {...config} />
  //           </Col>
  //         <Col span={8}>
  //           <Area {...config} />
  //         </Col>
  //       </Row>
  //     <Row style={{marginTop: "25px"}}>
  //       <Tabs defaultActiveKey="1" size="large" type="card" style={{width: "100%", backgroundColor: "#fff"}}>
  //         <TabPane tab="获得" key="1">
  //             <Area {...config} />
  //         </TabPane>
  //         <TabPane tab="重新定位" key="2">
  //             <Area {...config} />
  //         </TabPane>
  //         <TabPane tab="保留" key="3">
  //             <Area {...config} />
  //         </TabPane>
  //       </Tabs>
  //     </Row>
  //     <Row style={{marginTop: "25px"}}>
  //       <Col span={24}>
  //         <Area {...config} />
  //       </Col>
  //     </Row>
  //   </PageContainer>
  // )

  // todo: 根据dashboard.detailDataList 和target1, target2 生成summaryDataList
  const summaryDataList: TData[][] = [];
  const contentList = {};
  if (dashboard.detailDataList) {
    dashboard.detailDataList.forEach((list, idx) => {
      const filterList = list.filter(
        (d) => d.targetValue === dashboard.target1 || d.targetValue === dashboard.target2,
      );
      summaryDataList.push(filterList);

      contentList[`tab${idx + 1}`] = <Area {...config} key={`tab${idx + 1}`} />;
    });
  }

  console.log(contentList);
  const numList = summaryDataList.length;
  const summaryContentList = summaryDataList.map((d, idx) => {
    let span = 8;

    if (numList % 3 === 1 && idx === numList - 1) {
      span = 24;
    } else if (numList % 3 === 2 && idx >= numList - 2) {
      span = 12;
    }
    return (
      <Col key={idx} span={span}>
        <Area {...config} data={d} />
      </Col>
    );
  });

  // const contentList = {
  //   tab1: <Area {...config} />,
  //   tab2: <Area {...config} />,
  //   tab3: <Area {...config} />,
  // };

  const handleRangeChange = (
    dates: [moment.Moment, moment.Moment],
    dataStrings: [string, string],
  ) => {
    dispatch({
      type: 'dashboard/changeRange',
      payload: {
        dates,
        dataStrings,
      },
    });
  };

  const handleSelectChange = (target: string, value: string) => {
    dispatch({
      type: 'dashboard/changeSelect',
      payload: {
        target,
        value,
      },
    });
  };

  const handleTabChange = (key: string) => {
    console.log(key);
    dispatch({
      type: 'dashboard/changeTab',
      payload: {
        activeTabKey: key,
      },
    });
  };
  // console.log(JSON.stringify(dashboard));
  // console.log('activeTabKey', dashboard.strategyDetail?.activeTabKey);
  const optionList1 = targetList.filter((o) => o.value !== dashboard.target2);
  const optionList2 = targetList.filter((o) => o.value !== dashboard.target1);

  const extra = (
    <Space>
      <Select
        showSearch
        style={{ width: 120 }}
        placeholder="请选择指标"
        value={dashboard.target1}
        onChange={(value) => {
          handleSelectChange('target1', value);
        }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
        }
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
      >
        {
          // dashboard.optionList1 && dashboard.optionList1.map((o) => <Option key={o.value} value={o.value}>{o.name}</Option>)
          optionList1.map((o) => (
            <Option key={o.value} value={o.value}>
              {o.name}
            </Option>
          ))
        }
      </Select>
      <Select
        showSearch
        style={{ width: 120 }}
        placeholder="请选择指标"
        value={dashboard.target2}
        onChange={(value) => {
          handleSelectChange('target2', value);
        }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
        }
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
      >
        {
          // dashboard.optionList2 && dashboard.optionList2.map((o) => <Option key={o.value} value={o.value}>{o.name}</Option>)
          optionList2.map((o) => (
            <Option key={o.value} value={o.value}>
              {o.name}
            </Option>
          ))
        }
      </Select>
    </Space>
  );

  return (
    <PageContainer>
      <Card
        style={{ width: '100%' }}
        title="综合统计"
        extra={<RangePicker value={dashboard.rangeValues} onChange={handleRangeChange} />}
      >
        <Table columns={columns} dataSource={dashboard.totalList} scroll={{ x: 1500, y: 300 }} />
      </Card>
      <Card style={{ width: '100%', marginTop: '12px' }} title="策略状态概述" extra={extra}>
        <Row>{summaryContentList}</Row>
      </Card>
      <Row style={{ marginTop: '12px' }}>
        <Card
          style={{ width: '100%' }}
          title="策略状态明细"
          tabList={
            dashboard.tabList && dashboard.tabList.length > 1 ? dashboard.tabList : undefined
          }
          activeTabKey={dashboard?.activeTabKey}
          onTabChange={(key) => {
            handleTabChange(key);
          }}
        >
          {dashboard.activeTabKey ? contentList[dashboard.activeTabKey] : contentList['tab1']}
        </Card>
      </Row>
      <Card style={{ width: '100%', marginTop: '12px' }} title="投入产出比">
        <Area {...config} smooth={false} />
      </Card>
    </PageContainer>
  );
};

// export default Dashboard;
export default connect(({ dashboard }: { dashboard: TState }) => ({
  dashboard,
}))(Dashboard);
