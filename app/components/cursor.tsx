"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const RING_HALF = 18;
const DOT_HALF = 3;

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Only enable custom cursor if device has a fine pointer (mouse / trackpad)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setIsPointerDevice(true);
    }
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    gsap.set([ring, dot], {
      x: -100,
      y: -100,
      opacity: 0,
    });

    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });

    let isVisible = false;

    const showCursor = () => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.2 });
      }
    };

    const hideCursor = () => {
      isVisible = false;
      gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    };

    const onMove = (e: MouseEvent) => {
      showCursor();
      xRing(e.clientX - RING_HALF);
      yRing(e.clientY - RING_HALF);
      xDot(e.clientX - DOT_HALF);
      yDot(e.clientY - DOT_HALF);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      if (t.closest(".project-card, .cert-card")) {
        gsap.to(ring, {
          scale: 2.2,
          borderColor: "#00f5ff",
          boxShadow: "0 0 30px rgba(0, 245, 255, 0.6)",
          duration: 0.25,
        });
        gsap.to(dot, { scale: 0.5, backgroundColor: "#00f5ff", duration: 0.2 });
      } else if (t.closest("a, button, [role='button'], input, textarea")) {
        gsap.to(ring, {
          scale: 1.6,
          borderColor: "#c084fc",
          boxShadow: "0 0 25px rgba(192, 132, 252, 0.5)",
          duration: 0.25,
        });
        gsap.to(dot, { scale: 1.4, backgroundColor: "#c084fc", duration: 0.2 });
      }
    };

    const onOut = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(0, 245, 255, 0.75)",
        boxShadow: "0 0 16px rgba(0, 245, 255, 0.35)",
        duration: 0.25,
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: "#00f5ff",
        duration: 0.2,
      });
    };

    const onDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.1 });
      gsap.to(dot, { scale: 1.6, duration: 0.1 });
    };

    const onUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.15 });
      gsap.to(dot, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isPointerDevice]);

  if (!isPointerDevice) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}