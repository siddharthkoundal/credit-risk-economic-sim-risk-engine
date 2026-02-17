import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import UploadView from "./components/UploadView";
import ProcessingView from "./components/ProcessingView";
import ResultsView from "./components/ResultsView";
import { MOCK_API_RESPONSE_AARAV, MOCK_API_RESPONSE_VIKRAM } from "./data";

function App() {
  const [view, setView] = useState("upload");
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (view === "processing") {
      const timer = setTimeout(() => {
        setView("results");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleUploadStart = async (profileOrData = "aarav") => {
    setView("processing");

    try {
      let dataToProcess;

      // Check if it's an object (uploaded data) or string (mock profile)
      if (typeof profileOrData === "object" && profileOrData !== null) {
        // Real API call with uploaded data
        console.log("Sending to API:", profileOrData);

        const response = await fetch(
          "https://monte-carlo-api-7y3n.onrender.com/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profileOrData),
          },
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        dataToProcess = await response.json();
        console.log("API Response:", dataToProcess);
      } else {
        // Mock profile
        dataToProcess =
          profileOrData === "vikram"
            ? MOCK_API_RESPONSE_VIKRAM
            : MOCK_API_RESPONSE_AARAV;
      }

      setResults(dataToProcess);
    } catch (error) {
      console.error("Error:", error);
      setResults({
        error: true,
        message: error.message || "Failed to process request",
      });
    }
  };

  const handleReset = () => {
    setResults(null);
    setView("upload");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-slate-700/50 bg-slate-950/95 backdrop-blur-sm">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-blue-400">LLMoneyMakers</h1>
          <p className="text-xs text-slate-400 font-medium">
            Neuro-Symbolic Risk Engine
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-400 text-xs rounded-full font-medium">
            v0.1 Beta
          </span>
          {view !== "upload" && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg transition-colors text-sm font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </header>

      {/* Content Area */}
      <main className="pt-20 pb-8 w-full">
        <AnimatePresence mode="wait">
          {view === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UploadView onUploadStart={handleUploadStart} />
            </motion.div>
          )}

          {view === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProcessingView />
            </motion.div>
          )}

          {view === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsView data={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
