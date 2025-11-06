import React, { useState, useRef, useEffect } from 'react';
import { translations, clientAvatars, detailedDesignCategoryMapping, detailedIndustryMapping } from '../constants';
import { generateBrief, getDesignFeedback, getFinalReview } from '../services/geminiService';
import type { Language, AnyBriefData, ScenarioInteraction, FinalReview, LogoBriefData, WebBriefData, BrandBriefData, PresentationBriefData, CoverBriefData, DesignCategory, ClientFeedback, UserSubmission } from '../types';
import Spinner from './Spinner';
import LogoBriefDisplay from './BriefDisplay';
import WebBriefDisplay from './WebBriefDisplay';
import BrandBriefDisplay from './BrandBriefDisplay';
import PresentationBriefDisplay from './PresentationBriefDisplay';
import CoverBriefDisplay from './CoverBriefDisplay';
import SubmissionModal from './SubmissionModal';
import ProjectHub from './ProjectHub';
import SearchableSelect from './SearchableSelect';
import { fileToBase64 } from '../utils';


type ProjectState = 'idle' | 'generating_brief' | 'in_progress' | 'submitting_revision' | 'completing_project' | 'completed';

const ScenarioPage: React.FC<{ lang: Language }> = ({ lang }) => {
    const [projectState, setProjectState] = useState<ProjectState>('idle');
    const [briefData, setBriefData] = useState<AnyBriefData | null>(null);
    const [interactions, setInteractions] = useState<ScenarioInteraction[]>([]);
    const [finalReview, setFinalReview] = useState<FinalReview | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    
    // State for setup form
    const [briefLang, setBriefLang] = useState<Language>('en');
    const [designCategory, setDesignCategory] = useState<DesignCategory>('logo_design');
    const [industry, setIndustry] = useState('tech_software_dev');

    const t = translations[lang];
    const timelineEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        timelineEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [interactions, finalReview]);

    const handleStartProject = async () => {
        setProjectState('generating_brief');
        setError(null);
        setInteractions([]);
        setBriefData(null);
        setFinalReview(null);

        try {
            const data = await generateBrief(briefLang, 'region_global', industry, designCategory);
            setBriefData(data);
            setInteractions([{ id: Date.now(), content: data }]);
            setProjectState('in_progress');
        } catch (err) {
            console.error(err);
            setError((err as Error).message || 'An unknown error occurred.');
            setProjectState('idle');
        }
    };

    const handleResetScenario = () => {
        setProjectState('idle');
        setBriefData(null);
        setInteractions([]);
        setFinalReview(null);
        setError(null);
    };

    const handleRevisionSubmit = async (imageFile: File, submissionNote: string) => {
        if (!briefData) return;
        setIsSubmissionModalOpen(false);
        setProjectState('submitting_revision');
        setError(null);

        try {
            const { data: base64Data, mimeType, preview } = await fileToBase64(imageFile);
            
            const userSubmissionContent = { type: 'user_submission' as const, imagePreview: preview, submissionNote };
            const userInteraction: ScenarioInteraction = { id: Date.now(), content: userSubmissionContent };

            // Use a function for the state update to get the latest state
            setInteractions(prev => [...prev, userInteraction]);

            const feedbackResult = await getDesignFeedback(base64Data, mimeType, briefData, lang, submissionNote);
            
            const clientFeedbackContent = { type: 'client_feedback' as const, feedback: feedbackResult };
            const clientInteraction: ScenarioInteraction = { id: Date.now() + 1, content: clientFeedbackContent };
            
            setInteractions(prev => [...prev, clientInteraction]);
            setProjectState('in_progress');
        } catch (err) {
            console.error(err);
            setError((err as Error).message || 'An unknown error occurred.');
            setProjectState('in_progress');
        }
    };
    
    const handleCompleteProject = async () => {
        if (!briefData) return;
        setProjectState('completing_project');
        setError(null);
        try {
            const review = await getFinalReview(briefData, interactions, lang);
            setFinalReview(review);
            setProjectState('completed');
        } catch (err) {
            console.error(err);
            setError((err as Error).message || 'An unknown error occurred.');
            setProjectState('in_progress');
        }
    };

    return (
        <div className="page-animation w-full max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.scenarioTitle}</h1>
                <p className="text-lg text-gray-600 mt-3">{t.scenarioSubtitle}</p>
            </div>
            
            {projectState === 'idle' && (
                <div className="bg-white w-full max-w-2xl mx-auto rounded-2xl shadow-xl shadow-blue-100/50 border border-gray-200/80 p-6 sm:p-10 md:p-14">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">{t.scenarioSetupTitle}</h2>
                    </div>
                    <div className="space-y-5 mb-8">
                        <div>
                            <label htmlFor="scenario-design-category-select" className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{t.designCategoryLabel}</label>
                            <SearchableSelect
                                options={detailedDesignCategoryMapping}
                                value={designCategory}
                                onChange={(value) => setDesignCategory(value as DesignCategory)}
                                lang={briefLang}
                                placeholder={t.searchCategoryPlaceholder}
                            />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                             <div>
                                <label htmlFor="scenario-brief-lang-select" className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{t.briefLangLabel}</label>
                                <select
                                    id="scenario-brief-lang-select"
                                    value={briefLang}
                                    onChange={(e) => setBriefLang(e.target.value as Language)}
                                    className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition-all duration-200 focus:shadow-md focus:shadow-blue-100"
                                >
                                    <option value="en">English</option>
                                    <option value="id">Bahasa Indonesia</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="scenario-industry-select" className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{t.industryLabel}</label>
                            <SearchableSelect
                                options={detailedIndustryMapping}
                                value={industry}
                                onChange={setIndustry}
                                lang={briefLang}
                                placeholder={t.searchIndustryPlaceholder}
                            />
                        </div>
                    </div>
                    <button onClick={handleStartProject} className="w-full flex items-center justify-center bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                       {t.startProjectBtn}
                    </button>
                </div>
            )}
            
            {projectState === 'generating_brief' && (
                 <div className="flex justify-center items-center p-12 bg-white rounded-2xl shadow-xl border border-gray-200/80">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-slate-700 font-semibold text-lg">{t.startingProject}</span>
                </div>
            )}

            {(projectState !== 'idle' && projectState !== 'generating_brief' && briefData) && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Project Hub */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                       <ProjectHub
                            briefData={briefData}
                            projectState={projectState}
                            finalReview={finalReview}
                            onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
                            onCompleteProject={handleCompleteProject}
                            onReset={handleResetScenario}
                            lang={lang}
                        />
                    </div>

                    {/* Right Column: Interaction Timeline */}
                    <div className="lg:col-span-8">
                         <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">{t.interactionTimeline}</h2>
                        <div className="relative border-l-2 border-slate-200 ml-5 pl-10 sm:ml-6 sm:pl-12 space-y-12">
                            {interactions.map(interaction => (
                                <InteractionNode key={interaction.id} interaction={interaction} lang={lang} t={t} briefData={briefData} />
                            ))}

                             {projectState === 'submitting_revision' && (
                                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center">
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-full shadow-lg">
                                        <svg className="animate-spin h-5 w-5 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        <span className="font-semibold text-slate-600 text-sm pr-2">{t.submittingRevision}</span>
                                    </div>
                                </div>
                            )}

                            {finalReview && projectState === 'completed' && (
                                <FinalReviewNode review={finalReview} t={t} />
                            )}
                             <div ref={timelineEndRef} />
                        </div>
                    </div>
                </div>
            )}

            {isSubmissionModalOpen && (
                 <SubmissionModal
                    isOpen={isSubmissionModalOpen}
                    onClose={() => setIsSubmissionModalOpen(false)}
                    onSubmit={handleRevisionSubmit}
                    isLoading={projectState === 'submitting_revision'}
                    t={t}
                />
            )}
        </div>
    );
};

