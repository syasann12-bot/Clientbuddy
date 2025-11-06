import React, { useEffect, useRef } from 'react';
import { translations } from '../constants';
import type { Language, PresentationBriefData } from '../types';

interface PresentationBriefDisplayProps {
    data: PresentationBriefData;
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

const PresentationBriefDisplay: React.FC<PresentationBriefDisplayProps> = ({ data, lang }) => {
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
            <SectionHeader labelKey="presentationGoals" lang={lang} />
            <KeyValuePair labelKey="presentationTitle" content={data.presentationTitle} lang={lang} />
            <KeyValuePair labelKey="objective" content={data.objective} lang={lang} />
            <KeyValuePair labelKey="audience" content={data.audience} lang={lang} />
            <KeyValuePair labelKey="industry" content={data.industry} lang={lang} />
            <KeyValuePair labelKey="clientPersonality" content={personalityName} lang={lang} />

            <SectionHeader labelKey="contentAndStructure" lang={lang} />
            <KeyValuePair labelKey="keyMessage" content={data.keyMessage} lang={lang} />
            <KeyValuePair labelKey="slideCount" content={data.slideCount} lang={lang} />
            
            <SectionHeader labelKey="visualDirection" lang={lang} />
            <KeyValuePair labelKey="visualStyle" content={data.visualStyle} lang={lang} />
        </div>
    );
};

export default PresentationBriefDisplay;