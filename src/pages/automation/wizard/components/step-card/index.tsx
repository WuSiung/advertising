import React, { FC } from 'react';
import { Card } from 'antd';

interface IStepCard {

};

const StepCard: FC<IStepCard> = (props) => {
  const [isShowBody, setShowBody] = React.useState(false);
  // title统一传进来，经过自己的包装加上隐藏按钮，隐藏按钮的点击事件去toggle（isShowBody）
  return (
    <Card>
      {isShowBody && props.children}
    </Card>
  )
}

export default StepCard;
