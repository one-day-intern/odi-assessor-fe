import SearchIcon from "@components/shared/svg/SearchIcon";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import styles from "./FormSearch.module.css";

interface FormSearchProps<T> {
  searchResults?: T[];
  value: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

const focusVariant = {
  focus: {
    boxShadow: "0px 0px 0px 2px #9076C0",
  },
  blur: {
    boxShadow: "1px 1px 1px 1px rgba(255,255,255,0.01)",
  },
};

function FormSearch<T>({
  onSubmit,
  searchResults,
  value,
  onInputChange,
}: FormSearchProps<T>): JSX.Element {
  const searchFormRef = useRef<HTMLFormElement>(null);
  const [focus, setFocus] = useState(false);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit!(e);
  };

  return (
    <motion.form
      className={styles["search-bar"]}
      onSubmit={handleSubmit}
      ref={searchFormRef}
      variants={focusVariant}
      animate={focus ? "focus" : "blur"}
      data-testid="formField"
    >
      <button className={styles["search-bar__button"]}>
        <SearchIcon width={15} height={15} />
      </button>
      <input
        type="text"
        value={value}
        onChange={onInputChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={styles["search-bar__input"]}
        data-testid="inputField"
      />
    </motion.form>
  );
}

export default FormSearch;
