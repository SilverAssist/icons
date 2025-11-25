import React from 'react';

/**
 * Icons50 icon component
 * Icons50
 */
export default function Icons50SVG(props: React.ComponentProps<"svg">) {
  const { width = 50, height = 50, fill = "#E3F7FB", stroke = "#3F3F3F" } = props;
  return (
    <svg
      width={width}
      height={height}
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_133_218)">
      <path d="M24.5191 6.08116C24.5054 6.06712 24.4946 6.05309 24.4809 6.03905C24.4673 6.02502 24.4564 6.01379 24.4455 5.99976C21.2605 9.39619 15.152 11.7877 8 12.1218C8.4768 26.791 11.0706 38.8609 24.4809 44.9913C24.4864 44.9941 24.4946 44.9969 24.5 44.9998C24.5054 44.9969 24.5136 44.9941 24.5191 44.9913C37.9294 38.8609 40.5205 26.7938 41 12.1246C33.8589 11.8158 27.7422 9.45233 24.5191 6.08116ZM21.3068 32.753L15.8304 27.111L18.5277 24.3321L21.3068 27.1952L30.4723 17.7525L33.1696 20.5314L21.3068 32.753Z" fill="#003073"/>
      </g>
      <defs>
      <clipPath id="clip0_133_218">
      <rect width="33" height="39" fill="white" transform="translate(8 5.99976)"/>
      </clipPath>
      </defs>
    </svg>
  );
}
