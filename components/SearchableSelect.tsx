import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Language } from '../types';

interface OptionItem {
    key: string;
    en: string;
    id: string;
}

interface OptionGroup {
    group: {
        en: string;
        id: string;
        key?: string; // For industry groups
    };
    items: OptionItem[];
}

interface SearchableSelectProps {
    options: OptionGroup[];
    value: string;
    onChange: (newValue: string) => void;
    lang: Language;
    placeholder: string;
    disabled?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
    options,
    value,
    onChange,
    lang,
    placeholder,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const getDisplayValue = () => {
        for (const group of options) {
            const item = group.items.find(i => i.key === value);
            if (item) {
                return item[lang] || item.en;
            }
        }
        return 'Select an option';
    };

    const filteredOptions = useMemo(() => {
        if (!searchTerm) {
            return options;
        }
        return options
            .map(group => {
                const filteredItems = group.items.filter(item =>
                    (item[lang] || item.en).toLowerCase().includes(searchTerm.toLowerCase())
                );
                return { ...group, items: filteredItems };
            })
            .filter(group => group.items.length > 0);
    }, [options, searchTerm, lang]);

    const handleSelect = (itemKey: string) => {
        onChange(itemKey);
        setIsOpen(false);
        setSearchTerm('');
    };
    
    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="searchable-select-container" ref={containerRef}>
            <button
                type="button"
                className="searchable-select-trigger"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-disabled={disabled}
            >
                <span className="truncate font-semibold text-gray-800">{getDisplayValue()}</span>
                 <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.5 3.5a.75.75 0 01-1.06 1.06L10 4.81 6.53 8.28a.75.75 0 01-1.06-1.06l3.5-3.5A.75.75 0 0110 3zm-3.72 9.28a.75.75 0 011.06 0L10 15.19l2.67-2.91a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="searchable-select-panel">
                    <div className="searchable-select-search-wrapper">
                        <div className="relative">
                            <div className="searchable-select-search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="searchable-select-search-input"
                                placeholder={placeholder}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="searchable-select-options" role="listbox">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(group => (
                                <div key={group.group.en}>
                                    <div className="searchable-select-optgroup-label">
                                        {group.group[lang] || group.group.en}
                                    </div>
                                    {group.items.map(item => (
                                        <div
                                            key={item.key}
                                            className="searchable-select-option"
                                            onClick={() => handleSelect(item.key)}
                                            role="option"
                                            aria-selected={value === item.key}
                                        >
                                            {item[lang] || item.en}
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">No results found.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;