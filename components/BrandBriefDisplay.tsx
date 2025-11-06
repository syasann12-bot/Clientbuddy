import React, { useEffect, useRef } from 'react';
import { translations } from '../constants';
import type { Language, BrandBriefData } from '../types';

interface BrandBriefDisplayProps {
    data: BrandBriefData;
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

const BrandBriefDisplay: React.FC<BrandBriefDisplayProps> = ({ data, lang }) => {
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
            <SectionHeader labelKey="projectOverview" lang={lang} />
            <KeyValuePair labelKey="projectName" content={data.projectName} lang={lang} />
            <KeyValuePair labelKey="industry" content={data.industry} lang={lang} />
            <KeyValuePair labelKey="clientPersonality" content={personalityName} lang={lang} />

            <SectionHeader labelKey="brandCore" lang={lang} />
            <ListItems labelKey="coreValues" items={data.coreValues} lang={lang} />
            <KeyValuePair labelKey="brandArchetype" content={data.brandArchetype} lang={lang} />

            <SectionHeader labelKey="marketLandscape" lang={lang} />
            <ListItems labelKey="competitors" items={data.competitors} lang={lang} />
            
            <SectionHeader labelKey="brandDeliverables" lang={lang} />
            <ListItems labelKey="deliverables" items={data.deliverables} lang={lang} />
        </div>
    );
};

export default BrandBriefDisplay;