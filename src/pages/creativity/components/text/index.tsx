import { showConfirm } from '@/components/Confrim'
import Loading from '@/components/Loading'
import { postOneTextsToWorkbench } from '@/pages/adv-launcher/workbench/service'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { message, Modal, Spin } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { connect, CurrentUser, Dispatch, UserModelState } from 'umi'
import { MaterialStateType, PublicMaterialDataType, TagType } from '../../data'
import { addTag, deletResource, delTag, getAllTag, getSouceTag } from '../../service'
import MaterialBox from '../Box'
import EditTag from '../EditTag'
import PublicHeader from '../PublicHeader'

import styles from './index.less'

type PublicTextProps = {
    dispatch: Dispatch,
    userInfo?: CurrentUser,
    textGetLoading: boolean,
    textUploading: boolean
} & Pick<MaterialStateType, 'textList'>

interface PageProps {
    page: number,
    size: number
}

const TextCreativity: FC<PublicTextProps> = (props) => {
    const { textList, dispatch, userInfo, textGetLoading, textUploading } = props


    const [textToWorkbenchLoading, setTextToWorkbenchLoading] = useState(false)
    const textRef = useRef<HTMLDivElement>(null)
    const [filterDate, setFilterDate] = useState<[string, string]>(['', ''])
    const [textQueryParams, setTextQuery] = useState<PageProps>({ page: 1, size: 100 })
    const [textModelVisible, setTextModelVisible] = useState(false)
    const [textSort, setTextSort] = useState('Default')
    const [textFilter, setTextFilter] = useState('All')
    const [tagParams, setTagParams] = useState<{ id: string, tagList: TagType[] }>({ id: '', tagList: [] })
    const [tagVisible, setTagVisible] = useState(false)
    const [tagName, setTagName] = useState('')

    useEffect(() => {
        if (userInfo?.userId) {
            dispatch({
                type: 'material/fetchTexts',
                payload: {
                    ...textQueryParams, id: userInfo.userId, titleType: textFilter, sortForResource: textSort,
                    sortForTag: 'Default', beginTime: filterDate[0], endTime: filterDate[1]
                }
            })
        }
    }, [userInfo?.userId, textQueryParams, textSort, textFilter, filterDate])

    const clearTextCheck = () => {
        let editList = textList.map(text => {
            text.checked = false
            return text
        })
        dispatch({
            type: 'material/saveMedias',
            payload: { textList: JSON.parse(JSON.stringify(editList)) }
        })
    }

    const addTextToWorkbench = () => {
        const addArr: Array<Promise<unknown>> = []
        if (textList.every(text => !text.checked)) {
            message.warning('请选择素材')
            return
        }
        setTextToWorkbenchLoading(true)
        textList.map(text => {
            if (text.checked) {
                addArr.push(postOneTextsToWorkbench({ title: text.title, content: text.description }))
            }
        })
        Promise.all(addArr).then(() => {
            setTextToWorkbenchLoading(false)
            message.success('添加成功')
        })
    }

    const submitTexts = async (values: string[]) => {
        const uploadParams = values.map(value => {
            let str = value.split('&&')
            return { title: str[1] || '', text: str[0] || '', id: generateUUID() }
        })
        await dispatch({
            type: 'material/uploadTexts',
            payload: { userId: userInfo?.userId || 1, arr: uploadParams }
        })
        setTextModelVisible(false)
        setTextQuery({ page: 1, size: 100 })
    }

    const scrollText = () => {
        const clientHeight = textRef.current?.clientHeight || 0;
        const scrollTop = textRef.current?.scrollTop || 0;
        const scrollHeight = textRef.current?.scrollHeight || 0;
        if ((clientHeight + scrollTop) == scrollHeight) {
            const newQueryParams: PageProps = { page: textQueryParams.page + 1, size: textQueryParams.size }
            setTextQuery(newQueryParams)
        }
    }

    const deleteText = (i: number) => {
        let deleteInfo = textList[i]
        const newArr = textList
        newArr.splice(i, 1)
        showDeleteConfirm(dispatch, deleteInfo, 'text', newArr)
    }

    const checkText = (i: number) => {
        let editList = textList
        editList[i].checked = !editList[i].checked;
        dispatch({
            type: 'material/saveTexts',
            payload: { textList: JSON.parse(JSON.stringify(editList)) }
        })
    }

    const handleAiLib = () => {
        getAllTag().then(res => {
            setTagName('')
            setTagParams({ id: 'all', tagList: res.value })
            setTagVisible(true)
        })
    }

    const editTag = (i: number) => {
        let editInfo = textList[i]
        setTagParams({ id: editInfo.id, tagList: editInfo.tags })
        setTagVisible(true)
    }

    const editTagOk = async () => {
        if (tagParams.id == 'all') {
            message.warning('暂时无法添加到标签库，您可以通过资源添加标签')
            return
        } else {
            const flag = tagParams.tagList.some(tag => tagName == tag.name)
            if (flag) {
                message.warning('标签已存在，请重新输入')
                return
            }
        }
        await addTag({ soureceId: tagParams.id == 'all' ? '' : tagParams.id, userId: userInfo?.userId, name: tagName })
        setTagName('')
        updateTag()
        message.success('添加成功')
    }

    const deleteTag = async (id: string) => {
        showConfirm({ onOk: delTag.bind(null, id) }).then(() => { message.success('删除成功'); updateTag() })
    }

    const updateTag = () => {
        getSouceTag(tagParams.id).then(res => {
            setTagParams({ ...tagParams, tagList: res.value.tags })
            const setTextList = textList.map(text => {
                if (text.id == tagParams.id) {
                    text.tags = res.value.tags
                }
                return text
            })
            dispatch({
                type: 'material/saveTexts',
                payload: { textList: setTextList }
            })
        })
    }

    const changeSearch = (v: string, o: any) => {
        if (tagParams.id == 'all') {
            message.warning('请不要重复添加噢~')
        } else {
            setTagName(v)
        }
    }

    return <div>
        <PublicHeader onClear={clearTextCheck} type='text' onAddToWorkbench={addTextToWorkbench} onSort={setTextSort} onSource={setTextFilter} openFolder={handleAiLib}
            onUploadText={submitTexts} uploading={textUploading} openText={setTextModelVisible} textVisible={textModelVisible} onChangeDate={setFilterDate} />
        <Spin spinning={!!textGetLoading}>
            <div className={`${styles.mediaContent} ${styles.textList}`} onScroll={scrollText} ref={textRef}>
                {
                    textList.map((text, i) => {
                        return <MaterialBox {...text} key={text.id} index={i} type='text' onDelete={deleteText} onClick={checkText} onEdit={editTag} />
                    })
                }
            </div>
        </Spin>
        {
            textToWorkbenchLoading && <Loading showMask tips='上传中，请稍后...' />
        }
        <EditTag visible={tagVisible} tagList={tagParams.tagList} tagName={tagName} setTagName={setTagName} onAdd={editTagOk}
            onCancel={() => setTagVisible(false)} onDelete={deleteTag} type={tagParams.id} onChangeResult={changeSearch} />
    </div>
}

const showDeleteConfirm = (dispatch: Dispatch, deleteInfo: PublicMaterialDataType, type: 'text' | 'media', setArr: PublicMaterialDataType[]) => {
    Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '是否确认删除？',
        okText: '确认',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
            return deletResource(deleteInfo.id).then(() => {
                dispatch({
                    type: 'material/saveTexts',
                    payload: { textList: JSON.parse(JSON.stringify(setArr)) }
                })
            })
        }
    });
}

const generateUUID = (): string => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


export default connect(({ material, user, loading }: { material: MaterialStateType, user: UserModelState, loading: { effects: { [key: string]: boolean } } }) => ({
    textList: material.textList,
    textGetLoading: loading.effects['material/fetchTexts'],
    textUploading: loading.effects['material/uploadTexts'],
    userInfo: user.currentUser
}))(TextCreativity)