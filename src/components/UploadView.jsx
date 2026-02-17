import { Upload } from "lucide-react";
import Card from "./Card";

export default function UploadView({ onUploadStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/* Main Upload Zone - Dashed Border Dropzone */}
      <div
        onClick={() => onUploadStart("aarav")}
        className="w-full max-w-2xl p-16 border-2 border-dashed border-slate-600/50 rounded-xl hover:border-slate-500/70 transition-colors cursor-pointer hover:bg-slate-900/30"
      >
        <div className="flex flex-col items-center gap-6">
          <Upload size={64} className="text-blue-400 animate-bounce" />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-100">
              Upload Bureau Data
            </h2>
            <p className="text-slate-400 mt-3 text-lg">
              Drag &amp; drop JSON or XML
            </p>
          </div>
        </div>
      </div>

      {/* Mock Data Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => onUploadStart("aarav")}
          className="px-8 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium text-lg"
        >
          Load "Aarav" (Resilient)
        </button>
        <button
          onClick={() => onUploadStart("vikram")}
          className="px-8 py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-lg"
        >
          Load "Vikram" (Risky)
        </button>
      </div>
    </div>
  );
}
