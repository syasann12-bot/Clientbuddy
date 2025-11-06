
import React, { useState, useEffect, useRef } from 'react';
import { translations, clientAvatars } from '../constants';
import type { Language, LogoBriefData, ChatMessage } from '../types';

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Language;
    briefData: LogoBriefData;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, lang, briefData }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const t = translations[lang];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            setMessages([
                { id: Date.now(), text: t.chatWelcome, sender: 'client' }
            ]);
        }
    }, [isOpen, t.chatWelcome]);

    useEffect(scrollToBottom, [messages]);
    
    const getRandom = <T,>(arr: T[]): T => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const getFakeClientResponse = (userText: string): string => {
        const text = userText.toLowerCase();
        const personality = briefData.clientPersonality || 'default';
        
        if (!briefData.values || !briefData.styleAdjectives) {
            const fallbackData = { values: ['default', 'default'], styleAdjectives: ['default'], audience: 'default' };
            return t.r_generic_fallback.default(fallbackData);
        }
        
        let responseKey: string | null = null;

        if (text.includes('audience') || text.includes('audiens') || text.includes('target')) {
            responseKey = 'r_audience';
        } else if (text.includes('value') || text.includes('nilai')) {
            responseKey = 'r_values';
        } else if (text.includes('hate') || text.includes('benci') || text.includes('avoid') || text.includes('hindari')) {
            responseKey = 'r_hate';
        } else if (text.includes('name') || text.includes('nama')) {
            responseKey = 'r_name';
        }
        
        if (responseKey && t[responseKey]) {
            const responseTemplate = t[responseKey][personality] || t[responseKey]['default'];
            return responseTemplate(briefData);
        }
        
        const genericResponses = [
            t.r_generic1[personality] || t.r_generic1.default,
            t.r_generic2[personality] || t.r_generic2.default,
            t.r_generic_fallback[personality] || t.r_generic_fallback.default
        ];
        const selectedResponseFunction = getRandom(genericResponses);
        return selectedResponseFunction(briefData);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        const userText = inputValue.trim();
        if (!userText) return;

        const newUserMessage: ChatMessage = { id: Date.now(), text: userText, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');

        setTimeout(() => {
            const responseText = getFakeClientResponse(userText);
            const clientResponse: ChatMessage = { id: Date.now() + 1, text: responseText, sender: 'client' };
            setMessages(prev => [...prev, clientResponse]);
        }, 800 + Math.random() * 500);
    };

    if (!isOpen) return null;

    const personalityKey = 'p_' + briefData.clientPersonality;
    const personalityName = t[personalityKey] || briefData.clientPersonality;
    const avatarEmoji = clientAvatars[briefData.clientPersonality] || "👤";

    return (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="modal-window relative z-10 bg-white w-full sm:w-full max-w-lg h-[90vh] sm:h-[80vh] max-h-[700px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/50">
                <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-white font-semibold text-2xl">
                            {avatarEmoji}
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">{personalityName}</h3>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-xs text-blue-200">{t.chatClientStatus}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-blue-300 hover:text-white text-3xl leading-none transition-colors">&times;</button>
                </div>
                
                <div id="chat-messages" className="flex-1 p-5 overflow-y-auto bg-gray-50 flex flex-col gap-2">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-client'}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={t.chatPlaceholder}
                            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:shadow-md focus:shadow-blue-100"
                            autoFocus
                        />
                        <button type="submit" className="bg-blue-500 text-white font-semibold p-3 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009.17 16.5l.416-.209a1 1 0 011.09 0l.416.209a1 1 0 001.253-.117l5 1.429a1 1 0 001.17-1.409l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
