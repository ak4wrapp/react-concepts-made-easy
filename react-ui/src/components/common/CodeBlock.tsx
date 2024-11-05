import React, { useEffect } from "react";
import Prism from "prismjs";

// Import PrismJS components
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css"; // Optional, can choose another theme

type CodeBlockProps = {
  code: string;
  language: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll(); // Re-run PrismJS highlighting
  }, [code]);

  return (
    <pre className={`language-${language}`}>
      <code>{code}</code>
    </pre>
  );
};

export default CodeBlock;
