import { Form, Input } from 'antd'
import React, { FC, useEffect, useRef, useState } from 'react'
import { AdvAdvListType, AdvPackListType, AdvSetListType } from '../../data';

import styles from './index.less'

interface EditTdProps {
    onSave: (value: number) => void,
    title: string,
    dataIndex: string,
    record: AdvPackListType | AdvSetListType | AdvAdvListType
}
const EditTd: FC<EditTdProps> = (props) => {
    const inputRef = useRef<Input>(null);
    const [editing, setEditing] = useState(false);
    const [form] = Form.useForm();
    const { onSave, title, dataIndex, children, record } = props

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            onSave(Number(values[dataIndex]));
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    return <Form form={form}>
        {
            editing ? <Form.Item
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `请输入${title}`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} type='number' />
            </Form.Item> : <div className={styles.editableCellValueWrap} style={{ paddingRight: 24 }} onClick={toggleEdit}>
                    {children}
                </div>
        }

    </Form>
}

export default EditTd