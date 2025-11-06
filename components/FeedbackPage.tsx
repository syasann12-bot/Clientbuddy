
import React, { useState, useCallback } from 'react';
import { translations, clientAvatars } from '../constants';
import type { Language, AnyBriefData } from '../types';
import { getDesignFeedback } from '../services/geminiService';
import { fileToBase64 } from '../utils';
import Spinner from './Spinner';

interface FeedbackPageProps {
    lang: Language;
    briefData: AnyBriefData | null;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ lang, briefData }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submissionNote, setSubmissionNote] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const t = translations[lang];

    const resetForm = () => {
        setImageFile(null);
        setImagePreview(null);
        setSubmissionNote('');
        setFeedback(null);
        setError(null);
        setIsSubmitted(false);
        setIsLoading(false);
    };

    const handleFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setError(null);
            setFeedback(null);
            setIsSubmitted(false);
        } else {
            setError('Please upload a valid image file.');
            setImageFile(null);
            setImagePreview(null);
        }
    };

    const handleSubmitForReview = async () => {
        if (!imageFile) {
            setError(t.noImageError);
            return;
        }
        if (!briefData) {
            setError(t.noBriefError);
            return;
        }

        setIsLoading(true);
        setIsSubmitted(true);
        setFeedback(null);
        setError(null);

        try {
            const { data: base64Data, mimeType } = await fileToBase64(imageFile);
            const feedbackResult = await getDesignFeedback(base64Data, mimeType, briefData, lang, submissionNote);
            setFeedback(feedbackResult);
        } catch (err) {
            console.error(err);
            setError((err as Error).message || 'An unknown error occurred during analysis.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    }, []);

    const triggerFileInput = () => {
        document.getElementById('file-upload-input')?.click();
    };

    if (!briefData) {
        return (
            <div className="page-animation bg-white w-full max-w-3xl rounded-2xl shadow-2xl shadow-blue-100/50 border border-gray-200/80 p-6 sm:p-10 md:p-14 text-center">
                <h2 className="text-2xl font-bold text-gray-800">{t.feedbackTitle}</h2>
                <p className="mt-4 text-lg text-gray-600 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">{t.noBriefError}</p>
            </div>
        );
    }
    
    const personalityKey = 'p_' + briefData.clientPersonality;
    const avatarEmoji = clientAvatars[briefData.clientPersonality] || "👤";

    return (
        <div className="page-animation bg-white w-full max-w-3xl rounded-2xl shadow-2xl shadow-blue-100/50 border border-gray-200/80 p-6 sm:p-10 md:p-14">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t.feedbackTitle}</h1>
                <p className="text-lg text-gray-600 mt-3">{t.feedbackSubtitle}</p>
            </div>

            <div className="space-y-6">
                {/* Submission Form */}
                {!isSubmitted && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t.uploadLabel}</label>
                             {imagePreview ? (
                                <div className="text-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <img src={imagePreview} alt="Design preview" className="w-full max-w-xs max-h-48 mx-auto rounded-md shadow-sm object-contain" />
                                    <button onClick={() => handleFileChange(null)} className="mt-4 text-sm text-red-600 hover:text-red-800">Remove image</button>
                                </div>
                            ) : (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={triggerFileInput}
                                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer transition-colors ${isDragOver ? 'border-blue-500 bg-blue-50' : ''}`}
                                >
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-sm text-gray-600">{t.uploadPrompt}</p>
                                        <input id="file-upload-input" name="file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} accept="image/*" />
                                    </div>
                                </div>
                            )}
                        </div>

                         <div>
                            <label htmlFor="submission-note" className="block text-sm font-medium text-gray-700 mb-2">{t.submissionNoteLabel}</label>
                            <textarea
                                id="submission-note"
                                rows={3}
                                value={submissionNote}
                                onChange={(e) => setSubmissionNote(e.target.value)}
                                placeholder={t.submissionNotePlaceholder}
                                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:shadow-md focus:shadow-blue-100"
                            />
                        </div>

                        <button
                            onClick={handleSubmitForReview}
                            disabled={!imageFile || isLoading}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? <><Spinner /> {t.submitBtnLoading}</> : t.submitBtn}
                        </button>
                    </div>
                )}
                
                { /* Chat display area */ }
                {isSubmitted && (
                    <div className="space-y-4">
                        {/* User's submission bubble */}
                        <div className="flex justify-end items-end gap-3">
                            <div className="chat-bubble chat-bubble-user flex flex-col items-end gap-2">
                                {imagePreview && (
                                    <img src={imagePreview} alt="Your design submission" className="w-full max-w-xs max-h-64 rounded-lg shadow-md object-contain" />
                                )}
                                {submissionNote && (
                                    <p className="text-right whitespace-pre-wrap">{submissionNote}</p>
                                )}
                            </div>
                         </div>
                        
                        {/* Client's response bubble */}
                        {isLoading && (
                            <div className="flex justify-start items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl flex-shrink-0">{avatarEmoji}</div>
                                <div className="chat-bubble chat-bubble-client">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {feedback && (
                            <div className="flex justify-start items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl flex-shrink-0 mt-1">{avatarEmoji}</div>
                                <div className="chat-bubble chat-bubble-client whitespace-pre-wrap break-words">
                                    {feedback}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                 {isSubmitted && !isLoading && (
                     <button
                        onClick={resetForm}
                        className="w-full mt-6 flex items-center justify-center bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    >
                       {t.submitNewBtn}
                    </button>
                )}


                {error && (
                    <div className="text-red-600 font-semibold p-4 bg-red-50 rounded-lg mt-4">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;
