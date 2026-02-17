import { useEffect, useState } from "react";
import { Cpu } from "lucide-react";

const TERMINAL_MESSAGES = [
  "> Parsing Bureau Data (JSON)...",
  "> Constructing Digital Twin...",
  "> Inferred Spending Elasticity: 0.85...",
  "> Loading 2026 Scenario Library...",
  "> Running 1,000 Monte Carlo Simulations...",
  "> Aggregating Risk Score...",
];

export default function ProcessingView() {
  const [messages, setMessages] = useState([TERMINAL_MESSAGES[0]]);

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % TERMINAL_MESSAGES.length;
      setMessages((prev) => [...prev, TERMINAL_MESSAGES[messageIndex]]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/* Spinning Loader - Cyan/Blue animated circle */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 animate-spin">
            <Cpu size={96} className="text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Fake Terminal */}
      <div className="w-full max-w-md bg-black/50 border border-slate-700/50 rounded-lg p-4 font-mono text-sm">
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {messages.map((msg, idx) => (
            <p key={idx} className="text-green-400">
              {msg}
            </p>
          ))}
          <p className="text-green-400 animate-pulse">_</p>
        </div>
      </div>

      <p className="text-slate-400 text-sm font-mono">Processing...</p>
    </div>
  );
}