const getIconForInteraction = (interaction: ScenarioInteraction['content']) => {
    if ('type' in interaction) {
        if (interaction.type === 'user_submission') return <UserSubmissionIcon />;
        if (interaction.type === 'client_feedback') return <ClientFeedbackIcon />;
    }
    return <InitialBriefIcon />; // Default for the brief
};

const InteractionNode: React.FC<{ interaction: ScenarioInteraction, lang: Language, t: any, briefData: AnyBriefData | null }> = ({ interaction, lang, t, briefData }) => {
    const content = interaction.content;
    const isBrief = !('type' in content);

    return (
        <div className="relative">
            <div className="absolute -left-[49px] sm:-left-[57px] top-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full ring-4 ring-white">
                {getIconForInteraction(content)}
            </div>
            <div className={`bg-white p-4 sm:p-6 rounded-xl shadow-md border border-slate-200/80 ${isBrief ? '-ml-5 sm:-ml-6' : ''}`}>
                <InteractionContent content={content} lang={lang} t={t} briefData={briefData} />
            </div>
        </div>
    );
};

const InteractionContent: React.FC<{ content: ScenarioInteraction['content'], lang: Language, t: any, briefData: AnyBriefData | null }> = ({ content, lang, t, briefData }) => {
    // --- User Submission Card ---
    if ('type' in content && content.type === 'user_submission') {
        return (
            <div>
                <h3 className="font-bold text-lg text-slate-800 mb-4">{t.yourSubmission}</h3>
                <div className="space-y-4">
                    {content.imagePreview && <img src={content.imagePreview} alt="Submission" className="max-w-lg w-full max-h-[500px] object-contain rounded-lg shadow-md mx-auto" />}
                    {content.submissionNote && <p className="w-full bg-slate-50 p-3 rounded-md text-slate-700 italic whitespace-pre-wrap">"{content.submissionNote}"</p>}
                </div>
            </div>
        );
    }
    
    // --- Client Feedback Card ---
    if ('type' in content && content.type === 'client_feedback') {
        const avatarEmoji = briefData?.clientPersonality ? clientAvatars[briefData.clientPersonality] : "👤";
        return (
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-lg flex-shrink-0">{avatarEmoji}</div>
                    <h3 className="font-bold text-lg text-slate-800">{t.clientFeedback}</h3>
                </div>
                <div className="whitespace-pre-wrap break-words text-slate-700">{content.feedback}</div>
            </div>
        )
    }

    // --- Initial Brief Card ---
    const briefContent = content as AnyBriefData;
    return (
        <div>
            <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-slate-200 pb-3">{t.timeline_initial_brief}</h3>
            <div className="transform sm:scale-95 origin-top-left">
                {briefContent.type === 'logo' && <LogoBriefDisplay data={briefContent as LogoBriefData} lang={lang} />}
                {briefContent.type === 'web' && <WebBriefDisplay data={briefContent as WebBriefData} lang={lang} />}
                {briefContent.type === 'brand' && <BrandBriefDisplay data={briefContent as BrandBriefData} lang={lang} />}
                {briefContent.type === 'presentation' && <PresentationBriefDisplay data={briefContent as PresentationBriefData} lang={lang} />}
                {briefContent.type === 'cover' && <CoverBriefDisplay data={briefContent as CoverBriefData} lang={lang} />}
            </div>
        </div>
    )
};

const FinalReviewNode: React.FC<{ review: FinalReview, t: any }> = ({ review, t }) => {
    return (
        <div className="relative">
            <div className="absolute -left-[49px] sm:-left-[57px] top-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full ring-4 ring-white">
                <FinalReviewIcon />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-4">{t.finalReviewTitle}</h3>
                <div className="text-center mb-4">
                    <span className="text-gray-600 font-semibold">{t.clientRating}</span>
                    <div className="flex justify-center text-3xl mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="text-gray-600 font-semibold">{t.clientTestimonial}</span>
                    <blockquote className="mt-2 p-4 bg-yellow-50 rounded-md border border-yellow-200 italic text-gray-700">
                        "{review.testimonial}"
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

// --- ICONS ---
const InitialBriefIcon = () => (
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const UserSubmissionIcon = () => (
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

const ClientFeedbackIcon = () => (
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
);

const FinalReviewIcon = () => (
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);


export default ScenarioPage;
