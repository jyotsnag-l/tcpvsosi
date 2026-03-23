import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import Spinner from './Spinner';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  content: string;
  scenarioName: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, isLoading, content, scenarioName }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-cyan-400">Simulation Report: {scenarioName}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopy}
              disabled={isLoading || !content}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white disabled:opacity-50"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </header>
        <main className="p-6 overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Spinner />
              <p className="mt-4 text-slate-300">Generating your report with Gemini...</p>
              <p className="text-sm text-slate-500">This may take a moment.</p>
            </div>
          ) : (
            <div 
              className="prose prose-invert prose-sm md:prose-base max-w-none text-slate-300 whitespace-pre-wrap font-sans"
              dangerouslySetInnerHTML={{ __html: content.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>').replace(/### (.*)/g, '<h3 class="text-lg font-semibold text-cyan-300 mt-4 mb-2">$1</h3>').replace(/## (.*)/g, '<h2 class="text-xl font-bold text-cyan-400 mt-6 mb-3">$1</h2>').replace(/-\s/g, '• ') }}
            >
            </div>
          )}
        </main>
      </div>
      <style>{`
        @keyframes fade-in-fast {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ReportModal;
