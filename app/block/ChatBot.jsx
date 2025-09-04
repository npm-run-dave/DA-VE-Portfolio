"use client";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [mode] = useState("flash"); // flash = fast, pro = smart

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, mode }),
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
    <div className="fixed bottom-[25px] right-[120px] z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:scale-110 transform transition duration-300"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md border-b border-white/20">
            <h2 className="font-semibold text-lg">💬 Dave AI Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-white/20 transition duration-200"
            >
              <X size={20} />
            </button>
          </div>

         

          <div className="flex-1 overflow-y-auto p-4 space-y-3 glass-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex transition-opacity duration-300 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow-md animate-fade-in ${
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

          <div className="flex items-center border-t border-white/20 bg-white/10 backdrop-blur-md p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 hover:opacity-90 transition duration-200"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in;
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
          }
          to {
            opacity: 1;
          }
        }

        /* Glass Effect Scrollbar */
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
        }
        .glass-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
