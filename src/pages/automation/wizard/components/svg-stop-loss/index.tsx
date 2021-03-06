import React, {FC} from 'react';

interface ISvgStopLoss {
  fill?: string;
};

const SvgStopLoss: FC<ISvgStopLoss> = (props) => {
  const fill = props.fill || '#7655c9';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <defs>
        <path id="cadca" d="M631 342c0-10 10-20 20-20s20 10 20 20-10 20-20 20-20-10-20-20z"></path>
        <path id="cadcc"
              d="M650.945 335.829c.996 0 1.991.22 2.877.771l4.094-5.95c-1.992-1.212-4.426-1.984-6.971-1.984-2.435 0-4.869.661-6.86 1.874l4.425 5.84c.775-.33 1.55-.551 2.435-.551z"></path>
        <path id="cadcd"
              d="M655.592 345.967l4.315 5.84a13.18 13.18 0 0 0 4.316-8.595h-7.303c-.11.992-.664 1.983-1.328 2.755z"></path>
        <path id="cadce"
              d="M657.03 341.118h7.303c-.221-3.746-1.991-6.942-4.647-9.256l-4.094 6.06c.775.882 1.217 1.984 1.438 3.196z"></path>
        <path id="cadcf"
              d="M644.97 343.212h-7.303a13.174 13.174 0 0 0 5.31 9.476l4.095-5.95c-.996-.992-1.77-2.204-2.102-3.526z"></path>
        <path id="cadcg"
              d="M646.74 337.592l-4.315-5.84c-2.767 2.314-4.537 5.62-4.758 9.366h7.303c.22-1.432.774-2.644 1.77-3.526z"></path>
        <path id="cadch"
              d="M650.945 348.06c-.775 0-1.439-.11-2.103-.33l-4.094 6.06a13.231 13.231 0 0 0 6.197 1.543c2.655 0 5.2-.771 7.303-2.204l-4.316-5.84c-.885.55-1.88.771-2.987.771z"></path>
        <path id="cadcj" d="M665.898 337.142l-4.463 4.463 4.463 4.463h-8.926v-2.608l-4.846-6.21z"></path>
        <path id="cadck" d="M656.972 337.25v6.21h-14.231v-11.538h14.231z"></path>
        <path id="cadcl" d="M643.82 341.842V354h-2.153v-10.54z"></path>
        <path id="cadcm"
              d="M643.82 330.147v3.393l-2.153-1.618v-1.775a.38.38 0 0 1 .378-.379h1.401c.204 0 .374.17.374.379z"></path>
        <path id="cadcn" d="M641.667 331.922h2.153v11.538h-2.153z"></path>
        <clipPath id="cadcb">
          <use fill="#fff" xlinkHref="#cadca"></use>
        </clipPath>
        <clipPath id="cadci">
          <use fill="#fff" xlinkHref="#cadca"></use>
        </clipPath>
      </defs>
      <g>
        <g transform="translate(-631 -322)">
          <g>
            <g>
              <g>
                <use fill="#f6f6f8" xlinkHref="#cadca"></use>
                <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1"
                     clipPath="url(&quot;#cadcb&quot;)" xlinkHref="#cadca"></use>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <use fill="#ef5228" xlinkHref="#cadcc"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#cadcc"></use>
                </g>
                <g>
                  <use fill="#ef5228" xlinkHref="#cadcd"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#cadcd"></use>
                </g>
                <g>
                  <use fill="#ef5228" xlinkHref="#cadce"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#cadce"></use>
                </g>
                <g>
                  <use fill="#ef5228" xlinkHref="#cadcf"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#cadcf"></use>
                </g>
                <g>
                  <use fill="#ef5228" xlinkHref="#cadcg"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#cadcg"></use>
                </g>
                <g>
                  <use fill="#ef5228" xlinkHref="#cadch"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#cadch"></use>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g transform="translate(-631 -322)">
          <g>
            <g>
              <g>
                <use fill={fill} xlinkHref="#cadca"></use>
                <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1"
                     clipPath="url(&quot;#cadci&quot;)" xlinkHref="#cadca"></use>
              </g>
            </g>
            <g>
              <g>
                <use fill="#e6e6e6" xlinkHref="#cadcj"></use>
              </g>
              <g>
                <use fill="#fff" xlinkHref="#cadck"></use>
              </g>
              <g>
                <g>
                  <use fill="#0d182f" xlinkHref="#cadcl"></use>
                </g>
                <g>
                  <use fill="#0d182f" xlinkHref="#cadcm"></use>
                </g>
              </g>
              <g>
                <use fill="#e6e6e6" xlinkHref="#cadcn"></use>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SvgStopLoss;
