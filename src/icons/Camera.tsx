import React from "react";

/**
 * Camera icon component
 * Camera
 */
export default function CameraSVG(props: React.ComponentProps<"svg">) {
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
      <g clipPath="url(#clip0_133_201)">
        <path
          d="M21.4994 7.99976C19.9428 7.99976 18.5961 8.68904 17.6983 9.6667C16.8006 10.6444 16.2648 11.8612 15.9462 13.1131L15.5118 14.8012H8.19928C5.89691 14.8012 4 16.6439 4 18.8806V37.9273C4 40.164 5.89691 42.0068 8.19928 42.0068H41.7935C44.0958 42.0068 46 40.164 46 37.9273V18.8736C46 16.6369 44.0958 14.7941 41.7935 14.7941H34.4882L34.0538 13.1061C33.7352 11.8612 33.1994 10.6373 32.3017 9.65966C31.3967 8.68904 30.05 7.99976 28.4934 7.99976H21.4922H21.4994ZM25.0036 19.9849C29.9848 19.9849 34.0465 23.9307 34.0465 28.7697C34.0465 33.6088 29.9848 37.5546 25.0036 37.5546C20.0224 37.5546 15.9535 33.6088 15.9535 28.7697C15.9535 23.9307 20.0224 19.9849 25.0036 19.9849Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_133_201">
          <rect width="42" height="34" fill="white" transform="translate(4 7.99976)" />
        </clipPath>
      </defs>
    </svg>
  );
}
