
import React from "react";
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
  return <></>
};

export default MultipleChoice;
