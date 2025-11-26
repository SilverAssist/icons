import React from "react";

/**
 * CheckMarkCircle icon component
 * Check Mark Circle
 */
export default function CheckMarkCircleSVG(props: React.ComponentProps<"svg">) {
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
      <g clipPath="url(#clip0_133_66)">
        <path
          d="M5.00234 24.8649C4.86903 14.6499 13.2481 5.34766 24.3701 5.00955C35.626 4.66763 44.9281 13.6121 44.9998 24.974C45.0677 35.7029 36.4626 44.5243 25.8859 44.981C14.0892 45.4904 4.81381 35.8907 5.00234 24.8649ZM14.0562 24.974C16.8772 27.7868 19.7127 30.6141 22.5242 33.4173C26.9898 28.9616 31.4866 24.4754 35.9542 20.0178C34.8008 18.8639 33.6404 17.7024 32.4394 16.5009C29.1335 19.8008 25.8072 23.1217 22.434 26.4889C20.7766 24.8376 19.1211 23.1877 17.4732 21.5453C16.3351 22.6872 15.181 23.8449 14.0556 24.974H14.0562Z"
          fill="#003073"
        />
      </g>
      <defs>
        <clipPath id="clip0_133_66">
          <rect width="40" height="40" fill={fill} transform="translate(5 5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
