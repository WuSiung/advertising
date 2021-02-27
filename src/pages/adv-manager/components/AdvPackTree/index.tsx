import React, {useState} from 'react';
import {Tree, Switch} from 'antd';
import styles from './index.less';
import {IconType} from "rc-tree/lib/interface";
import {AdvSetListType, AdvPackListType, AdvAdvListType} from '../../data'

export interface DataNode {
    checkable?: boolean;
    children?: DataNode[];
    disabled?: boolean;
    disableCheckbox?: boolean;
    icon?: IconType;
    isLeaf?: boolean;
    key: string | number;
    title?: React.ReactNode;
    selectable?: boolean;
    switcherIcon?: IconType;
    className?: string;
    style?: React.CSSProperties;
    switchButtonDisable?: boolean;
    fbId?: string;
    state?: boolean;
    isOn?: boolean;
    loading?: boolean;
}

interface AdvPackTreeProps {
    _: any,
    text: string | number,
    getAdvSetListForTreeView: (key: string) => Promise<{ res: AdvSetListType[] | AdvPackListType[] | AdvAdvListType[], isAdv: boolean }>,
    advAdv: (param: { node: DataNode, isOn: boolean }) => Promise<boolean>,
    isPack?: boolean,
    isAdv?: boolean
}


function updateTreeData(list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] {
    return list.map(node => {
        if (node.key === key) {
            return {
                ...node,
                children,
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children, key, children),
            };
        }
        return node;
    });
}

/*//根据key值递归找到node
const findNode:(data:DataNode[],key:string)=>DataNode|null = (data,key) => {
    let rItem=null;
    data.map((item) => {
        if(item.key.toString()===key) {
            rItem=item;
            return;
        }else{
            if (item.children&&item.children.length>0) {
                return findNode(item.children,key);
            }else{
                return null;
            }
        }
    });
    return rItem;
}*/

const AdvPackTree: React.FC<AdvPackTreeProps> = (props) => {
    const {_, text, getAdvSetListForTreeView, advAdv, isPack, isAdv} = props;
    const initTreeDate: DataNode[] = [
        {
            title: text.toString(),
            key: !!isAdv ? `adv_${_.advId}` : !!isPack ? _.packId : `set_${_.setId}`,
            switchButtonDisable: _.status != "3",
            state: _.state === "1",
            isOn: _.state === "1",
            fbId: _.fbId,
            loading: false,
            isLeaf:!!isAdv
        }
    ];
    const [treeData, setTreeData] = useState(initTreeDate);

    function onLoadData({key, children}: any) {
        if (key.toString().indexOf("adv_") !== -1) return Promise.resolve();
        return new Promise<void>((resolve, reject) => {
            if (children) {
                resolve();
                return;
            }

            getAdvSetListForTreeView(key).then(({res, isAdv}) => {
                const nodes = res.map((advs: any) => {
                    return {
                        title: !isAdv ? advs.setName : advs.advName,
                        key: (!isAdv ? "set_" : "adv_") + (!isAdv ? advs.setId : advs.advId),
                        switchButtonDisable: advs.status != "3",
                        state: advs.state === "1",
                        isOn: advs.state === "1",
                        fbId: advs.fbId,
                        loading: false
                    }
                })

                setTreeData(origin => {
                        return updateTreeData(origin, key, nodes);
                    }
                );
                resolve();
            }, () => {
                reject();
            });
        });
    }

    const onTreeNodeSwitchChange = (node: DataNode) => {
        node.loading = true;
        setTreeData((origin) => {
            return [...treeData];
        });
        advAdv({node, isOn: !!!node.isOn}).then(success => {
            node.loading = false;
            setTreeData((origin) => {
                return [...treeData];
            });
            if (success === null) return;
            node.isOn = !node.isOn;
            setTreeData((origin) => {
                return [...treeData];
            });
        })
    }
    return <Tree selectable={false} loadData={onLoadData} treeData={treeData}
                 titleRender={(node: DataNode & { switchButtonDisable?: boolean }) => {
                     return (<div className={styles.nodeTitleWrap}><span>{node.title}</span>
                         <div><Switch onClick={
                             (isOn) => {
                                 if (node.switchButtonDisable) return;
                                 onTreeNodeSwitchChange(node);
                             }
                         } loading={node.loading} disabled={node.switchButtonDisable} checked={node.isOn}
                                      style={{marginRight: node.key.toString().indexOf("set_") !== -1 ? "3px" : node.key.toString().indexOf("adv_") !== -1 ? "" : "6px"}}
                                      className={styles.switch}/></div>
                     </div>)
                 }}/>;
};

export {AdvPackTree}