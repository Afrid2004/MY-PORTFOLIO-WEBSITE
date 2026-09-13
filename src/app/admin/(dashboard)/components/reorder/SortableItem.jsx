"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMenu } from "react-icons/fi";

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-grab items-center justify-center rounded-lg text-base-content/25 transition-colors hover:bg-base-content/5 hover:text-base-content/60 active:cursor-grabbing sm:left-2"
        title="Drag to reorder"
      >
        <FiMenu size={16} />
      </button>

      {/* Skill Row */}
      <div className="pl-9 sm:pl-11">{children}</div>
    </div>
  );
};

export default SortableItem;
