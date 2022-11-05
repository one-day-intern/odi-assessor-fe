import React from "react";

const AddIcon = ({ width, height, color }: ApplicationIconProps) => {
  return (
    <svg
      width={width ?? 22}
      height={ height ?? 22 }
      viewBox="0 0 22 22"
      fill={color ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 7V15M7 11H15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddIcon;
