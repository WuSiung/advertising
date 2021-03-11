import React, {FC, useEffect} from 'react';
import {connect, Dispatch} from 'umi';
import {Card, Input, Space, Checkbox, Tag, Row, Col, Table, Switch, Menu, Badge, Dropdown} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {TSelectorData} from "@/pages/automation/wizard/components/step2/surf-ad-set/data";
import {TStateCampaignSelector} from "@/pages/automation/wizard/components/step3/campaign-selector/data";

// const CheckboxGroup = Checkbox.Group;
interface ICampaignSelector {
  isLoading?: boolean;
  campaignSelector?: TStateCampaignSelector,
  dispatch?: Dispatch,
  Name?: string;
  ActionObj?: string[];
  onChange: (payload: any) => void;
};

const CampaignSelector: FC<ICampaignSelector> = (props) => {
  // function onChange(checkedValues: any) {
  //   console.log('checked = ', checkedValues);
  // }
  const {dispatch, campaignSelector} = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'campaignSelector/getCampaignList',
        payload: {}
      });
    }
  }, []);
  console.log('selector props', props.Name);
  // todo: checkbox的value属性绑定广告集的id
  // todo: checkbox的checked属性={id是否在传进来的列表里面}

  interface DataType {
    key: React.Key;
    title: string;
    dataIndex: number;
  }

  const columns = [
    { title: '适用于所有收购活动', dataIndex: 'appName', key: 'appName' },
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
      <h4 style={{marginBottom: 0}}>选择收购活动：</h4>
      <div>
        <Checkbox checked={true}> 已选</Checkbox>
        <Checkbox disabled={true}> 选定的和新的CBO广告系列将自动添加</Checkbox>
        <Checkbox disabled={true}> 未选中的</Checkbox>
        <Tag>{props.ActionObj ? props.ActionObj.length : 0}个选定的活动</Tag>
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
          dataSource={campaignSelector?.campaignList}
          rowSelection={rowSelection}
          rowKey="packId"
        />
      </Card>
    </div>
  );
}

export default connect(({campaignSelector, loading}: {campaignSelector: TStateCampaignSelector, loading: any}) => ({
  isLoading: loading['campaignSelector/getCampaignList'],
  campaignSelector
}))(CampaignSelector);
