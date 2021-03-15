import React, {FC, useEffect} from 'react';
import {connect, Dispatch} from 'umi';
import {Card, Input, Space, Checkbox, Tag, Table } from "antd";
import {TAd, TStateAdSelector} from "@/pages/automation/wizard/components/step3/ad-selector/data";
import {ColumnsType} from "antd/es/table";

// const CheckboxGroup = Checkbox.Group;
interface IAdSelector {
  isLoading?: boolean;
  adSelector?: TStateAdSelector,
  dispatch?: Dispatch,
  Name?: string;
  ActionObj?: string[];
  onChange: (payload: any) => void;
  onActionObjChange: (isSelected: boolean) => void;
};

const AdSelector: FC<IAdSelector> = (props) => {
  const {dispatch, adSelector} = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'adSelector/getAdList',
        payload: {}
      });
    }
  }, []);

  const columns: ColumnsType<TAd> = [
    { title: '适用于所有收购活动', dataIndex: 'advName', key: 'advName' },
  ];

  const data = [];
  for (let i = 0; i < 3; i += 1) {
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
    onChange: (selectedRowKeys: React.Key[]) => {
      props.onChange({ActionObj: selectedRowKeys});

      let isChanged = false;
      if (props.ActionObj?.length !== selectedRowKeys.length) {
        isChanged = true
      }

      if (!isChanged) {
        props.ActionObj?.forEach(k => {
          if (selectedRowKeys.indexOf(k) === -1) {
            isChanged = true
          }
        });
      }

      if (isChanged) {
        props.onActionObjChange(selectedRowKeys.length > 0);
      }
    },
    selectedRowKeys: props.ActionObj
  };

  const title = (
    <Space>
      <h4 style={{marginBottom: 0}}>选择收购活动：</h4>
      <div>
        <Checkbox checked={true}> 已选</Checkbox>
        <Checkbox disabled={true}> 选定的和新的CBO广告系列将自动添加</Checkbox>
        <Checkbox disabled={true}> 未选中的</Checkbox>
        <Tag>{props.ActionObj ? props.ActionObj.length : 0}个选定的广告</Tag>
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
          dataSource={adSelector?.adList}
          rowSelection={rowSelection}
          rowKey="advId"
        />
      </Card>
    </div>
  );
}

export default connect(({adSelector, loading}: {adSelector: TStateAdSelector, loading: any}) => ({
  isLoading: loading['adSelector/getAdList'],
  adSelector
}))(AdSelector);
