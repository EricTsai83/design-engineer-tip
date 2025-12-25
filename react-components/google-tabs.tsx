import React, { useState, useEffect, useRef } from "react";

type Tab = {
  readonly id: string;
  readonly title: string;
  readonly favicon: React.ReactNode;
};

type TooltipPosition = {
  readonly x: number;
  readonly y: number;
};

const TOOLTIP_DELAY_MS = 500;

type TooltipDelayMode = "default" | "skipOnContinuous" | "none";

type GoogleTabsProps = {
  readonly tooltipDelay?: TooltipDelayMode;
};

/**
 * 计算 tooltip 的位置
 */
const calculateTooltipPosition = (
  tabElement: HTMLDivElement,
): TooltipPosition | null => {
  const tabBarElement = tabElement.parentElement;
  if (!tabBarElement) {
    return null;
  }

  return {
    x: tabElement.offsetLeft,
    y: tabBarElement.offsetTop + tabElement.offsetHeight,
  };
};

/**
 * 合併 className 字串
 */
const cn = (...classes: readonly (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(" ");
};

const tabs: readonly Tab[] = [
  {
    id: "1",
    title: "Google",
    favicon: <GoogleIcon />,
  },
  {
    id: "2",
    title: "GitHub",
    favicon: <GithubIcon />,
  },
  {
    id: "3",
    title: "Bluesky",
    favicon: <BlueskyIcon />,
  },
  {
    id: "4",
    title: "X",
    favicon: <XIcon />,
  },
];

export default function GoogleTabs({
  tooltipDelay = "default",
}: GoogleTabsProps = {}) {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id ?? "");
  const [hoveredTabId, setHoveredTabId] = useState<string | undefined>(
    undefined,
  );
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition | null>(null);

  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastHoverTimeRef = useRef<number>(0);

  /**
   * 清除 hover timeout
   */
  const clearHoverTimeout = (): void => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  /**
   * 处理 tooltip 显示逻辑
   */
  useEffect(() => {
    if (!hoveredTabId) {
      setShowTooltip(false);
      clearHoverTimeout();
      // 完全離開 tab 區域時，重置最後 hover 時間
      lastHoverTimeRef.current = 0;
      return;
    }

    const tabElement = tabRefs.current[hoveredTabId];
    if (!tabElement) {
      return;
    }

    clearHoverTimeout();

    const now = Date.now();
    const isContinuousHover =
      tooltipDelay === "skipOnContinuous" && lastHoverTimeRef.current > 0;

    lastHoverTimeRef.current = now;

    if (tooltipDelay === "none") {
      // 完全無延遲，立即顯示 tooltip
      const position = calculateTooltipPosition(tabElement);
      if (position) {
        setTooltipPosition(position);
        setShowTooltip(true);
      }
    } else if (isContinuousHover) {
      // 連續 hover，立即顯示 tooltip，無延遲
      const position = calculateTooltipPosition(tabElement);
      if (position) {
        setTooltipPosition(position);
        setShowTooltip(true);
      }
    } else {
      // 預設或非連續 hover，使用正常 delay
      hoverTimeoutRef.current = setTimeout(() => {
        const position = calculateTooltipPosition(tabElement);
        if (position) {
          setTooltipPosition(position);
          setShowTooltip(true);
        }
      }, TOOLTIP_DELAY_MS);
    }

    return clearHoverTimeout;
  }, [hoveredTabId, tooltipDelay]);

  /**
   * 处理 tab hover 进入
   */
  const handleTabMouseEnter = (tabId: string): void => {
    setHoveredTabId(tabId);
  };

  /**
   * 处理 tab hover 离开
   */
  const handleTabMouseLeave = (): void => {
    setHoveredTabId(undefined);
    setShowTooltip(false);
    clearHoverTimeout();
    // 注意：不在這裡重置 lastHoverTimeRef，因為用戶可能快速移動到另一個 tab
    // 重置邏輯在 useEffect 中處理，當 hoveredTabId 為 undefined 時才會重置
  };

  /**
   * 处理 tab 点击
   */
  const handleTabClick = (tabId: string): void => {
    setActiveTabId(tabId);
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const hoveredTab = tabs.find((tab) => tab.id === hoveredTabId);

  return (
    <div className="relative w-[300px]">
      {/* Tab Bar */}
      <div className="flex items-end bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 rounded-t-lg">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isHovered = tab.id === hoveredTabId;

          return (
            <div
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 flex-1 min-w-0",
                "cursor-pointer transition-all duration-200",
                isActive && "bg-white dark:bg-gray-900",
                isHovered && !isActive && "bg-gray-200 dark:bg-gray-700",
              )}
              onClick={() => handleTabClick(tab.id)}
              onMouseEnter={() => handleTabMouseEnter(tab.id)}
              onMouseLeave={handleTabMouseLeave}
            >
              <span className="flex-shrink-0 text-sm">{tab.favicon}</span>

              <span
                className={cn(
                  "truncate text-sm flex-1 min-w-0",
                  isActive
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400",
                )}
              >
                {tab.title}
              </span>

              {isActive && (
                <div className="flex-shrink-0 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150">
                  <CloseIcon />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {hoveredTab && showTooltip && tooltipPosition && (
        <div
          className="absolute z-50 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded shadow-lg pointer-events-none transition-opacity duration-200"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          {hoveredTab.title}
        </div>
      )}

      {/* Tab Content Area */}
      <div className="bg-white dark:bg-gray-900 border border-t-0 border-gray-300 dark:border-gray-700 rounded-b-lg p-6 min-h-[200px]">
        {activeTab ? (
          <div className="text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-semibold mb-2">{activeTab.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              這是 {activeTab.title} 的內容區域
            </p>
          </div>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">請選擇一個 tab</div>
        )}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" />
    </svg>
  );
}

function BlueskyIcon() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-bluesky"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6.335 5.144c-1.654 -1.199 -4.335 -2.127 -4.335 .826c0 .59 .35 4.953 .556 5.661c.713 2.463 3.13 2.75 5.444 2.369c-4.045 .665 -4.889 3.208 -2.667 5.41c1.03 1.018 1.913 1.59 2.667 1.59c2 0 3.134 -2.769 3.5 -3.5c.333 -.667 .5 -1.167 .5 -1.5c0 .333 .167 .833 .5 1.5c.366 .731 1.5 3.5 3.5 3.5c.754 0 1.637 -.571 2.667 -1.59c2.222 -2.203 1.378 -4.746 -2.667 -5.41c2.314 .38 4.73 .094 5.444 -2.369c.206 -.708 .556 -5.072 .556 -5.661c0 -2.953 -2.68 -2.025 -4.335 -.826c-2.293 1.662 -4.76 5.048 -5.665 6.856c-.905 -1.808 -3.372 -5.194 -5.665 -6.856z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-brand-x"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8.267 3a1 1 0 0 1 .73 .317l.076 .092l4.274 5.828l5.946 -5.944a1 1 0 0 1 1.497 1.32l-.083 .094l-6.163 6.162l6.262 8.54a1 1 0 0 1 -.697 1.585l-.109 .006h-4.267a1 1 0 0 1 -.73 -.317l-.076 -.092l-4.276 -5.829l-5.944 5.945a1 1 0 0 1 -1.497 -1.32l.083 -.094l6.161 -6.163l-6.26 -8.539a1 1 0 0 1 .697 -1.585l.109 -.006h4.267z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
