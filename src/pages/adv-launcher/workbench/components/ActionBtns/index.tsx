import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { Col, Row, Button, Select, Upload, Spin } from 'antd'
import React, { FC, useCallback, useState } from 'react'
import { connect, Dispatch } from 'umi';
import Loading from '@/components/Loading'
import { postOneRecordToWorkbench } from '../../service'
import { PostMediaDataType } from '../../data';

import styles from './index.less'
import { RcFile } from 'antd/lib/upload';

interface ActionBtnsProps {
    upFileloading?: boolean,
    dispatch: Dispatch
}
const uploadSucessValue: void[] = []
let uploadFileLength = 0;
let uploadedLenth: number = 0
const ActionBtns: FC<ActionBtnsProps> = (props) => {

    const { dispatch, upFileloading } = props

    const fileChange = async (e: RcCustomRequestOptions, dispatch: Dispatch) => {
        const formData: FormData = new FormData()
        formData.append('media', e.file)
        if (dispatch) {
            const res: PostMediaDataType = await dispatch({
                type: 'workbench/uploadFile',
                payload: formData
            })
            uploadedLenth++
            uploadSucessValue.push(addResultToWorkbench(res))
            if (uploadFileLength == uploadedLenth) {
                Promise.all(uploadSucessValue).then(() => {
                    dispatch({ type: 'workbench/fetchAllList' })
                })

            }
        }
    }

    const fileUpload = useCallback(fileChange, [])

    return (
        <div className={styles.actions}>
            <Row>
                <Col span={12}>
                    <div className={styles.uploadBtns}>
                        <Upload multiple customRequest={e => fileUpload(e, dispatch)} showUploadList={false} beforeUpload={setUploadLength}>
                            <Button type="primary" disabled={upFileloading}>上传资源</Button>
                        </Upload>
                    </div>
                    <Button type="primary">新增标题</Button>
                    <Button type="primary">保存模板</Button>
                    <Select style={{ minWidth: 200 }}>
                        <Select.Option value='2'>11</Select.Option>
                    </Select>
                </Col>
                <Col span={12} className={styles.rightActions}>
                    <Button type="primary" disabled>撤回</Button>
                    <Button type="primary">清空选择</Button>
                    <Button type="primary">创建广告</Button>
                </Col>
            </Row>
            {
                upFileloading && <Loading showMask tips='图片上传中，请稍等'></Loading>
            }
        </div>
    )
}

const setUploadLength = (file: RcFile, fileList: RcFile[]): boolean => {
    uploadFileLength = fileList.length
    return true
}

const addResultToWorkbench = (result: PostMediaDataType) => {
    postOneRecordToWorkbench(result)
}



export default connect(({ workbench, loading }: { workbench: any, loading: { effects: { [key: string]: boolean } } }) => ({
    workbench,
    upFileloading: loading.effects['workbench/uploadFile']
}))(ActionBtns)