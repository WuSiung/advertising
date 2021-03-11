import React, { FC } from 'react';
import chart from '@/assets/automation/surf-campaign-chart.png';

interface ISvgChartCampaign {}

const SvgChartCampaign: FC<ISvgChartCampaign> = () => {
  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="487px" height="150px" viewBox="0 0 487 150" enableBackground="new 0 0 487 150" xmlSpace="preserve">
  <image id="image0" width="487" height="150" x="0" y="0" xlinkHref={chart}></image>
</svg>
  );
}

export default SvgChartCampaign

