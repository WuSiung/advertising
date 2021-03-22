import React, {useEffect, useState} from 'react';
import { connect, Dispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import {Row, Col, Card, Select, Space, Table, DatePicker, Tag} from 'antd';
// import {Line} from "@ant-design/charts";
import { Area, Line } from '@ant-design/charts';

// const { TabPane } = Tabs;
import { TColumnOption, TData, TState, TStatistic} from './data';
import { ColumnsType } from 'antd/es/table';
import { Moment } from 'moment';
import type { RangeValue } from './data';
import {EMPTY_CFG_DETAIL, EMPTY_CFG_ROI, EMPTY_CFG_SUM, TARGET_LIST} from './targets';
import { ColumnSelectTitle } from '@/pages/dashboard/components/column-select-title'
import styles from './index.less';
import Loading from '@/components/Loading';
import moment from 'moment';

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
  // useEffect(() => {
  //   dispatch({
  //     type: 'dashboard/queryStatistics',
  //     payload: {
  //       start:
  //         dashboard.rangeValues && dashboard.rangeValues[0]
  //           ? dashboard.rangeValues[0].format('yyyy-MM-DD')
  //           : '',
  //       end:
  //         dashboard.rangeValues && dashboard.rangeValues[1]
  //           ? dashboard.rangeValues[1].format('YYYY-MM-DD')
  //           : '',
  //     },
  //   });
  // }, [dashboard.rangeValues]);
  const handleOpenChange = (open: boolean) => {
    // console.log(open);
    // console.log(dashboard.isRangeChanged);
    if (!open && dashboard.isRangeChanged) {
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
    }
  };
  useEffect(() => {
    handleOpenChange(false);
  }, []);

  const tableOptionList: TColumnOption[] = [
    {
      titleString: '统计名称',
      dataIndex: 'name',
      show: true
    },
    {
      titleString: '结果',
      dataIndex: 'resultName',
      show: true
    },
    {
      titleString: '消费金额',
      dataIndex: 'spend',
      show: true
    },
    {
      titleString: 'ROI',
      dataIndex: 'roi',
      show: true
    },
    {
      titleString: '送达数',
      dataIndex: 'reach',
      show: true
    },
    {
      titleString: '展示数',
      dataIndex: 'impressions',
      show: true
    },
    {
      titleString: '点击数',
      dataIndex: 'clicks',
      show: true
    },
    {
      titleString: '每结果成本',
      dataIndex: 'cpr',
      show: true
    },
    {
      titleString: '移动应用回报率',
      dataIndex: 'mobileAppPurchaseRoas',
      show: true
    },
    {
      titleString: '点击率',
      dataIndex: 'ctr',
      show: false
    },
    {
      titleString: '频率',
      dataIndex: 'frequency',
      show: false
    },
    {
      titleString: '费用/千次',
      dataIndex: 'cpm',
      show: false
    },
    {
      titleString: '出站点击率',
      dataIndex: 'octr',
      show: false
    },
    {
      titleString: '购买回报率',
      dataIndex: 'purchaseRoas',
      show: false
    },
    {
      titleString: '出站点击数',
      dataIndex: 'oclicks',
      show: false
    },
    {
      titleString: '每次点击费用',
      dataIndex: 'cpc',
      show: false
    },
    {
      titleString: '安装数',
      dataIndex: 'installs',
      show: false
    },
    {
      titleString: '每次安装费用',
      dataIndex: 'cpa',
      show: false
    },
  ]

  const [showColumns, setShowColumns] = useState([...tableOptionList]);

  const onPackColumnFilter = (newKey: string, originKey: string) => {
    const list = [...showColumns];
    const oldShowColumnIdx = list.findIndex((c) => c.dataIndex === originKey);
    const newShowColumnIdx = list.findIndex((c) => c.dataIndex === newKey);
    if (oldShowColumnIdx > -1 && newShowColumnIdx > -1) {
      list[oldShowColumnIdx].show = false;
      list[newShowColumnIdx].show = true;
      [list[oldShowColumnIdx], list[newShowColumnIdx]] = [list[newShowColumnIdx], list[oldShowColumnIdx]];
    }

    setShowColumns([...list]);
  }

  const columns: ColumnsType<TStatistic> = [
    {
      title: "统计名称",
      width: 120,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (text, recored, index) => {
        let color = '#02b2c9'
        switch (index) {
          case 0:
            color = '#02b2c9';
            break;
          case 1:
            color = '#7655c9';
            break;
          case 2:
            color = '#c481eb';
            break;
          case 3:
            color = '#1eb1f4';
            break;
          case 4:
            color = '#5586ef';
            break;
          default:
        }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: "结果",
      width: 120,
      dataIndex: 'resultName',
      key: 'resultName',
    },
    {
      title: <ColumnSelectTitle dataIndex="reach" titleString="送达数" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'reach',
      key: 'reach',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="impressions" titleString="展示数" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'impressions',
      key: 'impressions',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="clicks" titleString="点击数" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'clicks',
      key: 'clicks',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="cpr" titleString="每结果成本" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'cpr',
      key: 'cpr',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="mobileAppPurchaseRoas" titleString="移动应用回报率" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'mobileAppPurchaseRoas',
      key: 'mobileAppPurchaseRoas',
      width: 150,
    },
    {
      title: <ColumnSelectTitle dataIndex="spend" titleString="消费金额" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'spend',
      key: 'spend',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="roi" titleString="ROI" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'roi',
      key: 'roi',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="ctr" titleString="点击率" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'ctr',
      key: 'ctr',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="frequency" titleString="频率" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'frequency',
      key: 'frequency',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="cpm" titleString="费用/千次" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'cpm',
      key: 'cpm',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="octr" titleString="出站点击率" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'octr',
      key: 'octr',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="purchaseRoas" titleString="购买回报率" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'purchaseRoas',
      key: 'purchaseRoas',
      width: 150,
    },
    {
      title: <ColumnSelectTitle dataIndex="oclicks" titleString="出站点击数" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'oclicks',
      key: 'oclicks',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="cpc" titleString="每次点击费用" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'cpc',
      key: 'cpc',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="installs" titleString="安装数" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'installs',
      key: 'installs',
      width: 120,
    },
    {
      title: <ColumnSelectTitle dataIndex="installs" titleString="每次安装费用" optionList={showColumns} onChange={onPackColumnFilter} />,
      dataIndex: 'cpa',
      key: 'cpa',
      width: 120,
    },
  ];

  // columns = columns.filter(c => showColumns.find(s => c.dataIndex === s.dataIndex && s.show))
  const showColumnList: ColumnsType<TStatistic> = [];
  showColumns.forEach(s => {
    if (s.show) {
      const col = columns.find(c => c.key === s.dataIndex);
      if (col) {
        showColumnList.push(col);
      }
    }
  })

  // const columns: ColumnsType<object> = [
  //   {
  //     title: '统计名称',
  //     width: 100,
  //     dataIndex: 'name',
  //     key: 'name',
  //     fixed: 'left',
  //   },
  //   {
  //     title: '结果',
  //     width: 120,
  //     dataIndex: 'resultName',
  //     key: 'resultName',
  //   },
  //   {
  //     title: '送达数',
  //     dataIndex: 'reach',
  //     key: 'reach',
  //     width: 120,
  //   },
  //   {
  //     title: '展示数',
  //     dataIndex: 'impressions',
  //     key: 'impressions',
  //     width: 120,
  //   },
  //   {
  //     title: '点击数',
  //     dataIndex: 'clicks',
  //     key: 'clicks',
  //     width: 120,
  //   },
  //   {
  //     title: '每结果成本',
  //     dataIndex: 'cpr',
  //     key: 'cpr',
  //     width: 120,
  //   },
  //   {
  //     title: '移动应用回报率',
  //     dataIndex: 'mobileAppPurchaseRoas',
  //     key: 'mobileAppPurchaseRoas',
  //     width: 150,
  //   },
  //   {
  //     title: '消费金额',
  //     dataIndex: 'spend',
  //     key: 'spend',
  //     width: 120,
  //   },
  //   {
  //     title: '点击率',
  //     dataIndex: 'ctr',
  //     key: 'ctr',
  //     width: 120,
  //   },
  //   {
  //     title: '频率',
  //     dataIndex: 'frequency',
  //     key: 'frequency',
  //     width: 120,
  //   },
  //   {
  //     title: '费用/千次',
  //     dataIndex: 'cpm',
  //     key: 'cpm',
  //     width: 120,
  //   },
  //   {
  //     title: '出站点击率',
  //     dataIndex: 'octr',
  //     key: 'octr',
  //     width: 120,
  //   },
  //   {
  //     title: '购买回报率',
  //     dataIndex: 'purchaseRoas',
  //     key: 'purchaseRoas',
  //     width: 150,
  //   },
  //   {
  //     title: '出站点击数',
  //     dataIndex: 'oclicks',
  //     key: 'oclicks',
  //     width: 120,
  //   },
  //   {
  //     title: '每次点击费用',
  //     dataIndex: 'cpc',
  //     key: 'cpc',
  //     width: 120,
  //   },
  //   {
  //     title: '安装数',
  //     dataIndex: 'installs',
  //     key: 'installs',
  //     width: 120,
  //   },
  //   {
  //     title: '每次安装费用',
  //     dataIndex: 'cpa',
  //     key: 'cpa',
  //     width: 120,
  //   },
  // ];

  const configSum = {
    // data: dashboard.detailDataList && dashboard.detailDataList[0] ? dashboard.detailDataList[0] : [],
    data: [],
    height: 200,
    appendPadding: [0, 20, 0, 20],
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
    yAxis: {
      tickCount: 5
    },
    xAxis: {
      tickCount: 3,
      label: {
        // autoRotate: true
      }
    }
  };

  const config = {
    // data: dashboard.detailDataList && dashboard.detailDataList[0] ? dashboard.detailDataList[0] : [],
    data: [],
    height: 300,
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
    yAxis: {
      tickCount: 8
    },
    xAxis: {
      tickCount: 15,
      label: {
        autoRotate: true,
        offset: 30
      }
    },
    legend: {
      position: 'right',
      offsetX: 30,
      itemHeight: 20
    }
  };

  const roiData =
    dashboard.audience && dashboard.roiDataRecord && Object.values(dashboard.roiDataRecord).length
      ? dashboard.roiDataRecord[dashboard.audience]
      : [];
  // console.log('roiData', roiData);

  const configRoi = {
    data: roiData,
    height: 300,
    xField: 'x',
    yField: 'y',
    seriesField: 'target',
    point: {
      size: 5,
      shape: 'diamond',
    },
    yAxis: {
      tickCount: 8
    },
    xAxis: {
      tickCount: 15,
      label: {
        autoRotate: true,
        offset: 30
      }
    },
    lineStyle: null,
  };

  // todo: 根据dashboard.detailDataList 和target1, target2 生成summaryDataList
  const summaryDataList: TData[][] = [];
  const contentList: Record<string, TData[]> = {};
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

  // const numList = summaryDataList.length;
  const summaryContentList = summaryDataList.map((d, idx) => {
    // 策略概述3个图表一行的布局
    // let span = 8;
    //
    // if (numList % 3 === 1 && idx === numList - 1) {
    //   span = 24;
    // } else if (numList % 3 === 2 && idx >= numList - 2) {
    //   span = 12;
    // }

    // 策略概述2个图表一行的布局
    // let span = 12;
    // if (idx === numList - 1 && numList % 2 === 1) {
    //   span = 24;
    // }

    // 策略概述4个图表一行的布局
    const span = 6;

    return (
      <Col key={idx} span={span} style={{ marginTop: '12px' }}>
        <p style={{textAlign: 'center'}}>
          {
            idx === 0 && <Tag color="#7655c9">{dashboard.tabList ? dashboard.tabList[idx].tab : ''}</Tag>
          }
          {
            idx === 1 && <Tag color="#c481eb">{dashboard.tabList ? dashboard.tabList[idx].tab : ''}</Tag>
          }
          {
            idx === 2 && <Tag color="#1eb1f4">{dashboard.tabList ? dashboard.tabList[idx].tab : ''}</Tag>
          }
          {
            idx === 3 && <Tag color="#5586ef">{dashboard.tabList ? dashboard.tabList[idx].tab : ''}</Tag>
          }
        </p>
        <div>
          { d.length ? <Area {...configSum} data={d} /> : <Area {...EMPTY_CFG_SUM} /> }
        </div>
      </Col>
    );
  });

  const handleRangeChange = (dates: RangeValue<Moment>, dataStrings: [string, string]) => {
    dispatch({
      type: 'dashboard/changeRange',
      payload: {
        dates,
        dataStrings,
        isRangeChanged: true
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
      <div className={styles.main}>
        <Card
          className={`${styles.totalCard}`}
          title="综合统计"
          loading={isLoading}
          extra={
            <>
            <RangePicker
              value={dashboard.rangeValues}
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
            </>
          }
        >
          <Table
            size="small"
            pagination={false}
            columns={showColumnList}
            rowKey="id"
            dataSource={dashboard.totalList}
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
            {
              (Object.keys(contentList).length && dashboard.activeTabKey && contentList[dashboard.activeTabKey].length) ?
                <Area {...config} data={contentList[dashboard.activeTabKey]} /> :
                <Area {...EMPTY_CFG_DETAIL} />
            }
          </Card>
        </Row>
        <Card title="投入产出比" extra={roiExtra} loading={isLoading}>
          { roiData.length ? <Line {...configRoi} /> : <Line {...EMPTY_CFG_ROI} /> }
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
