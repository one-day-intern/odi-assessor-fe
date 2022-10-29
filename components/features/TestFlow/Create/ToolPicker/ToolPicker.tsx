import React from "react";
import Select from "react-select"

import styles from "./ToolPicker.module.css";

interface ToolPickerProps {
    onChange: (option: AssignmentOption | null) => void
    options: AssignmentOption[];
}

const ToolPicker = ({ onChange, options }: ToolPickerProps) => {
  return (
    <div data-testid="toolpicker" className={styles["tool"]}>
      <p className={styles["tool__label"]}>Assessment Tool</p>
      <Select onChange={onChange} options={options}/>
    </div>
  );
};

export default ToolPicker;
