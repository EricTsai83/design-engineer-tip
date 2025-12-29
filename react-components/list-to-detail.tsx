"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../hooks/use-outside-click";

export default function ListToDetail() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="w-[320px] h-[500px]">
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {active && typeof active === "object" && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 w-full z-10"
                  style={{ transform: "none" }}
                />
                <div
                  className="fixed inset-0 grid place-items-center z-[100]"
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
                    className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </motion.button>
                  <motion.div
                    layoutId={`card-${active.title}-${id}`}
                    ref={ref}
                    className="w-full max-w-[500px] h-fit max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden"
                  >
                    <motion.div layoutId={`image-${active.title}-${id}`}>
                      <img
                        width={200}
                        height={200}
                        src={active.src}
                        alt={active.title}
                        className="w-full h-80 rounded-tr-lg rounded-tl-lg object-cover object-top"
                      />
                    </motion.div>

                    <div>
                      <div className="flex justify-between items-start p-4">
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

                        <motion.a
                          layoutId={`button-${active.title}-${id}`}
                          href={active.ctaLink}
                          target="_blank"
                          className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                        >
                          {active.ctaText}
                        </motion.a>
                      </div>
                      <div className="pt-4 relative px-4">
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-neutral-600 text-sm h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
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
          </AnimatePresence>,
          document.body,
        )}
      <ul className="max-w-xl mx-auto w-full gap-1.5">
        {cards.map((card, index) => (
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

export const CloseIcon = () => {
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

const cards = [
  {
    description: "台灣東部海岸",
    title: "太魯閣國家公園",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ctaText: "查看詳情",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          太魯閣國家公園位於台灣東部，以壯麗的峽谷景觀聞名於世。公園內有高聳的懸崖峭壁、清澈的溪流和豐富的生態系統。其中最著名的景點包括長春祠、燕子口和九曲洞，每一處都展現了大自然鬼斧神工的傑作。這裡不僅是登山健行的絕佳地點，更是攝影愛好者的天堂，四季皆有不同的美景等待探索。
        </p>
      );
    },
  },
  {
    description: "日本關西地區",
    title: "京都清水寺",
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    ctaText: "查看詳情",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          清水寺是京都最古老的寺院之一，建於西元778年，被列為世界文化遺產。寺廟依山而建，主殿採用傳統的懸造結構，未使用一根釘子，展現了古代建築工藝的精湛。春季時櫻花盛開，秋季時楓葉轉紅，四季都有不同的風情。站在清水舞台俯瞰京都全景，感受千年古都的歷史底蘊與文化魅力。
        </p>
      );
    },
  },
  {
    description: "歐洲阿爾卑斯山",
    title: "瑞士馬特洪峰",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop",
    ctaText: "查看詳情",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          馬特洪峰是瑞士最著名的山峰之一，海拔4,478公尺，以其獨特的三角錐形狀成為阿爾卑斯山的象徵。這座山峰不僅是登山者的挑戰目標，更是攝影師和遊客的朝聖地。周邊的策馬特小鎮保留了傳統的瑞士風情，乘坐纜車可以欣賞到壯麗的冰川和雪峰景觀。無論是夏季的綠意盎然還是冬季的銀裝素裹，都令人嘆為觀止。
        </p>
      );
    },
  },
  {
    description: "中國西南地區",
    title: "九寨溝風景區",
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    ctaText: "查看詳情",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          九寨溝位於四川省，以多層瀑布、彩池和原始森林而聞名，被譽為「人間仙境」。這裡的水質清澈見底，呈現出夢幻般的藍綠色，倒映著周圍的雪山和森林，形成如詩如畫的美景。每個季節都有不同的風貌，春季山花爛漫，夏季綠意盎然，秋季層林盡染，冬季銀裝素裹。這片自然保護區不僅是視覺的饗宴，更是心靈的洗滌。
        </p>
      );
    },
  },
];
