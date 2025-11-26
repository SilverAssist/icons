import React from "react";

/**
 * Icons52 icon component
 * Icons52
 */
export default function Icons52SVG(props: React.ComponentProps<"svg">) {
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
      <g clipPath="url(#clip0_133_224)">
        <path
          d="M25.0013 5.99976H8V42.5282C8 43.6659 9.25637 44.3721 10.2474 43.7917L25.0013 35.1399L39.7552 43.7917C40.7462 44.3721 42.0026 43.6685 42.0026 42.5282V5.99976H25.0013ZM31.2415 29.8136L25.0013 26.5753L18.7611 29.8136L19.9524 22.9543L14.9035 18.0955L21.8799 17.0939L24.9987 10.8534L28.1175 17.0939L35.0939 18.0955L30.045 22.9543L31.2363 29.8136H31.2415Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_133_224">
          <rect width="34" height="38" fill="white" transform="translate(8 5.99976)" />
        </clipPath>
      </defs>
    </svg>
  );
}
