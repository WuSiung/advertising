import { Card, Spin } from 'antd'
import React, { FC, useEffect } from 'react'
import { connect, Dispatch } from 'umi'
import { WorkbenchDataType } from './data.d'
import ActionBtns from './components/ActionBtns'
import WorkbenchTable from './components/WorkbenchTable'

export interface WorkbenchPropsType {
    workbench: WorkbenchDataType,
    loading: boolean,
    dispatch: Dispatch
}

const Workbench: FC<WorkbenchPropsType> = (props) => {
    const { workbench, loading, dispatch } = props
    useEffect(() => {
        dispatch({ type: 'workbench/fetchAllList' })
    }, [])
    return (
        <>
            <Card>
                <ActionBtns></ActionBtns>
                {/* 有数据后不再显示loading */}
                <Spin spinning={!!loading && workbench.uploadImgList.length <= 0}>
                    <WorkbenchTable />
                </Spin>
            </Card>
        </>
    )
}

export default connect(({ workbench, loading }: { workbench: WorkbenchDataType, loading: { effects: { [key: string]: boolean } } }) => ({
    workbench,
    loading: loading.effects['workbench/fetchAllList']
}))(Workbench)