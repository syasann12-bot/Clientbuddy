
import React, { useState, useEffect, useCallback } from 'react';
import { translations, regionMapping, detailedIndustryMapping, detailedDesignCategoryMapping } from '../constants';
import type { Language, AnyBriefData, DesignCategory } from '../types';
import { generateBrief, translateBrief } from '../services/geminiService';
import LogoBriefDisplay from './BriefDisplay';
import WebBriefDisplay from './WebBriefDisplay';
import BrandBriefDisplay from './BrandBriefDisplay';
import PresentationBriefDisplay from './PresentationBriefDisplay';
import CoverBriefDisplay from './CoverBriefDisplay';
import Spinner from './Spinner';
import SearchableSelect from './SearchableSelect';

interface HomePageProps {
    lang: Language; // UI language, now always 'en'
    setBriefData: (data: AnyBriefData | null) => void;
    briefData: AnyBriefData | null;
    onOpenChat: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ lang, setBriefData, briefData, onOpenChat }) => {
    const [designCategory, setDesignCategory] = useState<DesignCategory>('logo_design');
    const [region, setRegion] = useState('region_global');
    const [industry, setIndustry] = useState('tech_software_dev');
    const [isLoading, setIsLoading] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [translatedBrief, setTranslatedBrief] = useState<AnyBriefData | null>(null);

    const t = translations[lang];

    // When a new brief is generated externally (e.g., from Daily Challenge), clear the translation.
    useEffect(() => {
        setTranslatedBrief(null);
    }, [briefData]);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setBriefData(null);
        setTranslatedBrief(null);
        try {
            const data = await generateBrief(region, industry, designCategory, 'en');
            setBriefData(data);
        } catch (err) {
            console.error(err);
            setError((err as Error).message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [region, industry, designCategory, setBriefData]);
    
    const handleTranslate = useCallback(async () => {
        if (!briefData) return;

        setIsTranslating(true);
        setError(null);
        try {
            const translatedData = await translateBrief(briefData, 'id');
            setTranslatedBrief(translatedData);
        } catch (err) {
            console.error(err);
            setError((err as Error).message || 'An unknown error occurred during translation.');
        } finally {
            setIsTranslating(false);
        }
    }, [briefData]);

    const dataToDisplay = translatedBrief || briefData;
    const currentBriefLang = dataToDisplay?.lang || 'en';
    
    const isChatDisabled = !briefData || isLoading || isTranslating || (briefData && briefData.type !== 'logo');

    return (
        <div className="page-animation bg-white w-full max-w-3xl rounded-2xl shadow-2xl shadow-blue-100/50 border border-gray-200/80 p-6 sm:p-10 md:p-14">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.mainTitle}</h1>
                <p className="text-lg text-gray-600 mt-3">{t.mainSubtitle}</p>
            </div>

            <div className="space-y-5 mb-8">
                 <div>
                    <label htmlFor="design-category-select" className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{t.designCategoryLabel}</label>
                    <SearchableSelect
                        options={detailedDesignCategoryMapping}
                        value={designCategory}
                        onChange={(value) => setDesignCategory(value as DesignCategory)}
                        lang={'en'}
                        placeholder={t.searchCategoryPlaceholder}
                        disabled={isLoading || isTranslating}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div>
                        <label htmlFor="region-select" className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{t.regionLabel}</label>
                        <select
                            id="region-select"
                            value={region}
                            disabled={isLoading || isTranslating}
                            onChange={(e) => setRegion(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition-all duration-200 focus:shadow-md focus:shadow-blue-100 focus:border-blue-400 disabled:opacity-50 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                            {regionMapping.map(item => (
                                <option key={item.key} value={item.key}>{translations['en'][item.key]}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="industry-select" className="block text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">{t.industryLabel}</label>
                        <SearchableSelect
                            options={detailedIndustryMapping}
                            value={industry}
                            onChange={setIndustry}
                            lang={'en'}
                            placeholder={t.searchIndustryPlaceholder}
                            disabled={isLoading || isTranslating}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || isTranslating}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
                >
                    {isLoading ? <><Spinner /> {t.generateBtnLoading}</> : t.generateBtn}
                </button>
                <button
                    onClick={onOpenChat}
                    disabled={isChatDisabled}
                    className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {t.brainstormBtn}
                </button>
            </div>
            
             {dataToDisplay && (
                <div className="mt-8 border-t pt-4 flex justify-end">
                    {isTranslating ? (
                        <button disabled className="flex items-center text-sm font-semibold text-gray-500 cursor-wait">
                            <Spinner /> {t.translating}
                        </button>
                    ) : (
                        currentBriefLang === 'en' ? (
                            <button onClick={handleTranslate} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                {t.translateToID}
                            </button>
                        ) : (
                            <button onClick={() => setTranslatedBrief(null)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                {t.showInEN}
                            </button>
                        )
                    )}
                </div>
            )}
            
            <div id="brief-output" className={`mt-4 ${isTranslating ? 'opacity-50 transition-opacity' : ''}`}>
                {error && (
                     <div className="text-red-600 font-semibold p-4 bg-red-50 rounded-lg">
                        <p>{t.apiError}</p>
                        <p className="text-gray-500 text-sm mt-1">{t.apiErrorDetails} {error}</p>
                    </div>
                )}
                {dataToDisplay && dataToDisplay.type === 'logo' && <LogoBriefDisplay data={dataToDisplay} lang={dataToDisplay.lang} />}
                {dataToDisplay && dataToDisplay.type === 'web' && <WebBriefDisplay data={dataToDisplay} lang={dataToDisplay.lang} />}
                {dataToDisplay && dataToDisplay.type === 'brand' && <BrandBriefDisplay data={dataToDisplay} lang={dataToDisplay.lang} />}
                {dataToDisplay && dataToDisplay.type === 'presentation' && <PresentationBriefDisplay data={dataToDisplay} lang={dataToDisplay.lang} />}
                {dataToDisplay && dataToDisplay.type === 'cover' && <CoverBriefDisplay data={dataToDisplay} lang={dataToDisplay.lang} />}
            </div>
        </div>
    );
};

export default HomePage;
