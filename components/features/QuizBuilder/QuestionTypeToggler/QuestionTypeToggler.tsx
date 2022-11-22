import React from "react";


interface Props {
  onToggle: (type: "mcq" | "essay") => void;
  currentType: "mcq" | "essay";
}

const QuestionTypeToggler: React.FC<Props> = ({ onToggle, currentType }) => {
  return <></>
};

export default QuestionTypeToggler;
