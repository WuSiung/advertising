import React, {FC} from 'react';

interface ISvgLine {
}

const SvgLine: FC<ISvgLine> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="102" viewBox="0 0 5 102">
      <g>
        <g>
          <g>
            <path fill="none" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".5"
                  d="M4.5 1v0H.51v50h4.503v0"></path>
          </g>
        </g>
        <g>
          <g>
            <path fill="none" stroke="#a0aabe" strokeMiterlimit="50" strokeWidth=".5" d="M.5 51v50h4.503v0"></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SvgLine;
