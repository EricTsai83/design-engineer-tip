import React, { useState, useEffect, useCallback } from "react";

type TasteVariant = "no-taste" | "with-taste" | "both";

type TasteComparisonProps = {
  readonly variant?: TasteVariant;
};

const ANIMATION_RESET_DELAY_MS = 2000;
const ESCAPE_KEY = "Escape";

/**
 * 展示兩個動畫對比組件，用於演示「沒有品味的直覺」與「有品味的直覺」的差異
 */
export default function TasteComparison({
  variant = "both",
}: TasteComparisonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [noTasteVisible, setNoTasteVisible] = useState(true);
  const [withTasteVisible, setWithTasteVisible] = useState(true);

  const handleOpenPopup = useCallback((): void => {
    setIsPopupOpen(true);
  }, []);

  const handleClosePopup = useCallback((): void => {
    setIsPopupOpen(false);
    setNoTasteVisible(true);
    setWithTasteVisible(true);
  }, []);

  const handleNoTasteClick = useCallback((): void => {
    setNoTasteVisible(false);
    setTimeout(() => {
      setNoTasteVisible(true);
    }, ANIMATION_RESET_DELAY_MS);
  }, []);

  const handleWithTasteClick = useCallback((): void => {
    setWithTasteVisible(false);
    setTimeout(() => {
      setWithTasteVisible(true);
    }, ANIMATION_RESET_DELAY_MS);
  }, []);

  useEffect(() => {
    if (!isPopupOpen) {
      return;
    }

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === ESCAPE_KEY) {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isPopupOpen, handleClosePopup]);

  return (
    <>
      <button
        onClick={handleOpenPopup}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors text-sm active:scale-96"
        aria-label="查看動畫演示"
      >
        範例
      </button>

      {isPopupOpen && (
        <PopupOverlay onClose={handleClosePopup}>
          <PopupContent onClose={handleClosePopup}>
            <div className="flex flex-row gap-8 items-center justify-center py-8">
              <AnimationSection
                title="沒有品味的動畫"
                isVisible={noTasteVisible}
                onClick={handleNoTasteClick}
                buttonColor="red"
                ballColor="from-red-400 to-pink-500"
                hasScaleAnimation={false}
                ariaLabel="讓圓球消失（沒有品味）"
              />
              <AnimationSection
                title="有品味的動畫"
                isVisible={withTasteVisible}
                onClick={handleWithTasteClick}
                buttonColor="green"
                ballColor="from-green-400 to-emerald-500"
                hasScaleAnimation={true}
                ariaLabel="讓圓球消失（有品味）"
              />
            </div>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
}

type PopupOverlayProps = React.PropsWithChildren<{
  readonly onClose: () => void;
}>;

function PopupOverlay({ children, onClose }: PopupOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {children}
    </div>
  );
}

type PopupContentProps = React.PropsWithChildren<{
  readonly onClose: () => void;
}>;

function PopupContent({ children, onClose }: PopupContentProps) {
  const handleContentClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <div
      className="relative bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-4xl mx-4 shadow-2xl"
      onClick={handleContentClick}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        aria-label="關閉"
      >
        <CloseIcon />
      </button>
      {children}
    </div>
  );
}

type AnimationSectionProps = {
  readonly title: string;
  readonly isVisible: boolean;
  readonly onClick: () => void;
  readonly buttonColor: "red" | "green";
  readonly ballColor: string;
  readonly hasScaleAnimation: boolean;
  readonly ariaLabel: string;
};

function AnimationSection({
  title,
  isVisible,
  onClick,
  buttonColor,
  ballColor,
  hasScaleAnimation,
  ariaLabel,
}: AnimationSectionProps) {
  const buttonClass =
    buttonColor === "red"
      ? "p-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors active:scale-96"
      : "p-2 bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors active:scale-96";

  const ballClass = hasScaleAnimation
    ? `w-24 h-24 rounded-full bg-gradient-to-br ${ballColor} shadow-lg transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`
    : `w-24 h-24 rounded-full bg-gradient-to-br ${ballColor} shadow-lg ${
        isVisible ? "opacity-100" : "opacity-0"
      }`;

  return (
    <div className="flex flex-col items-center gap-6 flex-1">
      <div className="text-lg">{title}</div>
      <button onClick={onClick} className={buttonClass} aria-label={ariaLabel}>
        <PlayIcon />
      </button>
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className={ballClass} />
      </div>
    </div>
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

function CloseIcon() {
  return (
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
  );
}
