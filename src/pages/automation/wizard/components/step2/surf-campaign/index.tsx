import React, { FC } from 'react';
import Setting from './components/setting';

interface ISurfCampaign {
  step: number;
}

const SurfCampaign: FC<ISurfCampaign> = (props) => {
  return (
    <>
    { props.step === 1 && <Setting /> }
    </>
  )
};

export default SurfCampaign;
