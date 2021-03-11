import React, {FC, useEffect} from 'react';
import {connect, Dispatch} from 'umi';
import {Card, Input, Space, Checkbox, Tag, Row, Col, Table, Switch, Menu, Badge, Dropdown} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {TSelectorData} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";
import {TStateAdSetSelector} from "@/pages/automation/wizard/components/step3/ad-set-selector/data";

// const CheckboxGroup = Checkbox.Group;
interface IAdSetSelector {
  isLoading?: boolean;
  adSetSelector?: TStateAdSetSelector,
  dispatch?: Dispatch,
  Name?: string;
  ActionObj?: string[];
  onChange: (payload: any) => void;
};

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

// rowSelection objects indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };

const AdSetSelector: FC<IAdSetSelector> = (props) => {
  // function onChange(checkedValues: any) {
  //   console.log('checked = ', checkedValues);
  // }
  const {dispatch, adSetSelector} = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'adSetSelector/getAdSetList',
        payload: {}
      });
    }
  }, []);
  console.log('selector props', props.Name);
  // todo: checkbox的value属性绑定广告集的id
  // todo: checkbox的checked属性={id是否在传进来的列表里面}


  const expandedRowRender = () => {
    const columns = [
      // { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: '广告名称', dataIndex: 'name', key: 'name' },
      // {
      //   title: 'Status',
      //   key: 'state',
      //   render: () => (
      //     <span>
      //       <Badge status="success" />
      //       Finished
      //     </span>
      //   ),
      // },
      // { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      // {
      //   title: 'Action',
      //   dataIndex: 'operation',
      //   key: 'operation',
      //   render: () => (
      //     <Space size="middle">
      //       <a>Pause</a>
      //       <a>Stop</a>
      //       <Dropdown overlay={menu}>
      //         <a>
      //           More <DownOutlined />
      //         </a>
      //       </Dropdown>
      //     </Space>
      //   ),
      // },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: String(i),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={true} />;
  };

  interface DataType {
    key: React.Key;
    title: string;
    dataIndex: number;
  }

  const columns = [
    { title: '套用至所有[揽客]广告', dataIndex: 'setName', key: 'setName' },
    // { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    // { title: 'Version', dataIndex: 'version', key: 'version' },
    // { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    // { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    // { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: String(i),
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      props.onChange({ActionObj: selectedRowKeys});
    },
    selectedRowKeys: props.ActionObj

    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const title = (
    <Space>
      <h4 style={{marginBottom: 0}}>适用于：</h4>
      <div>
        <Checkbox checked={true}> 已选</Checkbox>
        <Checkbox disabled={true}> 所选广告集和新广告集将自动添加</Checkbox>
        <Checkbox disabled={true}> 未选中的</Checkbox>
        <Tag>{props.ActionObj ? props.ActionObj.length : 0}个选定的广告集</Tag>
      </div>
    </Space>
  )
  return (
    <div>
      <Card title="策略名称：">
        <Input value={props.Name} />
      </Card>
      <Card title={title}>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={adSetSelector?.adSetList}
          rowSelection={rowSelection}
          rowKey="setId"
        />
      </Card>
    </div>
  );
}

// export default AdSetSelector;
export default connect(({adSetSelector, loading}: {adSetSelector: TStateAdSetSelector, loading: any}) => ({
  isLoading: loading['adSetSelector/getAdSetList'],
  adSetSelector
}))(AdSetSelector);
