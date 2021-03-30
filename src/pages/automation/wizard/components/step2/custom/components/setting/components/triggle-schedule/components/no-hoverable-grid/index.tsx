import React, {FC} from 'react';
import {Card} from 'antd';

const {Grid} = Card;

const NoHoverableGrid: FC<any> = props => {
  return (
    <Grid {...props} hoverable={false} style={{padding: 0}}>
      {props.children}
    </Grid>
  )
}

export default NoHoverableGrid
