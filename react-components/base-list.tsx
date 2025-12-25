import React, { useState } from "react";
import { DeleteIcon, ResetIcon } from "./icons.tsx";

export type ListItem = {
  readonly id: number;
  readonly text: string;
};

type BaseListProps = {
  readonly title: string;
  readonly getListItemClassName: (index: number) => string;
  readonly getDeleteButtonClassName: () => string;
  readonly useTransitionDelay?: boolean;
};

export const initialItems: ListItem[] = [
  { id: 1, text: "item 1" },
  { id: 2, text: "item 2" },
  { id: 3, text: "item 3" },
  { id: 4, text: "item 4" },
];

export function BaseList({
  title,
  getListItemClassName,
  getDeleteButtonClassName,
  useTransitionDelay = false,
}: BaseListProps) {
  const [items, setItems] = useState<ListItem[]>(initialItems);

  function handleDelete(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleDeleteKeyDown(e: React.KeyboardEvent, id: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDelete(id);
    }
  }

  function handleReset() {
    setItems(initialItems);
  }

  return (
    <div className="flex flex-col items-end py-3">
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">{title}</p>
        <button
          type="button"
          onClick={handleReset}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
          aria-label="重置列表"
          tabIndex={0}
        >
          <ResetIcon />
        </button>
      </div>
      <ul className="space-y-2" role="list">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={getListItemClassName(index)}
            style={
              useTransitionDelay
                ? { transitionDelay: `${index * 20}ms` }
                : undefined
            }
          >
            <span className="font-medium tracking-wide px-2">{item.text}</span>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              onKeyDown={(e) => handleDeleteKeyDown(e, item.id)}
              className={getDeleteButtonClassName()}
              aria-label={`刪除 ${item.text}`}
              tabIndex={0}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="py-8 text-center text-gray-400">列表已清空</li>
        )}
      </ul>
    </div>
  );
}
