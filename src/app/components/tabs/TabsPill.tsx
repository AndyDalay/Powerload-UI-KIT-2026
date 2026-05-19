// ─── TabsPill Component ───────────────────────────────────────────────────────
//
// Navigation tabs with pill-shaped styling for page sections.
// Features: Badge integration, keyboard navigation, responsive sizing.
// Design tokens: All colors via CSS variables (--color/neutral/*, --color/primary/*)
// Micro-components: TabItem (internal), BadgeCount (reused)

import { BadgeCount } from "../BadgeCount";
import { useState, useRef, KeyboardEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabItemData {
  /** Unique identifier for the tab */
  id: string;
  /** Display label */
  label: string;
  /** Optional badge count (shows "99+" if > 99) */
  count?: number | string;
  /** Badge color variant (primary=red, neutral=gray, dark=darker gray) */
  badgeColor?: "primary" | "neutral" | "dark";
  /** If true, tab cannot be clicked */
  disabled?: boolean;
  /** Optional aria-controls for associated panel */
  ariaControls?: string;
}

export interface TabsPillProps {
  /** Array of tab items */
  tabs: TabItemData[];
  /** ID of the currently active tab */
  activeTab: string;
  /** Callback when tab is selected */
  onTabChange: (tabId: string) => void;
  /** Size variant: sm (12px), md (13px), lg (14px) */
  size?: "sm" | "md" | "lg";
  /** Horizontal alignment: left, center, right */
  align?: "left" | "center" | "right";
}

// ─── Font size tokens per size variant ─────────────────────────────────────────

const FONT_SIZE: Record<"sm" | "md" | "lg", number> = {
  sm: 12,
  md: 13,
  lg: 14,
};

const PADDING: Record<"sm" | "md" | "lg", string> = {
  sm: "6px 10px",
  md: "8px 12px",
  lg: "10px 16px",
};

// ─── Micro-component: TabItem ─────────────────────────────────────────────────
// Individual pill-shaped tab with label and optional badge
// States: default → hover → active, with smooth transitions

interface TabItemProps {
  tab: TabItemData;
  isActive: boolean;
  size: "sm" | "md" | "lg";
  onClick: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  tabIndex: number;
  setRef?: (el: HTMLButtonElement | null) => void;
}

function TabItem({
  tab,
  isActive,
  size,
  onClick,
  onKeyDown,
  tabIndex,
  setRef,
}: TabItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = tab.disabled ?? false;

  // Determine badge display
  const showBadge = tab.count !== undefined && tab.count !== null && tab.count !== "";
  const badgeCount =
    typeof tab.count === "number" && tab.count > 99
      ? "99+"
      : String(tab.count);

  // Style objects for different states
  const baseStyles: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: PADDING[size],
    border: "none",
    borderRadius: "8px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: `${FONT_SIZE[size]}px`,
    fontWeight: isActive ? 600 : 500,
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "all 200ms ease-in-out",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  const stateStyles: React.CSSProperties = {
    backgroundColor: isDisabled
      ? "var(--color/neutral/50)"
      : isActive
      ? "var(--color/primary/50)"
      : isHovered
      ? "var(--color/neutral/50)"
      : "transparent",
    color: isDisabled
      ? "var(--color/neutral/400)"
      : isActive
      ? "var(--color/primary/600)"
      : "var(--color/neutral/800)",
    transform: isHovered && !isDisabled ? "translateY(-1px)" : "translateY(0)",
    boxShadow: isActive && !isDisabled
      ? "0 1px 3px rgba(194, 35, 57, 0.15)"
      : "none",
    outlineColor: isActive ? "var(--color/primary/400)" : "transparent",
  };

  return (
    <button
      type="button"
      role="tab"
      ref={setRef}
      aria-selected={isActive}
      aria-controls={tab.ariaControls}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isDisabled}
      style={{
        ...baseStyles,
        ...stateStyles,
        outline: "2px solid transparent",
        outlineOffset: "2px",
      }}
      onFocus={(e) => {
        if (!isDisabled) {
          (e.currentTarget as HTMLElement).style.outline = "2px solid var(--color/primary/400)";
          (e.currentTarget as HTMLElement).style.outlineOffset = "2px";
        }
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.outline = "2px solid transparent";
      }}
    >
      {/* Tab label */}
      <span style={{ fontFamily: "'Poppins', sans-serif" }}>{tab.label}</span>

      {/* Badge (conditional) */}
      {showBadge && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BadgeCount
            variant="circle"
            count={badgeCount}
          />
        </div>
      )}
    </button>
  );
}

// ─── Main Component: TabsPill ──────────────────────────────────────────────────
// Container for multiple tabs with keyboard navigation and responsive layout

export function TabsPill({
  tabs,
  activeTab,
  onTabChange,
  size = "md",
  align = "left",
}: TabsPillProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<Record<string, HTMLButtonElement>>({});

  // Get justify-content value based on align prop
  const justifyContentMap: Record<"left" | "center" | "right", string> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, tabId: string) => {
    const tabIds = tabs.map((t) => t.id).filter((id) => !tabs.find((t) => t.id === id && t.disabled));
    const currentIndex = tabIds.indexOf(tabId);

    let targetTabId: string | null = null;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        targetTabId = currentIndex > 0 ? tabIds[currentIndex - 1] : tabIds[tabIds.length - 1];
        break;
      case "ArrowRight":
        e.preventDefault();
        targetTabId = currentIndex < tabIds.length - 1 ? tabIds[currentIndex + 1] : tabIds[0];
        break;
      case "Home":
        e.preventDefault();
        targetTabId = tabIds[0];
        break;
      case "End":
        e.preventDefault();
        targetTabId = tabIds[tabIds.length - 1];
        break;
      default:
        return;
    }

    if (targetTabId) {
      onTabChange(targetTabId);
      // Focus the new tab after render
      setTimeout(() => {
        tabsRef.current[targetTabId]?.focus();
      }, 0);
    }
  };

  // Container styles
  const containerStyles: React.CSSProperties = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: justifyContentMap[align],
    flexWrap: "nowrap",
    overflowX: "auto",
    overflowY: "hidden",
    padding: "4px",
    backgroundColor: "transparent",
    scrollBehavior: "smooth",
  };

  // Scrollbar styling (webkit browsers)
  const scrollbarStyles = `
    .tabs-pill-container::-webkit-scrollbar {
      height: 4px;
    }
    .tabs-pill-container::-webkit-scrollbar-track {
      background: transparent;
    }
    .tabs-pill-container::-webkit-scrollbar-thumb {
      background: var(--color/primary/600);
      border-radius: 2px;
    }
    .tabs-pill-container::-webkit-scrollbar-thumb:hover {
      background: var(--color/primary/400);
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div
        ref={containerRef}
        className="tabs-pill-container"
        role="tablist"
        style={containerStyles}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          const enabledTabs = tabs.filter((t) => !t.disabled);
          const enabledIndex = enabledTabs.findIndex((t) => t.id === tab.id);
          const isFirst = enabledIndex === 0;

          return (
            <TabItem
              key={tab.id}
              tab={tab}
              isActive={isActive}
              size={size}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              onKeyDown={(e) => !tab.disabled && handleKeyDown(e, tab.id)}
              tabIndex={isActive ? 0 : isFirst ? 0 : -1}
              setRef={(el) => {
                if (el) tabsRef.current[tab.id] = el;
              }}
            />
          );
        })}
      </div>
    </>
  );
}
