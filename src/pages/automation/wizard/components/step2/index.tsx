import React, {FC, useState} from 'react';
import {Card, Slider} from 'antd';

interface IStep2 {

}

const Step2: FC<IStep2> = (props) => {
  const [values, setValues] = useState([26, 37, 48]);
  const marks = {
    0: {
      label: <strong>00:00<br />初始点</strong>,
    },
    [values[0]]: '第一次检查',
    [values[1]]: '第二次检查',
    [values[2]]: '第三次检查',
    100: {
      style: {
        // color: '#f50',
      },
      label: <strong>00:00<br />结束日</strong>,
    }
  };

  const handleChange = (value: any) => {
    console.log(value);
    setValues(value);
  }
  return (
    <div>
      <Card type="inner">
        <Slider range marks={marks} defaultValue={[26, 37, 48]} onChange={handleChange} />
      </Card>

    </div>
  )
}

export default Step2;
