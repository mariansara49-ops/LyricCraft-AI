
import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface LyricDisplayProps {
  lyrics: string;
}

const LyricDisplay: React.FC<LyricDisplayProps> = ({ lyrics }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(lyrics).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [lyrics]);

  return (
    <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6 relative animate-[fadeIn_0.5s_ease-in-out]">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-colors duration-200"
        aria-label="Copy lyrics to clipboard"
      >
        {copied ? (
          <CheckIcon className="w-5 h-5 text-green-400" />
        ) : (
          <CopyIcon className="w-5 h-5 text-gray-300" />
        )}
      </button>
      <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        Your Lyrics
      </h3>
      <pre className="whitespace-pre-wrap text-gray-300 font-sans text-base leading-relaxed">
        {lyrics}
      </pre>
    </div>
  );
};

export default LyricDisplay;
