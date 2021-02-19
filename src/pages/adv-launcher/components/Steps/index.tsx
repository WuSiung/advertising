import { Steps } from 'antd'
import React, { FC } from 'react'

import styles from './index.less'

interface StepNumProps {
    stepNum: number
}


const AdvSteps: FC<StepNumProps> = (props) => {
    const { stepNum } = props
    const titles = [
        '选择广告系列策略', '人群包设置', 'Facebook设置', '预览'
    ]
    return (
        <Steps current={stepNum} size='small' className={styles.advSteps}>
            {
                titles.map((title, index) => {
                    const status = stepNum > index ? 'finish' : 'wait'
                    return <Steps.Step key={title} status={stepNum == index ? 'process' : status} title={title} />
                })
            }
        </Steps>
    )
}

export default AdvSteps