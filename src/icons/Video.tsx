import React from "react";

/**
 * Video icon component
 * Video icon
 */
export default function VideoSVG(props: React.ComponentProps<"svg">) {
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
      <g clipPath="url(#clip0_133_195)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.14574 37.9998H30.9726C33.2525 37.9998 35.1183 36.1118 35.1183 33.8047V31.5765L43.5205 35.3428C44.0823 35.5945 44.681 35.5461 45.1963 35.2072C45.7116 34.8684 45.9986 34.3331 45.9986 33.7121V17.2888C45.9986 16.6664 45.7116 16.1325 45.1963 15.7937C44.681 15.4548 44.0823 15.4064 43.5205 15.6581L35.1183 19.423V17.1948C35.1183 14.8877 33.2525 12.9998 30.9726 12.9998H8.14574C5.86579 12.9998 4 14.8877 4 17.1948V33.8047C4 36.1118 5.86579 37.9998 8.14574 37.9998Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_133_195">
          <rect width="42" height="25" fill={fill} transform="translate(4 12.9998)" />
        </clipPath>
      </defs>
    </svg>
  );
}
