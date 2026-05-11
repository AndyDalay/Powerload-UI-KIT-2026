import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  /** Hover delay in ms before tooltip appears (default 2000) */
  delay?: number;
}

export function Tooltip({ content, children, delay = 2000 }: TooltipProps) {
  const [visible, setVisible]   = useState(false);
  const [cursor, setCursor]     = useState({ x: 0, y: 0 });
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const move = (e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Position tooltip above-right of the cursor tip
  const TIP_X =  14;   // px right of cursor
  const TIP_Y = -38;   // px above cursor

  return (
    <div
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onMouseMove={move}
    >
      {children}

      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              key="powerload-tooltip"
              initial={{ opacity: 0, scale: 0.94, y: 4 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={{    opacity: 0, scale: 0.94, y: 4 }}
              transition={{ duration: 0.11, ease: "easeOut" }}
              style={{
                position:        "fixed",
                left:            cursor.x + TIP_X,
                top:             cursor.y + TIP_Y,
                backgroundColor: "#111111",
                color:           "#FFFFFF",
                fontFamily:      "'Poppins', sans-serif",
                fontSize:        "12px",
                fontWeight:      500,
                lineHeight:      1.4,
                padding:         "5px 11px",
                borderRadius:    "7px",
                whiteSpace:      "nowrap",
                pointerEvents:   "none",
                zIndex:          99999,
                letterSpacing:   "0.1px",
                userSelect:      "none",
                boxShadow:       "0 4px 14px -3px rgba(0,0,0,0.35)",
              }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
