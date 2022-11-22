import React from "react";

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
  return <></>
};

export default ChoiceOption;
