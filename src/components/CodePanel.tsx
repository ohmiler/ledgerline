"use client";

import { useEffect, useState } from "react";
import type { CodeExamples } from "@/content/documentation";
import { copyText } from "@/lib/clipboard";

type Language = keyof CodeExamples;

export function CodePanel({ examples, success, error }: { examples: CodeExamples; success: string; error: string }) {
  const [language, setLanguage] = useState<Language>("curl");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 2000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const copy = async () => {
    const result = await copyText(examples[language]);
    setMessage(result.ok ? "Copied request" : "Copy unavailable");
  };

  return (
    <aside className="code-panel" aria-label="Request and response examples">
      <div className="code-toolbar">
        <div role="tablist" aria-label="Code language">
          {(["curl", "javascript"] as const).map((item) => (
            <button key={item} role="tab" aria-selected={language === item} onClick={() => setLanguage(item)}>{item === "curl" ? "cURL" : "JavaScript"}</button>
          ))}
        </div>
        <button className="copy-button" type="button" onClick={copy}>COPY</button>
      </div>
      <p className="code-label">REQUEST / TEST MODE</p>
      <pre data-testid="request-code"><code>{examples[language]}</code></pre>
      <p className="code-label response-label"><span>201</span> RESPONSE</p>
      <pre><code>{success}</code></pre>
      <details>
        <summary><span>400</span> ERROR RESPONSE</summary>
        <pre><code>{error}</code></pre>
      </details>
      <span className="sr-only" aria-live="polite">{message}</span>
      {message && <span className="copy-toast" aria-hidden="true">{message}</span>}
    </aside>
  );
}
