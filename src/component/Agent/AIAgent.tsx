"use client";

import { useState, useEffect, useRef } from "react";

interface UserProfile {
  name: string;
  avatarUrl?: string;
}

interface ChatMessage {
  text: string;
  sender: "bot" | "user";
  timestamp: string;
}

type AgentType =
  | "onboarding"
  | "learning"
  | "support"
  | "shopping"
  | "creative"
  | "productivity";

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: { transcript: string };
    };
  };
}

interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

declare global {
  interface SpeechRecognitionConstructor {
    new (): ISpeechRecognition;
  }
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function AIAgent() {
  const user: UserProfile = { name: "Caleb" };

  // Load from localStorage safely
  const loadFromLocal = (): { history: ChatMessage[]; agent: AgentType } => {
    if (typeof window === "undefined") {
      return { history: [], agent: "onboarding" };
    }
    const savedHistory = window.localStorage.getItem("lamid_ai_chat");
    const savedAgent = window.localStorage.getItem("lamid_ai_agent");

    const validAgent: AgentType =
      savedAgent === "learning" ||
      savedAgent === "support" ||
      savedAgent === "shopping" ||
      savedAgent === "creative" ||
      savedAgent === "productivity" ||
      savedAgent === "onboarding"
        ? (savedAgent as AgentType)
        : "onboarding";

    return {
      history: savedHistory ? JSON.parse(savedHistory) : [],
      agent: validAgent,
    };
  };

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(
    () => loadFromLocal().history
  );
  const [activeAgent, setActiveAgent] = useState<AgentType>(
    () => loadFromLocal().agent
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const getTimestamp = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Routing logic
  const routeMessage = (msg: string) => {
    if (/learn|study|course/i.test(msg)) {
      setActiveAgent("learning");
    } else if (/help|issue|support/i.test(msg)) {
      setActiveAgent("support");
    } else if (/buy|price|shop/i.test(msg)) {
      setActiveAgent("shopping");
    } else if (/idea|design|write/i.test(msg)) {
      setActiveAgent("creative");
    } else if (/schedule|remind|task/i.test(msg)) {
      setActiveAgent("productivity");
    } else {
      setActiveAgent("onboarding");
    }
  };

  // Handle user message
  const handleMessage = (msg: string) => {
    setChatHistory((prev) => [
      ...prev,
      { text: msg, sender: "user", timestamp: getTimestamp() },
    ]);
    setIsThinking(true);

    setTimeout(() => {
      routeMessage(msg);

      let response = "";
      switch (activeAgent) {
        case "onboarding":
          response =
            "👋 Welcome! I’m your onboarding assistant. Tell me what you’d like to do and I’ll connect you to the right agent.";
          break;
        case "learning":
          response =
            "📘 I’ll hand you over to our Learning Agent to guide your studies.";
          break;
        case "support":
          response =
            "🛠️ Redirecting you to our Support Agent for troubleshooting.";
          break;
        case "shopping":
          response =
            "🛒 Let’s connect you with our Shopping Agent for product discovery.";
          break;
        case "creative":
          response =
            "🎨 Our Creative Agent will help brainstorm and design ideas.";
          break;
        case "productivity":
          response =
            "⏰ Our Productivity Agent will assist with scheduling and tasks.";
          break;
      }

      setChatHistory((prev) => [
        ...prev,
        { text: response, sender: "bot", timestamp: getTimestamp() },
      ]);
      setIsThinking(false);
    }, 1200);
  };

  // Save + sync
  const saveToLocal = (history: ChatMessage[], agent: AgentType) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("lamid_ai_chat", JSON.stringify(history));
    window.localStorage.setItem("lamid_ai_agent", agent);
  };

  const syncWithBackend = async (history: ChatMessage[], agent: AgentType) => {
    try {
      await fetch("/api/chat-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, agent }),
      });
    } catch (err) {
      console.error("Backend sync failed:", err);
    }
  };

  useEffect(() => {
    saveToLocal(chatHistory, activeAgent);
    const isSignedIn = true; // replace with real auth check
    if (isSignedIn) {
      syncWithBackend(chatHistory, activeAgent);
    }
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, activeAgent]);

  // Speech recognition setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) return;

    const recognition: ISpeechRecognition = new SpeechRecognitionConstructor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      handleMessage(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && !isMinimized && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#c21219] to-[#a40e14] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition z-40"
        >
          <img src="/ailogo.png" alt="Lamid AI" className="w-8 h-8" />
        </button>
      )}

      {/* Minimized Bubble */}
      {isMinimized && !isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-[#c21219] to-[#a40e14] rounded-full flex items-center justify-center shadow-lg z-40 hover:scale-105 transition"
        >
          <img src="/ailogo.png" alt="Lamid AI" className="w-6 h-6" />
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 w-[90%] sm:w-[420px] max-h-[80vh] 
          bg-black/60 backdrop-blur-xl border border-[#c21219]/40 rounded-2xl shadow-2xl overflow-hidden 
          transition-all duration-300 ease-out z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#c21219] to-[#a40e14] text-white">
            <h2 className="font-semibold">
              {activeAgent === "onboarding"
                ? "Onboarding Assistant"
                : `${
                    activeAgent.charAt(0).toUpperCase() + activeAgent.slice(1)
                  } Agent`}
            </h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsMinimized(true); // ✅ always minimize instead of disappearing
              }}
              className="text-white hover:text-gray-200 transition"
            >
              ⤢
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-[60vh] sm:h-[65vh] overflow-y-auto text-white p-4 space-y-4 flex flex-col">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.sender === "bot"
                    ? "self-start flex-row"
                    : "self-end flex-row-reverse"
                }`}
              >
                <div
                  className={`max-w-[70%] text-sm p-3 rounded-2xl shadow-md ${
                    msg.sender === "bot"
                      ? "bg-gray-800/70 text-gray-100 rounded-tl-none"
                      : "bg-gradient-to-r from-[#c21219] to-[#a40e14] text-white rounded-tr-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-400 mt-1">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-end gap-2 self-start">
                <div className="flex gap-1 p-3 bg-gray-800/70 rounded-2xl w-fit">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#c21219]/40 bg-black/40 backdrop-blur-md p-3 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-gray-400"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  handleMessage(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />

            {/* Mic Button */}
            <button
              className={`px-3 py-1 rounded-lg text-sm text-white transition ${
                isListening
                  ? "bg-red-600 animate-pulse"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => recognitionRef.current?.start()}
            >
              🎤
            </button>

            {/* Stop Button */}
            {isListening && (
              <button
                className="bg-gray-500 px-3 py-1 rounded-lg text-sm text-white hover:bg-gray-400 transition"
                onClick={() => recognitionRef.current?.stop()}
              >
                ⏹
              </button>
            )}

            {/* Send Button */}
            <button
              className="bg-gradient-to-r from-[#c21219] to-[#a40e14] px-3 py-1 rounded-lg text-sm text-white hover:opacity-90 transition"
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>(
                  "input[placeholder='Type your message...']"
                );
                if (input && input.value.trim()) {
                  handleMessage(input.value);
                  input.value = "";
                }
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
