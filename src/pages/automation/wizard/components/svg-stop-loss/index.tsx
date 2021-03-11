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

const SvgStopLossPic: FC<{ }> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="512.392" height="160" viewBox="0 0 512.392 160">
      <defs>
        <filter id="Rectangle_20330" x="54.392" y="112.607" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-2" x="62.283" y="112.607" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-2"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-2"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-3" x="54.392" y="120.498" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-3"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-3"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-4" x="62.283" y="120.498" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-4"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-4"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-5" x="130.392" y="39.556" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-5"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-5"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-6" x="138.283" y="39.556" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-6"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-6"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-7" x="130.392" y="47.446" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-7"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-7"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-8" x="138.283" y="47.446" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-8"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-8"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-9" x="208.392" y="62.568" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-9"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-9"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-10" x="216.283" y="62.568" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-10"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-10"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-11" x="208.392" y="70.458" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-11"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-11"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-12" x="216.283" y="70.458" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-12"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-12"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-13" x="284.392" y="110.593" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-13"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-13"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-14" x="292.283" y="110.593" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-14"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-14"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-15" x="284.392" y="118.484" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-15"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-15"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-16" x="292.283" y="118.484" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-16"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-16"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-17" x="361.392" y="83.579" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-17"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-17"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-18" x="369.283" y="83.579" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-18"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-18"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-19" x="361.392" y="91.469" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-19"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-19"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-20" x="369.283" y="91.469" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-20"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-20"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-21" x="438.392" y="50.562" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-21"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-21"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-22" x="446.283" y="50.562" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-22"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-22"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-23" x="438.392" y="58.452" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-23"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-23"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter id="Rectangle_20330-24" x="446.283" y="58.452" width="24.576" height="24.576" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"></feOffset>
          <feGaussianBlur stdDeviation="3" result="blur-24"></feGaussianBlur>
          <feFlood flood-color="#3f65b7" flood-opacity="0.251"></feFlood>
          <feComposite operator="in" in2="blur-24"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
      </defs>
      <g id="Group_7621" dataName="Group 7621" transform="translate(-4786.608 -7045.926)">
        <path id="Path_3490" dataName="Path 3490" d="M0,0H512V160H0Z" transform="translate(4787 7045.926)" fill="#fff"></path>
        <g id="Group_4224" dataName="Group 4224" transform="translate(4786.608 7056.226)">
          <text id="Ad_Set_1" dataName="Ad Set 1" transform="translate(31.757 133.894)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
            <tspan x="22.785" y="8">Ad Set 1</tspan>
          </text>
          <text id="Ad_Set_2" dataName="Ad Set 2" transform="translate(108.529 133.894)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
            <tspan x="21.552" y="8">Ad Set 2</tspan>
          </text>
          <text id="Ad_Set_3" dataName="Ad Set 3" transform="translate(185.302 133.894)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
            <tspan x="21.723" y="8">Ad Set 3</tspan>
          </text>
          <text id="Ad_Set_4" dataName="Ad Set 4" transform="translate(262.074 133.894)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
            <tspan x="21.736" y="8">Ad Set 4</tspan>
          </text>
          <g id="Group_4227" dataName="Group 4227" transform="translate(28.415 6.2)">
            <line id="Line_287" dataName="Line 287" y2="123.311" transform="translate(3.052)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_289" dataName="Line 289" x1="5.816" transform="translate(0 102.647)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_290" dataName="Line 290" x1="5.816" transform="translate(0 81.751)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_291" dataName="Line 291" x1="5.816" transform="translate(0 60.867)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_292" dataName="Line 292" x1="5.816" transform="translate(0 39.983)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_293" dataName="Line 293" x1="5.816" transform="translate(0 19.088)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
          </g>
          <g id="roas" transform="translate(0 19.948)">
            <text id="_0.5x" dataName="0.5x" transform="translate(0 83.068)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
              <tspan x="9.381" y="8">0.5x</tspan>
            </text>
            <text id="_1.0x" dataName="1.0x" transform="translate(0 62.614)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
              <tspan x="11.415" y="8">1.0x</tspan>
            </text>
            <text id="_1.5x" dataName="1.5x" transform="translate(0 41.743)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
              <tspan x="11.757" y="8">1.5x</tspan>
            </text>
            <text id="_2.0x" dataName="2.0x" transform="translate(0 20.871)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
              <tspan x="8.949" y="8">2.0x</tspan>
            </text>
            <text id="_2.5x" dataName="2.5x" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
              <tspan x="9.291" y="8">2.5x</tspan>
            </text>
          </g>
          <text id="Ad_Set_5" dataName="Ad Set 5" transform="translate(338.846 133.894)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
            <tspan x="21.552" y="8">Ad Set 5</tspan>
          </text>
          <text id="Ad_Set_6" dataName="Ad Set 6" transform="translate(415.619 133.894)" fill="#0d182f" font-size="9" font-family="ProximaNova-Light, Proxima Nova" font-weight="300">
            <tspan x="21.543" y="8">Ad Set 6</tspan>
          </text>
          <g id="Group_6752" dataName="Group 6752" transform="translate(59.391 104.774)">
            <g id="Rectangle_20373" dataName="Rectangle 20373" fill="#ffa8b9" stroke="#a0aabe" strokeWidth="0.1">
              <rect width="22" height="22" rx="11" stroke="none"></rect>
              <rect x="0.05" y="0.05" width="21.9" height="21.9" rx="10.95" fill="none"></rect>
            </g>
            <g id="Group_6742" dataName="Group 6742" transform="translate(4 3.533)">
              <g transform="matrix(1, 0, 0, 1, -63.39, -118.61)" filter="url(#Rectangle_20330)">
                <rect id="Rectangle_20330-25" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(63.39 118.61)" fill="#fff"></rect>
              </g>
              <rect id="Rectangle_20337" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 1.315)" fill="#7655c9" opacity="0.5"></rect>
              <g id="Ellipse_1029" dataName="Ellipse 1029" transform="translate(3.945 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
                <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
                <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
              </g>
              <g id="Ellipse_1030" dataName="Ellipse 1030" transform="translate(5.261 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
                <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
                <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
              </g>
              <g transform="matrix(1, 0, 0, 1, -63.39, -118.61)" filter="url(#Rectangle_20330-2)">
                <rect id="Rectangle_20330-26" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(71.28 118.61)" fill="#fff"></rect>
              </g>
              <rect id="Rectangle_20337-2" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 1.315)" fill="#7655c9" opacity="0.5"></rect>
              <g id="Ellipse_1029-2" dataName="Ellipse 1029" transform="translate(11.836 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
                <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
                <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
              </g>
              <g id="Ellipse_1030-2" dataName="Ellipse 1030" transform="translate(13.152 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
                <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
                <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
              </g>
              <g transform="matrix(1, 0, 0, 1, -63.39, -118.61)" filter="url(#Rectangle_20330-3)">
                <rect id="Rectangle_20330-27" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(63.39 126.5)" fill="#fff"></rect>
              </g>
              <rect id="Rectangle_20337-3" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 9.206)" fill="#7655c9" opacity="0.5"></rect>
              <g id="Ellipse_1029-3" dataName="Ellipse 1029" transform="translate(3.945 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
                <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
                <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
              </g>
              <g id="Ellipse_1030-3" dataName="Ellipse 1030" transform="translate(5.261 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
                <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
                <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
              </g>
              <g transform="matrix(1, 0, 0, 1, -63.39, -118.61)" filter="url(#Rectangle_20330-4)">
                <rect id="Rectangle_20330-28" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(71.28 126.5)" fill="#fff"></rect>
              </g>
              <rect id="Rectangle_20337-4" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 9.206)" fill="#7655c9" opacity="0.5"></rect>
              <g id="Ellipse_1029-4" dataName="Ellipse 1029" transform="translate(11.836 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
                <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
                <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
              </g>
              <g id="Ellipse_1030-4" dataName="Ellipse 1030" transform="translate(13.152 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
                <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
                <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
              </g>
            </g>
          </g>
          <g id="Group_4228" dataName="Group 4228" transform="translate(31.466 127.721)">
            <line id="Line_288" dataName="Line 288" x2="463.425" transform="translate(0 1.79)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_295" dataName="Line 295" y1="3.339" transform="translate(38.677)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_296" dataName="Line 296" y1="3.339" transform="translate(115.449)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_297" dataName="Line 297" y1="3.339" transform="translate(192.222)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_298" dataName="Line 298" y1="3.339" transform="translate(268.994)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_299" dataName="Line 299" y1="3.339" transform="translate(345.767)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
            <line id="Line_300" dataName="Line 300" y1="3.339" transform="translate(422.539)" fill="none" stroke="#b4b9c4" strokeWidth="0.5"></line>
          </g>
          <g id="Group_4229" dataName="Group 4229" transform="translate(37.864 48.915)">
            <line id="Line_294" dataName="Line 294" x2="450.747" transform="translate(0 39.239)" fill="none" stroke="#b4b9c4" strokeWidth="1" strokeDasharray="4"></line>
            <line id="Line_301" dataName="Line 301" y1="18.089" transform="translate(32.57 39.239)" fill="none" stroke="#b4b9c4" strokeWidth="1" strokeDasharray="4"></line>
            <line id="Line_302" dataName="Line 302" y1="39.238" transform="translate(109.342)" fill="none" stroke="#b4b9c4" strokeWidth="1" strokeDasharray="4"></line>
            <line id="Line_303" dataName="Line 303" y1="15.862" transform="translate(186.115 23.377)" fill="none" stroke="#b4b9c4" strokeWidth="1" strokeDasharray="4"></line>
            <line id="Line_305" dataName="Line 305" y1="30.89" transform="translate(416.432 8.349)" fill="none" stroke="#b4b9c4" strokeWidth="1" strokeDasharray="4"></line>
            <line id="Line_356" dataName="Line 356" y1="21.289" transform="translate(262.887 39.239)" fill="none" stroke="#b4b9c4" strokeWidth="1" strokeDasharray="4"></line>
          </g>
          <g id="scissors" transform="translate(65.385 108.945) rotate(-90)">
            <path id="Path_1494" dataName="Path 1494" d="M14.927,0,0,21.22l2.049,1.463L5.268,18l1.9.585A1.082,1.082,0,0,0,8.488,18l7.9-14.927Z" transform="translate(7.967)" fill="#a0aabe" stroke="#707070" strokeWidth="0.1"></path>
            <path id="Path_1495" dataName="Path 1495" d="M10.309,0A3.455,3.455,0,0,1,8.992,1.171a3.277,3.277,0,0,1-2.634.146,4.6,4.6,0,0,0-6,2.341,4.244,4.244,0,0,0,.878,4.683A4.409,4.409,0,0,0,8.114,7.9L12.5,1.61ZM3.138,7.317a2.492,2.492,0,0,1-.585-3.366,2.36,2.36,0,0,1,3.366-.585A2.36,2.36,0,0,1,6.5,6.732,2.25,2.25,0,0,1,3.138,7.317Z" transform="translate(0 17.415)" fill="#0d182f" stroke="#0d182f" strokeWidth="0.5"></path>
            <path id="Path_1496" dataName="Path 1496" d="M1.463,0,16.39,21.22l-2.049,1.463L11.122,18l-1.9.585A1.082,1.082,0,0,1,7.9,18L0,3.073Z" transform="translate(5.041)" fill="#f6f6f8" stroke="#707070" strokeWidth="0.1"></path>
            <path id="Path_1497" dataName="Path 1497" d="M0,1.61,4.39,7.9a4.424,4.424,0,0,0,6.878.439,4.642,4.642,0,0,0,.878-4.683,4.55,4.55,0,0,0-6-2.341,3.111,3.111,0,0,1-2.78-.146A4.741,4.741,0,0,1,2.049,0ZM6.146,6.732a2.519,2.519,0,0,1,.585-3.366,2.519,2.519,0,0,1,3.366.585,2.519,2.519,0,0,1-.585,3.366A2.36,2.36,0,0,1,6.146,6.732Z" transform="translate(16.748 17.415)" fill="#0d182f" stroke="#0d182f" strokeWidth="0.5"></path>
            <circle id="Ellipse_649" dataName="Ellipse 649" cx="0.878" cy="0.878" r="0.878" transform="translate(13.528 14.927)" fill="#adb3ba"></circle>
          </g>
          <g id="Path_3493" dataName="Path 3493" transform="translate(27.535 0)" fill="#b4b9c4">
            <path d="M 7.573709011077881 6.841799259185791 L 0.4297752976417542 6.841799259185791 L 4.031389713287354 0.5088804364204407 L 7.573709011077881 6.841799259185791 Z" stroke="none"></path>
            <path d="M 4.029586791992188 1.01776647567749 L 0.8595609664916992 6.591799259185791 L 7.147422790527344 6.591799259185791 L 4.029586791992188 1.01776647567749 M 4.033199787139893 -9.5367431640625e-07 L 8 7.091799259185791 L -4.76837158203125e-07 7.091799259185791 L 4.033199787139893 -9.5367431640625e-07 Z" stroke="none" fill="#b4b9c4"></path>
          </g>
          <g id="Path_3494" dataName="Path 3494" transform="translate(501.081 125.62) rotate(90)" fill="#b4b9c4">
            <path d="M 7.573709011077881 6.841799259185791 L 0.4297752976417542 6.841799259185791 L 4.031389713287354 0.5088804364204407 L 7.573709011077881 6.841799259185791 Z" stroke="none"></path>
            <path d="M 4.029586791992188 1.01776647567749 L 0.8595609664916992 6.591799259185791 L 7.147422790527344 6.591799259185791 L 4.029586791992188 1.01776647567749 M 4.033199787139893 -9.5367431640625e-07 L 8 7.091799259185791 L -4.76837158203125e-07 7.091799259185791 L 4.033199787139893 -9.5367431640625e-07 Z" stroke="none" fill="#b4b9c4"></path>
          </g>
          <g id="scissors_2" dataName="scissors 2" transform="translate(296.385 112.947) rotate(-90)">
            <path id="Path_1494-2" dataName="Path 1494" d="M14.927,0,0,21.22l2.049,1.463L5.268,18l1.9.585A1.082,1.082,0,0,0,8.488,18l7.9-14.927Z" transform="translate(7.967)" fill="#a0aabe" stroke="#707070" strokeWidth="0.1"></path>
            <path id="Path_1495-2" dataName="Path 1495" d="M10.309,0A3.455,3.455,0,0,1,8.992,1.171a3.277,3.277,0,0,1-2.634.146,4.6,4.6,0,0,0-6,2.341,4.244,4.244,0,0,0,.878,4.683A4.409,4.409,0,0,0,8.114,7.9L12.5,1.61ZM3.138,7.317a2.492,2.492,0,0,1-.585-3.366,2.36,2.36,0,0,1,3.366-.585A2.36,2.36,0,0,1,6.5,6.732,2.25,2.25,0,0,1,3.138,7.317Z" transform="translate(0 17.415)" fill="#0d182f" stroke="#0d182f" strokeWidth="0.5"></path>
            <path id="Path_1496-2" dataName="Path 1496" d="M1.463,0,16.39,21.22l-2.049,1.463L11.122,18l-1.9.585A1.082,1.082,0,0,1,7.9,18L0,3.073Z" transform="translate(5.041)" fill="#f6f6f8" stroke="#707070" strokeWidth="0.1"></path>
            <path id="Path_1497-2" dataName="Path 1497" d="M0,1.61,4.39,7.9a4.424,4.424,0,0,0,6.878.439,4.642,4.642,0,0,0,.878-4.683,4.55,4.55,0,0,0-6-2.341,3.111,3.111,0,0,1-2.78-.146A4.741,4.741,0,0,1,2.049,0ZM6.146,6.732a2.519,2.519,0,0,1,.585-3.366,2.519,2.519,0,0,1,3.366.585,2.519,2.519,0,0,1-.585,3.366A2.36,2.36,0,0,1,6.146,6.732Z" transform="translate(16.748 17.415)" fill="#0d182f" stroke="#0d182f" strokeWidth="0.5"></path>
            <circle id="Ellipse_649-2" dataName="Ellipse 649" cx="0.878" cy="0.878" r="0.878" transform="translate(13.528 14.927)" fill="#adb3ba"></circle>
          </g>
        </g>
        <g id="Group_6753" dataName="Group 6753" transform="translate(4922 7087.948)">
          <g id="Rectangle_20373-2" dataName="Rectangle 20373" fill="#8abfc5" stroke="#a0aabe" strokeWidth="0.1">
            <rect width="22" height="22" rx="11" stroke="none"></rect>
            <rect x="0.05" y="0.05" width="21.9" height="21.9" rx="10.95" fill="none"></rect>
          </g>
          <g id="Group_6742-2" dataName="Group 6742" transform="translate(4 3.533)">
            <g transform="matrix(1, 0, 0, 1, -139.39, -45.56)" filter="url(#Rectangle_20330-5)">
              <rect id="Rectangle_20330-29" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(139.39 45.56)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-5" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-5" dataName="Ellipse 1029" transform="translate(3.945 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-5" dataName="Ellipse 1030" transform="translate(5.261 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -139.39, -45.56)" filter="url(#Rectangle_20330-6)">
              <rect id="Rectangle_20330-30" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(147.28 45.56)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-6" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-6" dataName="Ellipse 1029" transform="translate(11.836 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-6" dataName="Ellipse 1030" transform="translate(13.152 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -139.39, -45.56)" filter="url(#Rectangle_20330-7)">
              <rect id="Rectangle_20330-31" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(139.39 53.45)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-7" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-7" dataName="Ellipse 1029" transform="translate(3.945 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-7" dataName="Ellipse 1030" transform="translate(5.261 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -139.39, -45.56)" filter="url(#Rectangle_20330-8)">
              <rect id="Rectangle_20330-32" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(147.28 53.45)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-8" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-8" dataName="Ellipse 1029" transform="translate(11.836 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-8" dataName="Ellipse 1030" transform="translate(13.152 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
          </g>
        </g>
        <g id="Group_6754" dataName="Group 6754" transform="translate(5000 7110.96)">
          <g id="Rectangle_20373-3" dataName="Rectangle 20373" fill="#c0dadd" stroke="#a0aabe" strokeWidth="0.1">
            <rect width="22" height="22" rx="11" stroke="none"></rect>
            <rect x="0.05" y="0.05" width="21.9" height="21.9" rx="10.95" fill="none"></rect>
          </g>
          <g id="Group_6742-3" dataName="Group 6742" transform="translate(4 3.533)">
            <g transform="matrix(1, 0, 0, 1, -217.39, -68.57)" filter="url(#Rectangle_20330-9)">
              <rect id="Rectangle_20330-33" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(217.39 68.57)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-9" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-9" dataName="Ellipse 1029" transform="translate(3.945 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-9" dataName="Ellipse 1030" transform="translate(5.261 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -217.39, -68.57)" filter="url(#Rectangle_20330-10)">
              <rect id="Rectangle_20330-34" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(225.28 68.57)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-10" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-10" dataName="Ellipse 1029" transform="translate(11.836 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-10" dataName="Ellipse 1030" transform="translate(13.152 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -217.39, -68.57)" filter="url(#Rectangle_20330-11)">
              <rect id="Rectangle_20330-35" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(217.39 76.46)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-11" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-11" dataName="Ellipse 1029" transform="translate(3.945 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-11" dataName="Ellipse 1030" transform="translate(5.261 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -217.39, -68.57)" filter="url(#Rectangle_20330-12)">
              <rect id="Rectangle_20330-36" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(225.28 76.46)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-12" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-12" dataName="Ellipse 1029" transform="translate(11.836 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-12" dataName="Ellipse 1030" transform="translate(13.152 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
          </g>
        </g>
        <g id="Group_6755" dataName="Group 6755" transform="translate(5076 7158.986)">
          <rect id="Rectangle_20373-4" dataName="Rectangle 20373" width="22" height="22" rx="11" fill="#ffa8b9"></rect>
          <g id="Group_6742-4" dataName="Group 6742" transform="translate(4 3.533)">
            <g transform="matrix(1, 0, 0, 1, -293.39, -116.59)" filter="url(#Rectangle_20330-13)">
              <rect id="Rectangle_20330-37" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(293.39 116.59)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-13" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-13" dataName="Ellipse 1029" transform="translate(3.945 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-13" dataName="Ellipse 1030" transform="translate(5.261 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -293.39, -116.59)" filter="url(#Rectangle_20330-14)">
              <rect id="Rectangle_20330-38" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(301.28 116.59)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-14" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-14" dataName="Ellipse 1029" transform="translate(11.836 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-14" dataName="Ellipse 1030" transform="translate(13.152 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -293.39, -116.59)" filter="url(#Rectangle_20330-15)">
              <rect id="Rectangle_20330-39" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(293.39 124.48)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-15" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-15" dataName="Ellipse 1029" transform="translate(3.945 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-15" dataName="Ellipse 1030" transform="translate(5.261 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -293.39, -116.59)" filter="url(#Rectangle_20330-16)">
              <rect id="Rectangle_20330-40" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(301.28 124.48)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-16" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-16" dataName="Ellipse 1029" transform="translate(11.836 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-16" dataName="Ellipse 1030" transform="translate(13.152 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
          </g>
        </g>
        <g id="Group_6756" dataName="Group 6756" transform="translate(5153 7131.971)">
          <g id="Rectangle_20373-5" dataName="Rectangle 20373" fill="#fff" stroke="#a0aabe" strokeWidth="0.2">
            <rect width="22" height="22" rx="11" stroke="none"></rect>
            <rect x="0.1" y="0.1" width="21.8" height="21.8" rx="10.9" fill="none"></rect>
          </g>
          <g id="Group_6742-5" dataName="Group 6742" transform="translate(4 3.533)">
            <g transform="matrix(1, 0, 0, 1, -370.39, -89.58)" filter="url(#Rectangle_20330-17)">
              <rect id="Rectangle_20330-41" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(370.39 89.58)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-17" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-17" dataName="Ellipse 1029" transform="translate(3.945 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-17" dataName="Ellipse 1030" transform="translate(5.261 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -370.39, -89.58)" filter="url(#Rectangle_20330-18)">
              <rect id="Rectangle_20330-42" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(378.28 89.58)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-18" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-18" dataName="Ellipse 1029" transform="translate(11.836 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-18" dataName="Ellipse 1030" transform="translate(13.152 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -370.39, -89.58)" filter="url(#Rectangle_20330-19)">
              <rect id="Rectangle_20330-43" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(370.39 97.47)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-19" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-19" dataName="Ellipse 1029" transform="translate(3.945 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-19" dataName="Ellipse 1030" transform="translate(5.261 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -370.39, -89.58)" filter="url(#Rectangle_20330-20)">
              <rect id="Rectangle_20330-44" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(378.28 97.47)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-20" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-20" dataName="Ellipse 1029" transform="translate(11.836 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-20" dataName="Ellipse 1030" transform="translate(13.152 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
          </g>
        </g>
        <g id="Group_6757" dataName="Group 6757" transform="translate(5230 7098.954)">
          <g id="Rectangle_20373-6" dataName="Rectangle 20373" fill="#8abfc5" stroke="#a0aabe" strokeWidth="0.1">
            <rect width="22" height="22" rx="11" stroke="none"></rect>
            <rect x="0.05" y="0.05" width="21.9" height="21.9" rx="10.95" fill="none"></rect>
          </g>
          <g id="Group_6742-6" dataName="Group 6742" transform="translate(4 3.533)">
            <g transform="matrix(1, 0, 0, 1, -447.39, -56.56)" filter="url(#Rectangle_20330-21)">
              <rect id="Rectangle_20330-45" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(447.39 56.56)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-21" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-21" dataName="Ellipse 1029" transform="translate(3.945 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-21" dataName="Ellipse 1030" transform="translate(5.261 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -447.39, -56.56)" filter="url(#Rectangle_20330-22)">
              <rect id="Rectangle_20330-46" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(455.28 56.56)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-22" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 1.315)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-22" dataName="Ellipse 1029" transform="translate(11.836 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-22" dataName="Ellipse 1030" transform="translate(13.152 0.329)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -447.39, -56.56)" filter="url(#Rectangle_20330-23)">
              <rect id="Rectangle_20330-47" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(447.39 64.45)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-23" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(0.658 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-23" dataName="Ellipse 1029" transform="translate(3.945 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-23" dataName="Ellipse 1030" transform="translate(5.261 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g transform="matrix(1, 0, 0, 1, -447.39, -56.56)" filter="url(#Rectangle_20330-24)">
              <rect id="Rectangle_20330-48" dataName="Rectangle 20330" width="6.576" height="6.576" rx="1" transform="translate(455.28 64.45)" fill="#fff"></rect>
            </g>
            <rect id="Rectangle_20337-24" dataName="Rectangle 20337" width="5.261" height="4.603" rx="1" transform="translate(8.548 9.206)" fill="#7655c9" opacity="0.5"></rect>
            <g id="Ellipse_1029-24" dataName="Ellipse 1029" transform="translate(11.836 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
            <g id="Ellipse_1030-24" dataName="Ellipse 1030" transform="translate(13.152 8.22)" fill="#c7d9ff" stroke="#7655c9" strokeWidth="1" opacity="0.5">
              <circle cx="0.329" cy="0.329" r="0.329" stroke="none"></circle>
              <circle cx="0.329" cy="0.329" r="0.171" fill="none"></circle>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}


