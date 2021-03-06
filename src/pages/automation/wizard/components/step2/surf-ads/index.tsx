import React, { FC } from 'react';
import Setting from './components/setting';

interface ISurfAds {
  step: number;
}

const SurfAds: FC<ISurfAds> = (props) => {
  return (
    <>
      {props.step === 1 && <Setting />}
    </>
  )
}

export default SurfAds;
