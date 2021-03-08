import React, { ForwardRefExoticComponent, useImperativeHandle, forwardRef } from 'react';
import Setting from './components/setting';

interface ISurfCampaign {
  step: number;
  ref: React.MutableRefObject<any>
}

const SurfCampaign: ForwardRefExoticComponent<Pick<ISurfCampaign, any>> = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    submit: () => {
      console.log('surf-campaign commit');
    }
  }));
  return (
    <>
    { props.step === 1 && <Setting /> }
    </>
  )
});

export default SurfCampaign;
