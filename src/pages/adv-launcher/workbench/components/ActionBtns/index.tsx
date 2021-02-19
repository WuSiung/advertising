import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { Col, Row, Button, Select, Upload, Spin, message } from 'antd'
import React, { FC, useCallback, useState } from 'react'
import { connect, Dispatch, history } from 'umi';
import Loading from '@/components/Loading'
import { isImage, isVideo } from '@/utils/fileType'
import UploadTextFile from '../../../components/UploadTextFile'
import { postOneRecordToWorkbench } from '../../service'
import { PostMediaDataType, WorkbenchDataType } from '../../data';

import styles from './index.less'
import { RcFile } from 'antd/lib/upload';

interface ActionBtnsProps {
    workbench: WorkbenchDataType,
    upFileloading?: boolean,
    upTextLoading?: boolean,
    dispatch: Dispatch
}
const uploadSucessValue: void[] = []
let uploadFileLength = 0;
let uploadedLenth: number = 0
const ActionBtns: FC<ActionBtnsProps> = (props) => {

    const { dispatch, upFileloading, upTextLoading, workbench } = props

    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const fileChange = async (e: RcCustomRequestOptions, dispatch: Dispatch) => {
        const formData: FormData = new FormData()
        formData.append('media', e.file)
        const type: 0 | 1 | undefined = fileType(e.file.type)
        if (dispatch) {
            const res: PostMediaDataType = await dispatch({
                type: 'workbench/uploadFile',
                payload: formData
            })
            res.type = type
            uploadedLenth++
            uploadSucessValue.push(addResultToWorkbench(res))
            if (uploadFileLength == uploadedLenth) {
                Promise.all(uploadSucessValue).then(() => {
                    dispatch({ type: 'workbench/fetchAllList' })
                })

            }
        }
    }

    const createAdv = ()=>{
        if(workbench.previewAdvs.length<=0){
            message.error('请选择广告')
        }else{
            history.push('/advlauncher/compaign')
        }
    }

    const fileUpload = useCallback(fileChange, [])

    return (
        <div className={styles.actions}>
            <Row>
                <Col span={12}>
                    <UploadTextFile visible={modalVisible} submitText={value => submitText(value, dispatch, setModalVisible, workbench)}
                        loading={upTextLoading} setVisible={setModalVisible}>
                    </UploadTextFile>
                    <div className={styles.uploadBtns}>
                        <Upload multiple customRequest={e => fileUpload(e, dispatch)} showUploadList={false} beforeUpload={setUploadLength}>
                            <Button type="primary" disabled={upFileloading}>上传资源</Button>
                        </Upload>
                    </div>
                    <Button type="primary" onClick={() => setModalVisible(true)}>新增标题</Button>
                    <Button type="primary">保存模板</Button>
                    <Select style={{ minWidth: 200 }}>
                        <Select.Option value='2'>11</Select.Option>
                    </Select>
                </Col>
                <Col span={12} className={styles.rightActions}>
                    <Button type="primary" disabled>撤回</Button>
                    <Button type="primary" onClick={() => clearPreview(dispatch)}>清空选择</Button>
                    <Button type="primary" onClick={createAdv}>创建广告</Button>
                </Col>
            </Row>
            {
                upFileloading && <Loading showMask tips='图片上传中，请稍等'></Loading>
            }
        </div>
    )
}
const submitText = async (value: string[], dispatch: Dispatch, handleModalVisible: (visible: boolean) => void, workbench: WorkbenchDataType) => {
    const postArr = value.map(text => {
        const textStr = text.split('&&')
        return { title: textStr[1] || '', content: textStr[0] || '' }
    })
    await dispatch({
        type: 'workbench/uploadText',
        payload: postArr.concat(workbench.uploadTextList)
    })
    message.success('上传成功')
    dispatch({ type: 'workbench/fetchAllList' })
    handleModalVisible(false)
}

const setUploadLength = (file: RcFile, fileList: RcFile[]): boolean => {
    uploadFileLength = fileList.length
    return true
}

const addResultToWorkbench = (result: PostMediaDataType) => {
    postOneRecordToWorkbench(result)
}

// 清空预览广告
const clearPreview = (dispatch: Dispatch) => {
    dispatch({
        type: 'workbench/savePreviewAdvs',
        payload: { previewAdvs: [] }
    })
}

const fileType = (name: string) => {
    if (isImage(name)) {
        return 0
    } else if (isVideo(name)) {
        return 1
    } else {
        return
    }
}



export default connect(({ workbench, loading }: { workbench: WorkbenchDataType, loading: { effects: { [key: string]: boolean } } }) => ({
    workbench,
    upFileloading: loading.effects['workbench/uploadFile'],
    upTextLoading: loading.effects['workbench/uploadText'],
}))(ActionBtns)