import React, {FC, useState} from 'react';
import Setting from "@/pages/automation/wizard/components/step2/custom/components/setting";
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";
import {TAction} from "@/pages/automation/wizard/components/step2/custom/data";

function initActions(): TAction {
  return     {
    task: '',
    group: {
      logical: 'or',
      conditions: [
        {
          target: 'cpa',
          time: '00:00',
          operator: '<',
          value: 0
        }
      ],
      children: []
    }
  };
}

const CustomAd: FC<any> = (props) => {
  // todo: 这里持有actions 每个action中有tasks 每个task中有根group和选择的活动，action可以在这里删除
  // const list: TAction[] = [
  //   {
  //     task: '',
  //     group: {
  //       logical: 'or',
  //       conditions: [
  //         {
  //           target: 'cpa',
  //           time: '00:00',
  //           operator: '<',
  //           value: 0
  //         }
  //       ],
  //       children: []
  //     }
  //   }
  // ]

  const [actions, setActions] = useState([initActions()]);
  const handleChange = () => {
    setActions([...actions]);
  }

  const handleAdd = () => {
    if (!actions) {
      setActions([initActions()]);
    } else {
      actions.push(initActions());
    }
    handleChange();
  }

  const handleDel = (idx: number) => {
    actions.splice(idx, 1);
    handleChange();
  }

  return (
    <>
      {props.step === 1 && <Setting actions={actions} onChange={handleChange} onAdd={handleAdd} onDel={handleDel} />}
      {props.step === 2 && <AdSetSelector onChange={() => {}} onActionObjChange={props.onActionObjChange} />}
    </>
  )
}

export default CustomAd;
