import React from "react";

/**
 * Checklist icon component
 * Checklist icon
 */
export default function ChecklistSVG(props: React.ComponentProps<"svg">) {
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
      <g clipPath="url(#clip0_133_221)">
        <path
          d="M39.0924 6.99976H9.91016C7.75002 6.99976 6 8.74977 6 10.9099V40.0922C6 42.2523 7.75002 44.0023 9.91016 44.0023H39.0924C41.2525 44.0023 43.0025 42.2523 43.0025 40.0922V10.9099C43.0025 8.74977 41.2525 6.99976 39.0924 6.99976ZM13.5987 39.3942L10.1522 35.9476L11.8487 34.2511L13.5961 35.9986L18.2094 31.3854L19.9059 33.0819L13.5961 39.3916L13.5987 39.3942ZM13.5987 29.5029L10.1522 26.0563L11.8487 24.3598L13.5961 26.1073L18.2094 21.4941L19.9059 23.1906L13.5961 29.5003L13.5987 29.5029ZM13.5987 19.6116L10.1522 16.1651L11.8487 14.4685L13.5961 16.216L18.2094 11.6028L19.9059 13.2993L13.5961 19.6091L13.5987 19.6116ZM38.8479 37.0481H23.1283V34.7504H38.8479V37.0481ZM38.8479 27.1568H23.1283V24.8591H38.8479V27.1568ZM38.8479 17.2655H23.1283V14.9678H38.8479V17.2655Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_133_221">
          <rect width="37" height="37" fill={fill} transform="translate(6 6.99976)" />
        </clipPath>
      </defs>
    </svg>
  );
}
