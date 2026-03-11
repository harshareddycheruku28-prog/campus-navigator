import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────
interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

// ─── Quick Suggestion Chips ─────────────────────────────────────────────
const quickSuggestions = [
    { label: "🐍 Learn Python", message: "I want to learn Python" },
    { label: "🤖 AI Courses", message: "Recommend AI courses" },
    { label: "🌐 Web Dev", message: "Best web development resources" },
    { label: "📊 Data Science", message: "Help me with Data Science" },
    { label: "☁️ Cloud", message: "Cloud computing courses" },
    { label: "🔒 Cybersecurity", message: "Cybersecurity courses" },
];

// ─── Platform icons mapping ─────────────────────────────────────────────
const platformColors: Record<string, string> = {
    coursera: "#0056D2",
    udemy: "#A435F0",
    edx: "#02262B",
    youtube: "#FF0000",
};

// ─── Render message with markdown-like formatting ───────────────────────
function renderFormattedText(text: string) {
    const lines = text.split("\n");

    return lines.map((line, idx) => {
        // Process bold text
        const processInline = (str: string) => {
            const parts: (string | JSX.Element)[] = [];
            const regex = /\*\*(.*?)\*\*/g;
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(str)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(str.slice(lastIndex, match.index));
                }
                parts.push(
                    <strong key={`b-${idx}-${match.index}`} className="font-semibold text-white">
                        {match[1]}
                    </strong>
                );
                lastIndex = regex.lastIndex;
            }

            if (lastIndex < str.length) {
                parts.push(str.slice(lastIndex));
            }

            return parts;
        };

        // Links: [text](url)
        const processLinks = (str: string) => {
            const parts: (string | JSX.Element)[] = [];
            const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
            let lastIndex = 0;
            let match;

            while ((match = linkRegex.exec(str)) !== null) {
                if (match.index > lastIndex) {
                    const beforeText = str.slice(lastIndex, match.index);
                    parts.push(...processInline(beforeText));
                }

                // Detect platform for coloring
                const url = match[2].toLowerCase();
                let platformColor = "#60a5fa";
                for (const [platform, color] of Object.entries(platformColors)) {
                    if (url.includes(platform)) {
                        platformColor = color;
                        break;
                    }
                }

                parts.push(
                    <a
                        key={`link-${idx}-${match.index}`}
                        href={match[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-all duration-200 hover:scale-105 hover:brightness-110"
                        style={{
                            backgroundColor: `${platformColor}20`,
                            color: platformColor === "#02262B" ? "#2dd4bf" : platformColor,
                            border: `1px solid ${platformColor}40`,
                        }}
                    >
                        🔗 {match[1]}
                    </a>
                );
                lastIndex = linkRegex.lastIndex;
            }

            if (lastIndex < str.length) {
                parts.push(...processInline(str.slice(lastIndex)));
            }

            return parts;
        };

        if (line.trim() === "") {
            return <br key={idx} />;
        }

        // Numbered list items
        if (/^\d+\./.test(line.trim())) {
            return (
                <div key={idx} className="ml-1 mt-1">
                    {processLinks(line)}
                </div>
            );
        }

        // Bullet items
        if (line.trim().startsWith("•") || line.trim().startsWith("📌") || line.trim().startsWith("📈") || line.trim().startsWith("🔗")) {
            return (
                <div key={idx} className="ml-3 text-[13px] leading-relaxed opacity-90">
                    {processLinks(line.trim())}
                </div>
            );
        }

        // Tip line
        if (line.trim().startsWith("💡")) {
            return (
                <div
                    key={idx}
                    className="mt-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-[13px] text-amber-200"
                >
                    {processInline(line.trim())}
                </div>
            );
        }

        return (
            <div key={idx} className="leading-relaxed">
                {processLinks(line)}
            </div>
        );
    });
}

