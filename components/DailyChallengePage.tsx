import React, { useState, useEffect } from 'react';
import { translations } from '../constants';
import { getDailyChallenges, generateBrief } from '../services/geminiService';
import type { Language, DailyChallenge, AnyBriefData, DesignCategory } from '../types';
import Spinner from './Spinner';

interface DailyChallengePageProps {
    lang: Language;
    onBriefGenerated: (data: AnyBriefData) => void;
}

const DailyChallengePage: React.FC<DailyChallengePageProps> = ({ lang, onBriefGenerated }) => {
    const [challenges, setChallenges] = useState<DailyChallenge[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [generatingBriefFor, setGeneratingBriefFor] = useState<DesignCategory | null>(null);

    const t = translations[lang];
    const today = new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        const fetchChallenges = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const dailyChallenges = await getDailyChallenges(lang);
                setChallenges(dailyChallenges);
            } catch (err) {
                console.error(err);
                setError((err as Error).message || 'Failed to load daily challenges.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchChallenges();
    }, [lang]);

    const handleGenerateBrief = async (challenge: DailyChallenge) => {
        setGeneratingBriefFor(challenge.category);
        setError(null);
        try {
            // Fix: Corrected the arguments for generateBrief. The function expects (regionKey, industryKey, category, challengeContext?) and was being called with 5 incorrect arguments.
            const briefData = await generateBrief('region_global', challenge.industry, challenge.category, challenge);
            onBriefGenerated(briefData);
        } catch (err) {
            console.error(err);
            setError(`Failed to generate brief for "${challenge.projectName}". Please try again.`);
        } finally {
            setGeneratingBriefFor(null);
        }
    };

    const renderSkeleton = () => (
        <div className="bg-gray-100 p-6 rounded-lg animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
            <div className="flex gap-2">
                <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                <div className="h-6 bg-gray-300 rounded-full w-16"></div>
            </div>
            <div className="h-12 bg-gray-300 rounded-lg w-full mt-6"></div>
        </div>
    );

    return (
        <div className="page-animation w-full max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.challengeTitle}</h1>
                <p className="text-lg text-gray-600 mt-3">{t.challengeSubtitle}</p>
                <p className="text-md text-gray-500 mt-4 font-semibold">{t.challengeDate} {today}</p>
            </div>

             {error && (
                <div className="text-center text-red-600 font-semibold p-4 bg-red-50 rounded-lg mb-6">
                    <p>{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading && Array.from({ length: 9 }).map((_, i) => <div key={i}>{renderSkeleton()}</div>)}
                
                {challenges?.map((challenge) => (
                    <div key={challenge.category} className="bg-white border border-gray-200/80 rounded-2xl shadow-lg shadow-blue-100/30 p-6 flex flex-col transition-transform transform hover:-translate-y-1">
                        <div className="flex-grow">
                            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{t[`category_${challenge.category}`]}</h3>
                            <h2 className="text-xl font-bold text-gray-800 mt-2">{challenge.projectName}</h2>
                            <p className="text-gray-600 mt-2 text-base">{challenge.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {challenge.keywords.map(keyword => (
                                    <span key={keyword} className="deliverable-tag !bg-yellow-100 !border-yellow-300 !text-yellow-800 font-medium">{keyword}</span>
                                ))}
                            </div>
                        </div>
                         <button
                            onClick={() => handleGenerateBrief(challenge)}
                            disabled={generatingBriefFor !== null}
                            className="w-full mt-6 flex items-center justify-center bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                             {generatingBriefFor === challenge.category ? (
                                <>
                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                 {t.generatingBrief}
                                </>
                             ) : (
                                 t.generateBriefBtn
                             )}
                         </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyChallengePage;