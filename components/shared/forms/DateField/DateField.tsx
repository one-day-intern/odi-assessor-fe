import React, { useId } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

import styles from "./DateField.module.css";

const DateField = ({
  onChange,
  error,
  label,
  reference,
  maxDate,
  minDate,
  date
}: DateFieldProps) => {
  const inputId = useId();

  return (
    <div className={styles["form__control"]}>
      <label className={styles["form__label"]} htmlFor={inputId}>
        {label}
      </label>
      <Flatpickr
        id={inputId}
        options={{
          altInput: true,
          altFormat: "F j, Y",
          minDate: minDate,
          maxDate: maxDate,
        }}
        onChange={onChange}
        data-testid="inputField"
        ref={reference}
        defaultValue={date}

      />
      <div className={styles["form__error"]}>{error ?? ""}</div>
    </div>
  );
};

export { DateField };
