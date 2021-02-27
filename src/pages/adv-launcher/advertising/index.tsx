import {Card,Button} from 'antd'
import React, {FC,useState} from 'react'
import DateRange from '../components/DateRange';
import {AdvPreview} from "../components/AdvPreview";

import styles from './index.less'
import {connect,AppInfo} from "umi";
import {AdvModelStateType} from "./data";
import {AdvAdvListType} from "@/pages/adv-manager/data";
import {Dispatch, UserModelState} from "@@/plugin-dva/connect";
import  Loading  from "@/components/Loading";

interface AdvPropsType {
    advertisingList: AdvAdvListType[],
    loadingAdvList: boolean,
    dispatch: Dispatch,
    appInfo:AppInfo|undefined,
    loadingAdvListAddMore:boolean,
    count:number
}
const pageSize:number=1000;
const Advertising: FC<AdvPropsType> = (props) => {
    const {dispatch,advertisingList,appInfo,loadingAdvList,count,loadingAdvListAddMore} =props;
    const [pageIndex,setPageIndex] = useState<number>(1);
    const [date,setDate] = useState<[string,string]>();
    const [dateT,setDateT] = useState<[string,string]>();
    return (
        <Card>
            {advertisingList.length+'---'+count}
            <div className={styles.filter}>
                <span className={styles.date}>发布范围筛选： <DateRange onChange={(dateStr)=>{
                    setDate(dateStr);
                    dispatch({
                        type: 'advertising/fetchAdvList',
                        payload: {
                            current:pageIndex,
                            start:dateStr[0],
                            end:dateStr[1],
                            size:pageSize
                        }
                    });
                }}/></span>
                <span className={styles.date}>统计数据过滤： <DateRange onChange={(dateStr)=>{
                    setDateT(dateStr);
                    dispatch({
                        type: 'advertising/fetchAdvList',
                        payload: {
                            current:pageIndex,
                            startT:dateStr[0],
                            endT:dateStr[1],
                            size:pageSize
                        }
                    });
                }}/></span>
            </div>
            {(loadingAdvList||loadingAdvListAddMore)&&<Loading size="large" />}
            <div className={styles.advWarp}>

                {
                    advertisingList.map(advertings=>{
                        const imgtext=advertings.imgTextList[0]?advertings.imgTextList[0]:null;
                        return (<div style={{border:"1px solid #d9d9d9"}} className={styles.advPreviewWrap}>

                            <AdvPreview  appInfo={appInfo}  classNames={styles.advPreview} url={imgtext?.advImg.url} content={imgtext?.advText.content}
                                                 title={imgtext?.advText.title} type={imgtext?.advImg.type} imgId={imgtext?.advImg.imgId} textId={imgtext?.advText.textId}/>
                            <div className={styles.mask}>
                                <div className={styles.top}>
                                    消费金额 : {advertings.spent} 点击率 ：{advertings.ctr} <br/> 广告支出回报率 : {advertings.approas}
                                </div>
                                <div className={styles.bottom}>
                                    预览广告
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
            {
                advertisingList.length<count?<Button onClick={()=>{
                    dispatch({
                        type: 'advertising/fetchAdvListAddMore',
                        payload: {
                            startT:dateT?dateT[0]:"",
                            endT:dateT?dateT[1]:"",
                            start:date?date[0]:"",
                            end:date?date[1]:"",
                            current:pageIndex+1,
                            size:pageSize
                        }
                    });
                    setPageIndex(pageIndex+1);
                }}>加载更多</Button>:<></>
            }
        </Card>
    )
}

<<<<<<< HEAD
export default connect(({ advertising }: { advertising: AdvModelStateType }) => ({
    advertisingList: advertising.advertisingList
=======
export default connect(({advertising, loading, user}: { user:UserModelState, advertising: AdvModelStateType, loading: { effects: { [key: string]: boolean } } }) => ({
    advertising,
    advertisingList:advertising.advertisingList,
    appInfo: user.appInfo,
    count:advertising.count,
    loadingAdvList: loading.effects['advertising/fetchAdvList'],
    loadingAdvListAddMore: loading.effects['advertising/fetchAdvListAddMore']
>>>>>>> develop
}))(Advertising)