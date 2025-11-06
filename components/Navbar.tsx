import React, { useState } from 'react';
import { translations } from '../constants';
import type { Language, Page } from '../types';

interface NavbarProps {
    lang: Language;
    activePage: Page;
    onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, activePage, onNavigate }) => {
    const t = translations[lang];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getLinkClasses = (page: Page) => {
        const baseClasses = "text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors";
        return `${baseClasses} ${activePage === page ? 'nav-link-active' : ''}`;
    };
    
    const getMobileLinkClasses = (page: Page) => {
         const baseClasses = "block text-gray-700 hover:text-blue-500 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors";
         return `${baseClasses} ${activePage === page ? 'nav-link-active' : ''}`;
    }

    const handleMobileNavigate = (page: Page) => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
    };
    
    const navItems: { page: Page, label: string }[] = [
        { page: 'home', label: t.navHome },
        { page: 'challenge', label: t.navChallenge },
        { page: 'scenario', label: t.navScenario },
        { page: 'feedback', label: t.navFeedback },
        { page: 'about', label: t.navAbout },
    ];


    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="font-bold text-xl text-blue-500">clientbuddy</span>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map(item => (
                             <a key={item.page} href={`#${item.page}`} onClick={(e) => { e.preventDefault(); onNavigate(item.page); }} className={getLinkClasses(item.page)}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu, show/hide based on menu state. */}
            {isMobileMenuOpen && (
                 <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {navItems.map(item => (
                             <a key={item.page} href={`#${item.page}`} onClick={(e) => { e.preventDefault(); handleMobileNavigate(item.page); }} className={getMobileLinkClasses(item.page)}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
