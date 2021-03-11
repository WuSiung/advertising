import React, { FC, useEffect } from 'react'
import { Input, Tree } from 'antd'
import { CrowdStateType, TreeDataType } from '../../data'
import { DataNode, EventDataNode } from 'antd/lib/tree'
import { connect, Dispatch } from 'umi'
import { Key } from 'antd/lib/table/interface'

interface FilterTreeProps {
    treeData?: Array<TreeDataType>,
    dispatch: Dispatch,
    treeCheck: number[]
}

const mockTreeData: Array<TreeDataType> = [
    {
        title: '全部', key: 1, children: [
            {
                title: '自定义', key: 2, children: [
                    { title: '最新人群包', key: 4 },
                    { title: '兴趣人群包', key: 5 },
                    { title: '自定义人群包', key: 6 },
                    { title: '混合人群包', key: 7 },
                ]
            },
            {
                title: '官方库', key: 11, children: [
                    { title: '重新定位', key: 15 },
                    { title: '重新参与', key: 16 },
                    { title: '保留', key: 17 }
                ]
            },
        ]
    }
]
/**
 * https://ant.design/components/tree-cn/#components-tree-demo-search
 * 树节点搜索代码可参考 
 * */
const FilterTree: FC<FilterTreeProps> = (props) => {
    const { dispatch, treeData, treeCheck } = props

    useEffect(() => {
        dispatch({
            type: 'crowds/fetchCrowdsList',
            payload: { size: 1000 }
        })
        if (treeCheck.length <= 0) {
            dispatch({
                type: 'crowds/saveTreeCheck',
                payload: { treeCheck: [1, 2, 11, 4, 5, 6, 7, 15, 16, 17] }
            })
        }
    }, [])

    const checkTree = (checked: React.ReactText[] | {
        checked: React.ReactText[];
        halfChecked: React.ReactText[];
    }, info: {
        event: 'check';
        node: EventDataNode;
        checked: boolean;
        nativeEvent: MouseEvent;
        checkedNodes: DataNode[];
        checkedNodesPositions?: {
            node: DataNode;
            pos: string;
        }[];
        halfCheckedKeys?: Key[];
    }) => {
        dispatch({
            type: 'crowds/saveTreeCheck',
            payload: { treeCheck: checked }
        })
    }
    return <>
        <Input.Search placeholder='搜索' style={{ marginBottom: 10 }} />
        <Tree
            checkable
            defaultCheckedKeys={[1, 2, 11, 4, 5, 6, 7, 15, 16, 17]}
            onCheck={checkTree}
            defaultExpandAll
            treeData={treeData}
        />
    </>
}

FilterTree.defaultProps = {
    treeData: mockTreeData
}

export default connect(({ crowds, loading }: { crowds: CrowdStateType, loading: { effects: { [key: string]: boolean } } }) => ({
    loading: loading.effects['crowds/fetchCrowdsList'],
    treeCheck: crowds.treeCheck
}))(FilterTree)