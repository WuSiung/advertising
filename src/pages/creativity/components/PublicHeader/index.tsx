import React, { FC, useRef, useState } from 'react'
import { Button, Col, Row, Select, Upload } from 'antd'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { DeleteOutlined, FolderOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload';

import styles from './index.less'
import UploadTextFile from '@/pages/adv-launcher/components/UploadTextFile';
import DateRange from '@/pages/adv-launcher/components/DateRange';
import { TagType } from '../../data';
import DebounceSelect from '../DebounceSearch';
import Store from '@/utils/store';

interface PublicHeaderProps {
    type: 'media' | 'text',
    clearDisable: boolean,
    tags: TagType[],
    onUpload?: (e: RcCustomRequestOptions, allLenth: number, size: number) => void,
    onUploadText?: (values: string[]) => void
    onClear: () => void,
    onAddToWorkbench: () => void,
    onDelete?: () => void,
    onDeleteAll?: () => void,
    openFolder?: () => void,
    onSort?: (type: string) => void,
    openText?: (visible: boolean) => void,
    onChangeDate?: (value: [string, string]) => void,
    fetchTag: () => Promise<any>,
    onSource?: (type: string) => void,
    onFilterTagValue: (value: string) => void
    onSelectTag?: (id: string[], option: any) => void
    textVisible?: boolean
    uploading: boolean
}

const mediaSorceType = [
    { text: '所有', type: 'All' },
    { text: '图片', type: 'Picture' },
    { text: '长视频', type: 'LongVideo' },
    { text: '中视频', type: 'MediumVideo' },
    { text: '短视频', type: 'ShortVideo' },
]

const textSourceType = [
    { text: '所有', type: 'All' },
    { text: '长标题', type: 'Long' },
    { text: '中标题', type: 'Medium' },
    { text: '短标题', type: 'Short' },
    { text: '带符号标题', type: 'Symbol' },
]

const mediaSortType = [
    { text: '默认排序', type: 'Default' },
    { text: '创意指数', type: 'Creativity' },
    { text: '点击率', type: 'Click' },
    { text: '支出回报率', type: 'ROAS' },
    { text: '支出金额', type: 'Expenditure' },
]

const PublicHeader: FC<PublicHeaderProps> = (props) => {
    const { onClear, uploading, onUpload, type, onUploadText, openText, textVisible, onAddToWorkbench, onDeleteAll,
        onSort, onSource, onChangeDate, openFolder, clearDisable, fetchTag, onFilterTagValue, onSelectTag } = props
    const [uploadLenth, setLength] = useState(0)
    const size = useRef(0)
    const setUploadLength = (file: RcFile, fileList: RcFile[]): boolean => {
        size.current += file.size
        setLength(fileList.length)
        return true
    }
    let souceType = type == 'media' ? mediaSorceType : textSourceType
    let sortType = type == 'media' ? mediaSortType : mediaSortType

    const defaultSelectOptions = type == 'media' ? JSON.parse(Store.GetMediaTagIds() || '[]') : JSON.parse(Store.GetTextTagIds() || '[]')

    return <Row className={styles.top}>
        <Col className={styles.btns} span={10}>
            {
                type == 'media' && <div className={styles.uploadBtns}>
                    <Upload multiple customRequest={e => { onUpload!(e, uploadLenth, size.current) }} showUploadList={false}
                        beforeUpload={setUploadLength}>
                        <Button type="primary" disabled={uploading} onClick={() => size.current = 0}>新增资源</Button>
                    </Upload>
                </div>
            }
            {
                type == 'text' && <Button type='primary' style={{ marginRight: 10 }} onClick={() => openText!(true)}>新增文本</Button>
            }
            <Button type='primary' style={{ marginRight: 10 }} onClick={onClear} disabled={!clearDisable}>清空选择</Button>
            <Button type='primary' style={{ marginRight: 10 }} onClick={onAddToWorkbench} disabled={!clearDisable}>添加至工作台</Button>
            <FolderOutlined className={styles.folder} title='标签库' onClick={openFolder} />
        </Col >
        <Col className={styles.filter} span={14}>
            <DeleteOutlined onClick={onDeleteAll} size={16} style={{ marginRight: 10, color: '#1890ff' }} />
            <DateRange onChange={onChangeDate} />
            <DebounceSelect fetchOptions={fetchTag} mode="multiple" placeholder='标签筛选' style={{ minWidth: 200, marginLeft: 10 }} showSearch
                defaultActiveFirstOption={false} setValue={onFilterTagValue} onChange={onSelectTag} defaultOptions={defaultSelectOptions}></DebounceSelect>
            <Select style={{ minWidth: 160, marginRight: 10, marginLeft: 10 }} placeholder='类型筛选' defaultValue='所有' onChange={(value) => onSource && onSource(value)}>
                {
                    souceType.map(souce => {
                        return <Select.Option value={souce.type} key={souce.type}>{souce.text}</Select.Option>
                    })
                }
            </Select>
            <Select style={{ minWidth: 160 }} placeholder='排序' defaultValue='默认排序' onChange={(value) => onSort && onSort(value)}>
                {
                    sortType.map(sort => {
                        return <Select.Option value={sort.type} key={sort.type}>{sort.text}</Select.Option>
                    })
                }
            </Select>
        </Col>
        <UploadTextFile visible={textVisible!} submitText={onUploadText!}
            loading={uploading} setVisible={() => openText!(false)}></UploadTextFile>
    </Row>
}

export default PublicHeader