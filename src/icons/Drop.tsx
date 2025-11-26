import React from "react";

/**
 * Drop icon component
 * Drop
 */
export default function DropSVG(props: React.ComponentProps<"svg">) {
  const { width = 100, height = 100, fill = "#E3F7FB", stroke = "#3F3F3F" } = props;
  return (
    <svg
      width={width}
      height={height}
      {...props}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38.8635 67.1509L54.4411 51.5724L66.125 63.2553L59.3394 70.0441L90.1307 76.3544L83.8201 45.5624L77.0298 52.3502L54.443 29.7619L38.8617 45.3391L20.1695 26.6455L9.26361 37.5508L38.8635 67.1509Z"
        fill={fill}
      />
      <path
        d="M38.8632 69.2724L54.4399 53.6933L64.0035 63.2559L56.3089 70.954L92.057 78.2805L84.7298 42.532L77.0288 50.2289L54.4432 27.6407L38.862 43.2179L20.17 24.5242L7.14251 37.5508L38.8632 69.2724ZM20.1681 28.7659L38.8613 47.4603L54.4414 31.8824L77.0293 54.4719L82.9094 48.5935L88.2042 74.4286L62.3686 69.1342L68.2465 63.2553L54.4406 49.451L38.8636 65.029L11.3837 37.5508L20.1681 28.7659Z"
        fill={stroke}
      />
    </svg>
  );
}
