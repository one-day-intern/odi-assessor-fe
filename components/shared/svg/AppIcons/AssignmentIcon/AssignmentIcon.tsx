import React from "react";

const AssignmentIcon = ({width, height} : ApplicationIconProps) => {
  return (
    <svg
      width={ width ?? 72 }
      height={ height ?? 88 }
      viewBox="0 0 72 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44 4H12C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12V76C4 78.1217 4.84285 80.1566 6.34315 81.6569C7.84344 83.1572 9.87827 84 12 84H60C62.1217 84 64.1566 83.1572 65.6569 81.6569C67.1571 80.1566 68 78.1217 68 76V28M44 4L68 28M44 4V28H68M52 48H20M52 64H20M28 32H20"
        stroke="#3D65D8"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AssignmentIcon;
