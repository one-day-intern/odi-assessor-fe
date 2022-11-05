import React from "react";
import Select from "react-select";
import styles from "./SelectField.module.css";

interface SelectFieldProps<T> {
  choices: T[];
  onChange?: (option: T | null) => void;
  label?: string;
  error?: string;
  defaultValue?: T 
}

function SelectField<T>({
  choices,
  onChange,
  label,
  error,
  defaultValue
}: SelectFieldProps<T>) {
  return (
    <div className={styles["form__control"]} data-testid="select">
      <label className={styles["form__label"]}>{label}</label>
      <Select options={choices} onChange={onChange} defaultValue={defaultValue}/>
      <div className={styles["form__error"]}>{error ?? ""}</div>
    </div>
  );
}

export default SelectField;
