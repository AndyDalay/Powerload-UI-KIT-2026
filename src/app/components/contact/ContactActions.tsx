// ─── ContactActions Component ──────────────────────────────────────────────────
//
// Compact vertical list of communication actions for table cells.
// Groups phone, WhatsApp, and email icons with role labels.
//
// Features:
//   - Three contact types: phone, whatsapp, email
//   - Semantic colors per type via CSS variables
//   - Compact 16px icons with 11px role labels
//   - Hover effects: scale + opacity increase
//   - Tooltip integration for contact values
//   - Auto-hides empty/null contacts
//   - Vertical alignment for table cell integration
//
// Design tokens: exclusively CSS variables
//   --color/success/600  → WhatsApp green
//   --color/primary/600  → Phone (Powerload red)
//   --color/neutral/600  → Email gray
//   --color/neutral/900  → Role label text

import React from "react";
import { Phone, Mail } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Tooltip } from "../Tooltip";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContactType = "phone" | "whatsapp" | "email";

export interface ContactItem {
  /** Contact role (e.g., "Chofer", "Transportista", "Cargador") */
  role: string;
  /** Contact type: phone, whatsapp, or email */
  type: ContactType;
  /** Contact value (phone number or email). If empty/null, row is hidden */
  value: string;
}

export interface ContactActionsProps {
  /** Array of contact items to render */
  contacts: ContactItem[];
  /** Optional className for custom styling */
  className?: string;
}

// ─── Color tokens mapping per contact type ────────────────────────────────────

const CONTACT_COLORS: Record<ContactType, string> = {
  phone: "var(--color/primary/600)",    // Powerload red
  whatsapp: "var(--color/success/600)", // Green
  email: "var(--color/neutral/600)",    // Gray
};

// ─── Icon mapping per contact type ────────────────────────────────────────────

const ICON_SIZE = 16;

// ─── Micro-component: ContactRow ──────────────────────────────────────────────
// Individual contact row with icon, role label, and tooltip

interface ContactRowProps {
  contact: ContactItem;
}

function ContactRow({ contact }: ContactRowProps) {
  const iconColor = CONTACT_COLORS[contact.type];

  // Select icon based on type
  const IconComponent =
    contact.type === "phone"
      ? Phone
      : contact.type === "whatsapp"
        ? MessageCircle
        : Mail;

  // Container styles
  const containerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "2px 0",
  };

  // Icon wrapper styles (for hover effects)
  const iconWrapperStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
    cursor: "pointer",
    transition: "transform 150ms ease-in-out, opacity 150ms ease-in-out",
  };

  // Icon styles
  const iconStyles: React.CSSProperties = {
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
    color: iconColor,
    flexShrink: 0,
  };

  // Role label styles
  const labelStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "11px",
    fontWeight: 400,
    color: "var(--color/neutral/900)",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  };

  // Hover handlers for icon wrapper
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1.15)";
    e.currentTarget.style.opacity = "0.85";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.opacity = "1";
  };

  return (
    <div style={containerStyles}>
      {/* Tooltip wraps the icon only */}
      <Tooltip content={contact.value} delay={500}>
        <div
          style={iconWrapperStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${contact.type} ${contact.role}: ${contact.value}`}
        >
          <IconComponent style={iconStyles} />
        </div>
      </Tooltip>

      {/* Role label */}
      <span style={labelStyles}>{contact.role}</span>
    </div>
  );
}

// ─── Main Component: ContactActions ───────────────────────────────────────────

export function ContactActions({
  contacts,
  className,
}: ContactActionsProps) {
  // Filter out contacts with empty/null values
  const validContacts = contacts.filter(
    (c) => c.value && c.value.trim() !== ""
  );

  // Container styles
  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    alignItems: "flex-start",
    padding: "0",
  };

  // If no valid contacts, render nothing (silent hide)
  if (validContacts.length === 0) {
    return null;
  }

  return (
    <div
      className={className}
      style={containerStyles}
      aria-label="Contactos disponibles"
    >
      {validContacts.map((contact, index) => (
        <ContactRow key={`${contact.type}-${contact.role}-${index}`} contact={contact} />
      ))}
    </div>
  );
}

export type { ContactItem };
