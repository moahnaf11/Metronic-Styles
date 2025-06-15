import React, { useState } from "react";
import { metronicComponents } from "./components";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const filteredComponents = metronicComponents.filter((comp) =>
    comp.component.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search by component name..."
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-6">
        {filteredComponents.map((comp, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-1 text-gray-900">
                {comp.component}{" "}
                <span className="text-sm text-gray-500">({comp.type})</span>
              </h2>
              <button
                className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                onClick={() => handleCopy(comp.code, index)}
              >
                <Copy size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">{comp.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <div
                className={`px-3 py-1 rounded ${comp.bgColorTailwind} ${comp.frontColorTailwind}`}
              >
                {comp.text || "Preview"}
              </div>
            </div>

            <div className="relative">
              <SyntaxHighlighter
                language="jsx"
                style={materialLight}
                className="rounded-md border text-sm"
              >
                {comp.code}
              </SyntaxHighlighter>
              {copiedIndex === index && (
                <span className="text-green-500 text-sm absolute top-2 right-10">
                  Copied!
                </span>
              )}
            </div>
          </div>
        ))}
        {filteredComponents.length === 0 && (
          <p className="text-center text-gray-500">No components found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
