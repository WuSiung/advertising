import React, {FC, useEffect} from 'react';
import {connect, Dispatch} from 'umi';
import {Card, Checkbox, Input, Space, Table, Tag} from "antd";
import {TStateAdSetSelector} from "@/pages/automation/wizard/components/step3/ad-set-selector/data";
import {EActionType} from "@/pages/automation/wizard/data.d";

// const CheckboxGroup = Checkbox.Group;
interface IAdSetSelector {
  actionType?: EActionType;
  isLoading?: boolean;
  adSetSelector?: TStateAdSetSelector,
  dispatch?: Dispatch,
  Name?: string;
  ActionObj?: string[];
  onChange: (payload: any) => void;
  onActionObjChange: (isSelected: boolean) => void;
};

const AdSetSelector: FC<IAdSetSelector> = (props) => {
  const {dispatch, adSetSelector, actionType} = props;
  let pd = {}
  if (actionType === EActionType.AAT_Surf_AdSetLevel) {
    pd = {
      budget: 1
    }
  }
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'adSetSelector/getAdSetList',
        payload: pd
      });
    }

    let isSelected = false;
    if (props.ActionObj && props.ActionObj.length) {
      isSelected = true;
    }
    props.onActionObjChange(isSelected);
  }, []);

  const columns = [
    { title: '套用至所有[揽客]广告', dataIndex: 'setName', key: 'setName' },
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
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
