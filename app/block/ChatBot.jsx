"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [mode] = useState("flash");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const buttonSize = 46; // Width/height of the button

  // Initialize position based on screen size
  useEffect(() => {
    const updatePosition = () => {
      if (typeof window !== "undefined") {
        const maxX = window.innerWidth - buttonSize;
        const maxY = window.innerHeight - buttonSize;

        if (window.innerWidth < 640) {
          setPosition({
            x: Math.min(maxX, window.innerWidth - 100),
            y: Math.min(maxY, window.innerHeight - 100),
          });
        } else if (window.innerWidth < 768) {
          setPosition({
            x: Math.min(maxX, window.innerWidth - 100),
            y: Math.min(maxY, window.innerHeight - 100),
          });
        } else {
          setPosition({
            x: Math.min(maxX, window.innerWidth - 140),
            y: Math.min(maxY, window.innerHeight - 120),
          });
        }
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  /** 🖱️ Mouse Handlers **/
  const handleMouseDown = (e) => {
    if (buttonRef.current && !isOpen) {
      setIsDragging(true);
      const rect = buttonRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const maxX = window.innerWidth - buttonSize;
      const maxY = window.innerHeight - buttonSize;
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /** 📱 Touch Handlers **/
  const handleTouchStart = (e) => {
    if (buttonRef.current && !isOpen) {
      setIsDragging(true);
      const rect = buttonRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;
      const maxX = window.innerWidth - buttonSize;
      const maxY = window.innerHeight - buttonSize;
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  /** 🌀 Attach Events **/
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isDragging, dragOffset]);

  /** 💬 Chat Logic **/
  const suggestions = [
    "Show me Dave's projects",
    "Tell me his experiences",
    "What are his social links?",
  ];

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, mode }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot", text: data.reply || data.error },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        { role: "bot", text: "⚠️ Connection error. Try again later." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={() => !isDragging && setIsOpen(true)}
          className="fixed z-50 p-[10px] rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:scale-110 transform transition-all duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transition: isDragging ? "none" : "all 0.3s ease-out",
            transform: isDragging ? "scale(1.1)" : "",
            boxShadow: isDragging ? "0 10px 25px rgba(0, 0, 0, 0.2)" : "",
          }}
        >
          <MessageCircle size={26} />
        </button>
      )}

      {/* Overlay + Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
          ></div>

          {/* Chat Window */}
          <div className="relative z-10 w-[90vw] max-w-[300px] h-[70vh] sm:max-w-[360px] sm:h-[70vh] md:max-w-[420px] md:h-[75vh] lg:max-w-[460px] lg:h-[75vh] xl:max-w-[500px] xl:h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up transition-all duration-300 ease-out">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md border-b border-white/20 transition-colors duration-300">
              <h2 className="font-semibold text-lg">💬 Dave AI Assistant</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/20 transition-all duration-200 ease-in-out"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 glass-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex transition-all duration-300 ease-in-out ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow-md animate-fade-in transition-all duration-300 ease-in-out ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none"
                        : "bg-white/20 text-gray-100 backdrop-blur-sm rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length === 0 && (
              <div className="p-3 flex flex-wrap gap-2 border-t border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(s)}
                    className="px-3 py-1 text-xs rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 ease-in-out"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center border-t border-white/20 bg-white/10 backdrop-blur-md p-2 transition-all duration-300">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out text-sm sm:text-base"
                placeholder="Type a message..."
              />
              <button
                onClick={() => sendMessage()}
                className="ml-2 p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-90 transition-all duration-200 ease-in-out"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations + Scrollbar Styles */}
      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .glass-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .glass-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .glass-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(6px);
          transition: background 0.3s ease;
        }
        .glass-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </>
  );
}
