import React from "react";
import styles from "./Sidebar.module.css";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import QuestionTile from "./QuestionTile";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { motion } from "framer-motion";

interface Props {
  builder: QuizBuilderHook;
  onSave: () => void;
}

const Sidebar: React.FC<Props> = ({ builder, onSave }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      builder.meta.setQuestions((questions) => {
        const activeIndex = questions.findIndex(
          (question) => question.id === active.id
        );
        const overIndex = questions.findIndex(
          (question) => question.id === over?.id
        );
        return arrayMove(questions, activeIndex, overIndex);
      });
    }
  };
  const handleDragStart = (event: DragEndEvent) => {
    const { active } = event;
    builder.controller.setCurrentQuestion(active.id as string);
  };

  const emptyQuiz = builder.questions.length === 0;

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <motion.aside
        data-testid="BuilderSidebar"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className={styles["builder-sidebar"]}
      >
        <div className={styles["question-list"]}>
          {!builder.questions.length && (
            <p style={{ textAlign: "center", margin: "auto" }}>
              Click the button below to start building your quiz!
            </p>
          )}
          <SortableContext
            items={builder.questions}
            strategy={verticalListSortingStrategy}
          >
            {builder.questions.map((question, i) => (
              <QuestionTile
                key={question.id}
                id={question.id}
                questionNumber={i + 1}
                isCurrentQuestion={builder.currentQuestion === question}
                onClick={() =>
                  builder.controller.setCurrentQuestion(question.id)
                }
                onDelete={(e) => {
                  e.stopPropagation();
                  builder.removeQuestion(question.id);
                }}
              />
            ))}
          </SortableContext>
        </div>
        <motion.button
          id="BuilderAddQuestion"
          whileTap={{ scale: 0.9 }}
          onClick={() => builder.addQuestion()}
          className={styles["question-add"]}
        >
          + Add Question
        </motion.button>
        <motion.button
          id="BuilderSave"
          whileTap={emptyQuiz ? undefined : { scale: 0.9 }}
          onClick={() => onSave()}
          disabled={emptyQuiz}
          className={`${styles["question-add"]}${
            emptyQuiz ? " " + styles.disabled : ""
          }`}
          style={{ background: "var(--secondary)" }}
        >
          Save
        </motion.button>
      </motion.aside>
    </DndContext>
  );
};

export default Sidebar;
