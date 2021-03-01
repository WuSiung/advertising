import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { Col, Row, Button, Select, Upload, message, Modal, Input } from 'antd'
import React, { FC, useCallback, useState } from 'react'
import { connect, Dispatch, history } from 'umi';
import Loading from '@/components/Loading'
import { isImage, isVideo } from '@/utils/fileType'
import UploadTextFile from '../../../components/UploadTextFile'
import { deleteTemplate, getTempDetail, postMediasToWorkbench, postOneRecordToWorkbench, postTextsToWorkbench } from '../../service'
import { PostMediaDataType, PreviewAdvType, WorkbenchDataType } from '../../data';

import styles from './index.less'
import { RcFile } from 'antd/lib/upload';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

interface ActionBtnsProps {
    workbench: WorkbenchDataType,
    upFileloading?: boolean,
    upTextLoading?: boolean,
    dispatch: Dispatch,
    saveTempLoading: boolean,
    queryTempLoading: boolean
}
const uploadSucessValue: void[] = []
let uploadFileLength = 0;
let uploadedLenth: number = 0
const ActionBtns: FC<ActionBtnsProps> = (props) => {

    const { dispatch, upFileloading, upTextLoading, workbench, saveTempLoading, queryTempLoading } = props

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [showSaveTemp, setShowSaveTemp] = useState<boolean>(false)
    const [tempName, setTempName] = useState('')
    const [selectTempLoading, setSelectTempLoading] = useState<boolean>(false)

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

    const createAdv = () => {
        if (workbench.previewAdvs.length <= 0) {
            message.error('请选择广告')
        } else {
            history.push('/advlauncher/compaign')
        }
    }

    const saveTemp = async () => {
        if (tempName == '') {
            message.error('请输入模板名称')
        }
        const imgsId = workbench.uploadImgList.map(img => img.imgId).join(',')
        const textsId = workbench.uploadTextList.map(text => text.textId).join(',')
        const previewId = workbench.previewAdvs.map(adv => ({ textid: adv.textId, imgid: adv.imgId }))
        await dispatch({
            type: 'workbench/saveTemp',
            payload: { imgStr: imgsId, relStr: JSON.stringify(previewId), templateName: tempName, textStr: textsId }
        })
        message.success('模板保存成功')
        setShowSaveTemp(false)
        dispatch({ type: 'workbench/queryTemp' })
    }

    const tempSelect = (_: string, option: any) => {
        setSelectTempLoading(true)
        getTempDetail(option.key).then(res => {
            let newPreviewsArr: Array<PreviewAdvType> = []
            if (res.data.advTemplateRelList.length > 0) {
                res.data.advTemplateRelList?.map((adv: any) => {
                    newPreviewsArr.push({ ...adv.advImg, ...adv.advText })
                })
            }
            Promise.all([postMediasToWorkbench({ data: JSON.stringify(res.data.imgList) }), postTextsToWorkbench({ data: JSON.stringify(res.data.textList) })]).then(() => {
                setSelectTempLoading(false)
                dispatch({
                    type: 'workbench/savePreviewAdvs',
                    payload: { previewAdvs: newPreviewsArr || [] }
                })
                message.success('读取模板成功，请等待加载或刷新页面')
                dispatch({ type: 'workbench/fetchAllList' })
            })
        }).catch(err => {
            setSelectTempLoading(false)
        })
    }

    const fileUpload = useCallback(fileChange, [])

    const tempModalFooter: React.ReactElement[] = [
        <Button key='cancel' onClick={() => { setShowSaveTemp(false) }}>取消</Button>,
        <Button key='ok' type='primary' loading={saveTempLoading} onClick={saveTemp}>提交</Button>
    ]

    return (
        <div className={styles.actions}>
            <Row>
                <Col span={16}>
                    <UploadTextFile visible={modalVisible} submitText={value => submitText(value, dispatch, setModalVisible, workbench)}
                        loading={upTextLoading} setVisible={setModalVisible}>
                    </UploadTextFile>
                    <div className={styles.uploadBtns}>
                        <Upload multiple customRequest={e => fileUpload(e, dispatch)} showUploadList={false} beforeUpload={setUploadLength}>
                            <Button type="primary" disabled={upFileloading}>上传资源</Button>
                        </Upload>
                    </div>
                    <Button type="primary" onClick={() => setModalVisible(true)}>新增标题</Button>
                    <Button type="primary" onClick={() => setShowSaveTemp(true)}>保存模板</Button>
                    <Select style={{ minWidth: 200 }} placeholder='读取模板数据' loading={queryTempLoading || selectTempLoading} value={''} onChange={tempSelect}>
                        {
                            workbench.templateList.map(temp => {
                                return <Select.Option value={temp.templateName} key={temp.templateId}>
                                    <div className={styles.selectItem}>
                                        {temp.templateName}
                                        <DeleteOutlined onClick={e => { e.stopPropagation(); showDeleteConfirm(temp.templateId, dispatch) }} />
                                    </div>
                                </Select.Option>
                            })
                        }
                    </Select>
                </Col>
                <Col span={8} className={styles.rightActions}>
                    <Button type="primary" disabled>撤回</Button>
                    <Button type="primary" onClick={() => clearPreview(dispatch)}>清空选择</Button>
                    <Button type="primary" onClick={createAdv}>创建广告</Button>
                </Col>
            </Row>
            <Modal visible={showSaveTemp} title='模板名称' footer={tempModalFooter}>
                <Input placeholder='请输入名称' value={tempName} onChange={e => setTempName(e.target.value)}></Input>
            </Modal>
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

const showDeleteConfirm = (id: number, dispatch: Dispatch) => {
    Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '是否确认删除模板',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
            return deleteTemplate(id).then(() => {
                message.success('删除成功')
                dispatch({ type: 'workbench/queryTemp' })
            })
        }
    })
}



export default connect(({ workbench, loading }: { workbench: WorkbenchDataType, loading: { effects: { [key: string]: boolean } } }) => ({
    workbench,
    upFileloading: loading.effects['workbench/uploadFile'],
    upTextLoading: loading.effects['workbench/uploadText'],
    saveTempLoading: loading.effects['workbench/saveTemp'],
    queryTempLoading: loading.effects['workbench/queryTemp'],
}))(ActionBtns)