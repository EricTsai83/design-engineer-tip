import React, { useState, useCallback } from "react";
import { LoadingSpinnerIcon } from "./loading-spinner-icon.tsx";

type SubmitFormProps = {
  readonly mode?: "no-feedback" | "with-feedback";
};

const SUBMIT_DELAY_MS = 4000;

/**
 * 表單提交組件，用於演示不同模式的用戶體驗
 * - mode="no-feedback": 按下"送出"沒有UI回饋，等待4秒後跳下一頁
 * - mode="with-feedback": 按下"送出"，button會變成loading狀態，等待4秒後跳下一頁
 */
export default function SubmitForm({ mode = "no-feedback" }: SubmitFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      if (mode === "no-feedback") {
        // 沒有UI回饋，但需要禁用按鈕防止重複提交
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setShowNextPage(true);
        }, SUBMIT_DELAY_MS);
        return;
      }

      // mode === "with-feedback": 顯示loading狀態，等待4秒後跳下一頁
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setShowNextPage(true);
      }, SUBMIT_DELAY_MS);
    },
    [mode],
  );

  const handleReset = useCallback((): void => {
    setShowNextPage(false);
    setIsSubmitting(false);
  }, []);

  // 如果顯示下一頁，渲染模擬的下一頁畫面
  if (showNextPage) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 relative">
        <div className="absolute top-0 right-0">
          <button
            onClick={handleReset}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors px-2 py-1"
            aria-label="返回表單"
          >
            返回
          </button>
        </div>
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              提交成功！
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              感謝您的提交，我們會盡快與您聯繫。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            電子郵件
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            disabled={isSubmitting}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-md text-white font-medium transition-all ${
            isSubmitting && mode === "with-feedback"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 active:scale-96"
          }`}
        >
          {isSubmitting && mode === "with-feedback" ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinnerIcon className="animate-spin w-5 h-5" />
              送出中...
            </span>
          ) : (
            "送出"
          )}
        </button>
      </form>
    </div>
  );
}
