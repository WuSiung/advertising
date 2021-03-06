import React, { FC } from 'react';
import SettingHeadCard from "@/pages/automation/wizard/components/setting-head-card";
import surf from '@/assets/automation/surf.svg';
import SvgChartAds from "@/pages/automation/wizard/components/step2/surf-campaign/components/setting/components/svg-chart-ads";

interface ISetting {};

const Setting: FC<ISetting> = (props) => {
  return (
    <div>
      <SettingHeadCard
        size="small"
        icon={surf}
        pictrue={<SvgChartAds />}
        title="SURF广告水平"
        subTitle="奖励强者"
        remark="SURF确定了强劲的效果趋势，并通过将可用的广告集预算增加到原始限制之外，自动利用积极的势头。预算将在选定的本地时间自动重置。"
      />
    </div>
  );
};

export default Setting;
