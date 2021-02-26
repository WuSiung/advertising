import React, { FC } from 'react'
import moment from 'moment';
import { DatePicker } from 'antd';

interface RangeDateProps {
    onChange?: (date: [string, string]) => void
}

const DateRange: FC<RangeDateProps> = (props) => {
    const changeDate = (_: unknown, dateStrings: [string, string]) => {
        props.onChange && props.onChange(dateStrings)
    }
    return <DatePicker.RangePicker onChange={changeDate} ranges={{
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