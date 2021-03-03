import React, { FC, useState } from 'react'
import { Button, Col, Row, Select, Upload } from 'antd'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { FolderOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload';

import styles from './index.less'
import UploadTextFile from '@/pages/adv-launcher/components/UploadTextFile';

interface PublicHeaderProps {
    type: 'media' | 'text',
    onUpload?: (e: RcCustomRequestOptions, allLenth: number) => void,
    onUploadText?: (values: string[]) => void
    onClear: () => void,
    onAddToWorkbench: () => void,
    onDelete?: () => void,
    openFolder?: () => void,
    onSort?: (type: string) => void,
    openText?: (visible: boolean) => void,
    onSource?: (type: string) => void,
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
    const { onClear, uploading, onUpload, type, onUploadText, openText, textVisible, onAddToWorkbench, onSort, onSource } = props
    const [uploadLenth, setLength] = useState(0)
    const setUploadLength = (file: RcFile, fileList: RcFile[]): boolean => {
        setLength(fileList.length)
        return true
    }
    let souceType = type == 'media' ? mediaSorceType : textSourceType
    let sortType = type == 'media' ? mediaSortType : mediaSortType

    return <Row className={styles.top}>
        <Col className={styles.btns} span={24}>
            {
                type == 'media' && <div className={styles.uploadBtns}>
                    <Upload multiple customRequest={e => onUpload!(e, uploadLenth)} showUploadList={false} beforeUpload={setUploadLength}>
                        <Button type="primary" disabled={uploading}>上传资源</Button>
                    </Upload>
                </div>
            }
            {
                type == 'text' && <Button type='primary' style={{ marginRight: 10 }} onClick={() => openText!(true)}>上传文本</Button>
            }
            <Button type='primary' style={{ marginRight: 10 }} onClick={onClear}>清空选择</Button>
            <Button type='primary' style={{ marginRight: 10 }} onClick={onAddToWorkbench}>添加至工作台</Button>
            <FolderOutlined className={styles.folder} title='标签库' />
        </Col >
        <Col className={styles.filter}>
            <Select style={{ minWidth: 160, marginRight: 10 }} placeholder='标签筛选' defaultValue='所有' onChange={(value) => onSource && onSource(value)}>
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