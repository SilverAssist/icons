import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { CodeHighlight } from "@/components/catalog/code-highlight";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: "tsx" | "bash";
  className?: string;
}

export function CodeBlock({ code, language = "bash", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access denied — nothing to fall back to in a static site
    }
  }

  return (
    <div
      className={cn(
        "relative min-w-0 rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm",
        className,
      )}
    >
      <pre className="overflow-x-auto whitespace-pre">
        <CodeHighlight language={language}>{code}</CodeHighlight>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2 right-2 rounded-md p-1.5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
      >
        {copied ? <Check className="size-4 text-teal-400" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}
