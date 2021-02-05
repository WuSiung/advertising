import { Spin } from 'antd';
import React, { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './index.less'

interface LoadingProps {
    isFullScreen?: boolean,
    icon?: React.ReactElement<HTMLElement>,
    wrapClassName?: string,
    size?: "small" | "default" | "large",
    showMask?: boolean,
    tips?: string
}


const LoadingElement: FC<LoadingProps> = (props) => {
    const { icon, wrapClassName, size, isFullScreen, showMask, tips } = props
    const classNames = `${styles.customLoading} ${wrapClassName} ${isFullScreen && styles.screen} ${showMask && styles.mask}`
    return (
        <div className={classNames}>
            <Spin tip={tips} indicator={icon || <LoadingOutlined style={{color: '#ffffff'}}/>} size={size || 'large'}></Spin>
        </div>
    )
}

export default LoadingElement