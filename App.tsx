
import React, { useState, useCallback } from 'react';
import { Genre, Mood } from './types';
import { GENRES, MOODS } from './constants';
import { generateLyrics } from './services/geminiService';
import OptionSelector from './components/OptionSelector';
import Loader from './components/Loader';
import LyricDisplay from './components/LyricDisplay';
import { MusicNoteIcon } from './components/icons';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('summer road trip');
  const [genre, setGenre] = useState<Genre>(Genre.Pop);
  const [mood, setMood] = useState<Mood>(Mood.Happy);
  const [lyrics, setLyrics] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for your song.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setLyrics('');

    try {
      const result = await generateLyrics(topic, genre, mood);
      setLyrics(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, genre, mood]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="text-center mb-8 md:mb-12">
        <div className="flex justify-center items-center gap-4">
          <MusicNoteIcon className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            LyricCraft AI
          </h1>
        </div>
        <p className="text-gray-400 mt-2">Your AI partner in songwriting</p>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center gap-8">
        <div className="w-full bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700 space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-400 mb-2">
              Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., first love, space travel, rainy days"
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
          </div>

          <OptionSelector label="Genre" options={GENRES} selectedValue={genre} onSelect={setGenre} />
          <OptionSelector label="Mood" options={MOODS} selectedValue={mood} onSelect={setMood} />

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Generating...' : 'Craft Lyrics'}
          </button>
        </div>

        {error && (
          <div className="w-full max-w-2xl bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {isLoading && <Loader />}
        
        {lyrics && !isLoading && <LyricDisplay lyrics={lyrics} />}
      </main>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
