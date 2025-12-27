import React, { useState, useEffect, useRef } from "react";

type CopyButtonProps = {
  readonly mode?: "none" | "opacity" | "opacity-blur";
  readonly duration?: number;
};

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-copy-icon lucide-copy"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-check-icon lucide-circle-check"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function CopyButton({
  mode = "none",
  duration = 240,
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1); // 1 = 正常速度（最快），只能调慢
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (isCopied) return;

    // 清除可能存在的重置定时器
    if (resetTimeoutRef.current !== null) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    setIsCopied(true);

    // mode === "none" 时，直接切换，没有动画
    if (mode === "none") {
      setAnimationProgress(100);
      resetTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
        setAnimationProgress(0);
        resetTimeoutRef.current = null;
      }, 2000);
      return;
    }

    // mode === "opacity" 或 "opacity-blur" 时，执行动画
    setAnimationProgress(0);
    const initialTime = performance.now();
    startTimeRef.current = initialTime;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) return;

      // 计算实际经过的时间
      const elapsed = currentTime - startTimeRef.current;
      // 根据当前速度计算有效时间
      const effectiveTime = elapsed * animationSpeed;
      // 计算进度（基于有效时间和总时长）
      const progress = Math.min((effectiveTime / duration) * 100, 100);

      setAnimationProgress(progress);

      if (progress < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // 动画完成，保持 check icon 显示 2 秒后自动重置
        setAnimationProgress(100);
        startTimeRef.current = null;

        resetTimeoutRef.current = setTimeout(() => {
          setIsCopied(false);
          setAnimationProgress(0);
          resetTimeoutRef.current = null;
        }, 2000);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value);
    setAnimationSpeed(newSpeed);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (resetTimeoutRef.current !== null) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  // copy icon 通过 opacity 快速变淡（opacity 1 -> 0）
  // check icon 通过 opacity 快速出现（opacity 0 -> 1）
  // 动画完成后（progress = 100），保持 check icon 显示
  const copyIconOpacity =
    mode === "none"
      ? isCopied
        ? 0
        : 1
      : isCopied
        ? animationProgress >= 100
          ? 0
          : Math.max(0, 1 - animationProgress / 100)
        : 1;

  const checkIconOpacity =
    mode === "none"
      ? isCopied
        ? 1
        : 0
      : isCopied
        ? animationProgress >= 100
          ? 1
          : Math.min(1, animationProgress / 100)
        : 0;

  // 模糊效果：opacity 越低，模糊越大；opacity 越高，模糊越小
  // opacity 为 1 时，模糊为 0；opacity 为 0 时，模糊最大
  // 只在 mode === "opacity-blur" 时应用模糊效果
  const getBlurValue = (opacity: number): string => {
    if (mode !== "opacity-blur" || !isCopied) {
      return "0px";
    }
    // opacity 从 1 到 0，模糊从 0 到最大（例如 4px）
    // 在过渡期间，根据 opacity 动态计算模糊值
    const blurAmount = (1 - opacity) * 4;
    return `${blurAmount}px`;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="relative">
        <button
          onClick={handleCopy}
          className="relative p-6 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="Copy"
        >
          <div className="relative w-8 h-8">
            <div
              className="absolute inset-0"
              style={{
                opacity: copyIconOpacity,
                filter: `blur(${getBlurValue(copyIconOpacity)})`,
              }}
            >
              <CopyIcon />
            </div>
            <div
              className="absolute inset-0"
              style={{
                opacity: checkIconOpacity,
                filter: `blur(${getBlurValue(checkIconOpacity)})`,
              }}
            >
              <CheckIcon />
            </div>
          </div>
        </button>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            動畫速度: {animationSpeed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={animationSpeed}
            onChange={handleSpeedChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
