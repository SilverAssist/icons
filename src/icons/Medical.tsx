import React from "react";

/**
 * Medical icon component
 * medical
 */
export default function MedicalSVG(props: React.ComponentProps<"svg">) {
  const { width = 50, height = 50, fill = "#FFFFFF", stroke = "#3F3F3F" } = props;
  return (
    <svg
      width={width}
      height={height}
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_133_152)">
        <path
          d="M43.9648 8.59365C39.1416 3.80114 31.3229 3.80114 26.4997 8.59365L24.7911 10.2912L23.0825 8.59365C18.2593 3.80114 10.4406 3.80114 5.61742 8.59365C0.794193 13.3862 0.794193 21.1559 5.61742 25.9476L24.7911 44.9999L34.9441 34.9112L43.9648 25.9476C48.788 21.1551 48.788 13.3853 43.9648 8.59365ZM34.329 28.0777H28.5734V33.8016H21.0088V28.0777H15.2532V20.5549H21.0088V14.8318H28.5734V20.5557H34.329V28.0785V28.0777Z"
          fill="#003073"
        />
      </g>
      <defs>
        <clipPath id="clip0_133_152">
          <rect width="45.5814" height="40" fill={fill} transform="translate(2 4.99976)" />
        </clipPath>
      </defs>
    </svg>
  );
}
