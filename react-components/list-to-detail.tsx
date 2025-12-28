import React, { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

type AppItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const apps: AppItem[] = [
  {
    id: "1",
    title: "The Oddysey",
    subtitle: "Explore unknown galaxies.",
    description:
      "Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.",
    image: "https://picsum.photos/seed/space/200",
  },
  {
    id: "2",
    title: "Angry Rabbits",
    subtitle: "They are coming for you.",
    description:
      "Defend your garden from waves of furious rabbits! Build towers, set traps, and use special abilities to protect your precious carrots.",
    image: "https://picsum.photos/seed/rabbit/200",
  },
  {
    id: "3",
    title: "Ghost town",
    subtitle: "Scarry ghosts.",
    description:
      "Explore an abandoned town filled with supernatural mysteries. Solve puzzles, uncover the dark history, and survive the night.",
    image: "https://picsum.photos/seed/ghost/200",
  },
  {
    id: "4",
    title: "Pirates in the jungle",
    subtitle: "Find the treasure.",
    description:
      "Navigate through dangerous jungles, fight rival pirates, and discover hidden treasures in this epic adventure game.",
    image: "https://picsum.photos/seed/pirate/200",
  },
];

type ModalState = {
  app: AppItem;
  rect: DOMRect;
} | null;

function AppStoreList() {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  function handleItemClick(app: AppItem, element: HTMLDivElement) {
    const rect = element.getBoundingClientRect();
    setModalState({ app, rect });
    // 觸發進入動畫
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  }

  function handleClose() {
    setIsAnimating(false);
    // 等動畫結束後清除 modal
    setTimeout(() => {
      setModalState(null);
    }, 300);
  }

  function handleKeyDown(
    e: React.KeyboardEvent,
    app: AppItem,
    element: HTMLDivElement,
  ) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleItemClick(app, element);
    }
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-white rounded-2xl divide-y divide-gray-100 shadow-sm overflow-hidden">
        {apps.map((app) => (
          <div
            key={app.id}
            ref={(el) => {
              if (el) itemRefs.current.set(app.id, el);
            }}
            role="button"
            tabIndex={0}
            aria-label={`查看 ${app.title} 詳情`}
            onClick={(e) => handleItemClick(app, e.currentTarget)}
            onKeyDown={(e) => handleKeyDown(e, app, e.currentTarget)}
            className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
              modalState?.app.id === app.id ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={app.image}
              alt={app.title}
              className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex flex-col">
              <div className="font-semibold text-gray-900 truncate text-sm">
                {app.title}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {app.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Portal */}
      {modalState &&
        createPortal(
          <ExpandedModal
            app={modalState.app}
            initialRect={modalState.rect}
            isAnimating={isAnimating}
            onClose={handleClose}
          />,
          document.body,
        )}
    </div>
  );
}

type ExpandedModalProps = {
  app: AppItem;
  initialRect: DOMRect;
  isAnimating: boolean;
  onClose: () => void;
};

function ExpandedModal({
  app,
  initialRect,
  isAnimating,
  onClose,
}: ExpandedModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 計算初始位置的 transform
  const getInitialTransform = () => {
    const modalWidth = Math.min(500, window.innerWidth - 32);
    const modalHeight = 400;
    const finalX = (window.innerWidth - modalWidth) / 2;
    const finalY = (window.innerHeight - modalHeight) / 2;

    const scaleX = initialRect.width / modalWidth;
    const scaleY = initialRect.height / modalHeight;
    const translateX = initialRect.left - finalX;
    const translateY = initialRect.top - finalY;

    return {
      translateX,
      translateY,
      scaleX,
      scaleY,
      modalWidth,
      modalHeight,
      finalX,
      finalY,
    };
  };

  const { translateX, translateY, scaleX, scaleY, modalWidth, finalX, finalY } =
    getInitialTransform();

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  // Focus modal on mount
  useLayoutEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${app.title} 詳情`}
        tabIndex={-1}
        className="absolute bg-white rounded-2xl shadow-2xl overflow-hidden outline-none"
        style={{
          width: modalWidth,
          left: finalX,
          top: finalY,
          transformOrigin: "top left",
          transition:
            "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms",
          transform: isAnimating
            ? "translate(0, 0) scale(1)"
            : `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
          opacity: isAnimating ? 1 : 0.8,
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-100">
          <img
            src={app.image}
            alt={app.title}
            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-lg">{app.title}</p>
            <p className="text-sm text-gray-500">{app.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            {app.description}
          </p>
        </div>

        {/* Close Button */}
        <div
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="關閉"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClose();
            }
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <div className="text-gray-600 text-lg leading-none">×</div>
        </div>
      </div>
    </div>
  );
}

export default AppStoreList;
