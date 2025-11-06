import React, { useState, useEffect } from 'react';
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

const App: React.FC = () => {
    const lang: Language = 'en'; // UI language is always English
    const [page, setPage] = useState<Page>('home');
    const [briefData, setBriefData] = useState<AnyBriefData | null>(null);
    const [isChatOpen, setChatOpen] = useState(false);

    useEffect(() => {
        const t = translations[lang];
        document.title = t.pageTitle;
    }, [lang]);

    const handleNavigate = (newPage: Page) => {
        setPage(newPage);
    };

    const handleOpenChat = () => {
        if (briefData && briefData.type === 'logo') {
            setChatOpen(true);
        }
    };
    
    const handleCloseChat = () => {
        setChatOpen(false);
    };

    const handleBriefGenerated = (data: AnyBriefData) => {
        setBriefData(data);
        setPage('home');
         // Scroll to the brief output after a short delay to allow the page to render
        setTimeout(() => {
            const briefElement = document.getElementById('brief-output');
            briefElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

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