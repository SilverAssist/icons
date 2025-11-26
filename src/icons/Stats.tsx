import React from 'react';

/**
 * Stats icon component
 * stats
 */
export default function StatsSVG(props: React.ComponentProps<"svg">) {
  const { width = 50, height = 50, fill = "#E3F7FB", stroke = "#3F3F3F" } = props;
  return (
    <svg
      width={width}
      height={height}
      {...props}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_133_132)">
      <path d="M31.1275 4.99976H19.5643L17.729 11.3225H32.9621L31.1275 4.99976Z" fill="#003073"/>
      <path d="M36.7553 7.62891H33.1462L34.5529 12.5738H16.0772L17.4839 7.62891H13.8749C12.285 7.62891 11 8.94311 11 10.5714V42.058C11 43.6856 12.285 44.9998 13.8749 44.9998H36.6944C38.285 44.9998 39.5693 43.6849 39.5693 42.058V10.5714C39.6309 8.94383 38.3458 7.62962 36.7553 7.62962V7.62891ZM18.1579 39.7422H15.5885V32.6683H18.1579V39.7422ZM23.786 39.7422H21.2167V29.1005H23.786V39.7422ZM29.4142 39.7422H26.8448V25.595H29.4142V39.7422ZM35.0423 39.7422H32.473V22.0272H35.0423V39.7422Z" fill="#003073"/>
      </g>
      <defs>
      <clipPath id="clip0_133_132">
      <rect width="28.5714" height="40" fill="white" transform="translate(11 4.99976)"/>
      </clipPath>
      </defs>
    </svg>
  );
}
