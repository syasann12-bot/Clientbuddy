import React, { useEffect, useRef } from 'react';
import { translations } from '../constants';
import type { Language, LogoBriefData, ColorPalette, StyleAttribute } from '../types';

interface LogoBriefDisplayProps {
    data: LogoBriefData;
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

const ColorPaletteDisplay: React.FC<{ palette: ColorPalette }> = ({ palette }) => (
    <div className="color-palette">
        {palette.colors.map(hex => (
            <div key={hex}>
                <div 
                    className="color-swatch" 
                    style={{ 
                        backgroundColor: hex,
                        border: hex.toUpperCase() === '#FFFFFF' ? '1px solid #e5e7eb' : undefined
                    }}
                />
                <div className="color-swatch-hex">{hex}</div>
            </div>
        ))}
    </div>
);

const StyleSlider: React.FC<{ styleData: StyleAttribute }> = ({ styleData }) => {
    const percent = (styleData.position - 1) * 25;
    return (
        <div className="style-slider">
            <div className="style-slider-labels">
                <span className="font-bold">{styleData.pair.left}</span>
                <span className="font-bold">{styleData.pair.right}</span>
            </div>
            <div className="style-slider-track-container">
                <div className="style-slider-thumb" style={{ left: `${percent}%` }}></div>
            </div>
        </div>
    );
};

const Deliverables: React.FC<{ labelKey: string, tags: string[], lang: Language }> = ({ labelKey, tags, lang }) => (
     <div className="brief-kv-pair">
        <span className="brief-label">{translations[lang][labelKey]}</span>
        <div className="deliverable-tags-container">
            {tags.map(tag => (
                <span key={tag} className="deliverable-tag">{tag}</span>
            ))}
        </div>
    </div>
);


const LogoBriefDisplay: React.FC<LogoBriefDisplayProps> = ({ data, lang }) => {
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
            <SectionHeader labelKey="bgInfo" lang={lang} />
            <KeyValuePair labelKey="brandName" content={data.brandName} lang={lang} />
            <KeyValuePair labelKey="slogan" content={data.tagline || t.noSlogan} lang={lang} />
            <KeyValuePair labelKey="description" content={data.description} lang={lang} />
            <KeyValuePair labelKey="industry" content={data.industry} lang={lang} />
            <KeyValuePair labelKey="clientPersonality" content={personalityName} lang={lang} />

            <SectionHeader labelKey="visualStyle" lang={lang} />
            <div className="brief-kv-pair">
                <span className="brief-label">{t.colors}</span>
                <div className="brief-content"><ColorPaletteDisplay palette={data.palette} /></div>
            </div>
            <KeyValuePair labelKey="colorNotes" content={data.palette.name} lang={lang} />
            <div className="brief-kv-pair">
                 <span className="brief-label">{t.styleAttrs}</span>
                 <div className="mt-2">
                    {data.styles.map((style, index) => (
                        <StyleSlider key={index} styleData={style} />
                    ))}
                </div>
            </div>
            
            <SectionHeader labelKey="references" lang={lang} />
            <KeyValuePair labelKey="attachments" content={t.noAttachments} lang={lang} />
            <KeyValuePair labelKey="otherNotes" content={data.otherNote} lang={lang} />

            <SectionHeader labelKey="deliverables" lang={lang} />
            <KeyValuePair labelKey="finalFiles" content={t.defaultFile} lang={lang} />
            <Deliverables labelKey="screenQuality" tags={data.finalFiles.screen} lang={lang} />
            <Deliverables labelKey="printQuality" tags={data.finalFiles.print} lang={lang} />

            <SectionHeader labelKey="fonts" lang={lang} />
            <KeyValuePair labelKey="fonts" content={data.fontNote} lang={lang} />
        </div>
    );
};

export default LogoBriefDisplay;