import React, { FC, useEffect } from 'react'
import { Input, Tree } from 'antd'
import { CrowdStateType, TreeDataType } from '../../data'
import { DataNode, EventDataNode } from 'antd/lib/tree'
import { connect, Dispatch } from 'umi'

interface FilterTreeProps {
    treeData?: Array<TreeDataType>,
    dispatch: Dispatch,
    allCrowds: CrowdStateType['allCrowds'],
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
    const { dispatch, allCrowds } = props

    useEffect(() => {
        dispatch({
            type: 'crowds/fetchCrowdsList',
            payload: { size: 1000 }
        })
    }, [])

    const selectTree = (selectedKeys: (string | number)[], info: {
        event: "select";
        selected: boolean;
        node: EventDataNode;
        selectedNodes: DataNode[];
        nativeEvent: MouseEvent;
    }) => {
        let kinds: 'all' | 'base' | 'custom' = 'all'
        if (selectedKeys[0] == 1) {
            kinds = 'all'
        } else if (selectedKeys[0] > 10) { // 大于10是半成品包菜单栏
            kinds = 'base'
            const newArr = allCrowds.custom.map(crowd => {
                console.log(crowd)
            })
        } else {
            const newArr = allCrowds.custom.map(crowd => {
                console.log(crowd)
            })
            kinds = 'custom'
        }

        dispatch({
            type: 'crowds/setKinds',
            payload: { kinds }
        })
        dispatch({
            type: 'crowds/setTitle',
            payload: { title: info.node.title }
        })
    }
    return <>
        <Input.Search placeholder='搜索' style={{ marginBottom: 10 }} />
        <Tree
            onSelect={selectTree}
            defaultExpandAll
            treeData={props.treeData}
        />
    </>
}

FilterTree.defaultProps = {
    treeData: mockTreeData
}

export default connect(({ crowds, loading }: { crowds: CrowdStateType, loading: { effects: { [key: string]: boolean } } }) => ({
    loading: loading.effects['crowds/fetchCrowdsList'],
    title: crowds.title,
    allCrowds: crowds.allCrowds
}))(FilterTree)