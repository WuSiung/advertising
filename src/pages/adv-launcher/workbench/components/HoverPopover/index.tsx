import { Popover } from 'antd'
import React, { FC } from 'react'
import { ImgDataType } from '../../data'

const PopoverContent: FC<ImgDataType> = (props) => {
    return <div style={{width: 200}}>
        <div className='name'>广告支出回报率</div>
        <div className='value'>10</div>
        <div className='name'>应用安装数</div>
        <div className='value'>0</div>
    </div>
}

const HoverPopover: FC<ImgDataType> = (props) => {
    return <Popover content={PopoverContent} title="Title" trigger="hover" placement='bottom'>
        {props.children}
    </Popover>
}

export default HoverPopover