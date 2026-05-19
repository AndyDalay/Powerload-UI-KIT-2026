// ─── Powerload Topbar ─────────────────────────────────────────────────────────
//
// Refactored layout: Global Search | Filters + New Load | Notifications + Profile
//
// Design tokens: All colors via CSS variables from root (--color/neutral/*, --color/primary/*)
// Components: PowerloadButton, BadgeCount, AvatarUser (existing)
// Micro-components: SearchInput, UserProfile (inline)

import { Bell, Filter, Plus, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { PowerloadButton } from "../PowerloadButton";
import { BadgeCount } from "../BadgeCount";
import { AvatarUser } from "../AvatarUser";
import "./topbar.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PowerloadTopbarProps {
  /** Callback when new load button is clicked */
  onNewLoad?: () => void;
  /** Callback when filter button is clicked */
  onFilters?: () => void;
  /** Callback when search is performed */
  onSearch?: (query: string) => void;
  /** Badge count for notifications */
  notificationCount?: number;
  /** Callback when notification bell is clicked */
  onNotifications?: () => void;
  /** User profile info */
  userProfile?: {
    name: string;
    role: string;
    avatarUrl?: string;
    avatarInitials?: string;
  };
  /** Callback when profile is clicked */
  onProfileClick?: () => void;
}

// ─── SearchInput Component ────────────────────────────────────────────────────
// Micro-component: Search bar with icon, expandable focus state
// No visible border (transparent) → 1px solid neutral-200 on focus

interface SearchInputProps {
  onSearch?: (query: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        flex: "0 1 480px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 14px",
        backgroundColor: "var(--color/neutral/50)",
        border: `1px solid ${focused ? "var(--color/neutral/200)" : "transparent"}`,
        borderRadius: "12px",
        transition: "all 200ms ease-in-out",
        cursor: "text",
      }}
      onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
    >
      <Search
        size={18}
        strokeWidth={1.75}
        style={{
          color: "var(--color/neutral/600)",
          flexShrink: 0,
        }}
      />
      <input
        type="text"
        placeholder="Buscar por código, carga, empresa, ruta..."
        onChange={(e) => onSearch?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          border: "none",
          background: "transparent",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          color: "var(--color/neutral/800)",
          outline: "none",
        }}
        aria-label="Buscar cargas"
      />
    </div>
  );
}

// ─── UserProfile Component ─────────────────────────────────────────────────────
// Micro-component: Avatar + Name + Role + Dropdown indicator
// Background: neutral-50 → neutral-100 on hover
// Border: neutral-200 → neutral-400 on hover

interface UserProfileProps {
  name: string;
  role: string;
  avatarUrl?: string;
  avatarInitials?: string;
  onProfileClick?: () => void;
}

function UserProfile({
  name,
  role,
  avatarUrl,
  avatarInitials,
  onProfileClick,
}: UserProfileProps) {
  return (
    <button
      type="button"
      onClick={onProfileClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "6px 10px 6px 6px",
        backgroundColor: "var(--color/neutral/50)",
        border: "1px solid var(--color/neutral/200)",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 200ms ease-in-out",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color/neutral/400)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color/neutral/100)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color/neutral/200)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color/neutral/50)";
      }}
      aria-label={`Perfil de ${name}`}
    >
      <AvatarUser
        variant={avatarUrl ? "image" : "initials"}
        size="s"
        src={avatarUrl}
        initials={avatarInitials || name.slice(0, 2).toUpperCase()}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0 }}>
        <span
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--color/neutral/900)",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "var(--color/neutral/600)",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {role}
        </span>
      </div>
      <ChevronDown
        size={16}
        strokeWidth={1.75}
        style={{
          color: "var(--color/neutral/600)",
          flexShrink: 0,
          marginLeft: "4px",
        }}
      />
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
// Layout: Search (left, flex) | Filters + New Load (center) | Notifications + Profile (right)
// Height: 64px · Padding: 0 24px · Background: neutral-0 · Border: 1px solid neutral-200
// Sticky · z-index: 50 · Uses design tokens exclusively (no hex colors)

export function PowerloadTopbar({
  onNewLoad,
  onFilters,
  onSearch,
  notificationCount = 0,
  onNotifications,
  userProfile = {
    name: "Usuario",
    role: "Operador",
    avatarInitials: "U",
  },
  onProfileClick,
}: PowerloadTopbarProps) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        padding: "0 24px",
        backgroundColor: "var(--color/neutral/0)",
        borderBottom: "1px solid var(--color/neutral/200)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        gap: "24px",
        fontFamily: "'Poppins', sans-serif",
      }}
      role="banner"
    >
      {/* ── Left Section: Global Search Input ────────────────────────────── */}
      <SearchInput onSearch={onSearch} />

      {/* ── Center Section: Action Buttons (Filters + New Load) ──────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <PowerloadButton
          variant="secondary"
          size="s"
          label="Filtros"
          icon={<Filter size={16} strokeWidth={1.75} />}
          onClick={onFilters}
        />
        <PowerloadButton
          variant="primary"
          size="s"
          label="+ Nueva carga"
          icon={<Plus size={16} strokeWidth={2.5} />}
          onClick={onNewLoad}
        />
      </div>

      {/* ── Right Section: Notifications + User Profile ────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexShrink: 0,
          marginLeft: "auto",
        }}
      >
        {/* Notification Bell with Badge */}
        <button
          type="button"
          onClick={onNotifications}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            border: "none",
            backgroundColor: "transparent",
            borderRadius: "10px",
            color: "var(--color/neutral/800)",
            cursor: "pointer",
            transition: "all 200ms ease-in-out",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color/neutral/100)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
          }}
          aria-label={`Notificaciones${notificationCount > 0 ? ` (${notificationCount})` : ""}`}
        >
          <Bell size={20} strokeWidth={1.75} />
          {notificationCount > 0 && (
            <div
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                transform: "translate(25%, -25%)",
              }}
            >
              <BadgeCount
                variant="circle"
                count={notificationCount > 99 ? "99+" : notificationCount}
              />
            </div>
          )}
        </button>

        {/* User Profile Component */}
        <UserProfile
          name={userProfile.name}
          role={userProfile.role}
          avatarUrl={userProfile.avatarUrl}
          avatarInitials={userProfile.avatarInitials}
          onProfileClick={onProfileClick}
        />
      </div>
    </header>
  );
}
