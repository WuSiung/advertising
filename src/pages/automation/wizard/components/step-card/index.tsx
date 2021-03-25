import React, {FC, ReactNode} from 'react';
import {Button, Card} from 'antd';

interface IStepCard {
  title: ReactNode
  className?: string
};

const StepCard: FC<IStepCard> = (props) => {
  const [isShowBody, setShowBody] = React.useState(false);
  // title统一传进来，经过自己的包装加上隐藏按钮，隐藏按钮的点击事件去toggle（isShowBody）
  return (
    <Card
      type="inner"
      title={props.title}
      extra={<Button onClick={() => {setShowBody(!isShowBody)}}>{isShowBody ? '隐藏' : '编辑'}</Button>}
    >
      {isShowBody && props.children}
    </Card>
  )
}

export default StepCard;
