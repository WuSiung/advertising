import React, { FC } from 'react';

interface ISvgRevive {
  fill: string;
}

const SvgRevive: FC<ISvgRevive> = (props) => {
  const fill = props.fill || '#7655c9';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <defs>
        <path id="sw7ha" d="M631 533c0-10 10-20 20-20s20 10 20 20-10 20-20 20-20-10-20-20z"></path>
        <path id="sw7hc"
              d="M650.945 526.829c.996 0 1.991.22 2.877.771l4.094-5.95c-1.992-1.212-4.426-1.984-6.971-1.984-2.435 0-4.869.661-6.86 1.874l4.425 5.84c.775-.33 1.55-.551 2.435-.551z"></path>
        <path id="sw7hd"
              d="M655.592 536.967l4.315 5.84a13.18 13.18 0 0 0 4.316-8.595h-7.303c-.11.992-.664 1.983-1.328 2.755z"></path>
        <path id="sw7he"
              d="M657.03 532.118h7.303c-.221-3.746-1.991-6.942-4.647-9.256l-4.094 6.06c.775.882 1.217 1.984 1.438 3.196z"></path>
        <path id="sw7hf"
              d="M644.97 534.212h-7.303a13.174 13.174 0 0 0 5.31 9.476l4.095-5.95c-.996-.992-1.77-2.204-2.102-3.526z"></path>
        <path id="sw7hg"
              d="M646.74 528.592l-4.315-5.84c-2.767 2.314-4.537 5.62-4.758 9.366h7.303c.22-1.432.774-2.645 1.77-3.526z"></path>
        <path id="sw7hh"
              d="M650.945 539.06c-.775 0-1.439-.11-2.103-.33l-4.094 6.06a13.231 13.231 0 0 0 6.197 1.543c2.655 0 5.2-.771 7.303-2.204l-4.316-5.84c-.885.55-1.88.771-2.987.771z"></path>
        <clipPath id="sw7hb">
          <use fill="#fff" xlinkHref="#sw7ha"></use>
        </clipPath>
      </defs>
      <g>
        <g transform="translate(-631 -513)">
          <g>
            <g>
              <g>
                <use fill={fill} xlinkHref="#sw7ha"></use>
                <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1"
                     clipPath="url(&quot;#sw7hb&quot;)" xlinkHref="#sw7ha"></use>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <use fill="#fff" xlinkHref="#sw7hc"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#sw7hc"></use>
                </g>
                <g>
                  <use fill="#fff" xlinkHref="#sw7hd"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#sw7hd"></use>
                </g>
                <g>
                  <use fill="#fff" xlinkHref="#sw7he"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#sw7he"></use>
                </g>
                <g>
                  <use fill="#fff" xlinkHref="#sw7hf"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#sw7hf"></use>
                </g>
                <g>
                  <use fill="#fff" xlinkHref="#sw7hg"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#sw7hg"></use>
                </g>
                <g>
                  <use fill="#fff" xlinkHref="#sw7hh"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1"
                       xlinkHref="#sw7hh"></use>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgRevive;
