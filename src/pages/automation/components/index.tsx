import React, {FC, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Slider } from 'antd';

interface AutomationProps {

}

const Automation: FC<AutomationProps> = (props) => {
  // const [first, setFirst] = useState(26);
  // const [second, setSecond] = useState(37);
  // const [third, setThird] = useState(48);
  const [values, setValues] = useState([26, 37, 48]);
  const marks = {
    0: '0°C',
    [values[0]]: '26°C',
    [values[1]]: '37°C',
    [values[2]]: '48°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    }
  };

  const handleChange = (value: any) => {
    console.log(value);
    setValues(value);
  }
  return (
    <PageContainer>
      <Slider range marks={marks} defaultValue={[26, 37, 48]} onChange={handleChange} />
    </PageContainer>
  )
}

export default Automation;
