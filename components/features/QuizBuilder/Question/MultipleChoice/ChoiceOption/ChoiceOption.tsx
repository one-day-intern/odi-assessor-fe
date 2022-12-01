import React, { useState } from "react";
import styles from "./ChoiceOption.module.css";
import { motion } from "framer-motion";
import EditIcon from "@components/shared/svg/EditIcon";

interface Props {
  option: MultipleChoiceQuestionOption;
  isPreview?: boolean;
  onEditOption?: (option: MultipleChoiceQuestionOption) => void;
  onRemoveOption?: (option: MultipleChoiceQuestionOption) => void;
}

const ChoiceOption: React.FC<Props> = ({
  isPreview,
  option,
  onEditOption,
  onRemoveOption,
}) => {
  const [editing, setEditing] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onEditOption && onEditOption({ ...option, content: e.currentTarget.value });
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onEditOption && onEditOption({ ...option, correct: true });
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.relatedTarget?.id !== `edit-button-${option.id}`) {
      setEditing(false);
    }
  };

  return (
    <div className={styles["choice-option_container"]}>
      <motion.button
        data-testid={`ChoiceOption-${option.id}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        disabled={editing || isPreview}
        className={`${styles["choice-option"]}${
          editing ? " " + styles.editing : ""
        }${option.correct ? " " + styles.correct : ""}${
          isPreview ? " " + styles.preview : ""
        }`}
        onClick={handleClick}
      >
        <div className={styles["choice-option_indicator"]}>
          <div className={styles["choice-option_indicator-inner"]} />
        </div>
        {editing && (
          <input
            data-testid="EditChoiceInput"
            className={styles["choice-option_input"]}
            value={option.content ?? ""}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        )}
        {!editing && (
          <div className={styles["choice-option_value"]}>
            {option.content || "empty option.."}
          </div>
        )}
        {!isPreview && (
          <div
            tabIndex={1}
            data-testid={`EditButton-${option.id}`}
            id={`edit-button-${option.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setEditing(!editing);
            }}
            className={`${styles["choice-option_edit"]}${
              editing ? " " + styles["editing"] : ""
            }`}
          >
            <EditIcon color="currentColor" />
          </div>
        )}
      </motion.button>
      {!isPreview && (
        <div className={styles["choice-option_delete"]}>
          <button
            data-testid="RemoveChoiceOption"
            onClick={() => onRemoveOption && onRemoveOption(option)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ChoiceOption;
