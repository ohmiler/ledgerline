"use client";

import { useEffect, useRef, useState } from "react";
import type { NavSection } from "@/content/documentation";
import { DocsHeader } from "./DocsHeader";

export function DocsNavigation({ sections }: { sections: readonly NavSection[] }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const closeNavigation = () => setOpen(false);

  return (
    <>
      <header className="mobile-header">
        <DocsHeader />
        <button
          ref={triggerRef}
          className="toc-trigger"
          type="button"
          aria-expanded={open}
          aria-controls="docs-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span>CONTENTS</span><span aria-hidden="true">{open ? "×" : "↗"}</span>
        </button>
      </header>
      <button className="nav-backdrop" data-open={open} onClick={closeNavigation} aria-label="Close contents" tabIndex={open ? 0 : -1} />
      <aside id="docs-navigation" className="docs-navigation" data-open={open}>
        <DocsHeader />
        <div className="environment"><span>TEST MODE</span><span className="pulse" aria-hidden="true" /> API v1</div>
        <nav aria-label="Documentation sections">
          {sections.map((section, index) => (
            <div className="nav-group" key={section.anchor}>
              <a className="nav-section" href={`#${section.anchor}`} onClick={closeNavigation}>
                <span>{String(index + 1).padStart(2, "0")}</span>{section.label}
              </a>
              {section.items.map((item) => (
                <a className="nav-item" href={`#${item.anchor}`} key={item.anchor} onClick={closeNavigation}>{item.label}</a>
              ))}
            </div>
          ))}
        </nav>
        <p className="nav-foot">FICTIONAL API<br />INTERFACE EVALUATION / 2026</p>
      </aside>
    </>
  );
}
