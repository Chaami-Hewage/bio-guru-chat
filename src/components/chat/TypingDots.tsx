import React from "react";

const TypingDots: React.FC = () => {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bubble bubble-bot">
      <span className="sr-only">Typing</span>
      <span className="w-2 h-2 rounded-full bg-foreground/70 typing-dot" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full bg-foreground/70 typing-dot" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 rounded-full bg-foreground/70 typing-dot" style={{ animationDelay: "300ms" }} />
    </div>
  );
};

export default TypingDots;
