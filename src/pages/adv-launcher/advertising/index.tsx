import {Card} from 'antd'
import React, {FC} from 'react'
import DateRange from '../components/DateRange';
import {AdvPreview} from "../components/AdvPreview";

import styles from './index.less'
import {connect} from "umi";
import {AdvModelStateType} from "./data";
import {AdvAdvListType} from "@/pages/adv-manager/data";
import {Dispatch} from "@@/plugin-dva/connect";

interface AdvPropsType {
    advertisingList: AdvAdvListType[],
    loadingAdvList: boolean,
    dispatch: Dispatch
}

const Advertising: FC<AdvPropsType> = (props) => {
    const {dispatch,advertisingList} =props;
    return (
        <Card>
            <div className={styles.filter}>
                <span className={styles.date}>发布范围筛选： <DateRange onChange={(dateStr)=>{
                    dispatch({
                        type: 'advertising/fetchAdvList',
                        payload: {
                            start:dateStr[0],
                            end:dateStr[1]
                        }
                    });
                }}/></span>
                <span className={styles.date}>统计数据过滤： <DateRange onChange={(dateStr)=>{
                    dispatch({
                        type: 'advertising/fetchAdvList',
                        payload: {
                            startT:dateStr[0],
                            endT:dateStr[1]
                        }
                    });
                }}/></span>
            </div>
            <div className={styles.advWarp}>

                {
                    advertisingList.map(advertings=>{
                        const imgtext=advertings.imgTextList[0]?advertings.imgTextList[0]:null;
                        return (<AdvPreview  classNames={styles.advPreview} url={imgtext?.advImg.url} content={imgtext?.advText.content}
                                             title={imgtext?.advText.title} imgId={imgtext?.advImg.imgId} textId={imgtext?.advText.textId}/>)
                    })
                }
               {/* <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                            title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>*/}
            </div>
        </Card>
    )
}

export default connect(({advertising, loading}: { advertising: AdvModelStateType, loading: { effects: { [key: string]: boolean } } }) => ({
    advertising,
    advertisingList:advertising.advertisingList,
    loadingAdvList: loading.effects['adv/fetchAdvList']
}))(Advertising)