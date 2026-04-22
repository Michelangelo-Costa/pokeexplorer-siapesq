"use client";

import { useEffect, useRef } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.classList.remove("page-exit");
      el.classList.add("page-enter");
    }
    return () => {
      if (el) {
        el.classList.remove("page-enter");
        el.classList.add("page-exit");
      }
    };
  }, []);
  return (
    <div ref={ref} className="page-transition page-enter">
      {children}
    </div>
  );
}
