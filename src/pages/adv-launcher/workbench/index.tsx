import { Card, Spin } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { connect, Dispatch } from 'umi'
import { WorkbenchDataType } from './data.d'
import ActionBtns from './components/ActionBtns'
import WorkbenchTable from './components/WorkbenchTable'
import PreviewContainer from '../components/PreviewContainer'

import styles from './index.les'

export interface WorkbenchPropsType {
    workbench: WorkbenchDataType,
    loading: boolean,
    dispatch: Dispatch
}

const Workbench: FC<WorkbenchPropsType> = (props) => {
    const { workbench, loading, dispatch } = props
    const [PreiviewVisible, setPreviewVisible] = useState<boolean>(false)
    useEffect(() => {
        dispatch({ type: 'workbench/fetchAllList' })
    }, [])
    return (
        <>
            <Card>
                <ActionBtns></ActionBtns>
                {/* 有数据后不再显示loading */}
                <Spin spinning={!!loading}>
                    <WorkbenchTable />
                </Spin>
                <PreviewContainer visible={ PreiviewVisible } handleVisible={setPreviewVisible}></PreviewContainer>
            </Card>
        </>
    )
}

export default connect(({ workbench, loading }: { workbench: WorkbenchDataType, loading: { effects: { [key: string]: boolean } } }) => ({
    workbench,
    loading: loading.effects['workbench/fetchAllList']
}))(Workbench)