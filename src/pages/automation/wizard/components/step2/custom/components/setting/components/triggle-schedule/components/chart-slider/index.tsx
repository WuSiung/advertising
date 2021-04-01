import React, {FC, useState} from 'react';
import {Col, InputNumber, Row, Slider, Space} from "antd";
import styles from './index.less';

function move(values: number[], idx: number, direction: number): boolean {
  if (direction === -1) {
    if ((idx > 0 && values[idx] - values[idx - 1] > 1) || (idx === 0 && values[idx] > 0)) {
      values[idx] -= 1;
      return true;
    }

    if (idx > 0) {
      if (move(values, idx - 1, direction)) {
        values[idx] -= 1;
        return true;
      }
    }
  }

  if (direction === 1) {
    if ((idx < values.length - 1 && values[idx + 1] - values[idx] > 1) || (idx === values.length - 1 && values[idx] < 24)) {
      values[idx] += 1;
      return true;
    }

    if (idx < values.length - 1) {
      if (move(values, idx + 1, direction)) {
        values[idx] += 1;
        return true;
      }
    }
  }
  return false;
}

// todo: 找出最大的空隙插入2个点
function insertStep(values: number[]) {
  // console.log(values);
  let [minIdx, maxIdx] = [-1, -1];
  let maxStep = 3;

  for (let i = 0; i <= values.length; i += 2) {
    if (i === 0 && values[i] >= maxStep) {
      minIdx = 0;
      maxIdx = 0;
      maxStep = values[i]
    }
    else if (i === values.length && (24 - values[values.length - 1] >= maxStep)) {
        minIdx = values.length - 1;
        maxIdx = values.length - 1;
        maxStep = 24 - values[values.length - 1]
    }
    else if (i > 0 && (values[i] - values[i - 1] >= maxStep)) {
      minIdx = i - 1;
      maxIdx = i;
      maxStep = values[i] - values[i - 1];
      // if ((i === values.length - 1) && (24 - values[i] >= maxStep)) {
      //   minIdx = values.length - 1;
      //   minIdx = values.length - 1;
      //   maxStep = 24 - values[values.length - 1]
      // }
    }
    // else if (i === values.length - 1 && 24 - values[i] >= maxStep) {
    //   minIdx = values.length - 1;
    //   minIdx = values.length - 1;
    //   maxStep = 24 - values[values.length - 1]
    // }
  }

  // console.log('minIdx: ', minIdx, 'maxIdx: ', maxIdx, 'maxStep: ', maxStep);
  let isInserted = false;
  if (minIdx > -1 && maxIdx > -1) {
    if (minIdx === 0 && maxIdx === 0) {
      values.unshift(values[0] - maxStep + 1, values[0] - maxStep + 2);
      isInserted = true;
    } else if ((minIdx === values.length - 1) && (maxIdx === values.length - 1)) {
      values.push(values[values.length - 1] + maxStep - 2, values[values.length - 1] + maxStep - 1);
      isInserted = true;
    } else {
      values.splice(minIdx + 1, 0, values[minIdx] + 1, values[minIdx] + 2);
      isInserted = true;
    }
  }

  if (!isInserted) {
    let isMove = move(values, 0, 1);
    while (isMove) {
      if (!insertStep(values)) {
        isMove = move(values, 0, 1);
      } else {
        isInserted = true;
        break;
      }
    }
  }
  return isInserted;
}

const ChartSlider: FC<any> = props => {
  const marks = {
    0: {
      label: <strong>00:00</strong>,
    },
    24: {
      style: {
        // color: '#f50',
      },
      label: <strong>00:00</strong>,
    }
  };

  const [values, setValues] = useState([6, 7]);

  values.forEach((v, idx) => {
    const tag = (
      <Space direction="vertical">
        <span>{v}点</span>
        <div style={{width: 0, height: 35, border: '1px solid green', margin: '0 auto'}}></div>
      </Space>
    )

    marks[v] = {
      label: tag,
      style: {
        bottom: 14
      }
    };
  });

  const cols = new Array(24).fill(0)

  const handleNumChange = v => {
    // todo: 增减时间段
    let delta = Object.keys(marks).length - 2 - v * 2;

    if (values[0] === 0) {
      delta += 1;
    }

    if (values[values.length - 1] === 24) {
      delta += 1;
    }

    if (delta > 0) {
      // if (values[0] === 0) {
      //   delta -= 1;
      // }
      //
      // if (values[values.length - 1] === 24) {
      //   delta -= 1;
      // }
      while (delta > 0) {
        console.log('while del delta: ', delta);
        values.splice(values.length - 2, 2);
        delta -= 2;
      }
    } else if (delta < 0) {
      // if (values[0] === 0) {
      //   delta += 1;
      // }
      //
      // if (values[values.length - 1] === 24) {
      //   delta += 1;
      // }
      // 找到能够放下2个step的地方插入2个step
      while(delta < 0) {
        // console.log('while insert delta: ', delta);
        insertStep(values);
        delta += 2
      }
    }

    // todo: setValues
    setValues([...values]);
  }

  // todo: 先让所有的点不能重合
  const handleSlide = (vals: number[]) => {
    // todo: 找出跟之前不一样的点，判断这个点是往哪边运动（左右）
    let idx = -1;
    let direction = 0;
    let isRepeat = false;
    for (let i = 0; i < vals.length; i += 1) {
      if (vals[i] !== values[i]) {
        idx = i;
        if (vals[i] > values[i]) {
          direction = 1;
          if (i < vals.length - 1 && vals[i] === vals[i + 1]) {
            isRepeat = true;
          }
        }

        if (vals[i] < values[i]) {
          direction = -1
          if (i > 0 && vals[i] === vals[i - 1]) {
            isRepeat = true;
          }
        }
        break;
      }
    }
    // todo : 如果有点重合，判断运动方向前面的点是否还能够向前移动，如果能够，则向前移动，如果不能判断再往前面的点是否能移动,直到找到能前移的点然后依次移动，如果找不到，本次不更新值
    if (direction === 0) {
      return;
    }

    if (isRepeat) {
      const isMove = move(vals, idx, direction);
      console.log('isMove', isMove);
      if (!isMove) {
        return;
      }
    }
    setValues(vals);
  }


  return (
    <Row className={styles.main}>
      <Col flex='100px'>
        <div style={{padding: '14px 0'}}>
          <InputNumber size="small" min={1} max={12} step={1} defaultValue={1} onChange={handleNumChange}></InputNumber>
        </div>
      </Col>
      <Col flex="auto" style={{paddingRight: 20}}>
        <Row style={{height:35, marginTop: 10, backgroundColor: 'red'}}>
          {
            cols.map(c => <Col span={1}></Col>)
          }
        </Row>
        <Slider style={{width: '100%'}} max={24} range={{ draggableTrack: true }} marks={marks} value={values as [number, number]}
                 tooltipVisible={false} onChange={handleSlide} />
      </Col>
    </Row>
  )
}

export default ChartSlider;
