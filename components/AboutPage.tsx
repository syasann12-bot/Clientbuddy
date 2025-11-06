
import React from 'react';
import { translations } from '../constants';
import type { Language } from '../types';

interface AboutPageProps {
    lang: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
    const t = translations[lang];

    return (
        <div className="page-animation bg-white w-full max-w-3xl rounded-2xl shadow-2xl shadow-blue-100/50 border border-gray-200/80 p-6 sm:p-10 md:p-14">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.aboutTitle}</h1>
            </div>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>{t.aboutP1}</p>
                <p>{t.aboutP2}</p>
            </div>
        </div>
    );
};

export default AboutPage;
