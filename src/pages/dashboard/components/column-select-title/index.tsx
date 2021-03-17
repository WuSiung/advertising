import React, {FC} from 'react';
import {TColumnOption} from "@/pages/dashboard/data";
import {Popover, Select, Space} from "antd";
import {BarChartOutlined, CaretDownOutlined} from "@ant-design/icons";
import styles from '@/pages/dashboard/components/column-select-title/index.less';

export interface SearchColsPopoverPropsType {
  currentColumnDataIndex: string,
  columns: { titleString: string | undefined, dataIndex: string, show: boolean }[],
  onChange: (value: string) => void
}

const SearchColsPopover: FC<SearchColsPopoverPropsType> = props => {
  console.log(props.columns);
  const options = props.columns.filter(col => !col.show).map(col => {
    return {label: col.titleString, value: col.dataIndex ? col.dataIndex : "1"};
  });
  console.log(options);
  return (<>
    <Select
      onSelect={
      (value: string) => {
        props.onChange(value);
      }}
      showSearch
      style={{width: 200}}
      filterOption={
        (input, option) => {
          return option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      }
      placeholder="搜索列"
    >
      {
        options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))
      }
  </Select>
  </>);
}

interface IColumnSelectTitle {
  // sortIdx: number;
  dataIndex: string;
  titleString: string;
  optionList: TColumnOption[];
  onChange: (oldDataIndex: string, newDataIndex: string) => void
}

export const ColumnSelectTitle: React.FC<IColumnSelectTitle> = props => {
  //
  return (
    <Space>
      <BarChartOutlined />
      <div className={styles.main}>
        {props.titleString}
        <Popover style={{minHeight: "300px"}}
                 placement="bottom" title="更换列"
                 content={
                   <SearchColsPopover
                     currentColumnDataIndex={props.dataIndex}
                     columns={props.optionList}
                     onChange={value => {
                       props.onChange(value, props.dataIndex);
                     }
                     }
                   />
                 }
                 trigger="click"><CaretDownOutlined
          className="th-icon"/>
        </Popover>
      </div>
    </Space>
  )
}

