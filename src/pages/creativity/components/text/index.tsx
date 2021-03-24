import { showConfirm } from '@/components/Confrim'
import Loading from '@/components/Loading'
import { postOneTextsToWorkbench } from '@/pages/adv-launcher/workbench/service'
import Store from '@/utils/store'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Empty, message, Modal, Spin } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { connect, CurrentUser, Dispatch, UserModelState } from 'umi'
import { MaterialStateType, PublicMaterialDataType, TagType } from '../../data'
import { addTag, deletResource, delTag, getTextTag, getSouceTag, deletManyResource } from '../../service'
import MaterialBox from '../Box'
import EditTag from '../EditTag'
import PublicHeader from '../PublicHeader'

import styles from './index.less'

type PublicTextProps = {
    dispatch: Dispatch,
    userInfo?: CurrentUser,
    textGetLoading: boolean,
    textUploading: boolean
} & Omit<MaterialStateType, 'mediaList' | 'mediaTags'>

interface PageProps {
    page: number,
    size: number
}

const TextCreativity: FC<PublicTextProps> = (props) => {
    const { textList, dispatch, userInfo, textGetLoading, textUploading, textTags } = props


    const [textToWorkbenchLoading, setTextToWorkbenchLoading] = useState(false)
    const textRef = useRef<HTMLDivElement>(null)
    const [filterDate, setFilterDate] = useState<[string, string]>(['', ''])
    const [textQueryParams, setTextQuery] = useState<PageProps>({ page: 1, size: 100 })
    const [textModelVisible, setTextModelVisible] = useState(false)
    const [textSort, setTextSort] = useState('Default')
    const [filterTagId, setFilterTagId] = useState<string[]>([])
    const [textFilter, setTextFilter] = useState('All')
    const [filterTagSearch, setFilterTagSearch] = useState('')
    const [tagParams, setTagParams] = useState<{ id: string, tagList: TagType[] }>({ id: '', tagList: [] })
    const [editTextInfo, setEditInfo] = useState({ title: '', content: '' })
    const [tagVisible, setTagVisible] = useState(false)
    const [tagName, setTagName] = useState('')

    useEffect(() => {
        if (userInfo?.userId) {
            dispatch({
                type: 'material/fetchTexts',
                payload: {
                    ...textQueryParams, id: userInfo.userId, titleType: textFilter, sortForResource: textSort, tagIds: filterTagId,
                    sortForTag: 'Default', beginTime: filterDate[0], endTime: filterDate[1]
                }
            })
        }
    }, [userInfo?.userId, textQueryParams, textSort, textFilter, filterDate, filterTagId])
    useEffect(() => {
        dispatch({ type: 'material/fetchTextTags' })
    }, [])

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

    const deleteManySource = () => {
        const deleteCheckMedia = textList.filter(text => text.checked)
        if (deleteCheckMedia.length <= 0) {
            message.warning('请选择资源再删除！')
            return
        }
        let ids = deleteCheckMedia.map(text => text.id)

        showConfirm({
            onOk: deletManyResource.bind(null, { resourceIds: ids })
        }).then(() => {
            const now = textList.filter(text => !ids.includes(text.id))
            dispatch({
                type: 'material/saveTexts',
                payload: { textList: JSON.parse(JSON.stringify(now)) }
            })
        })
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
        setTagParams({ id: 'all', tagList: textTags })
        setTagName('')
        setTagVisible(true)
    }

    const editTag = (i: number) => {
        let editInfo = textList[i]
        setTagParams({ id: editInfo.id, tagList: editInfo.tags })
        setEditInfo({ title: editInfo.title, content: editInfo.description })
        setTagVisible(true)
    }

    const changeT = (value: string) => {
        const strs = value.split('&&')
        setEditInfo({ title: strs[1], content: strs[0] })
    }

    const editText = async () => {
        await dispatch({
            type: 'material/uploadTexts',
            payload: { userId: userInfo?.userId || 1, arr: [{ id: tagParams.id, text: editTextInfo.content, title: editTextInfo.title }] }
        })
        let newList = textList.map(text => {
            if (text.id == tagParams.id) {
                text.description = editTextInfo.content;
                text.title = editTextInfo.title
            }
            return text
        })
        message.success('修改成功')
        dispatch({
            type: 'material/saveTexts',
            payload: { textList: JSON.parse(JSON.stringify(newList)) }
        })

    }

    const editTagOk = async () => {
        if (tagName == '') {
            message.warning('请输入标签名或者等待查找完成')
            return
        }
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
        dispatch({
            type: 'material/fetchTextTags'
        })
        message.success('添加成功')
    }

    const chooseTagId = (value: string[], options: any) => {
        const storageValue: { key?: string; label: React.ReactNode; value: string | number }[] = []
        const allIds = options?.map((item: any) => {
            storageValue.push({ key: item.key, label: item.name, value: item.value })
            return item.key
        })
        setFilterTagId(allIds)
        Store.SetTextTagIds(storageValue)
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
        <PublicHeader clearDisable={textList.some(text => text.checked)} onClear={clearTextCheck} type='text' onAddToWorkbench={addTextToWorkbench}
            fetchTag={getTextTag} onDeleteAll={deleteManySource} onSort={setTextSort} onSource={setTextFilter} openFolder={handleAiLib}
            tags={textTags || []} onSelectTag={chooseTagId} onFilterTagValue={setFilterTagSearch}
            onUploadText={submitTexts} uploading={textUploading} openText={setTextModelVisible} textVisible={textModelVisible} onChangeDate={setFilterDate} />
        <Spin spinning={!!textGetLoading}>
            <div className={`${styles.mediaContent} ${styles.textList}`} onScroll={scrollText} ref={textRef}>
                {
                    textList.map((text, i) => {
                        return <MaterialBox {...text} key={text.id} index={i} type='text' onDelete={deleteText} onClick={checkText} onEdit={editTag} />
                    })
                }
            </div>
            {
                textList.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无文本素材' />
            }
        </Spin>
        {
            textToWorkbenchLoading && <Loading showMask tips='上传中，请稍后...' />
        }
        <EditTag visible={tagVisible} tagList={tagParams.tagList} tagName={tagName} setTagName={setTagName} onAdd={editTagOk} fetchTags={getTextTag}
            onCancel={() => setTagVisible(false)} onDelete={deleteTag} type={tagParams.id} onChangeResult={changeSearch}
            textInfo={editTextInfo.content + '&&' + editTextInfo.title} onChangeTextInfo={changeT} onEditText={editText} />
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
            console.log(deleteInfo)
            return deletResource(deleteInfo.id).then(res => {
                if (res) {
                    dispatch({
                        type: 'material/saveTexts',
                        payload: { textList: JSON.parse(JSON.stringify(setArr)) }
                    })
                }
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
    textTags: material.textTags,
    textGetLoading: loading.effects['material/fetchTexts'],
    textUploading: loading.effects['material/uploadTexts'],
    userInfo: user.currentUser
}))(TextCreativity)