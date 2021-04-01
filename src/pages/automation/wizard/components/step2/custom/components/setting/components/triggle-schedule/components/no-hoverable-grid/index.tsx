import React, {FC} from 'react';
import {Card} from 'antd';
import styles from './index.less';

const {Grid} = Card;

const NoHoverableGrid: FC<any> = props => {
  return (
    <Grid {...props} hoverable={false} style={{padding: 0, opacity: props.isDisabled ? "0.5" : "1", pointerEvents: props.isDisabled? "none" : "inherit"}}>
      {props.children}
    </Grid>
  )
}

export default NoHoverableGrid