// ─── ChatBot Component ──────────────────────────────────────────────────
export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            text: "Hey there! 👋 I'm your **Campus Navigator Course Assistant**!\n\nI help students discover the best online courses and learning platforms. Ask me about any topic like Python, AI, Web Development, and more!\n\nWhat would you like to learn today? 🎯",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: text.trim(),
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || "https://campus-navigator-2me4.onrender.com/chat";
            const response = await fetch(chatApiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text.trim() }),
            });

            const data = await response.json();

            const botMessage: Message = {
                id: `bot-${Date.now()}`,
                text: data.reply,
                sender: "bot",
                timestamp: new Date(),
            };

            // Simulate a small typing delay for natural feel
            setTimeout(() => {
                setMessages((prev) => [...prev, botMessage]);
                setIsTyping(false);
            }, 600);
        } catch {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `err-${Date.now()}`,
                        text: "Oops! I'm having trouble connecting right now. Please try again in a moment. 🔄",
                        sender: "bot",
                        timestamp: new Date(),
                    },
                ]);
                setIsTyping(false);
            }, 500);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <>
            {/* ── Floating Chat Button ───────────────────────────────────── */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        id="chatbot-toggle"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-shadow duration-300"
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #3b82f6, #06b6d4)",
                            boxShadow: "0 8px 32px rgba(99, 102, 241, 0.4), 0 0 60px rgba(59, 130, 246, 0.15)",
                        }}
                        aria-label="Open chat assistant"
                    >
                        {/* Chat icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {/* Pulse ring */}
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-20" style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)" }} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── Chat Window ────────────────────────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="chatbot-window"
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                        style={{
                            width: "min(420px, calc(100vw - 48px))",
                            height: "min(640px, calc(100vh - 100px))",
                            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(7, 11, 28, 0.99))",
                            backdropFilter: "blur(20px)",
                            boxShadow:
                                "0 25px 60px -12px rgba(0, 0, 0, 0.5), 0 0 80px -20px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                    >
                        {/* ── Header ──────────────────────────────────────────── */}
                        <div
                            className="relative flex items-center justify-between px-5 py-4"
                            style={{
                                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.1))",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                                    style={{
                                        background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                                        boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                                    }}
                                >
                                    🎓
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Course Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52, 211, 153, 0.5)" }} />
                                        <span className="text-xs text-emerald-300/80">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                id="chatbot-close"
                                onClick={() => setIsOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                                aria-label="Close chat"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* ── Messages Area ───────────────────────────────────── */}
                        <div
                            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
                            style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "rgba(99,102,241,0.3) transparent",
                            }}
                        >
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index === messages.length - 1 ? 0.1 : 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.sender === "bot" && (
                                        <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs" style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)" }}>
                                            🤖
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${msg.sender === "user"
                                            ? "rounded-br-md text-white"
                                            : "rounded-bl-md text-gray-200"
                                            }`}
                                        style={
                                            msg.sender === "user"
                                                ? {
                                                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                                                    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.25)",
                                                }
                                                : {
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1px solid rgba(255,255,255,0.06)",
                                                }
                                        }
                                    >
                                        {msg.sender === "bot" ? renderFormattedText(msg.text) : msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs" style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)" }}>
                                        🤖
                                    </div>
                                    <div className="flex gap-1 rounded-2xl rounded-bl-md px-4 py-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-indigo-400" style={{ animationDelay: "0ms" }} />
                                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "150ms" }} />
                                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* ── Quick Suggestions ───────────────────────────────── */}
                        {messages.length <= 1 && (
                            <div className="flex flex-wrap gap-2 border-t border-white/5 px-4 py-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                                {quickSuggestions.map((suggestion) => (
                                    <button
                                        key={suggestion.label}
                                        onClick={() => sendMessage(suggestion.message)}
                                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
                                    >
                                        {suggestion.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* ── Input Area ──────────────────────────────────────── */}
                        <div
                            className="flex items-center gap-2 px-4 py-3"
                            style={{
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                                background: "rgba(255,255,255,0.02)",
                            }}
                        >
                            <input
                                ref={inputRef}
                                id="chatbot-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about a course or topic..."
                                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-indigo-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-400/20"
                            />
                            <button
                                id="chatbot-send"
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isTyping}
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-30"
                                style={{
                                    background: input.trim() ? "linear-gradient(135deg, #6366f1, #3b82f6)" : "rgba(255,255,255,0.05)",
                                    boxShadow: input.trim() ? "0 4px 15px rgba(99, 102, 241, 0.3)" : "none",
                                }}
                                aria-label="Send message"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
