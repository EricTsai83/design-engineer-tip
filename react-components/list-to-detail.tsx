"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../hooks/use-outside-click";

type Card = {
  readonly description: string;
  readonly title: string;
  readonly src: string;
  readonly ctaText: string;
  readonly content: (() => React.ReactNode) | React.ReactNode;
};

type ListToDetailMode = "animated" | "static";

type ListToDetailWrapperProps = {
  readonly mode?: ListToDetailMode;
};

/**
 * 父組件，通過 mode props 控制顯示有動畫版本還是無動畫版本
 */
export default function ListToDetailWrapper({
  mode = "animated",
}: ListToDetailWrapperProps) {
  if (mode === "animated") {
    return <ListToDetailWithAnimation />;
  }
  return <ListToDetailNoAnimation />;
}

/**
 * 有動畫版本的 ListToDetail 組件
 */
function ListToDetailWithAnimation() {
  const [active, setActive] = useState<Card | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="w-[320px] h-[280px] relative overflow-hidden">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 z-10 rounded-lg"
              style={{ transform: "none" }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center z-[100] overflow-hidden"
              style={{ transform: "none" }}
            >
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6 z-[101]"
                onClick={() => setActive(null)}
              >
                <CloseIconAnimated />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              >
                <motion.div
                  layoutId={`image-${active.title}-${id}`}
                  style={{ height: "100px", flexShrink: 0 }}
                >
                  <img
                    width={200}
                    height={200}
                    src={active.src}
                    alt={active.title}
                    className="w-full h-full rounded-tr-lg rounded-tl-lg object-cover object-top"
                  />
                </motion.div>

                <div className="flex flex-col flex-1 min-h-0">
                  <div className="flex justify-between items-start p-4 flex-shrink-0">
                    <div className="">
                      <motion.div
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-neutral-700 dark:text-neutral-200"
                      >
                        {active.title}
                      </motion.div>
                      <motion.div
                        layoutId={`description-${active.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400"
                      >
                        {active.description}
                      </motion.div>
                    </div>

                    <motion.div
                      layoutId={`button-${active.title}-${id}`}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                    >
                      {active.ctaText}
                    </motion.div>
                  </div>
                  <div className="pt-4 relative px-4 flex-1 min-h-0 overflow-hidden">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-sm h-full pb-10 flex flex-col items-start gap-4 overflow-y-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <ul className="max-w-xl mx-auto w-full gap-1.5">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-1.5 flex flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
          >
            <div className="flex gap-1.5 flex-row items-center">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-10 w-10 rounded-md object-cover object-top"
                />
              </motion.div>
              <div className="flex flex-col gap-1.5">
                <motion.div
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-sm leading-tight text-neutral-800 dark:text-neutral-200 text-left"
                >
                  {card.title}
                </motion.div>
                <motion.div
                  layoutId={`description-${card.description}-${id}`}
                  className="text-[12px] leading-tight text-neutral-600 dark:text-neutral-400 text-left"
                >
                  {card.description}
                </motion.div>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-2 py-1 text-[10px] rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-0 shrink-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

/**
 * 無動畫版本的 ListToDetail 組件
 */
function ListToDetailNoAnimation() {
  const [active, setActive] = useState<Card | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="w-[320px] h-[280px] relative overflow-hidden">
      {active && typeof active === "object" && (
        <>
          <div className="absolute inset-0 bg-black/20 z-10 rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center z-[100] overflow-hidden">
            <button
              className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6 z-[101]"
              onClick={() => setActive(null)}
            >
              <CloseIconStatic />
            </button>
            <div
              ref={ref}
              className="flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            >
              <div style={{ height: "100px", flexShrink: 0 }}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-full rounded-tr-lg rounded-tl-lg object-cover object-top"
                />
              </div>

              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex justify-between items-start p-4 flex-shrink-0">
                  <div className="">
                    <div className="font-bold text-neutral-700 dark:text-neutral-200">
                      {active.title}
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      {active.description}
                    </div>
                  </div>

                  <div
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </div>
                </div>
                <div className="pt-4 relative px-4 flex-1 min-h-0 overflow-hidden">
                  <div className="text-neutral-600 text-sm h-full pb-10 flex flex-col items-start gap-4 overflow-y-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ul className="max-w-xl mx-auto w-full gap-1.5">
        {cards.map((card) => (
          <div
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-1.5 flex flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
          >
            <div className="flex gap-1.5 flex-row items-center">
              <div>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-10 w-10 rounded-md object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="font-medium text-sm leading-tight text-neutral-800 dark:text-neutral-200 text-left">
                  {card.title}
                </div>
                <div className="text-[12px] leading-tight text-neutral-600 dark:text-neutral-400 text-left">
                  {card.description}
                </div>
              </div>
            </div>
            <button className="px-2 py-1 text-[10px] rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-0 shrink-0">
              {card.ctaText}
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

/**
 * 有動畫版本的關閉圖標
 */
export const CloseIconAnimated = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
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
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

/**
 * 無動畫版本的關閉圖標
 */
export const CloseIconStatic = () => {
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
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

/**
 * 為了向後兼容，保留原有的 CloseIcon 導出（指向動畫版本）
 */
export const CloseIcon = CloseIconAnimated;

const cards = [
  {
    description: "台灣東部海岸",
    title: "太魯閣國家公園",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ctaText: "查看詳情",
    content: () => {
      return (
        <div>
          太魯閣國家公園位於台灣東部，以壯麗的峽谷景觀聞名於世。公園內有高聳的懸崖峭壁、清澈的溪流和豐富的生態系統。
        </div>
      );
    },
  },
  {
    description: "日本關西地區",
    title: "京都清水寺",
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    ctaText: "查看詳情",
    content: () => {
      return (
        <div>
          清水寺是京都最古老的寺院之一，建於西元778年，被列為世界文化遺產。寺廟依山而建，主殿採用傳統的懸造結構，未使用一根釘子，展現了古代建築工藝的精湛。
        </div>
      );
    },
  },
  {
    description: "歐洲阿爾卑斯山",
    title: "瑞士馬特洪峰",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop",
    ctaText: "查看詳情",
    content: () => {
      return (
        <div>
          馬特洪峰是瑞士最著名的山峰之一，以其獨特的形狀成為阿爾卑斯山的象徵。這座山峰不僅是登山者的挑戰目標，更是遊客的朝聖地。
        </div>
      );
    },
  },
  {
    description: "中國西南地區",
    title: "九寨溝風景區",
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    ctaText: "查看詳情",
    content: () => {
      return (
        <div>
          九寨溝位於四川省，以多層瀑布、彩池和原始森林而聞名，被譽為「人間仙境」。這裡的水質清澈見底，倒映著周圍的雪山和森林，形成如詩如畫的美景。
        </div>
      );
    },
  },
  {
    description: "北歐冰島",
    title: "冰島藍湖溫泉",
    src: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
    ctaText: "查看詳情",
    content: () => {
      return (
        <div>
          藍湖溫泉是冰島最著名的地熱溫泉，位於雷克雅維克附近。溫泉的水呈現出夢幻的藍色，富含礦物質和矽藻，對皮膚有極佳的保養效果。
        </div>
      );
    },
  },
];
