import React, { useState, useEffect } from "react";

type TasteComparisonProps = {
  variant?: "no-taste" | "with-taste" | "both";
};

export default function TasteComparison({
  variant = "both",
}: TasteComparisonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [noTasteVisible, setNoTasteVisible] = useState(true);
  const [withTasteVisible, setWithTasteVisible] = useState(true);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // 重置动画状态
    setNoTasteVisible(true);
    setWithTasteVisible(true);
  };

  const handleNoTasteClick = () => {
    setNoTasteVisible(false);
    setTimeout(() => {
      setNoTasteVisible(true);
    }, 2000);
  };

  const handleWithTasteClick = () => {
    setWithTasteVisible(false);
    setTimeout(() => {
      setWithTasteVisible(true);
    }, 2000);
  };

  // 按 ESC 鍵關閉 popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPopupOpen) {
        handleClosePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener("keydown", handleEscape);
      // 防止背景滾動
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isPopupOpen]);

  return (
    <>
      <button
        onClick={handleOpenPopup}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
        aria-label="查看動畫演示"
      >
        查看動畫
      </button>

      {/* Popup Overlay */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={handleClosePopup}
        >
          {/* Popup Content */}
          <div
            className="relative bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-4xl mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="關閉"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Animation Content - 兩個動畫並排顯示 */}
            <div className="flex flex-row gap-8 items-center justify-center py-8">
              {/* 沒有品味的直覺 */}
              <div className="flex flex-col items-center gap-6 flex-1">
                <div className="text-lg">沒有品味的直覺</div>
                <button
                  onClick={handleNoTasteClick}
                  className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
                  aria-label="讓圓球消失（沒有品味）"
                >
                  <PlayIcon />
                </button>
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-pink-500 shadow-lg ${
                      noTasteVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              {/* 有品味的直覺 */}
              <div className="flex flex-col items-center gap-6 flex-1">
                <div className="text-lg">有品味的直覺</div>
                <button
                  onClick={handleWithTasteClick}
                  className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors"
                  aria-label="讓圓球消失（有品味）"
                >
                  <PlayIcon />
                </button>
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg ${
                      withTasteVisible
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75"
                    } transition-all duration-500 ease-in-out`}
                    style={{
                      transitionProperty: "opacity, transform",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PlayIcon() {
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
      className="lucide lucide-play-icon lucide-play"
    >
      <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
    </svg>
  );
}
