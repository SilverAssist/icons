import React from "react";

/**
 * Email icon component
 * email
 */
export function EmailSVG(props: React.ComponentProps<"svg">) {
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
      <path
        d="M45 8.99976H6V39.9998H45V8.99976ZM41.1 16.7498L25.5 26.4373L9.9 16.7498V12.8748L25.5 22.5623L41.1 12.8748V16.7498Z"
        fill={fill}
      />
    </svg>
  );
}
