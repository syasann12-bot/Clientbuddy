import React, { useEffect, useRef } from 'react';
import { translations } from '../constants';
import type { Language, WebBriefData } from '../types';

interface WebBriefDisplayProps {
    data: WebBriefData;
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

const ListItems: React.FC<{ labelKey: string, items: string[], lang: Language }> = ({ labelKey, items, lang }) => (
     <div className="brief-kv-pair">
        <span className="brief-label">{translations[lang][labelKey]}</span>
        <div className="brief-content">
            <ul className="list-disc list-inside space-y-1">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    </div>
);

const WebBriefDisplay: React.FC<WebBriefDisplayProps> = ({ data, lang }) => {
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
            <SectionHeader labelKey="projectGoals" lang={lang} />
            <KeyValuePair labelKey="projectName" content={data.projectName} lang={lang} />
            <KeyValuePair labelKey="projectSummary" content={data.projectSummary} lang={lang} />
            <KeyValuePair labelKey="targetAudience" content={data.targetAudience} lang={lang} />
            <KeyValuePair labelKey="coreObjective" content={data.coreObjective} lang={lang} />
            <KeyValuePair labelKey="industry" content={data.industry} lang={lang} />
            <KeyValuePair labelKey="clientPersonality" content={personalityName} lang={lang} />

            <SectionHeader labelKey="scopeAndFeatures" lang={lang} />
            <ListItems labelKey="keyFeatures" items={data.keyFeatures} lang={lang} />
            <ListItems labelKey="pages" items={data.pages} lang={lang} />

            <SectionHeader labelKey="designGuidance" lang={lang} />
            <KeyValuePair labelKey="designInspirations" content={data.designInspirations} lang={lang} />
            <KeyValuePair labelKey="thingsToAvoid" content={data.thingsToAvoid} lang={lang} />
        </div>
    );
};

export default WebBriefDisplay;