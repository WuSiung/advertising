import React, { FC } from 'react'
import { Input, Tree } from 'antd'
import { TreeDataType } from '../../data'

interface FilterTreeProps {
    treeData?: Array<TreeDataType>
}

const mockTreeData: Array<TreeDataType> = [
    {
        title: '全部', key: 1, children: [
            {
                title: '自定义', key: 2, children: [
                    {
                        title: '最新人群包', key: 4, children: [
                            {title: '网络游戏', key: 8},
                            {title: '休闲游戏', key: 9},
                        ]
                    },
                    {title: '兴趣人群包', key: 5, children: []},
                    {title: '自定义人群包', key: 6, children: []},
                    {title: '混合人群包', key: 7, children: []},
                ]
            },
            {
                title: '官方库', key: 3, children: [
                    {title: '视频人群包', key: 15, children: []},
                    {title: '重新参与人群包', key: 16, children: []},
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
    const onExpand = () => {
        console.log(111)
    }
    return <>
        <Input.Search placeholder='搜索' style={{marginBottom: 10}}/>
        <Tree
          onExpand={onExpand}
          defaultExpandAll
          treeData={props.treeData}
        />
    </>
}

FilterTree.defaultProps = {
    treeData: mockTreeData
}

export default FilterTree