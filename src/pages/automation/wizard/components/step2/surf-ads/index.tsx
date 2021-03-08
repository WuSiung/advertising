import React, { ForwardRefExoticComponent, useImperativeHandle, forwardRef } from 'react';
import Setting from './components/setting';
import AdSetSelector from "@/pages/automation/wizard/components/step3/ad-set-selector";

interface ISurfAds {
  step: number;
  ref: React.MutableRefObject<any>
}

const SurfAds: ForwardRefExoticComponent<Pick<ISurfAds, any>> = forwardRef((props, ref) => {
  // console.log(props.step);
  useImperativeHandle(ref, () => ({
    submit: () => {
      console.log('surf-ads commit');
    }
  }))
  return (
    <>
      {props.step === 1 && <Setting />}
      {props.step === 2 && <AdSetSelector />}
    </>
  )
});

export default SurfAds;
