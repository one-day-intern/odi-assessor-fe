import React from "react";
import styles from "./QuestionTile.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";

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
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: id });

  return (
    <motion.button
      data-testid={`QuestionTile-${id}`}
      ref={setNodeRef}
      layoutId={String(id)}
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        x: transform?.x,
        y: transform?.y,
      }}
      transition={{
        duration: !isDragging ? 0.25 : 0,
        scale: {
          duration: 0.25,
        },
        easings: {
          type: "spring",
        },
      }}
      className={`${styles["question-tile"]}${
        isCurrentQuestion ? " " + styles["question-active"] : ""
      }`}
      onClick={onClick}
    >
      Question {questionNumber}
      <div {...attributes} {...listeners} className={styles["drag-handle"]}>
        <div className={styles["dot-group"]}>
          <div />
          <div />
        </div>
        <div className={styles["dot-group"]}>
          <div />
          <div />
        </div>
        <div className={styles["dot-group"]}>
          <div />
          <div />
        </div>
      </div>
      <div onClick={onDelete} className={styles["question-remove"]}>
        &times;
      </div>
    </motion.button>
  );
};

export default QuestionTile;
