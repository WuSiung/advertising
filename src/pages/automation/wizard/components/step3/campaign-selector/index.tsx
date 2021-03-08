import React, { FC } from 'react';
import {Card, Input, Space, Checkbox, Tag, Row, Col, Table, Switch} from "antd";
import {TSelectorData} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";

// const CheckboxGroup = Checkbox.Group;
interface IAdSetSelector {
  selectorData: TSelectorData;
  onChange: (payload: any) => void;
};

const columns = [
  {
    title: '套用至所有[揽客]广告',
    dataIndex: 'name',
    key: 'name',
  },
  // {
  //   title: 'Age',
  //   dataIndex: 'age',
  //   key: 'age',
  //   width: '12%',
  // },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   width: '30%',
  //   key: 'address',
  // },
];

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const AdSetSelector: FC<IAdSetSelector> = (props) => {
  // function onChange(checkedValues: any) {
  //   console.log('checked = ', checkedValues);
  // }

  // todo: checkbox的value属性绑定广告集的id
  // todo: checkbox的checked属性={id是否在传进来的列表里面}

  // const [checkStrictly, setCheckStrictly] = React.useState(false);
  const title = (
    <Space>
      <h4 style={{marginBottom: 0}}>适用于：</h4>
      <div>
        <Checkbox> 已选</Checkbox>
        <Checkbox> 所选广告集和新广告集将自动添加</Checkbox>
        <Checkbox> 未选中的</Checkbox>
        <Tag>0个选定的广告集</Tag>
      </div>
    </Space>
  )
  return (
    <div>
      <Card title="策略名称：">
        <Input />
      </Card>
      <Card title={title}>
        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly: false }}
          dataSource={data}
        />
      </Card>

    </div>
  );
}

export default AdSetSelector;
