"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { HTMLAttributes } from "react";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
};

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative rounded-lg border border-border", className)}>
      {language && (
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span className="text-xs text-muted-foreground">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre
        className={cn(
          "overflow-x-auto p-4 text-sm font-mono leading-relaxed",
          className,
        )}
        {...props}
      >
        <code>
          {showLineNumbers
            ? code.split("\n").map((line, i) => (
                <span key={i} className="table-row">
                  <span className="table-cell w-8 select-none text-right text-muted-foreground/50 pr-4">
                    {i + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </span>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}
