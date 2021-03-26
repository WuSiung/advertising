import { DeleteOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import React, { FC } from 'react'

interface CustomColumnsProps {
    placeholder?: string,
    options?: Array<any>
    onDelete?: (v: string) => void,
    onSelect?: (v: string) => void
}

const CustomColumns: FC<CustomColumnsProps> = (props) => {
    const { placeholder, options, onDelete, onSelect } = props
    return <Select dropdownRender={(value) => (<>{value} {props.children}</>)} placeholder={placeholder} style={{ width: 200 }} onChange={onSelect}>
        {
            options?.map((option, index) => {
                return <Select.Option key={index} value={option.name}>
                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                        {option.name}
                        <DeleteOutlined onClick={e => { e.stopPropagation(); onDelete && onDelete(option.name) }} />
                    </div>
                </Select.Option>
            })
        }
    </Select>
}

export default CustomColumns