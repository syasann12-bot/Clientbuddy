import React, { useEffect, useRef } from 'react';
import { translations } from '../constants';
import type { Language, CoverBriefData } from '../types';

interface CoverBriefDisplayProps {
    data: CoverBriefData;
    lang: Language;
}

const SectionHeader: React.FC<{ labelKey: string, lang: Language }> = ({ labelKey, lang }) => (
    <h2 className="brief-section-header">{translations[lang][labelKey]}</h2>
);

const KeyValuePair: React.FC<{ labelKey: string, content: string, lang: Language }> = ({ labelKey, content, lang }) => (
    <div className="brief-kv-pair">
        <span className="brief-label">{translations[lang][labelKey]}</span>
        <div className="brief-content">{content}</div>
    </div>
);

const CoverBriefDisplay: React.FC<CoverBriefDisplayProps> = ({ data, lang }) => {
    const t = translations[lang];
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (ref.current) {
                ref.current.classList.add('animate-in');
            }
        }, 10);
        return () => clearTimeout(timer);
    }, [data]);
    
    const personalityKey = 'p_' + data.clientPersonality;
    const personalityName = t[personalityKey] || data.clientPersonality;

    return (
        <div ref={ref}>
            <SectionHeader labelKey="projectDetails" lang={lang} />
            <KeyValuePair labelKey="coverTitle" content={data.coverTitle} lang={lang} />
            <KeyValuePair labelKey="author" content={data.author} lang={lang} />
            <KeyValuePair labelKey="genre" content={data.genre} lang={lang} />
            <KeyValuePair labelKey="industry" content={data.industry} lang={lang} />
            <KeyValuePair labelKey="clientPersonality" content={personalityName} lang={lang} />

            <SectionHeader labelKey="contentAndTone" lang={lang} />
            <KeyValuePair labelKey="synopsis" content={data.synopsis} lang={lang} />
            <KeyValuePair labelKey="mood" content={data.mood} lang={lang} />
            
            <SectionHeader labelKey="designRequirements" lang={lang} />
            <KeyValuePair labelKey="mustIncludeElements" content={data.mustIncludeElements} lang={lang} />
        </div>
    );
};

export default CoverBriefDisplay;