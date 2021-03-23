import React, {FC, useState} from 'react';
import Task from "@/pages/automation/wizard/components/step2/custom/components/setting/components/task";
import {TGroup} from "@/pages/automation/wizard/components/step2/custom/components/setting/data";

// function updateGroup(originGrp: TGroup, grp: TGroup) {
//   if (originGrp === grp) {
//     return originGrp
//   }
//   if (originGrp.children) {
//     for (let i = 0; i < originGrp.children.length; i += 1) {
//       if (originGrp.children[i] === grp) {
//
//       }
//     }
//   }
// }

const Setting: FC<any> = (props) => {
  // const conditionList: any[] = [1,2,3];
  // const groupList: any[] = [1,2,3];
  // const groupList = [
  //   {
  //     target: 'cpa',
  //     time: '00:00',
  //     operator: '<',
  //     value: 0
  //   },
  //   {
  //     target: 'cpa',
  //     time: '00:00',
  //     operator: '<',
  //     value: 0
  //   },
  //   [
  //     {
  //       target: 'cpa',
  //       time: '00:00',
  //       operator: '<',
  //       value: 0
  //     },
  //     {
  //       target: 'cpa',
  //       time: '00:00',
  //       operator: '<',
  //       value: 0
  //     },
  //   ]
  // ]


  const group = {
    conditionList: [
      {
        target: 'cpa',
        time: '00:00',
        operator: '<',
        value: 0
      },
      {
        target: 'cpa',
        time: '00:00',
        operator: '<',
        value: 0
      }
    ],
    children: [
      {
        conditionList: [
          {
            target: 'cpa',
            time: '00:00',
            operator: '<',
            value: 0
          },
          // {
          //   target: 'cpa',
          //   time: '00:00',
          //   operator: '<',
          //   value: 0
          // }
        ]
      }
    ]
  }

  const [grp, setGrp] = useState(group);

  const handleAdd = () => {
    setGrp({...grp});
  }

  // const handleAddCondition = (g: TGroup) => {
  //   setGrp({...grp})
  // }



  return (
    <Task group={grp} onAdd={handleAdd}></Task>
  )
}

export default Setting;
