
import React from 'react';
import { MusicNoteIcon } from './icons';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <MusicNoteIcon className="w-16 h-16 text-purple-400 animate-float" />
        <div className="absolute top-0 left-0 w-16 h-16 border-2 border-purple-400 rounded-full animate-ping"></div>
      </div>
      <p className="text-lg text-gray-300 tracking-wider">Crafting your masterpiece...</p>
    </div>
  );
};

export default Loader;
