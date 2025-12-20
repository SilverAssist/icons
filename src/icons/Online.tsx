import React from "react";

/**
 * Online icon component
 * Online
 */
export function OnlineSVG(props: React.ComponentProps<"svg">) {
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
      <g clipPath="url(#clip0_133_178)">
        <path
          d="M45.0004 34.5792V8.99976H5.00037V34.5792H20.8983V38.6877H13.9163V41.1737H36.0845V38.6877H29.1024V34.5792H45.0004ZM9.11022 30.9396V12.6394H40.8905V30.9396H9.11022Z"
          fill={fill}
        />
        <path
          d="M23.3492 22.7502L20.1626 19.6457L17.968 21.7989C19.7798 23.5661 21.6007 25.3418 23.4065 27.1007L32.0325 18.6855L29.7752 16.4764L23.3492 22.7502Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_133_178">
          <rect width="40" height="32.1739" fill="white" transform="translate(5 8.99976)" />
        </clipPath>
      </defs>
    </svg>
  );
}
