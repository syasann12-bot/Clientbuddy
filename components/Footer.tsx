
import React from 'react';
import { translations } from '../constants';
import type { Language } from '../types';

interface FooterProps {
    lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
    const t = translations[lang];

    return (
        <footer className="bg-white text-gray-700 py-8 border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                <p>{t.footerText}</p>
            </div>
        </footer>
    );
};

export default Footer;
