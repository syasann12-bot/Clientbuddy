
import React, { useState, useEffect, useCallback } from 'react';
import { translations } from './constants';
import type { Language, Page, AnyBriefData } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ChatModal from './components/ChatModal';
import FeedbackPage from './components/FeedbackPage';
import DailyChallengePage from './components/DailyChallengePage';
import ScenarioPage from './components/ScenarioPage';
import { apiKey } from './services/geminiService';

const ApiKeyMissingScreen = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl shadow-red-100/50 border border-red-200/80 max-w-md mx-auto">
            <svg className="mx-auto h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="mt-5 text-2xl font-bold text-gray-800">Configuration Error</h2>
            <p className="mt-2 text-gray-600">
                The <code className="bg-red-100 text-red-700 font-mono text-sm px-1 py-0.5 rounded">API_KEY</code> environment variable is not set.
            </p>
            <p className="mt-4 text-gray-600">
                This application requires a Google Gemini API key to function. Please set up the <code className="bg-red-100 text-red-700 font-mono text-sm px-1 py-0.5 rounded">API_KEY</code> in your environment and then refresh the page.
            </p>
        </div>
    </div>
);


const App: React.FC = () => {
    const lang: Language = 'en'; // UI language is always English
    const [page, setPage] = useState<Page>('home');
    const [briefData, setBriefData] = useState<AnyBriefData | null>(null);
    const [isChatOpen, setChatOpen] = useState(false);

    useEffect(() => {
        const t = translations[lang];
        document.title = t.pageTitle;
    }, [lang]);

    const handleNavigate = useCallback((newPage: Page) => {
        setPage(newPage);
    }, []);

    const handleOpenChat = useCallback(() => {
        if (briefData && briefData.type === 'logo') {
            setChatOpen(true);
        }
    }, [briefData]);
    
    const handleCloseChat = useCallback(() => {
        setChatOpen(false);
    }, []);

    const handleBriefGenerated = useCallback((data: AnyBriefData) => {
        setBriefData(data);
        setPage('home');
         // Scroll to the brief output after a short delay to allow the page to render
        setTimeout(() => {
            const briefElement = document.getElementById('brief-output');
            briefElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }, []);
    
    // Check for API Key. If it's missing, render the error screen.
    if (!apiKey) {
        return <ApiKeyMissingScreen />;
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar
                lang={lang}
                activePage={page}
                onNavigate={handleNavigate}
            />
            <main className="flex-grow w-full p-4 sm:p-6 md:p-10 flex items-center justify-center">
                {page === 'home' && (
                    <HomePage 
                        lang={lang} 
                        setBriefData={handleBriefGenerated}
                        briefData={briefData}
                        onOpenChat={handleOpenChat}
                    />
                )}
                {page === 'about' && <AboutPage lang={lang} />}
                {page === 'feedback' && <FeedbackPage lang={lang} briefData={briefData} />}
                {page === 'challenge' && <DailyChallengePage lang={lang} onBriefGenerated={handleBriefGenerated} />}
                {page === 'scenario' && <ScenarioPage lang={lang} />}
            </main>
            <Footer lang={lang} />
            {briefData && briefData.type === 'logo' && (
                <ChatModal
                    isOpen={isChatOpen}
                    onClose={handleCloseChat}
                    lang={lang}
                    briefData={briefData}
                />
            )}
        </div>
    );
};

export default App;
