import React, { ChangeEventHandler, Ref, useId, forwardRef } from "react";
import { motion } from "framer-motion";

import styles from "./TimeField.module.css";

interface TimeFieldProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  min?: string;
  error?: string;
  disabled?: boolean;
}

const TimeField = forwardRef(
  (
    { label, value, onChange, error, min, disabled }: TimeFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const inputId = useId();

    return (
      <div className={styles["form__control"]}>
        <label className={styles["form__label"]} htmlFor={inputId}>
          {label}
        </label>
        <motion.input
          whileFocus={{
            boxShadow: "0px 0px 0px 2px #9076C0",
          }}
          ref={ref}
          id={inputId}
          data-testid="timeField"
          type="time"
          className={styles["form__input-text"]}
          value={value}
          onChange={onChange}
          min={min}
          disabled={disabled ?? false}
        />
        <div className={styles["form__error"]}>{error ?? ""}</div>
      </div>
    );
  }
);

TimeField.displayName = "TimeField";

export { TimeField };
