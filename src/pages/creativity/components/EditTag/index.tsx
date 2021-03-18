import { Button, Input, Modal, Tag } from 'antd'
import React, { FC } from 'react'
import { TagType } from '../../data'
import DebounceSelect from '../DebounceSearch';

import styles from './index.less'


interface EditTagProps {
    visible: boolean,
    tagList: Array<TagType>,
    onCancel: () => void,
    type: 'all' | string,
    tagName: string,
    setTagName: (value: string) => void,
    onAdd: () => void,
    onChangeResult: (value: string, options: any) => void,
    onDelete: (id: string) => void,
    textInfo?: string,
    onEditText?: () => void,
    onChangeTextInfo?: (value: string) => void
    fetchTags: () => Promise<any>
}

const EditTag: FC<EditTagProps> = (props) => {
    const { visible, tagList, onCancel, setTagName, onAdd, onDelete, tagName, onChangeResult, type, fetchTags, textInfo, onChangeTextInfo, onEditText } = props

    return <Modal visible={visible} title={type != 'all' ? '编辑素材标签' : '查看所有标签'} onCancel={onCancel} onOk={onCancel} footer={null}>
        {
            type != 'all' && <DebounceSelect fetchOptions={fetchTags} style={{ flex: 1, marginBottom: 10 }} showSearch defaultActiveFirstOption={false} value={tagName}
                setValue={setTagName} onChange={onChangeResult} onAdd={onAdd}></DebounceSelect>
        }
        {
            tagList.map(tag => {
                return <Tag closable={type != 'all'} color="magenta" onClose={e => { e.preventDefault(); onDelete(tag.id) }} key={tag.id}>{tag.name}</Tag>
            })
        }
        {
            textInfo && <div>
                <div className={styles.editT}>编辑文字</div>
                <Input.TextArea value={textInfo} className={styles.textcontent} onChange={e => onChangeTextInfo && onChangeTextInfo(e.target.value)} />
                <Button type='primary' onClick={onEditText}>修改</Button>
            </div>
        }
    </Modal>
}

export default EditTag