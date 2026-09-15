"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

/**
 * HUD cursor for desktop pointers: a dot with a full-width crosshair that
 * follows the pointer with no lag, a bracket frame that snaps onto links and
 * buttons, and a patch of the board grid that lights up around the pointer.
 * Runs work only while the pointer moves (one rAF per move, no idle loop).
 * Skipped on touch devices and with reduced motion. Never blocks clicks.
 */
export function CursorFx() {
  const dotRef = useRef<HTMLDivElement>(null);
  const lineXRef = useRef<HTMLDivElement>(null);
  const lineYRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const lineX = lineXRef.current;
    const lineY = lineYRef.current;
    const lock = lockRef.current;
    const grid = gridRef.current;
    if (!dot || !lineX || !lineY || !lock || !grid) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-cursor-fx");

    let x = 0;
    let y = 0;
    let target: Element | null = null;
    let frame = 0;

    const paint = () => {
      frame = 0;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      lineX.style.transform = `translateY(${y}px)`;
      lineY.style.transform = `translateX(${x}px)`;
      grid.style.setProperty("--x", `${x}px`);
      grid.style.setProperty("--y", `${y}px`);
      if (target) {
        const box = target.getBoundingClientRect();
        lock.style.transform = `translate(${box.left - 6}px, ${box.top - 6}px)`;
        lock.style.width = `${box.width + 12}px`;
        lock.style.height = `${box.height + 12}px`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      root.classList.add("cursor-fx-active");
      const hovered = (event.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (hovered !== target) {
        target = hovered;
        root.classList.toggle("cursor-fx-locked", Boolean(target));
      }
      schedule();
    };
    const onScroll = () => {
      if (target) schedule();
    };
    const onDown = () => root.classList.add("cursor-fx-down");
    const onUp = () => root.classList.remove("cursor-fx-down");
    const onLeave = () => root.classList.remove("cursor-fx-active");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor-fx", "cursor-fx-active", "cursor-fx-locked", "cursor-fx-down");
    };
  }, []);

  return (
    <>
      <div ref={gridRef} aria-hidden="true" className="cursor-grid" />
      <div ref={lineXRef} aria-hidden="true" className="cursor-line-x" />
      <div ref={lineYRef} aria-hidden="true" className="cursor-line-y" />
      <div ref={lockRef} aria-hidden="true" className="cursor-lock" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
