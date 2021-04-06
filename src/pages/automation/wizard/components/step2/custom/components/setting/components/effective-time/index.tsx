import React, {FC, useState} from 'react';
import {TEffectiveTime} from "@/pages/automation/wizard/components/step2/custom/data";
import {Card, Radio, RadioChangeEvent, Row, Space, DatePicker} from "antd";
import {RangeValue} from "@/pages/dashboard/data";
import moment, {Moment} from "moment";

const {RangePicker} = DatePicker;
const format = 'yyyy-MM-DD';

interface IEffectiveTime {
  effectiveTime: TEffectiveTime;
  onChange: () => void;
}
const EffectiveTime: FC<IEffectiveTime> = props => {
  const {effectiveTime, onChange} = props;
  const handleFromNowOn = (e: RadioChangeEvent) => {
    effectiveTime.isFromNowON = e.target.value;
    onChange();
  }

  const [rangeValue, setRangeValue] = useState<RangeValue<moment.Moment>>([moment(effectiveTime.timePeriod[0], format), moment(effectiveTime.timePeriod[1], format)]);

  const handleRangeChange = (dates: RangeValue<Moment>, dataStrings: [string, string]) => {
    setRangeValue(dates)
    effectiveTime.timePeriod = dataStrings;
    onChange();
  };
  const title = (
    <>
      <Row>
        <Space>
          <p>日期时间表：</p>
          <p>您的规则将从今天开始或在您设置的日期范围内连续运行。 时区：亚洲/上海</p>
        </Space>
      </Row>
    </>
  )

  return (
    <Card title={title} style={{marginBottom: 40}}>
      <Space>
        <Radio.Group value={effectiveTime.isFromNowON} onChange={handleFromNowOn}>
          <Radio value={true}>从今天开始</Radio>
          <Radio value={false}>在特定的日期/小时</Radio>
        </Radio.Group>
        { !effectiveTime.isFromNowON && <RangePicker format={format} value={rangeValue} onChange={handleRangeChange}></RangePicker> }
      </Space>
    </Card>
  )
}

export default EffectiveTime;
