import React, { FC } from 'react'
import moment from 'moment';
import { DatePicker } from 'antd';
type EventValue<DateType> = DateType | null;

type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;

interface RangeDateProps {
    onChange?: (date: [string, string], dateObj?: RangeValue<moment.Moment>) => void,
    defaultValue?: RangeValue<moment.Moment>
}

const DateRange: FC<RangeDateProps> = (props) => {
    const changeDate = (_: RangeValue<moment.Moment>, dateStrings: [string, string]) => {
        props.onChange && props.onChange(dateStrings, _)
    }
    return <DatePicker.RangePicker defaultValue={props?.defaultValue} onChange={changeDate} allowClear={false} ranges={{
        '今天': [moment(), moment()],
        '昨天': [moment(new Date()).add(-1, 'days'), moment(new Date()).add(-1, 'days')],
        '最近7天': [moment(new Date()).add(-7, 'days'), moment()],
        '最近14天': [moment(new Date()).add(-14, 'days'), moment()],
        '最近1个月': [moment(new Date()).subtract(1, 'months'), moment()],
        '最近3个月': [moment(new Date()).subtract(3, 'months'), moment()],
        '最近6个月': [moment(new Date()).subtract(6, 'months'), moment()],
        '最近一年': [moment(new Date()).subtract(1, 'years'), moment()],
    }} />
}

export default DateRange