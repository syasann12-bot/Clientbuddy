import React, { useState, useCallback } from 'react';
import Spinner from './Spinner';

interface SubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (file: File, note: string) => void;
    isLoading: boolean;
    t: any;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose, onSubmit, isLoading, t }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submissionNote, setSubmissionNote] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleFileChange = (file: File | null) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setError(null);
        } else if (file) {
            setError('Please upload a valid image file.');
            setImageFile(null);
            setImagePreview(null);
        } else {
            setImageFile(null);
            setImagePreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (imageFile) {
            onSubmit(imageFile, submissionNote);
        } else {
            setError(t.noImageError);
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
        document.getElementById('scenario-modal-file-upload')?.click();
    };

    if (!isOpen) return null;

    return (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="modal-window relative z-10 bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/50">
                <div className="flex items-center justify-between p-5 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{t.submitRevisionBtn}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl leading-none transition-colors">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.uploadLabel}</label>
                        {imagePreview ? (
                            <div className="text-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <img src={imagePreview} alt="Design preview" className="max-w-xs max-h-48 mx-auto rounded-md shadow-sm" />
                                <button type="button" onClick={() => handleFileChange(null)} className="mt-4 text-sm text-red-600 hover:text-red-800">Remove image</button>
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
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <p className="text-sm text-gray-600">{t.uploadPrompt}</p>
                                    <input id="scenario-modal-file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} accept="image/*" />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="submission-note-modal" className="block text-sm font-medium text-gray-700 mb-2">{t.submissionNoteLabel}</label>
                        <textarea
                            id="submission-note-modal"
                            rows={3}
                            value={submissionNote}
                            onChange={(e) => setSubmissionNote(e.target.value)}
                            placeholder={t.submissionNotePlaceholder}
                            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                     {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-gray-100 text-gray-700 font-semibold py-2 px-5 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button
                            type="submit"
                            disabled={!imageFile || isLoading}
                            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                            {isLoading ? <><Spinner /> {t.submittingRevision}</> : t.submitRevisionBtn}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmissionModal;
