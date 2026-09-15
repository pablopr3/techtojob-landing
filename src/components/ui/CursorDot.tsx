"use client";

import { useEffect, useRef } from "react";

/**
 * Small marker dot that trails the pointer, like a whiteboard marker.
 * Only on devices with a fine pointer and no reduced-motion preference.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      dot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!dot.classList.contains("is-active")) {
        currentX = targetX;
        currentY = targetY;
        dot.classList.add("is-active");
      }
      const interactive = (event.target as Element | null)?.closest("a, button, input");
      dot.classList.toggle("is-hovering", Boolean(interactive));
    };
    const onLeave = () => dot.classList.remove("is-active");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={dotRef} aria-hidden="true" className="cursor-dot" />;
}
