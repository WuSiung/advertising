import {Card} from 'antd'
import React, {FC} from 'react'
import DateRange from '../components/DateRange';
import {AdvPreview} from "../components/AdvPreview";

import styles from './index.less'

const Advertising: FC<any> = (props) => {
    return (
        <Card>
            <div className={styles.filter}>
                <span className={styles.date}>发布范围筛选： <DateRange/></span>
                <span className={styles.date}>统计数据过滤： <DateRange/></span>
            </div>
            <div className={styles.advWarp}>
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
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
                <AdvPreview  classNames={styles.advPreview} url="baidu.com" content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容，这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
                             title="这是标题，这是标题，这是标题，这是标题，" imgId={123} textId={321}/>
            </div>
        </Card>
    )
}

export default Advertising