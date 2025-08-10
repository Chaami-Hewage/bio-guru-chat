import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import botAvatar from "@/assets/bot-avatar.png";

export type Role = "user" | "bot";

export interface MessageBubbleProps {
  role: Role;
  text: string;
}

function highlightKeywords(text: string) {
  const keywords = [
    "chlorophyll",
    "photosynthesis",
    "glucose",
    "oxygen",
    "carbon dioxide",
    "stomata",
    "sunlight",
  ];
  const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
      <mark key={i} className="highlight">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, text }) => {
  const isUser = role === "user";
  const bubbleAnim = isUser ? "animate-slide-in-right" : "animate-fade-in";
  return (
    <article className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"} ${bubbleAnim}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mt-1" aria-label="Biology Tutor AI avatar">
          <AvatarImage src={botAvatar} alt="Microscope avatar for Biology Tutor AI" loading="lazy" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`px-4 py-3 max-w-[85%] sm:max-w-[70%] bubble overflow-hidden ${
          isUser ? "bubble-user" : "bubble-bot"
        }`}
        role="note"
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{highlightKeywords(text)}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 mt-1" aria-label="Student avatar">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </article>
  );
};

export default MessageBubble;
