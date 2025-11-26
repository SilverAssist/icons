import React from 'react';

/**
 * Church icon component
 * Church
 */
export default function ChurchSVG(props: React.ComponentProps<"svg">) {
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
      <g clipPath="url(#clip0_133_204)">
      <path d="M32.5787 45.9998H44.0637C44.5799 45.9998 44.9992 45.5825 44.9992 45.0688V27.1164C44.9992 26.8221 44.8605 26.5462 44.6241 26.37L29.5233 15.1442C29.1867 14.894 28.7265 14.8973 28.3932 15.1517L15.226 25.2213V13.993C15.226 13.8301 15.1826 13.6689 15.1007 13.5276L10.4232 5.46521C10.2562 5.17763 9.94711 4.99976 9.61301 4.99976C9.2789 4.99976 8.96985 5.1768 8.80279 5.46521L4.12529 13.5276C4.04343 13.6689 4 13.8293 4 13.993V45.0688C4 45.5825 4.4193 45.9998 4.9355 45.9998H32.5787Z" fill="#003073"/>
      </g>
      <defs>
      <clipPath id="clip0_133_204">
      <rect width="41" height="41" fill="white" transform="translate(4 4.99976)"/>
      </clipPath>
      </defs>
    </svg>
  );
}
