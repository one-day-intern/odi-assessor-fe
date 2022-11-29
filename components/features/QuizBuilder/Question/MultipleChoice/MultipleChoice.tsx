import { Button } from "@components/shared/elements/Button";
import React from "react";
import ChoiceOption from "./ChoiceOption";
import styles from "./MultipleChoice.module.css";

const buttonStyles: React.CSSProperties = {
  color: "var(--primary)",
  background: "transparent",
  fontWeight: "bold",
  border: "2px solid currentColor",
  fontSize: "1.4rem",
  margin: 0,
};

interface Props {
  isPreview?: boolean;
  options: MultipleChoiceQuestionOption[];
  onAddOption?: () => void;
  onEditOption?: (option: MultipleChoiceQuestionOption) => void;
  onRemoveOption?: (option: MultipleChoiceQuestionOption) => void;
}

const MultipleChoice: React.FC<Props> = ({
  isPreview,
  options,
  onAddOption,
  onEditOption,
  onRemoveOption,
}) => {
  const noOptionsDuringPreview = isPreview && options.length === 0;
  return (
    <div className={styles["multiple-choice_container"]}>
      {options.map((option) => (
        <ChoiceOption
          key={option.id}
          isPreview={isPreview}
          option={option}
          onEditOption={onEditOption}
          onRemoveOption={onRemoveOption}
        />
      ))}
      {!isPreview && (
        <Button onClick={onAddOption} style={buttonStyles}>
          + Add Option
        </Button>
      )}
      {noOptionsDuringPreview && "-"}
    </div>
  );
};

export default MultipleChoice;
