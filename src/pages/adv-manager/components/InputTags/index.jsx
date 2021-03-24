import React, { useState, useImperativeHandle, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Input from 'antd/es/input';
import Tag from 'antd/es/tag';
import message from 'antd/es/message';
import 'antd/es/input/style';
import 'antd/es/message/style';
import 'antd/es/tag/style';
import styles from './index.less'

const Main = (props, ref) => {
    const [value, setValue] = useState(props.value)
    const [valueInput, setValueInput] = useState('')
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
        changeVal: () => {
            return value
        }
    }));

    function pressEnter(e) {
        if (e.target.value) {
            setValue([...value, e.target.value])
            props.onChange([...value, e.target.value]);
            setValueInput('')
        } else {
            message.error('无数据')
        }
    }

    function preventDefault(str, e) {
        e.preventDefault();
        const val = value.filter(item => item !== str);
        setValue([...val]);
        props.onChange([...val]);
    }

    function focus() {
        inputRef.current && inputRef.current.focus()
    }

    function handleChange(e) {
        let elm = e.target;
        setValueInput(elm.value)
    }

    // 按下删除监听
    function keyDown(e) {
        if (e.keyCode === 8 && !valueInput) {
            const val = value.filter(function (v, i, ar) {
                return i !== ar.length - 1
            });
            setValue([...val]);
            props.onChange([...val]);
        }
    }


    return (
        <div>
            <div onClick={focus} className={styles.wrap}>
                <ul className={styles.ulClass}>
                    {
                        value && Array.isArray(value) && Array.from(value).map((item, index) => (
                            <li key={index} style={{ float: 'left', marginTop: '4px' }}>
                                <Tag closable onClose={(e) => preventDefault(item, e)} className={styles.tags}>
                                    <span className={styles.tagName}>{item.indexOf("#^*_") !== -1 ? item.split("#^*_")[1] : item}</span>
                                </Tag>
                            </li>))
                    }
                    {
                        value.length <= 2 ?
                            <li style={{ float: 'left' }}>
                                <Input placeholder={props.placeholder} onKeyDown={keyDown} size="middle" ref={inputRef} value={valueInput} className={styles.inputClass}
                                    onPressEnter={pressEnter} onBlur={pressEnter} onChange={handleChange}
                                />
                            </li> : <li style={{ float: 'left' }}>
                                <Input placeholder={props.placeholder} onKeyDown={keyDown} size="middle" style={{ width: 20, visibility: 'hidden' }} />
                            </li>
                    }
                </ul>
            </div>
        </div>
    );
}



export default forwardRef(Main)