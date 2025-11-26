import React from "react";

/**
 * XIcon icon component
 * X Icon icon
 */
export default function XIconSVG(props: React.ComponentProps<"svg">) {
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
      <g clipPath="url(#clip0_133_70)">
        <path
          d="M25.0016 5C13.9561 5 5 13.9561 5 25.0016C5 36.0471 13.9561 45.0032 25.0016 45.0032C36.0471 45.0032 45.0032 36.0471 45.0032 25.0016C45.0032 13.9561 36.0471 5 25.0016 5ZM29.8833 26.3249L35.8381 32.2766L32.2798 35.835L26.3249 29.8801L25.1092 28.6644L25.0016 28.5568L23.6751 29.8801L17.7202 35.835L14.1619 32.2766L20.1167 26.3217L21.3324 25.1061L21.44 24.9984L20.1167 23.6751L14.1619 17.7202L17.7202 14.1619L23.6751 20.1167L24.8908 21.3324L24.9984 21.44L26.3217 20.1167L32.2766 14.165L35.835 17.7234L29.8801 23.6783L28.6644 24.8939L28.5568 25.0016L29.8801 26.3281L29.8833 26.3249Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_133_70">
          <rect width="40" height="40" fill={fill} transform="translate(5 5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
