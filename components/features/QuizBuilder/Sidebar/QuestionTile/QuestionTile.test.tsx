import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import QuestionTile from "./QuestionTile";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { render } from "@testing-library/react";

describe("QuestionTile component test suite", () => {
  test("test render component", () => {
    const items = [{ id: "1", content: "hello" }];
    render(
      <DndContext collisionDetection={closestCenter}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, i) => (
            <QuestionTile
              key={item.id}
              id={item.id}
              isCurrentQuestion={false}
              questionNumber={i + 1}
            />
          ))}
        </SortableContext>
      </DndContext>
    );
  });
  test("test is current question", () => {
    const items = [{ id: "1", content: "hello" }];
    const { getByTestId } = render(
      <DndContext collisionDetection={closestCenter}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, i) => (
            <QuestionTile
              key={item.id}
              id={item.id}
              isCurrentQuestion={true}
              questionNumber={i + 1}
            />
          ))}
        </SortableContext>
      </DndContext>
    );
    const tile = getByTestId("QuestionTile-1");
    expect(tile.classList).toContain("question-active");
  });
});
