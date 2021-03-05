import { Modal, Tag } from 'antd'
import React, { FC } from 'react'
import { TagType } from '../../data'
import { getAllTag } from '../../service'
import DebounceSelect from '../DebounceSearch';


interface EditTagProps {
    visible: boolean,
    tagList: Array<TagType>,
    onCancel: () => void,
    type: 'all' | string,
    tagName: string,
    setTagName: (value: string) => void,
    onAdd: () => void,
    onChangeResult: (value: string, options: any) => void,
    onDelete: (id: string) => void
}

const EditTag: FC<EditTagProps> = (props) => {
    const { visible, tagList, onCancel, setTagName, onAdd, onDelete, tagName, onChangeResult, type } = props

    return <Modal visible={visible} title={type != 'all' ? '编辑素材标签' : '查看所有标签'} onCancel={onCancel} onOk={onCancel}>
        {
            type != 'all' && <DebounceSelect fetchOptions={getAllTag} style={{ flex: 1 }} showSearch defaultActiveFirstOption={false} value={tagName}
                setValue={setTagName} onChange={onChangeResult} onAdd={onAdd}></DebounceSelect>
        }
        {
            tagList.map(tag => {
                return <Tag closable={type != 'all'} color="magenta" onClose={e => { e.preventDefault(); onDelete(tag.id) }} key={tag.id}>{tag.name}</Tag>
            })
        }
    </Modal>
}

export default EditTag