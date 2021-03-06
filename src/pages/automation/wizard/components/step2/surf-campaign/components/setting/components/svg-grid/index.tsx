import React, {FC} from 'react';

interface ISvgGrid {
};

const SvgGrid: FC<ISvgGrid> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 16 24">
      <g>
        <g>
          <g>
            <path fill="#ebebeb" d="M0 24V0h16v24z"></path>
          </g>
          <g>
            <g>
              <path fill="#a0aabe" d="M2 9V6h3v3z"></path>
            </g>
            <g>
              <path fill="#a0aabe" d="M2 13.5v-3h3v3z"></path>
            </g>
            <g>
              <path fill="#a0aabe" d="M2 18v-3h3v3z"></path>
            </g>
            <g>
              <path fill="#a0aabe" d="M6.5 9V6h3v3z"></path>
            </g>
            <g>
              <path fill="#a0aabe" d="M6.5 13.5v-3h3v3z"></path>
            </g>
            <g>
              <path fill="#a0aabe" d="M6.5 18v-3h3v3z"></path>
            </g>
            <g>
              <path fill="#a0aabe" d="M11 9V6h3v3z"></path>
            </g>
            <g>
              <path fill="#a0aabe" d="M11 13.5v-3h3v3z"></path>
            </g>
            <g>
              <path fill="#a0aabe" d="M11 18v-3h3v3z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default SvgGrid;
