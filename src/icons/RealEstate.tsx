import React from "react";

/**
 * RealEstate icon component
 * Real Estate
 */
export function RealEstateSVG(props: React.ComponentProps<"svg">) {
  const { width = 50, height = 50, fill = "#003073" } = props;
  return (
    <svg
      width={width}
      height={height}
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_133_40)">
        <path d="M41.4547 16.9537H18.486V34.1694H41.4547V16.9537Z" fill={fill} />
        <path
          d="M14.9519 10.0651V4.99988H11.0096V10.0651H5V13.9742H11.0096V44.6633H14.9519V13.9742H45V10.0651H14.9519Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_133_40">
          <rect width="40" height="39.6635" fill="white" transform="translate(5 4.99988)" />
        </clipPath>
      </defs>
    </svg>
  );
}
