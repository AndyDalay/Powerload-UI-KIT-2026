// ─── AvatarUser ───────────────────────────────────────────────────────────────
// Avatar/User component — 2 variants × 5 sizes · all circular
//
// initials variant  →  bg #FBE1E1, text #C22339, Poppins SemiBold
// image variant     →  object-fit cover image, border 1px solid #ECECF4
//
// Sizes: xs=24 · s=32 · m=40 · l=48 · xl=64
// l & xl only: optional `verified` boolean → 8px green dot bottom-right

export type AvatarSize    = "xs" | "s" | "m" | "l" | "xl";
export type AvatarVariant = "initials" | "image";

export interface AvatarUserProps {
  variant?:  AvatarVariant;
  size?:     AvatarSize;
  /** 2-letter string shown in initials variant (auto-uppercased) */
  initials?: string;
  /** Image URL for the image variant */
  src?:      string;
  alt?:      string;
  /** l and xl only — shows 8px green verification dot at bottom-right */
  verified?: boolean;
}

// ─── Size tokens ─────────────────────────────────────────────────────────────

const SIZE_PX: Record<AvatarSize, number>      = { xs: 24, s: 32, m: 40, l: 48, xl: 64 };
const FONT_PX: Record<AvatarSize, number>      = { xs: 10, s: 12, m: 14, l: 16, xl: 20 };
const BADGE_PX: Record<AvatarSize, number>     = { xs: 0,  s: 0,  m: 0,  l: 8,  xl: 10 };
const BADGE_OFFSET: Record<AvatarSize, number> = { xs: 0,  s: 0,  m: 0,  l: 1,  xl: 1  };

// ─── Placeholder SVG (shown when image variant has no src) ───────────────────

function PlaceholderIcon({ size }: { size: number }) {
  const iconSize = Math.round(size * 0.45);
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A1A1B9"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

// ─── Verification badge dot ───────────────────────────────────────────────────

function VerifiedDot({ badgePx, offset }: { badgePx: number; offset: number }) {
  return (
    <span
      style={{
        position:        "absolute",
        bottom:          offset,
        right:           offset,
        width:           badgePx,
        height:          badgePx,
        borderRadius:    "50%",
        backgroundColor: "#48BB78",   // success/600
        border:          "1.5px solid #FFFFFF",
        flexShrink:      0,
      }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AvatarUser({
  variant  = "initials",
  size     = "m",
  initials = "AB",
  src,
  alt      = "Avatar",
  verified = false,
}: AvatarUserProps) {
  const px         = SIZE_PX[size];
  const fontPx     = FONT_PX[size];
  const badgePx    = BADGE_PX[size];
  const badgeOff   = BADGE_OFFSET[size];
  const canVerify  = size === "l" || size === "xl";
  const showBadge  = canVerify && verified;

  const letters = initials.slice(0, 2).toUpperCase();

  const baseStyle: React.CSSProperties = {
    position:     "relative",
    display:      "inline-flex",
    alignItems:   "center",
    justifyContent: "center",
    width:        px,
    height:       px,
    borderRadius: "50%",
    flexShrink:   0,
    overflow:     "hidden",
  };

  // ── Initials ────────────────────────────────────────────────────────────────
  if (variant === "initials") {
    return (
      <div
        style={{
          ...baseStyle,
          backgroundColor: "#FBE1E1",
          overflow:        "visible",   // so badge isn't clipped
        }}
      >
        <span
          style={{
            fontFamily:  "'Poppins', sans-serif",
            fontSize:    fontPx,
            fontWeight:  600,
            color:       "#C22339",
            lineHeight:  1,
            userSelect:  "none",
          }}
        >
          {letters}
        </span>
        {showBadge && (
          <VerifiedDot badgePx={badgePx} offset={badgeOff} />
        )}
      </div>
    );
  }

  // ── Image ───────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        ...baseStyle,
        border:     "1px solid #ECECF4",
        overflow:   "visible",          // badge must not be clipped
        boxSizing:  "border-box",
      }}
    >
      {/* Inner circle clips the image */}
      <div
        style={{
          width:        "100%",
          height:       "100%",
          borderRadius: "50%",
          overflow:     "hidden",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          backgroundColor: "#F3F3F9",
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <PlaceholderIcon size={px} />
        )}
      </div>
      {showBadge && (
        <VerifiedDot badgePx={badgePx} offset={badgeOff} />
      )}
    </div>
  );
}
