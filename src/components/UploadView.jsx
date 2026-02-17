import { useState, useRef } from "react";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";

export default function UploadView({ onUploadStart }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const validateJSON = (data) => {
    // Validate the INPUT structure (what we upload)
    const requiredInputFields = [
      "application_id",
      "applicant_details",
      "bureau_data",
    ];

    for (const field of requiredInputFields) {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate applicant_details structure
    const requiredApplicantFields = ["name", "age", "city_tier"];
    for (const field of requiredApplicantFields) {
      if (!(field in data.applicant_details)) {
        throw new Error(
          `Missing required field in applicant_details: ${field}`,
        );
      }
    }

    return true;
  };

  const handleFile = async (file) => {
    setError(null);
    setSuccess(null);

    // Validate file type
    if (!file.name.endsWith(".json")) {
      setError("Please upload a JSON file");
      return;
    }

    try {
      const text = await file.text();
      let jsonData = JSON.parse(text);

      validateJSON(jsonData);

      // Construct API payload with ONLY the required fields
      // DO NOT send simulation_results (keep it in mock data for testing)
      const apiPayload = {
        application_id: jsonData.application_id,
        applicant_details: jsonData.applicant_details,
        bureau_data: jsonData.bureau_data,
      };

      setSuccess(`✓ Loaded ${file.name}`);
      setTimeout(() => {
        onUploadStart(apiPayload);
      }, 500);
    } catch (err) {
      setError(
        err instanceof SyntaxError
          ? "Invalid JSON format"
          : err.message || "Error processing file",
      );
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/* Main Upload Zone - Dashed Border Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full max-w-2xl p-16 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          dragActive
            ? "border-blue-500/100 bg-blue-500/10 bg-slate-900/50"
            : "border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-900/30"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-6">
          <Upload
            size={64}
            className={`${
              dragActive ? "text-blue-400 scale-110" : "text-blue-400"
            } animate-bounce transition-transform`}
          />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-100">
              Upload Bureau Data
            </h2>
            <p className="text-slate-400 mt-3 text-lg">
              Drag &amp; drop JSON file or click to browse
            </p>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="w-full max-w-2xl flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="w-full max-w-2xl flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
          <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}

      {/* Demo Data Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => onUploadStart("aarav")}
          className="px-8 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium text-lg cursor-pointer"
        >
          Load "Aarav" (Resilient)
        </button>
        <button
          onClick={() => onUploadStart("vikram")}
          className="px-8 py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-lg cursor-pointer"
        >
          Load "Vikram" (Risky)
        </button>
      </div>
    </div>
  );
}
