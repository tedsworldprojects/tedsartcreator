
import React, { useState, useCallback } from 'react';
import { generatePrompt } from './services/geminiService';
import PromptCard from './components/PromptCard';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setPrompt(''); 
        try {
            const newPrompt = await generatePrompt();
            setPrompt(newPrompt);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const InitialState = () => (
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🎨</div>
        <h2 className="text-2xl font-bold text-gray-200">Ready to create a masterpiece?</h2>
        <p className="text-gray-400 mt-2">Click the button below to generate a detailed prompt for your next creation.</p>
      </div>
    );
    
    const ErrorState = ({ message }: { message: string }) => (
      <div className="text-center bg-red-900/50 border border-red-700 p-6 rounded-lg">
        <div className="text-4xl mb-3">😔</div>
        <h2 className="text-xl font-bold text-red-300">Oops! Something went wrong.</h2>
        <p className="text-red-400 mt-2">{message}</p>
      </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/40 to-gray-900 text-white flex flex-col">
            <header className="p-6 text-center">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                    TEDS ART CREATOR
                </h1>
                <p className="text-gray-400 mt-2 max-w-lg mx-auto">Generate detailed, high-quality prompts.</p>
            </header>
            <main className="flex-grow flex items-center justify-center p-4 pb-36 md:pb-40">
              <div className="w-full max-w-2xl">
                {isLoading && <LoadingSpinner />}
                {!isLoading && error && <ErrorState message={error} />}
                {!isLoading && !error && prompt && <PromptCard markdownContent={prompt} />}
                {!isLoading && !error && !prompt && <InitialState />}
              </div>
            </main>
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="w-full max-w-sm px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
                    >
                        {isLoading ? 'Directing...' : 'Generate Art Prompt'}
                    </button>
                    <p className="text-xs text-gray-500">
                        &copy; 2025 TEDS WORLD PROJECTS Art creator v1.0
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;
