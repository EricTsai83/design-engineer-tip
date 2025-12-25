import React, { useState, useRef, useEffect } from "react";

type MenuItem = {
  label: string;
  action: () => void;
};

const menuItems: MenuItem[] = [
  { label: "編輯", action: () => console.log("編輯") },
  { label: "複製", action: () => console.log("複製") },
  { label: "刪除", action: () => console.log("刪除") },
];

type DropdownMenuProps = {
  duration: "slow" | "fast";
};

export default function DropdownMenu({ duration }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const durationClass = duration === "slow" ? "duration-400" : "duration-180";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleItemClick(action: () => void) {
    action();
    setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent, action?: () => void) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action ? handleItemClick(action) : handleToggle();
    }
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className={`
          flex items-center gap-2 px-4 py-2.5
          bg-zinc-900 text-white text-sm font-medium
          rounded-lg shadow-sm
          hover:bg-zinc-800 active:scale-[0.98]
          transition-all ${durationClass}
          focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2
        `}
        onClick={handleToggle}
        onKeyDown={(e) => handleKeyDown(e)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        選單
        <svg
          className={`w-4 h-4 transition-transform ${durationClass} ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`
          absolute right-0 mt-2 w-44
          bg-white rounded-xl shadow-xl border border-zinc-100
          overflow-hidden z-50
          origin-top transition-all ${durationClass}
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
        role="menu"
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`
              w-full text-left px-4 py-2.5
              text-sm text-zinc-700
              hover:bg-zinc-50 hover:text-zinc-900
              transition-colors ${durationClass}
              focus:outline-none focus:bg-zinc-100
            `}
            onClick={() => handleItemClick(item.action)}
            onKeyDown={(e) => handleKeyDown(e, item.action)}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
