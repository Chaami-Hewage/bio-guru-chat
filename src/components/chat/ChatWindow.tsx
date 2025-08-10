import React, { useCallback, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import MessageBubble, { Role } from "./MessageBubble";
import TypingDots from "./TypingDots";
import banner from "@/assets/biology-banner.jpg";

interface ChatMessage {
  id: string;
  role: Role;
  text: string;
}

const initialBotGreeting =
  "Hello! I'm Biology Tutor AI. Ask me anything about photosynthesis, cells, or human biology. I can explain step-by-step in simple terms.";

function fakeAnswer(question: string, grade: number): string {
  const level = grade >= 12 ? "advanced" : grade >= 9 ? "intermediate" : "basic";
  const lower = question.toLowerCase();
  if (lower.includes("photosynthesis"))
    return (
      `(${level} – Grade ${grade}) Photosynthesis is how plants use sunlight to make glucose. Chlorophyll captures light, leaves take CO₂ through stomata, and oxygen is released. Want a step-by-step breakdown?`
    );
  if (lower.includes("cell"))
    return (
      `(${level} – Grade ${grade}) A cell is the basic unit of life. The nucleus holds DNA, mitochondria make energy, and the membrane controls what enters/leaves.`
    );
  return (
    `(${level} – Grade ${grade}) Great question! Here's a concise explanation with key terms highlighted. I can also tailor this for Grade ${grade}.`
  );
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "b1", role: "bot", text: initialBotGreeting },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [grade, setGrade] = useState<number>(9);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
  }, []);

  const canSend = useMemo(() => input.trim().length > 0 && !typing, [input, typing]);

  const handleSend = async () => {
    if (!canSend) return;
    const userText = input.trim();
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulated backend. Replace with your API call.
    await new Promise((r) => setTimeout(r, 700));
    const reply = fakeAnswer(userText, grade);
    const botMsg: ChatMessage = { id: crypto.randomUUID(), role: "bot", text: reply };
    setMessages((prev) => [...prev, botMsg]);
    setTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <section aria-label="Biology Tutor AI chat" className="w-full">
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        className="relative border rounded-xl overflow-hidden animate-enter"
      >
        <img
          src={banner}
          alt="Abstract biology illustration with leaves, DNA, and microscope"
          className="w-full h-32 sm:h-40 object-cover"
          loading="lazy"
        />
        <div className="p-3 sm:p-6 interactive-spotlight">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                ජෛව ගුරු AI – Biology Tutor AI
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Ask in Sinhala, Tamil, or English. Designed for Sri Lankan curriculum.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Grade</span>
              <Select onValueChange={(v) => setGrade(Number(v))} value={String(grade)}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {[6,7,8,9,10,11,12,13].map((g) => (
                    <SelectItem key={g} value={String(g)}>{`Grade ${g}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </header>

          <div className="mt-4 h-[55vh] sm:h-[60vh]">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3">
                {messages.map((m) => (
                  <MessageBubble key={m.id} role={m.role} text={m.text} />
                ))}
                {typing && <TypingDots />}
              </div>
            </ScrollArea>
          </div>

          <form
            className="mt-4 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            aria-label="Send a message"
          >
            <Input
              placeholder="Ask your biology question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Message input"
            />
            <Button type="submit" variant="chat" size="lg" disabled={!canSend} aria-label="Send message" className="hover-scale">
              <Send aria-hidden className="opacity-90" />
              Send
            </Button>
          </form>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Biology Tutor AI",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description:
              "Sri Lankan Biology chatbot for students – friendly explanations with highlighted keywords.",
          }),
        }}
      />
    </section>
  );
};

export default ChatWindow;