const SvgStopLossPicAds: FC<{ }> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width="293" height="126" viewBox="0 0 293 126">
      <defs>
        <path id="gv85a" d="M1078.746 223.122c0-2.157 2.157-4.314 4.314-4.314s4.315 2.157 4.315 4.314-2.158 4.315-4.315 4.315c-2.157 0-4.314-2.158-4.314-4.315z"></path>
        <path id="gv85b" d="M1089.385 223.122c0-2.157 2.157-4.314 4.314-4.314s4.315 2.157 4.315 4.314-2.158 4.315-4.315 4.315c-2.157 0-4.314-2.158-4.314-4.315z"></path>
        <path id="gv85c" d="M1109.231 201.266c0-2.158 2.158-4.315 4.315-4.315 2.157 0 4.314 2.157 4.314 4.315 0 2.157-2.157 4.314-4.314 4.314s-4.315-2.157-4.315-4.314z"></path>
        <path id="gv85d" d="M1109.219 183.145c0-2.158 2.157-4.315 4.314-4.315s4.315 2.157 4.315 4.315c0 2.157-2.158 4.314-4.315 4.314-2.157 0-4.314-2.157-4.314-4.314z"></path>
        <path id="gv85e" d="M1108.947 192.637c0-2.158 2.157-4.315 4.314-4.315s4.315 2.158 4.315 4.315c0 2.157-2.158 4.314-4.315 4.314-2.157 0-4.314-2.157-4.314-4.314z"></path>
        <path id="gv85f" d="M1068.663 222.813c0-2.158 2.157-4.315 4.315-4.315 2.157 0 4.314 2.157 4.314 4.315 0 2.157-2.157 4.314-4.314 4.314-2.158 0-4.315-2.157-4.315-4.314z"></path>
        <path id="gv85g" d="M1089.373 160.121c0-1 1-2 2-2H1096c1 0 2 1 2 2v4.629c0 1-1 2-2 2h-4.628c-1 0-2-1-2-2z"></path>
        <path id="gv85h" d="M1090.235 165.544v-6.56h7.464v6.56z"></path>
        <path id="gv85i" d="M1080.544 158.121h7.302c.366 0 .663.297.663.664v7.301a.664.664 0 0 1-.663.664h-7.302a.664.664 0 0 1-.664-.664v-7.301c0-.367.298-.664.664-.664z"></path>
        <path id="gv85j" d="M1086.007 158.785a.332.332 0 1 1 .664 0 .332.332 0 0 1-.664 0z"></path>
        <path id="gv85k" d="M1087.182 158.785a.332.332 0 1 1 .664 0 .332.332 0 0 1-.664 0z"></path>
        <path id="gv85l" d="M1069.526 159.121c0-.5.5-1 1-1h1.922c.5 0 1 .5 1 1v1.922c0 .5-.5 1-1 1h-1.922c-.5 0-1-.5-1-1z"></path>
        <path id="gv85m" d="M1071.879 158.514a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85n" d="M1072.664 158.514a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85o" d="M1074.233 159.121c0-.5.5-1 1-1h1.922c.5 0 1 .5 1 1v1.922c0 .5-.5 1-1 1h-1.922c-.5 0-1-.5-1-1z"></path>
        <path id="gv85p" d="M1076.586 158.514a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85q" d="M1077.37 158.514a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85r" d="M1069.526 163.827c0-.5.5-1 1-1h1.922c.5 0 1 .5 1 1v1.923c0 .5-.5 1-1 1h-1.922c-.5 0-1-.5-1-1z"></path>
        <path id="gv85s" d="M1071.879 163.22a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85t" d="M1072.664 163.22a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85u" d="M1074.233 163.827c0-.5.5-1 1-1h1.922c.5 0 1 .5 1 1v1.923c0 .5-.5 1-1 1h-1.922c-.5 0-1-.5-1-1z"></path>
        <path id="gv85v" d="M1076.586 163.22a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85w" d="M1077.37 163.22a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85x" d="M1049.68 180.83c0-1 1-2 2-2h4.628c1 0 2 1 2 2v4.629c0 1-1 2-2 2h-4.629c-1 0-2-1-2-2z"></path>
        <path id="gv85y" d="M1050.542 186.253v-6.56h7.463v6.56z"></path>
        <path id="gv85z" d="M1050.343 188.322h7.301c.367 0 .664.297.664.664v7.301a.664.664 0 0 1-.664.664h-7.301a.664.664 0 0 1-.664-.664v-7.301c0-.367.297-.664.664-.664z"></path>
        <path id="gv85A" d="M1055.806 188.986a.332.332 0 1 1 .664 0 .332.332 0 0 1-.664 0z"></path>
        <path id="gv85B" d="M1056.98 188.986a.332.332 0 1 1 .664 0 .332.332 0 0 1-.663 0z"></path>
        <path id="gv85C" d="M1049.68 199.677c0-.5.5-1 1-1h1.921c.5 0 1 .5 1 1v1.922c0 .5-.5 1-1 1h-1.922c-.5 0-1-.5-1-1z"></path>
        <path id="gv85D" d="M1052.032 199.07a.196.196 0 1 1 .393 0 .196.196 0 0 1-.393 0z"></path>
        <path id="gv85E" d="M1052.817 199.07a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85F" d="M1054.386 199.677c0-.5.5-1 1-1h1.922c.5 0 1 .5 1 1v1.922c0 .5-.5 1-1 1h-1.922c-.5 0-1-.5-1-1z"></path>
        <path id="gv85G" d="M1056.74 199.07a.196.196 0 1 1 .391 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85H" d="M1057.524 199.07a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85I" d="M1049.68 204.383c0-.5.5-1 1-1h1.921c.5 0 1 .5 1 1v1.922c0 .5-.5 1-1 1h-1.922c-.5 0-1-.5-1-1z"></path>
        <path id="gv85J" d="M1052.032 203.776a.196.196 0 1 1 .393 0 .196.196 0 0 1-.393 0z"></path>
        <path id="gv85K" d="M1052.817 203.776a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85L" d="M1054.386 204.383c0-.5.5-1 1-1h1.922c.5 0 1 .5 1 1v1.922c0 .5-.5 1-1 1h-1.922c-.5 0-1-.5-1-1z"></path>
        <path id="gv85M" d="M1056.74 203.776a.196.196 0 1 1 .391 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85N" d="M1057.524 203.776a.196.196 0 1 1 .392 0 .196.196 0 0 1-.392 0z"></path>
        <path id="gv85O" d="M900.48 216.33c0-18.586 52.927-33.653 118.216-33.653 65.289 0 118.216 15.067 118.216 33.653 0 18.585-52.927 33.652-118.216 33.652-65.29 0-118.217-15.067-118.217-33.652z"></path>
        <path id="gv85P" d="M1037.68 191.306c0-15.727 34.769-28.476 77.66-28.476 42.89 0 77.66 12.749 77.66 28.476 0 15.726-34.77 28.475-77.66 28.475-42.891 0-77.66-12.749-77.66-28.475z"></path>
        <path id="gv85Q" d="M948.801 162.83c0-21.445 44.042-38.83 98.37-38.83s98.37 17.385 98.37 38.83c0 21.445-44.042 38.83-98.37 38.83s-98.37-17.385-98.37-38.83z"></path>
        <path id="gv85R" d="M1009.623 137.902c-11.779 0-21.362 9.585-21.362 21.365a21.32 21.32 0 0 0 6.938 15.752v6.339a3.503 3.503 0 0 0 3.502 3.501h21.844a3.506 3.506 0 0 0 3.505-3.501v-6.34a21.33 21.33 0 0 0 6.936-15.751c0-11.78-9.583-21.365-21.363-21.365z"></path>
        <path id="gv85S" d="M1021.777 164.238c0 .482-.387.87-.868.87h-22.571a.868.868 0 1 1 0-1.737h22.571c.48 0 .868.388.868.867z"></path>
        <path id="gv85T" d="M1015.95 184.86v-19.752a.869.869 0 1 0-1.738 0v19.751z"></path>
        <path id="gv85U" d="M1005.476 184.86v-19.752a.869.869 0 1 0-1.738 0v19.751z"></path>
        <path id="gv85V" d="M1007.826 143.048c2.028 2.141.817 6.577-2.703 9.904-3.52 3.326-8.016 4.283-10.041 2.14-2.024-2.142-.813-6.576 2.706-9.903 3.52-3.327 8.016-4.285 10.038-2.141z"></path>
        <path id="gv85W" d="M1003.832 157.644c1.148 1.213.462 3.723-1.53 5.606-1.99 1.882-4.535 2.424-5.68 1.212-1.146-1.212-.462-3.723 1.531-5.605 1.99-1.881 4.535-2.425 5.679-1.213z"></path>
        <path id="gv85X" d="M998.79 185.538v10.822c0 .797.645 1.443 1.443 1.443h18.77c.797 0 1.445-.646 1.445-1.443v-10.822z"></path>
        <path id="gv85Y" d="M1016.399 195.06a6.776 6.776 0 1 1-13.553 0 6.776 6.776 0 0 1 13.553 0z"></path>
        <path id="gv85Z" d="M1014.102 197.376c.353.943-.754 2.23-2.472 2.877-1.722.647-3.403.406-3.757-.538-.354-.942.753-2.232 2.472-2.877 1.72-.647 3.403-.405 3.757.538z"></path>
        <path id="gv85aa" d="M1021.748 185.803c0 .52-.423.944-.945.944H998.44a.943.943 0 1 1 0-1.888h22.363c.522 0 .945.423.945.944z"></path>
        <path id="gv85ab" d="M1021.748 189.227a.945.945 0 0 1-.945.945H998.44a.944.944 0 1 1 0-1.889h22.363c.522 0 .945.424.945.944z"></path>
        <path id="gv85ac" d="M1021.748 192.652c0 .52-.423.944-.945.944H998.44a.943.943 0 1 1 0-1.889h22.363c.522 0 .945.423.945.945z"></path>
        <path id="gv85ad" d="M1083.794 163.505v9.092"></path>
        <path id="gv85ae" d="M1086.874 163.053a3.085 3.085 0 1 1-6.169-.001 3.085 3.085 0 0 1 6.17.001z"></path>
        <path id="gv85af" d="M1074.13 163.505v9.092"></path>
        <path id="gv85ag" d="M1077.21 163.053a3.084 3.084 0 1 1-6.168 0 3.084 3.084 0 0 1 6.169 0z"></path>
        <path id="gv85ah" d="M1093.304 163.505v9.092"></path>
        <path id="gv85ai" d="M1096.383 163.053a3.083 3.083 0 1 1-6.167 0 3.085 3.085 0 1 1 6.167 0z"></path>
        <path id="gv85aj" d="M1083.794 221.64v-9.092"></path>
        <path id="gv85ak" d="M1086.874 222.092a3.085 3.085 0 1 0-3.085 3.085 3.085 3.085 0 0 0 3.085-3.085z"></path>
        <path id="gv85al" d="M1074.13 221.64v-9.092"></path>
        <path id="gv85am" d="M1077.21 222.092a3.084 3.084 0 1 0-6.167.002 3.084 3.084 0 0 0 6.168-.002z"></path>
        <path id="gv85an" d="M1093.304 221.64v-9.092"></path>
        <path id="gv85ao" d="M1096.383 222.092a3.083 3.083 0 1 0-6.167 0 3.084 3.084 0 1 0 6.167 0z"></path>
        <path id="gv85ap" d="M1054.646 192.493h9.091"></path>
        <path id="gv85aq" d="M1054.194 189.412a3.085 3.085 0 1 1-.002 6.17 3.085 3.085 0 0 1 .002-6.17z"></path>
        <path id="gv85ar" d="M1054.647 202.156h9.091"></path>
        <path id="gv85as" d="M1054.194 199.075a3.084 3.084 0 1 1 0 6.168 3.084 3.084 0 0 1 0-6.168z"></path>
        <path id="gv85at" d="M1054.646 182.982h9.091"></path>
        <path id="gv85au" d="M1054.194 179.902a3.084 3.084 0 1 1 0 6.169 3.084 3.084 0 0 1 0-6.17z"></path>
        <path id="gv85av" d="M1112.78 192.492h-9.092"></path>
        <path id="gv85aw" d="M1113.234 189.411a3.085 3.085 0 1 0 0 6.173 3.085 3.085 0 0 0 0-6.173z"></path>
        <path id="gv85ax" d="M1112.781 202.155h-9.092"></path>
        <path id="gv85ay" d="M1113.234 199.075a3.084 3.084 0 1 0-.002 6.168 3.084 3.084 0 0 0 .002-6.168z"></path>
        <path id="gv85az" d="M1112.78 182.982h-9.092"></path>
        <path id="gv85aA" d="M1113.234 179.902a3.083 3.083 0 1 0 0 6.168 3.084 3.084 0 0 0 0-6.168z"></path>
        <path id="gv85aB" d="M1062.037 174.675c0-1.976 1.976-3.952 3.952-3.952h35.981c1.976 0 3.952 1.976 3.952 3.952v35.98c0 1.976-1.976 3.953-3.953 3.953h-35.979c-1.977 0-3.953-1.977-3.953-3.953z"></path>
        <path id="gv85aC" d="M1066.114 178.017c0-1.609 1.608-3.218 3.217-3.218h29.297c1.608 0 3.217 1.61 3.217 3.218v29.295c0 1.61-1.61 3.22-3.22 3.22h-29.293c-1.609 0-3.218-1.61-3.218-3.219z"></path>
        <path id="gv85aD" d="M1078.376 202.628a4.606 4.606 0 1 1 .003-9.212 4.606 4.606 0 0 1-.003 9.212zm12.504-2.066v-5.106h-3.287a9.555 9.555 0 0 0-.897-2.154l2.326-2.327-3.611-3.61-2.329 2.329a9.438 9.438 0 0 0-2.153-.891v-3.296h-5.105v3.296c-.76.21-1.48.51-2.152.891l-2.33-2.329-3.61 3.61 2.326 2.327a9.43 9.43 0 0 0-.894 2.154h-3.29v5.106h3.282c.21.765.511 1.49.894 2.165l-2.319 2.318 3.611 3.611 2.316-2.316a9.538 9.538 0 0 0 2.166.9v3.272h5.105v-3.272a9.563 9.563 0 0 0 2.17-.9l2.312 2.316 3.611-3.611-2.317-2.318c.38-.676.684-1.4.893-2.165z"></path>
        <path id="gv85aE" d="M1078.376 202.628a4.606 4.606 0 1 1 .003-9.212 4.606 4.606 0 0 1-.003 9.212zm6.006-4.606a6.006 6.006 0 1 0-12.012-.001 6.006 6.006 0 0 0 12.012 0z"></path>
        <path id="gv85aF" d="M1094.066 185.556a2.889 2.889 0 1 1 0-5.778 2.889 2.889 0 0 1 0 5.778zm7.842-1.294v-3.202h-2.063a5.939 5.939 0 0 0-.562-1.352l1.459-1.46-2.264-2.264-1.46 1.462a5.908 5.908 0 0 0-1.352-.559v-2.068h-3.2v2.068c-.477.13-.931.321-1.351.56l-1.461-1.463-2.264 2.265 1.459 1.459c-.24.422-.43.875-.562 1.352h-2.062v3.202h2.058c.13.479.32.933.56 1.357l-1.453 1.454 2.264 2.265 1.452-1.453c.424.241.88.432 1.36.564v2.053h3.2v-2.053a5.931 5.931 0 0 0 1.36-.564l1.452 1.453 2.264-2.265-1.453-1.454c.239-.424.43-.878.56-1.357z"></path>
        <path id="gv85aG" d="M1094.066 185.556a2.889 2.889 0 1 1 0-5.778 2.889 2.889 0 0 1 0 5.778zm3.798-2.889a3.799 3.799 0 1 0-7.597 0 3.799 3.799 0 0 0 7.597 0z"></path>
        <path id="gv85aI" d="M1083.048 221.79c.215 0 .43.048.62.167l.884-1.283a2.88 2.88 0 0 0-2.984-.024l.955 1.26c.167-.072.334-.12.525-.12z"></path>
        <path id="gv85aJ" d="M1084.05 223.978l.932 1.26c.525-.476.859-1.118.93-1.855h-1.575c-.024.214-.143.428-.286.595z"></path>
        <path id="gv85aK" d="M1084.361 222.932h1.575c-.047-.808-.43-1.498-1.002-1.997l-.883 1.307c.167.19.262.428.31.69z"></path>
        <path id="gv85aL" d="M1081.76 223.383h-1.576a2.842 2.842 0 0 0 1.146 2.045l.883-1.284a1.668 1.668 0 0 1-.454-.76z"></path>
        <path id="gv85aM" d="M1082.141 222.171l-.93-1.26a2.838 2.838 0 0 0-1.027 2.02h1.575c.048-.308.167-.57.382-.76z"></path>
        <path id="gv85aN" d="M1083.048 224.43c-.167 0-.31-.024-.453-.072l-.884 1.308a2.854 2.854 0 0 0 2.913-.143l-.931-1.26a1.186 1.186 0 0 1-.645.166z"></path>
        <path id="gv85aP" d="M1095.594 221.459l-.23-.23.875-.877a2.453 2.453 0 0 0-.887.025 3.626 3.626 0 0 0-1.029.38c-.422.229-.839.547-1.237.946a9.419 9.419 0 0 0-.787.892h1.928v1.93c.288-.225.59-.485.892-.788.399-.398.717-.815.946-1.237.185-.342.313-.688.38-1.03.082-.423.05-.736.025-.886z"></path>
        <path id="gv85aQ" d="M1093.9 222.921h-1.845c-.127.18-.24.352-.339.514h1.67v1.67c.163-.098.335-.211.515-.338z"></path>
        <path id="gv85aR" d="M1093.06 223.761h-1.534l-.12.224c-.317.617-.427 1.03-.432 1.047l-.04.149.53.177.177.53.148-.04c.018-.003.428-.115 1.047-.432.07-.036.145-.076.224-.12v-1.535z"></path>
        <path id="gv85aT" d="M1116.761 200.219l-.961.961.961.962h-1.923v-.562l-1.044-1.338z"></path>
        <path id="gv85aU" d="M1114.838 200.242v1.338h-3.066v-2.486h3.066z"></path>
        <path id="gv85aV" d="M1112.005 201.231v2.62h-.464v-2.27z"></path>
        <path id="gv85aW" d="M1112.005 198.712v.73l-.464-.348v-.382c0-.045.036-.082.081-.082h.302c.044 0 .08.037.08.082z"></path>
        <path id="gv85aX" d="M1111.54 199.094h.464v2.486h-.463z"></path>
        <path id="gv85aZ" d="M1116.749 182.098l-.962.961.962.962h-1.924v-.562l-1.044-1.338z"></path>
        <path id="gv85ba" d="M1114.825 182.121v1.338h-3.066v-2.486h3.066z"></path>
        <path id="gv85bb" d="M1111.992 183.11v2.62h-.464v-2.271z"></path>
        <path id="gv85bc" d="M1111.992 180.59v.732l-.464-.349v-.382c0-.045.037-.082.081-.082h.302c.044 0 .08.037.08.082z"></path>
        <path id="gv85bd" d="M1111.528 180.973h.464v2.486h-.464z"></path>
        <path id="gv85bf" d="M1113.25 191.305c.214 0 .429.048.62.167l.883-1.284a2.88 2.88 0 0 0-2.984-.024l.955 1.26c.167-.071.334-.119.525-.119z"></path>
        <path id="gv85bg" d="M1114.252 193.492l.93 1.26c.526-.475.86-1.117.932-1.854h-1.576c-.024.214-.143.428-.286.594z"></path>
        <path id="gv85bh" d="M1114.562 192.446h1.576c-.048-.808-.43-1.497-1.003-1.996l-.883 1.307c.167.19.262.428.31.69z"></path>
        <path id="gv85bi" d="M1111.96 192.898h-1.575a2.842 2.842 0 0 0 1.146 2.044l.883-1.283a1.668 1.668 0 0 1-.454-.76z"></path>
        <path id="gv85bj" d="M1112.342 191.686l-.93-1.26a2.838 2.838 0 0 0-1.027 2.02h1.575c.048-.309.167-.57.382-.76z"></path>
        <path id="gv85bk" d="M1113.25 193.944c-.168 0-.311-.024-.454-.071l-.883 1.307a2.854 2.854 0 0 0 2.912-.142l-.931-1.26a1.186 1.186 0 0 1-.645.166z"></path>
        <path id="gv85bm" d="M1074.761 221.246l-.216-.216.823-.824a2.305 2.305 0 0 0-.834.024c-.32.062-.646.183-.967.356a5.117 5.117 0 0 0-1.163.89c-.284.284-.53.567-.74.839h1.812v1.813c.27-.21.555-.456.839-.74.375-.375.674-.766.89-1.163.173-.321.294-.647.356-.968.077-.398.048-.692.023-.833z"></path>
        <path id="gv85bn" d="M1073.17 222.621h-1.735c-.12.17-.225.33-.318.483h1.57v1.57c.152-.093.314-.2.483-.319z"></path>
        <path id="gv85bo" d="M1072.38 223.41h-1.442l-.113.211a5.37 5.37 0 0 0-.406.984l-.038.14.499.166.166.499.139-.037c.016-.004.402-.11.984-.407.066-.033.137-.071.21-.112l.001-1.443z"></path>
        <path id="gv85br" d="M1093.868 164.555c-.517.405-1.421.072-1.43-.666l-.317-.095H1092c0 .867.616 1.374 1.363 1.374a1.257 1.257 0 0 0 1.108-.67l-.433-.129a.822.822 0 0 1-.17.186z"></path>
        <path id="gv85bt" d="M1092 161.17h-1.109a.657.657 0 0 0-.656.656v.875c0 .362.295.656.656.656H1092z"></path>
        <path id="gv85bx" d="M1096.59 158.984a.219.219 0 0 0-.218.219v.712l-3.935 1.18v2.337l3.935 1.181v.712a.219.219 0 1 0 .438 0v-6.122a.219.219 0 0 0-.22-.219z"></path>
        <path id="gv85by" d="M1097.261 161.547v1.434a.817.817 0 0 0 .438-.717.817.817 0 0 0-.438-.717z"></path>
        <path id="gv85bB" d="M1080.544 161.449c0-1 1-2 2-2h3.302c1 0 2 1 2 2v2.637c0 1-1 2-2 2h-3.302c-1 0-2-1-2-2z"></path>
        <path id="gv85bE" d="M1069.526 166.75v-8.629h8.629v8.629z"></path>
        <path id="gv85bH" d="M1069.918 159.906c0-.5.5-1 1-1h1.138c.5 0 1 .5 1 1v.745c0 .5-.5 1-1 1h-1.138c-.5 0-1-.5-1-1z"></path>
        <path id="gv85bM" d="M1074.625 159.906c0-.5.5-1 1-1h1.138c.5 0 1 .5 1 1v.745c0 .5-.5 1-1 1h-1.138c-.5 0-1-.5-1-1z"></path>
        <path id="gv85bR" d="M1069.918 164.612c0-.5.5-1 1-1h1.138c.5 0 1 .5 1 1v.745c0 .5-.5 1-1 1h-1.138c-.5 0-1-.5-1-1z"></path>
        <path id="gv85bW" d="M1074.625 164.612c0-.5.5-1 1-1h1.138c.5 0 1 .5 1 1v.745c0 .5-.5 1-1 1h-1.138c-.5 0-1-.5-1-1z"></path>
        <path id="gv85cb" d="M1054.174 185.264c-.517.405-1.42.072-1.43-.666l-.316-.095h-.122c0 .867.616 1.374 1.363 1.374a1.257 1.257 0 0 0 1.108-.67l-.433-.129a.822.822 0 0 1-.17.186z"></path>
        <path id="gv85cd" d="M1052.306 181.88h-1.108a.657.657 0 0 0-.656.655v.875c0 .362.294.656.656.656h1.108z"></path>
        <path id="gv85ch" d="M1056.898 179.693a.219.219 0 0 0-.22.219v.712l-3.935 1.18v2.337l3.936 1.18v.713a.219.219 0 1 0 .437 0v-6.122a.219.219 0 0 0-.218-.219z"></path>
        <path id="gv85ci" d="M1057.568 182.256v1.434a.817.817 0 0 0 .437-.717.817.817 0 0 0-.437-.717z"></path>
        <path id="gv85cl" d="M1050.343 191.65c0-1 1-2 2-2h3.301c1 0 2 1 2 2v2.637c0 1-1 2-2 2h-3.301c-1 0-2-1-2-2z"></path>
        <path id="gv85co" d="M1049.68 207.306v-8.63h8.628v8.63z"></path>
        <path id="gv85cr" d="M1050.071 200.461c0-.5.5-1 1-1h1.138c.5 0 1 .5 1 1v.746c0 .5-.5 1-1 1h-1.138c-.5 0-1-.5-1-1z"></path>
        <path id="gv85cw" d="M1054.778 200.461c0-.5.5-1 1-1h1.138c.5 0 1 .5 1 1v.746c0 .5-.5 1-1 1h-1.138c-.5 0-1-.5-1-1z"></path>
        <path id="gv85cB" d="M1050.071 205.168c0-.5.5-1 1-1h1.138c.5 0 1 .5 1 1v.745c0 .5-.5 1-1 1h-1.138c-.5 0-1-.5-1-1z"></path>
        <path id="gv85cG" d="M1054.778 205.168c0-.5.5-1 1-1h1.138c.5 0 1 .5 1 1v.745c0 .5-.5 1-1 1h-1.138c-.5 0-1-.5-1-1z"></path>
        <clipPath id="gv85aH">
          <use fill="#fff" href="#gv85a"></use>
        </clipPath>
        <clipPath id="gv85aO">
          <use fill="#fff" href="#gv85b"></use>
        </clipPath>
        <clipPath id="gv85aS">
          <use fill="#fff" href="#gv85c"></use>
        </clipPath>
        <clipPath id="gv85aY">
          <use fill="#fff" href="#gv85d"></use>
        </clipPath>
        <clipPath id="gv85be">
          <use fill="#fff" href="#gv85e"></use>
        </clipPath>
        <clipPath id="gv85bl">
          <use fill="#fff" href="#gv85f"></use>
        </clipPath>
        <mask id="gv85bq" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1089 158h9v9h-9z"></path>
          <use href="#gv85g"></use>
        </mask>
        <filter id="gv85bp" width="41" height="44" x="1073" y="142" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2131Out"></feOffset>
          <feGaussianBlur in="FeOffset2131Out" result="FeGaussianBlur2132Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <mask id="gv85bv" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1090 159h8v7h-8z"></path>
          <use href="#gv85h"></use>
        </mask>
        <filter id="gv85bu" width="40" height="42" x="1074" y="143" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2168Out"></feOffset>
          <feGaussianBlur in="FeOffset2168Out" result="FeGaussianBlur2169Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <mask id="gv85bA" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1079 158h10v9h-10z"></path>
          <use href="#gv85i"></use>
        </mask>
        <filter id="gv85bz" width="42" height="44" x="1063" y="142" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2196Out"></feOffset>
          <feGaussianBlur in="FeOffset2196Out" result="FeGaussianBlur2197Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85bC">
          <use fill="#fff" href="#gv85j"></use>
        </clipPath>
        <clipPath id="gv85bD">
          <use fill="#fff" href="#gv85k"></use>
        </clipPath>
        <mask id="gv85bG" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1069 158h5v4h-5z"></path>
          <use href="#gv85l"></use>
        </mask>
        <filter id="gv85bF" width="37" height="39" x="1053" y="142" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2240Out"></feOffset>
          <feGaussianBlur in="FeOffset2240Out" result="FeGaussianBlur2241Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85bI">
          <use fill="#fff" href="#gv85m"></use>
        </clipPath>
        <clipPath id="gv85bJ">
          <use fill="#fff" href="#gv85n"></use>
        </clipPath>
        <mask id="gv85bL" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1074 158h5v4h-5z"></path>
          <use href="#gv85o"></use>
        </mask>
        <filter id="gv85bK" width="37" height="39" x="1058" y="142" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2277Out"></feOffset>
          <feGaussianBlur in="FeOffset2277Out" result="FeGaussianBlur2278Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85bN">
          <use fill="#fff" href="#gv85p"></use>
        </clipPath>
        <clipPath id="gv85bO">
          <use fill="#fff" href="#gv85q"></use>
        </clipPath>
        <mask id="gv85bQ" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1069 162h5v5h-5z"></path>
          <use href="#gv85r"></use>
        </mask>
        <filter id="gv85bP" width="37" height="40" x="1053" y="146" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2314Out"></feOffset>
          <feGaussianBlur in="FeOffset2314Out" result="FeGaussianBlur2315Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85bS">
          <use fill="#fff" href="#gv85s"></use>
        </clipPath>
        <clipPath id="gv85bT">
          <use fill="#fff" href="#gv85t"></use>
        </clipPath>
        <mask id="gv85bV" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1074 162h5v5h-5z"></path>
          <use href="#gv85u"></use>
        </mask>
        <filter id="gv85bU" width="37" height="40" x="1058" y="146" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2351Out"></feOffset>
          <feGaussianBlur in="FeOffset2351Out" result="FeGaussianBlur2352Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85bX">
          <use fill="#fff" href="#gv85v"></use>
        </clipPath>
        <clipPath id="gv85bY">
          <use fill="#fff" href="#gv85w"></use>
        </clipPath>
        <mask id="gv85ca" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1049 178h10v10h-10z"></path>
          <use href="#gv85x"></use>
        </mask>
        <filter id="gv85bZ" width="42" height="45" x="1033" y="162" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2390Out"></feOffset>
          <feGaussianBlur in="FeOffset2390Out" result="FeGaussianBlur2391Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <mask id="gv85cf" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1050 179h8v8h-8z"></path>
          <use href="#gv85y"></use>
        </mask>
        <filter id="gv85ce" width="40" height="43" x="1034" y="163" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2427Out"></feOffset>
          <feGaussianBlur in="FeOffset2427Out" result="FeGaussianBlur2428Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <mask id="gv85ck" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1049 188h10v9h-10z"></path>
          <use href="#gv85z"></use>
        </mask>
        <filter id="gv85cj" width="42" height="44" x="1033" y="172" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2455Out"></feOffset>
          <feGaussianBlur in="FeOffset2455Out" result="FeGaussianBlur2456Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85cm">
          <use fill="#fff" href="#gv85A"></use>
        </clipPath>
        <clipPath id="gv85cn">
          <use fill="#fff" href="#gv85B"></use>
        </clipPath>
        <mask id="gv85cq" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1049 198h5v5h-5z"></path>
          <use href="#gv85C"></use>
        </mask>
        <filter id="gv85cp" width="37" height="40" x="1033" y="182" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2499Out"></feOffset>
          <feGaussianBlur in="FeOffset2499Out" result="FeGaussianBlur2500Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85cs">
          <use fill="#fff" href="#gv85D"></use>
        </clipPath>
        <clipPath id="gv85ct">
          <use fill="#fff" href="#gv85E"></use>
        </clipPath>
        <mask id="gv85cv" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1054 198h5v5h-5z"></path>
          <use href="#gv85F"></use>
        </mask>
        <filter id="gv85cu" width="37" height="40" x="1038" y="182" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2536Out"></feOffset>
          <feGaussianBlur in="FeOffset2536Out" result="FeGaussianBlur2537Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85cx">
          <use fill="#fff" href="#gv85G"></use>
        </clipPath>
        <clipPath id="gv85cy">
          <use fill="#fff" href="#gv85H"></use>
        </clipPath>
        <mask id="gv85cA" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1049 203h5v5h-5z"></path>
          <use href="#gv85I"></use>
        </mask>
        <filter id="gv85cz" width="37" height="40" x="1033" y="187" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2573Out"></feOffset>
          <feGaussianBlur in="FeOffset2573Out" result="FeGaussianBlur2574Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85cC">
          <use fill="#fff" href="#gv85J"></use>
        </clipPath>
        <clipPath id="gv85cD">
          <use fill="#fff" href="#gv85K"></use>
        </clipPath>
        <mask id="gv85cF" width="2" height="2" x="-1" y="-1">
          <path fill="#fff" d="M1054 203h5v5h-5z"></path>
          <use href="#gv85L"></use>
        </mask>
        <filter id="gv85cE" width="37" height="40" x="1038" y="187" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceGraphic" result="FeOffset2610Out"></feOffset>
          <feGaussianBlur in="FeOffset2610Out" result="FeGaussianBlur2611Out" stdDeviation="2.4 2.4"></feGaussianBlur>
        </filter>
        <clipPath id="gv85cH">
          <use fill="#fff" href="#gv85M"></use>
        </clipPath>
        <clipPath id="gv85cI">
          <use fill="#fff" href="#gv85N"></use>
        </clipPath>
        <clipPath id="gv85bs">
          <use href="#gv85h"></use>
        </clipPath>
        <clipPath id="gv85bw">
          <use href="#gv85h"></use>
        </clipPath>
        <clipPath id="gv85cc">
          <use href="#gv85y"></use>
        </clipPath>
        <clipPath id="gv85cg">
          <use href="#gv85y"></use>
        </clipPath>
      </defs>
      <g>
        <g transform="translate(-900 -124)">
          <g>
            <use fill="#eef3ff" href="#gv85O"></use>
          </g>
          <g>
            <use fill="#eef3ff" href="#gv85P"></use>
          </g>
          <g>
            <use fill="#eef3ff" href="#gv85Q"></use>
          </g>
          <g>
            <g>
              <g>
                <use fill="#fffbf2" href="#gv85R"></use>
              </g>
              <g>
                <g>
                  <g>
                    <use fill="#f9a832" href="#gv85S"></use>
                  </g>
                  <g>
                    <use fill="#f9a832" href="#gv85T"></use>
                  </g>
                  <g>
                    <use fill="#f9a832" href="#gv85U"></use>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <use fill="#ffd983" href="#gv85V"></use>
                </g>
                <g>
                  <use fill="#ffd983" href="#gv85W"></use>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <use fill="#1976d5" href="#gv85X"></use>
                </g>
                <g>
                  <use fill="#1976d5" href="#gv85Y"></use>
                </g>
                <g>
                  <use fill="#002e57" href="#gv85Z"></use>
                </g>
              </g>
              <g>
                <g>
                  <use fill="#002e57" href="#gv85aa"></use>
                </g>
                <g>
                  <use fill="#002e57" href="#gv85ab"></use>
                </g>
                <g>
                  <use fill="#002e57" href="#gv85ac"></use>
                </g>
              </g>
            </g>
          </g>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85ad"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85ae"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85af"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85ag"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85ah"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85ai"></use>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85aj"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85ak"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85al"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85am"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85an"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85ao"></use>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85ap"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85aq"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85ar"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85as"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85at"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85au"></use>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85av"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85aw"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85ax"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85ay"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth="1.55" href="#gv85az"></use>
                  </g>
                  <g>
                    <use fill="#1976d5" href="#gv85aA"></use>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <use fill="#002e57" href="#gv85aB"></use>
                </g>
                <g>
                  <use fill="#fff" fillOpacity="0" stroke="#1976d5" strokeDasharray="3.953 3.747" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="50" strokeWidth=".79" href="#gv85aC"></use>
                </g>
                <g>
                  <g>
                    <g>
                      <use fill="#ffefc8" href="#gv85aD"></use>
                    </g>
                    <g>
                      <use fill="#f9a832" href="#gv85aE"></use>
                    </g>
                  </g>
                  <g>
                    <g>
                      <use fill="#efdcad" href="#gv85aF"></use>
                    </g>
                    <g>
                      <use fill="#f9a832" href="#gv85aG"></use>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <use fill="#d964c5" href="#gv85a"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1" clipPath="url(&quot;#gv85aH&quot;)" href="#gv85a"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <g>
                      <use fill="#fff" href="#gv85aI"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85aI"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85aJ"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85aJ"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85aK"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85aK"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85aL"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85aL"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85aM"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85aM"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85aN"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85aN"></use>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <use fill="#7655c9" href="#gv85b"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1" clipPath="url(&quot;#gv85aO&quot;)" href="#gv85b"></use>
                </g>
                <g>
                  <g>
                    <use fill="#fff" href="#gv85aP"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth=".2" href="#gv85aP"></use>
                  </g>
                  <g>
                    <use fill="#fff" href="#gv85aQ"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth=".2" href="#gv85aQ"></use>
                  </g>
                  <g>
                    <use fill="#fff" href="#gv85aR"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth=".2" href="#gv85aR"></use>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <use fill="#7655c9" href="#gv85c"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1" clipPath="url(&quot;#gv85aS&quot;)" href="#gv85c"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#e6e6e6" href="#gv85aT"></use>
                  </g>
                  <g>
                    <use fill="#fff" href="#gv85aU"></use>
                  </g>
                  <g>
                    <g>
                      <use fill="#0d182f" href="#gv85aV"></use>
                    </g>
                    <g>
                      <use fill="#0d182f" href="#gv85aW"></use>
                    </g>
                  </g>
                  <g>
                    <use fill="#e6e6e6" href="#gv85aX"></use>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <use fill="#d964c5" href="#gv85d"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1" clipPath="url(&quot;#gv85aY&quot;)" href="#gv85d"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <use fill="#e6e6e6" href="#gv85aZ"></use>
                  </g>
                  <g>
                    <use fill="#fff" href="#gv85ba"></use>
                  </g>
                  <g>
                    <g>
                      <use fill="#0d182f" href="#gv85bb"></use>
                    </g>
                    <g>
                      <use fill="#0d182f" href="#gv85bc"></use>
                    </g>
                  </g>
                  <g>
                    <use fill="#e6e6e6" href="#gv85bd"></use>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <use fill="#d964c5" href="#gv85e"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1" clipPath="url(&quot;#gv85be&quot;)" href="#gv85e"></use>
                  </g>
                </g>
                <g>
                  <g>
                    <g>
                      <use fill="#fff" href="#gv85bf"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85bf"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85bg"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85bg"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85bh"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85bh"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85bi"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85bi"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85bj"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85bj"></use>
                    </g>
                    <g>
                      <use fill="#fff" href="#gv85bk"></use>
                      <use fill="#fff" fillOpacity="0" stroke="#fff" strokeMiterlimit="50" strokeWidth=".1" href="#gv85bk"></use>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <use fill="#3d2870" href="#gv85f"></use>
                  <use fill="#fff" fillOpacity="0" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".1" clipPath="url(&quot;#gv85bl&quot;)" href="#gv85f"></use>
                </g>
                <g>
                  <g>
                    <use fill="#fff" href="#gv85bm"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth=".2" href="#gv85bm"></use>
                  </g>
                  <g>
                    <use fill="#fff" href="#gv85bn"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth=".2" href="#gv85bn"></use>
                  </g>
                  <g>
                    <use fill="#fff" href="#gv85bo"></use>
                    <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth=".2" href="#gv85bo"></use>
                  </g>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g filter="url(#gv85bp)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85bq&quot;)" href="#gv85g"></use>
                  <use fill="#5586ef" fillOpacity=".25" href="#gv85g"></use>
                </g>
                <use fill="#fff" href="#gv85g"></use>
              </g>
              <g opacity=".6">
                <g opacity=".6">
                  <use fill="#3d2870" href="#gv85br"></use>
                </g>
                <g opacity=".6">
                  <g opacity=".6">
                    <use fill="#3d2870" href="#gv85h"></use>
                  </g>
                  <g clipPath="url(#gv85bs)" opacity=".6">
                    <use fill="#3d2870" href="#gv85bt"></use>
                  </g>
                </g>
                <g opacity=".6">
                  <g opacity=".6">
                    <g filter="url(#gv85bu)">
                      <use fill="none" strokeOpacity=".36" strokeWidth="0" mask="url(&quot;#gv85bv&quot;)" href="#gv85h"></use>
                      <use fill="#4c7ee9" fillOpacity=".36" href="#gv85h"></use>
                    </g>
                    <use fill="#3d2870" href="#gv85h"></use>
                  </g>
                  <g clipPath="url(#gv85bw)" opacity=".6">
                    <use fill="#3d2870" href="#gv85bx"></use>
                  </g>
                </g>
                <g opacity=".6">
                  <use fill="#3d2870" href="#gv85by"></use>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g filter="url(#gv85bz)">
                  <use fill="none" strokeOpacity=".24" strokeWidth="0" mask="url(&quot;#gv85bA&quot;)" href="#gv85i"></use>
                  <use fill="#3f65b7" fillOpacity=".24" href="#gv85i"></use>
                </g>
                <use fill="#fff" href="#gv85i"></use>
              </g>
              <g opacity=".51">
                <use fill="#d964c5" href="#gv85bB"></use>
              </g>
              <g opacity=".5">
                <use fill="#fff" href="#gv85j"></use>
                <use fill="#fff" fillOpacity="0" stroke="#d964c5" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bC&quot;)" href="#gv85j"></use>
              </g>
              <g opacity=".5">
                <use fill="#fff" href="#gv85k"></use>
                <use fill="#fff" fillOpacity="0" stroke="#d964c5" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bD&quot;)" href="#gv85k"></use>
              </g>
            </g>
            <g>
              <use fill="#fff" href="#gv85bE"></use>
            </g>
            <g>
              <g>
                <g filter="url(#gv85bF)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85bG&quot;)" href="#gv85l"></use>
                  <use fill="#3f65b7" fillOpacity=".25" href="#gv85l"></use>
                </g>
                <use fill="#fff" href="#gv85l"></use>
              </g>
              <g opacity=".5">
                <use fill="#7655c9" href="#gv85bH"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85m"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bI&quot;)" href="#gv85m"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85n"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bJ&quot;)" href="#gv85n"></use>
              </g>
              <g>
                <g filter="url(#gv85bK)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85bL&quot;)" href="#gv85o"></use>
                  <use fill="#3f65b7" fillOpacity=".25" href="#gv85o"></use>
                </g>
                <use fill="#fff" href="#gv85o"></use>
              </g>
              <g opacity=".5">
                <use fill="#7655c9" href="#gv85bM"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85p"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bN&quot;)" href="#gv85p"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85q"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bO&quot;)" href="#gv85q"></use>
              </g>
              <g>
                <g filter="url(#gv85bP)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85bQ&quot;)" href="#gv85r"></use>
                  <use fill="#3f65b7" fillOpacity=".25" href="#gv85r"></use>
                </g>
                <use fill="#fff" href="#gv85r"></use>
              </g>
              <g opacity=".5">
                <use fill="#7655c9" href="#gv85bR"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85s"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bS&quot;)" href="#gv85s"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85t"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bT&quot;)" href="#gv85t"></use>
              </g>
              <g>
                <g filter="url(#gv85bU)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85bV&quot;)" href="#gv85u"></use>
                  <use fill="#3f65b7" fillOpacity=".25" href="#gv85u"></use>
                </g>
                <use fill="#fff" href="#gv85u"></use>
              </g>
              <g opacity=".5">
                <use fill="#7655c9" href="#gv85bW"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85v"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bX&quot;)" href="#gv85v"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85w"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85bY&quot;)" href="#gv85w"></use>
              </g>
            </g>
            <g>
              <g>
                <g filter="url(#gv85bZ)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85ca&quot;)" href="#gv85x"></use>
                  <use fill="#5586ef" fillOpacity=".25" href="#gv85x"></use>
                </g>
                <use fill="#fff" href="#gv85x"></use>
              </g>
              <g opacity=".6">
                <g opacity=".6">
                  <use fill="#3d2870" href="#gv85cb"></use>
                </g>
                <g opacity=".6">
                  <g opacity=".6">
                    <use fill="#3d2870" href="#gv85y"></use>
                  </g>
                  <g clipPath="url(#gv85cc)" opacity=".6">
                    <use fill="#3d2870" href="#gv85cd"></use>
                  </g>
                </g>
                <g opacity=".6">
                  <g opacity=".6">
                    <g filter="url(#gv85ce)">
                      <use fill="none" strokeOpacity=".36" strokeWidth="0" mask="url(&quot;#gv85cf&quot;)" href="#gv85y"></use>
                      <use fill="#4c7ee9" fillOpacity=".36" href="#gv85y"></use>
                    </g>
                    <use fill="#3d2870" href="#gv85y"></use>
                  </g>
                  <g clipPath="url(#gv85cg)" opacity=".6">
                    <use fill="#3d2870" href="#gv85ch"></use>
                  </g>
                </g>
                <g opacity=".6">
                  <use fill="#3d2870" href="#gv85ci"></use>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g filter="url(#gv85cj)">
                  <use fill="none" strokeOpacity=".24" strokeWidth="0" mask="url(&quot;#gv85ck&quot;)" href="#gv85z"></use>
                  <use fill="#3f65b7" fillOpacity=".24" href="#gv85z"></use>
                </g>
                <use fill="#fff" href="#gv85z"></use>
              </g>
              <g opacity=".51">
                <use fill="#d964c5" href="#gv85cl"></use>
              </g>
              <g opacity=".5">
                <use fill="#fff" href="#gv85A"></use>
                <use fill="#fff" fillOpacity="0" stroke="#d964c5" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cm&quot;)" href="#gv85A"></use>
              </g>
              <g opacity=".5">
                <use fill="#fff" href="#gv85B"></use>
                <use fill="#fff" fillOpacity="0" stroke="#d964c5" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cn&quot;)" href="#gv85B"></use>
              </g>
            </g>
            <g>
              <use fill="#fff" href="#gv85co"></use>
            </g>
            <g>
              <g>
                <g filter="url(#gv85cp)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85cq&quot;)" href="#gv85C"></use>
                  <use fill="#3f65b7" fillOpacity=".25" href="#gv85C"></use>
                </g>
                <use fill="#fff" href="#gv85C"></use>
              </g>
              <g opacity=".5">
                <use fill="#7655c9" href="#gv85cr"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85D"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cs&quot;)" href="#gv85D"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85E"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85ct&quot;)" href="#gv85E"></use>
              </g>
              <g>
                <g filter="url(#gv85cu)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85cv&quot;)" href="#gv85F"></use>
                  <use fill="#3f65b7" fillOpacity=".25" href="#gv85F"></use>
                </g>
                <use fill="#fff" href="#gv85F"></use>
              </g>
              <g opacity=".5">
                <use fill="#7655c9" href="#gv85cw"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85G"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cx&quot;)" href="#gv85G"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85H"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cy&quot;)" href="#gv85H"></use>
              </g>
              <g>
                <g filter="url(#gv85cz)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85cA&quot;)" href="#gv85I"></use>
                  <use fill="#3f65b7" fillOpacity=".25" href="#gv85I"></use>
                </g>
                <use fill="#fff" href="#gv85I"></use>
              </g>
              <g opacity=".5">
                <use fill="#7655c9" href="#gv85cB"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85J"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cC&quot;)" href="#gv85J"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85K"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cD&quot;)" href="#gv85K"></use>
              </g>
              <g>
                <g filter="url(#gv85cE)">
                  <use fill="none" strokeOpacity=".25" strokeWidth="0" mask="url(&quot;#gv85cF&quot;)" href="#gv85L"></use>
                  <use fill="#3f65b7" fillOpacity=".25" href="#gv85L"></use>
                </g>
                <use fill="#fff" href="#gv85L"></use>
              </g>
              <g opacity=".5">
                <use fill="#7655c9" href="#gv85cG"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85M"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cH&quot;)" href="#gv85M"></use>
              </g>
              <g opacity=".5">
                <use fill="#c7d9ff" href="#gv85N"></use>
                <use fill="#fff" fillOpacity="0" stroke="#7655c9" strokeMiterlimit="50" strokeWidth="2" clipPath="url(&quot;#gv85cI&quot;)" href="#gv85N"></use>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SvgStopLoss;

export {SvgStopLossPic,SvgStopLossPicAds};