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
    openText?: (visible: boolean) => void,
    textVisible?: boolean
    uploading: boolean
}

const PublicHeader: FC<PublicHeaderProps> = (props) => {
    const { onClear, uploading, onUpload, type, onUploadText, openText, textVisible, onAddToWorkbench } = props
    const [uploadLenth, setLength] = useState(0)
    const setUploadLength = (file: RcFile, fileList: RcFile[]): boolean => {
        setLength(fileList.length)
        return true
    }

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
            <Select style={{ minWidth: 160, marginRight: 10 }} placeholder='标签筛选'>
                <Select.Option value='111'>111</Select.Option>
            </Select>
            <Select style={{ minWidth: 160 }} placeholder='排序'>
                <Select.Option value='111'>111</Select.Option>
            </Select>
        </Col>
        <UploadTextFile visible={textVisible!} submitText={onUploadText!}
            loading={uploading} setVisible={() => openText!(false)}></UploadTextFile>
    </Row>
}

export default PublicHeader