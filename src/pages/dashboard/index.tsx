import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Card, Select, Space, Table, DatePicker } from 'antd';
// import {Line} from "@ant-design/charts";
import { Area, Line } from '@ant-design/charts';

// const { TabPane } = Tabs;
import { TData, TState } from './data';
import { ColumnsType } from 'antd/es/table';
import { Moment } from 'moment';
import type { RangeValue } from './data';
import { TARGET_LIST } from './targets';

import styles from './index.less';
import Loading from '@/components/Loading';

export type DashboardProps = {
  dispatch: Dispatch;
  dashboard: TState;
  isLoading: boolean;
};

const { Option } = Select;
const { RangePicker } = DatePicker;

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { dispatch, dashboard, isLoading } = props;
  // console.log(isLoading)
  useEffect(() => {
    dispatch({
      type: 'dashboard/queryStatistics',
      payload: {
        start:
          dashboard.rangeValues && dashboard.rangeValues[0]
            ? dashboard.rangeValues[0].format('yyyy-MM-DD')
            : '',
        end:
          dashboard.rangeValues && dashboard.rangeValues[1]
            ? dashboard.rangeValues[1].format('YYYY-MM-DD')
            : '',
      },
    });
  }, [dashboard.rangeValues]);

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
      width: 120,
      dataIndex: 'resultName',
      key: 'resultName',
    },
    {
      title: '送达数',
      dataIndex: 'reach',
      key: 'reach',
      width: 120,
    },
    {
      title: '展示数',
      dataIndex: 'impressions',
      key: 'impressions',
      width: 120,
    },
    {
      title: '点击数',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 120,
    },
    {
      title: '每结果成本',
      dataIndex: 'cpr',
      key: 'cpr',
      width: 120,
    },
    {
      title: '移动应用回报率',
      dataIndex: 'mobileAppPurchaseRoas',
      key: 'mobileAppPurchaseRoas',
      width: 150,
    },
    {
      title: '消费金额',
      dataIndex: 'spend',
      key: 'spend',
      width: 120,
    },
    {
      title: '点击率',
      dataIndex: 'ctr',
      key: 'ctr',
      width: 120,
    },
    {
      title: '频率',
      dataIndex: 'frequency',
      key: 'frequency',
      width: 120,
    },
    {
      title: '费用/前次',
      dataIndex: 'cpm',
      key: 'cpm',
      width: 120,
    },
    {
      title: '出站点击率',
      dataIndex: 'octr',
      key: 'octr',
      width: 120,
    },
    {
      title: '购买回报率',
      dataIndex: 'purchaseRoas',
      key: 'purchaseRoas',
      width: 150,
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
      width: 120,
    },
    {
      title: '每次安装费用',
      dataIndex: 'cpa',
      key: 'cpa',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 100,
    },
  ];

  const config = {
    // data: dashboard.detailDataList && dashboard.detailDataList[0] ? dashboard.detailDataList[0] : [],
    data: [],
    height: 400,
    xField: 'x',
    yField: 'y',
    seriesField: 'target',
    smooth: true,
    loading: isLoading,
    area: {
      shape: 'smooth',
    },
    // style: {
    //   backgroundColor: '#fff',
    // },
    areaStyle: {
      fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    },
  };

  const roiData =
    dashboard.audience && dashboard.roiDataRecord && Object.values(dashboard.roiDataRecord).length
      ? dashboard.roiDataRecord[dashboard.audience]
      : [];
  // console.log('roiData', roiData);

  const configRoi = {
    data: roiData,
    height: 400,
    xField: 'x',
    yField: 'y',
    seriesField: 'target',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  // todo: 根据dashboard.detailDataList 和target1, target2 生成summaryDataList
  const summaryDataList: TData[][] = [];
  const contentList = {};
  if (dashboard.detailDataList) {
    dashboard.detailDataList.forEach((list, idx) => {
      const filterList = list.filter(
        (d) => d.targetValue === dashboard.target1 || d.targetValue === dashboard.target2,
      );
      summaryDataList.push(filterList);

      // contentList[`tab${idx + 1}`] = <Area {...config} data={list} key={`tab${idx + 1}`} />;
      contentList[`tab${idx + 1}`] = list;
    });
  }

  // console.log(dashboard.tabList);
  // console.log(dashboard.detailDataList);
  // console.log(contentList);
  const numList = summaryDataList.length;
  const summaryContentList = summaryDataList.map((d, idx) => {
    let span = 8;

    if (numList % 3 === 1 && idx === numList - 1) {
      span = 24;
    } else if (numList % 3 === 2 && idx >= numList - 2) {
      span = 12;
    }
    return (
      <Col key={idx} span={span} style={{ marginTop: '12px' }}>
        <Area {...config} data={d} />
      </Col>
    );
  });

  const handleRangeChange = (dates: RangeValue<Moment>, dataStrings: [string, string]) => {
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
    // console.log(key);
    dispatch({
      type: 'dashboard/changeTab',
      payload: {
        activeTabKey: key,
      },
    });
  };
  const optionList1 = TARGET_LIST.filter((o) => o.value !== dashboard.target2);
  const optionList2 = TARGET_LIST.filter((o) => o.value !== dashboard.target1);

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
        {optionList1.map((o) => (
          <Option key={o.value} value={o.value}>
            {o.name}
          </Option>
        ))}
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
        {optionList2.map((o) => (
          <Option key={o.value} value={o.value}>
            {o.name}
          </Option>
        ))}
      </Select>
    </Space>
  );

  const roiExtra = (
    <Select
      showSearch
      style={{ width: 120 }}
      placeholder="请选择人群包"
      value={dashboard.audience}
      onChange={(value) => {
        handleSelectChange('audience', value);
      }}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
      }
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
    >
      {dashboard.roiOptionList &&
        dashboard.roiOptionList.map((o) => (
          <Option key={o.value} value={o.value}>
            {o.name}
          </Option>
        ))}
    </Select>
  );

  return (
    <PageContainer>
      <div className={styles.main} style={{ paddingLeft: 100, paddingRight: 100 }}>
        <Card
          className={`${styles.totalCard}`}
          title="综合统计"
          loading={isLoading}
          extra={<RangePicker value={dashboard.rangeValues} onChange={handleRangeChange} />}
        >
          <Table
            columns={columns}
            rowKey="id"
            dataSource={dashboard.totalList}
            scroll={{ x: 1500, y: 300 }}
          />
        </Card>
        <Card title="策略状态概述" extra={extra} loading={isLoading}>
          <Row>{summaryContentList}</Row>
        </Card>
        <Row>
          <Card
            className={styles.card}
            title="策略状态明细"
            loading={isLoading}
            tabList={
              dashboard.tabList && dashboard.tabList.length > 1 ? dashboard.tabList : undefined
            }
            activeTabKey={dashboard?.activeTabKey}
            onTabChange={(key) => {
              handleTabChange(key);
            }}
          >
            <Area
              {...config}
              data={
                Object.keys(contentList).length && dashboard.activeTabKey
                  ? contentList[dashboard.activeTabKey]
                  : []
              }
            />
          </Card>
        </Row>
        <Card title="投入产出比" extra={roiExtra} loading={isLoading}>
          <Line {...configRoi} />
        </Card>
      </div>
      {isLoading && <Loading showMask tips="数据加载中，请稍等..." />}
    </PageContainer>
  );
};

// export default Dashboard;
export default connect(({ dashboard, loading }: { dashboard: TState; loading: any }) => ({
  dashboard,
  isLoading: loading.effects['dashboard/queryStatistics'],
}))(Dashboard);
