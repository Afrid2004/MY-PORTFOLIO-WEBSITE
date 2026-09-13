"use client";

import React from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

const ReorderList = ({
  items,
  getId = (item) => item._id,
  onReorder,
  children,
}) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex((item) => getId(item) === active.id);

    const newIndex = items.findIndex((item) => getId(item) === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedItems = arrayMove(items, oldIndex, newIndex);

    onReorder(reorderedItems);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem key={getId(item)} id={getId(item)}>
            {(sortableProps) => children(item, sortableProps)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ReorderList;
