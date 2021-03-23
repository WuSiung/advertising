import React, {FC} from 'react';
import Setting from "@/pages/automation/wizard/components/step2/custom/components/setting";
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";

const CustomAd: FC<any> = (props) => {
  return (
    <>
      {props.step === 1 && <Setting />}
      {props.step === 2 && <AdSetSelector onChange={() => {}} onActionObjChange={props.onActionObjChange} />}
    </>
  )
}

export default CustomAd;
