import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);

interface CodeHighlightProps {
  language: "tsx" | "bash";
  children: string;
}

export function CodeHighlight({ language, children }: CodeHighlightProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        background: "transparent",
        margin: 0,
        padding: 0,
        fontSize: "inherit",
      }}
      codeTagProps={{ style: { fontFamily: "inherit" } }}
    >
      {children.replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
}
