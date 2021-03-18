import { Input, Modal, Alert, Button, Upload, message } from 'antd'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import React, { FC, useState } from 'react'

import styles from './index.less'

interface UploadTextFileProps {
    visible: boolean,
    submitText(value: string[]): void,
    loading?: boolean,
    setVisible(visible: boolean): void
}

const UploadTextFile: FC<UploadTextFileProps> = (props) => {
    const { visible, submitText, loading, setVisible } = props;

    const [readFileContent, SetReadFileContent] = useState<string>('')

    const getTextFile = (e: RcCustomRequestOptions) => {
        let reader = new FileReader();

        reader.readAsText(e.file, "utf-8")
        reader.onload = () => {
            SetReadFileContent(reader.result as string)
        }
    }

    const submit = (content: string) => {
        if (content == '') {
            message.error('空文本无法提交');
            return
        }
        submitText(content.split('\n\r\n').filter(item => item != ''))
    }
    const renderFooter: React.ReactElement[] = [
        <div className={styles.footerActions} key="back">
            <Upload showUploadList={false} customRequest={getTextFile}><Button>打开文本文件</Button></Upload>
        </div>,
        <Button key="submit" type="primary" loading={loading} onClick={e => submit(readFileContent)}>提交</Button>,
    ]

    return <Modal title="文本上传" visible={visible} className={styles.textfileModal} footer={renderFooter} onCancel={()=>setVisible(false)}>
        <Input.TextArea allowClear rows={8} value={readFileContent} onChange={e => { SetReadFileContent(e.target.value) }}></Input.TextArea>
        <Alert message="请使用回车键分割多条文本，建议txt文件编码为utf-8，否则可能导致中文乱码" type="warning" showIcon closable />
    </Modal>
}

export default UploadTextFile