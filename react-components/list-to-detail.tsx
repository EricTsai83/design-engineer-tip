"use client";

import React, { useEffect, useId, useRef, useState, useCallback } from "react";

type Card = {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
};

type CardRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type ListToDetailProps = {
  mode?: "animated" | "instant";
};

export default function ListToDetail({ mode = "animated" }: ListToDetailProps) {
  const [active, setActive] = useState<Card | null>(null);
  const [animationState, setAnimationState] = useState<
    "idle" | "expanding" | "expanded" | "collapsing"
  >("idle");
  const [flipStyles, setFlipStyles] = useState<React.CSSProperties>({});
  const [hiddenCardTitle, setHiddenCardTitle] = useState<string | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const startRect = useRef<CardRect | null>(null);
  const id = useId();

  // 取得卡片的 ref
  const setCardRef = useCallback((title: string, el: HTMLLIElement | null) => {
    if (el) {
      cardRefs.current.set(title, el);
    } else {
      cardRefs.current.delete(title);
    }
  }, []);

  // FLIP 動畫：展開
  function handleCardClick(card: Card) {
    if (mode === "instant") {
      // 無動畫模式：直接顯示 modal
      setActive(card);
      setAnimationState("expanded");
      return;
    }

    const cardEl = cardRefs.current.get(card.title);
    if (!cardEl) return;

    // First: 記錄起始位置
    const rect = cardEl.getBoundingClientRect();
    startRect.current = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };

    setIsExpanding(true);
    setHiddenCardTitle(card.title);
    setActive(card);
    setAnimationState("expanding");
  }

  // 展開動畫：計算 FLIP
  useEffect(() => {
    if (
      mode === "instant" ||
      animationState !== "expanding" ||
      !modalRef.current ||
      !startRect.current
    )
      return;

    const modalEl = modalRef.current;
    const first = startRect.current;

    // 先讓 modal 顯示並定位，然後再計算
    // 使用多個 requestAnimationFrame 確保 DOM 已更新
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Last: 取得目標位置（使用 viewport 座標）
        const last = modalEl.getBoundingClientRect();

        // 計算目標位置（居中位置）
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const targetCenterX = viewportWidth / 2;
        const targetCenterY = viewportHeight / 2;

        // 計算卡片中心點
        const firstCenterX = first.left + first.width / 2;
        const firstCenterY = first.top + first.height / 2;

        // 計算 scale
        const scaleX = first.width / last.width;
        const scaleY = first.height / last.height;

        // 設定初始 transform（從 item 位置開始）
        // 直接使用 item 的中心點作為定位基準
        // 使用 top/left 定位到 item 中心，然後用 translate(-50%, -50%) 讓 modal 中心對齊
        setFlipStyles({
          top: `${firstCenterY}px`,
          left: `${firstCenterX}px`,
          transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
          transition: "none",
          willChange: "transform",
          transformOrigin: "center center",
        });

        // Play: 下一幀開始動畫
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 計算視窗中心點
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const targetCenterX = viewportWidth / 2;
            const targetCenterY = viewportHeight / 2;

            setFlipStyles({
              top: `${targetCenterY}px`,
              left: `${targetCenterX}px`,
              transform: "translate(-50%, -50%) scale(1, 1)",
              transition:
                "top 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform",
              transformOrigin: "center center",
            });
            setAnimationState("expanded");
            setIsExpanding(false);
          });
        });
      });
    });
  }, [animationState, mode]);

  // 關閉動畫：反向 FLIP
  function handleClose() {
    if (mode === "instant") {
      // 無動畫模式：直接關閉
      setActive(null);
      setAnimationState("idle");
      setFlipStyles({});
      startRect.current = null;
      setHiddenCardTitle(null);
      setIsExpanding(false);
      return;
    }

    if (!active || !modalRef.current || !startRect.current) {
      setActive(null);
      setAnimationState("idle");
      setHiddenCardTitle(null);
      setIsExpanding(false);
      return;
    }

    const modalEl = modalRef.current;
    const first = startRect.current;
    const last = modalEl.getBoundingClientRect();

    // 計算目標位置（居中位置）
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetCenterX = viewportWidth / 2;
    const targetCenterY = viewportHeight / 2;

    // 計算卡片中心點
    const firstCenterX = first.left + first.width / 2;
    const firstCenterY = first.top + first.height / 2;

    const scaleX = first.width / last.width;
    const scaleY = first.height / last.height;

    setAnimationState("collapsing");
    setFlipStyles({
      top: `${firstCenterY}px`,
      left: `${firstCenterX}px`,
      transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
      transition:
        "top 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      willChange: "transform",
      transformOrigin: "center center",
    });

    setTimeout(() => {
      setActive(null);
      setAnimationState("idle");
      setFlipStyles({});
      startRect.current = null;
      // 延遲清除 hiddenCardTitle，讓文字在 collapse 動畫完成後平滑浮出
      setTimeout(() => {
        setHiddenCardTitle(null);
      }, 50);
    }, 300);
  }

  // ESC 關閉 & body overflow
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  useOutsideClick(modalRef, handleClose);

  const isOpen =
    mode === "instant"
      ? active !== null
      : animationState === "expanding" || animationState === "expanded";
  const showBackdrop = active !== null;

  return (
    <>
      {/* 隔離樣式，避免 Slidev CSS 影響動畫 */}
      <style>{`
        [data-list-to-detail-modal] {
          isolation: isolate !important;
          contain: layout style paint !important;
        }
        [data-list-to-detail-modal] * {
          transform-box: border-box;
        }
      `}</style>

      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={`fixed inset-0 bg-black/20 h-full w-full z-10 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Expanded Card Modal */}
      {active && (
        <div
          data-list-to-detail-modal
          className="fixed inset-0 z-[100]"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            isolation: "isolate",
            contain: "layout style paint",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            className={`absolute top-2 right-2 lg:hidden flex items-center justify-center bg-white rounded-full h-6 w-6 z-10 transition-opacity duration-200 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
            aria-label="關閉"
          >
            <CloseIcon />
          </button>

          <div
            ref={modalRef}
            style={
              mode === "instant"
                ? {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }
                : {
                    ...flipStyles,
                    position: "absolute",
                    top: flipStyles.top ?? "50%",
                    left: flipStyles.left ?? "50%",
                  }
            }
            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
          >
            <div
              className={`transition-opacity duration-200 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-between items-start px-6 md:p-8">
                <div>
                  <div className="font-bold text-neutral-700 dark:text-neutral-200">
                    {active.title}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    {active.description}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-green-600 transition-colors duration-150"
                  aria-label="關閉"
                >
                  關閉
                </button>
              </div>

              <div className="pt-4 relative px-4">
                <div className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                  {active.content()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card List */}
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <li
            key={`card-${card.title}-${id}`}
            ref={(el) => setCardRef(card.title, el)}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(card)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick(card);
              }
            }}
            className={`p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-all duration-150 transition-opacity ${
              mode === "instant"
                ? "opacity-100"
                : isExpanding && hiddenCardTitle === card.title
                  ? "duration-100"
                  : "duration-300 ease-in-out"
            } ${mode === "instant" || hiddenCardTitle !== card.title ? "opacity-100" : "opacity-0"}`}
            aria-label={`展開 ${card.title}`}
          >
            <div className="flex gap-4 flex-col md:flex-row px-6 md:px-8">
              <div>
                <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left">
                  {card.title}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 text-center md:text-left">
                  {card.description}
                </div>
              </div>
            </div>
            <span className="px-3 py-1.5 text-xs rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0 transition-colors duration-150">
              {card.ctaText}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

const cards: Card[] = [
  {
    description: "NT$ 180",
    title: "紅燒牛肉麵",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "查看",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <div>
        經典台灣牛肉麵，選用優質牛腱肉，經過長時間慢火燉煮，肉質軟嫩入味。湯頭以中藥材和香料熬製，濃郁香醇。搭配手工拉麵，Q彈有嚼勁。配菜包括酸菜、蔥花和香菜，增添層次風味。
      </div>
    ),
  },
  {
    description: "NT$ 120",
    title: "小籠包",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "查看",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <div>
        手工現包小籠包，外皮薄透，內餡鮮美多汁。選用新鮮豬肉和特製高湯，每一口都充滿湯汁。搭配薑絲和黑醋，提升鮮味。建議趁熱食用，感受湯汁在口中爆開的滿足感。
      </div>
    ),
  },
  {
    description: "NT$ 150",
    title: "三杯雞",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "查看",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <div>
        傳統台菜經典，以一杯麻油、一杯米酒、一杯醬油調味而得名。選用新鮮雞腿肉，與九層塔、薑片、蒜頭一同爆炒，香氣四溢。雞肉鮮嫩多汁，醬汁濃郁下飯，是台灣人最愛的家常菜之一。
      </div>
    ),
  },
  {
    description: "NT$ 100",
    title: "蚵仔煎",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    ctaText: "查看",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <div>
        台灣夜市經典小吃，選用新鮮蚵仔，搭配雞蛋和地瓜粉漿煎製而成。外層酥脆，內層軟嫩，蚵仔鮮甜飽滿。淋上特製甜辣醬，風味更佳。是台灣最具代表性的街頭美食之一。
      </div>
    ),
  },
];
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function,
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
