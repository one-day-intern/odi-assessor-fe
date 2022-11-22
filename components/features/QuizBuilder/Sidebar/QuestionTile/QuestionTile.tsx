import React from "react";

interface Props {
  id: string;
  isCurrentQuestion: boolean;
  questionNumber: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLDivElement>;
}

const QuestionTile: React.FC<Props> = ({
  onClick,
  onDelete,
  id,
  questionNumber,
  isCurrentQuestion,
}) => {
  return <></>
};

export default QuestionTile;
