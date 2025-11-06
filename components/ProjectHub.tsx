import React from 'react';
import { translations, clientAvatars } from '../constants';
import type { Language, AnyBriefData, FinalReview } from '../types';

type ProjectState = 'idle' | 'generating_brief' | 'in_progress' | 'submitting_revision' | 'completing_project' | 'completed';

interface ProjectHubProps {
    briefData: AnyBriefData;
    projectState: ProjectState;
    finalReview: FinalReview | null;
    onOpenSubmissionModal: () => void;
    onCompleteProject: () => void;
    onReset: () => void;
    lang: Language;
}

const ProjectHub: React.FC<ProjectHubProps> = ({
    briefData,
    projectState,
    finalReview,
    onOpenSubmissionModal,
    onCompleteProject,
    onReset,
    lang
}) => {
    const t = translations[lang];

    const getProjectTitle = () => {
        if ('brandName' in briefData) return briefData.brandName;
        if ('projectName' in briefData) return briefData.projectName;
        if ('presentationTitle' in briefData) return briefData.presentationTitle;
        if ('coverTitle' in briefData) return briefData.coverTitle;
        return "New Project";
    };

    const getStatusInfo = (): { text: string; dotColor: string } => {
        switch (projectState) {
            case 'in_progress':
                return { text: t.status_awaiting_submission, dotColor: 'bg-blue-500' };
            case 'submitting_revision':
            case 'completing_project':
                return { text: t.status_reviewing, dotColor: 'bg-yellow-500 animate-pulse' };
            case 'completed':
                return { text: t.status_completed, dotColor: 'bg-green-500' };
            default:
                return { text: t.status_brief_received, dotColor: 'bg-gray-400' };
        }
    };

    const personalityKey = 'p_' + briefData.clientPersonality;
    const personalityName = t[personalityKey] || briefData.clientPersonality;
    const avatarEmoji = clientAvatars[briefData.clientPersonality] || "👤";
    const status = getStatusInfo();

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200/80 p-6 space-y-5">
            <h2 className="text-xl font-bold text-gray-800 border-b border-slate-200 pb-3">{t.projectHubTitle}</h2>
            
            {/* Client Info */}
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl flex-shrink-0">{avatarEmoji}</div>
                <div>
                    <p className="font-bold text-lg text-gray-900">{getProjectTitle()}</p>
                    <p className="text-sm text-gray-500">{personalityName}</p>
                </div>
            </div>

            {/* Status */}
            <div>
                 <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-2">{t.projectStatus}</p>
                 <div className="flex items-center">
                     <span className={`h-2.5 w-2.5 rounded-full mr-2 ${status.dotColor}`}></span>
                     <span className="font-semibold text-slate-700">{status.text}</span>
                 </div>
            </div>

            {/* Final Review Snippet */}
            {projectState === 'completed' && finalReview && (
                 <div>
                     <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">{t.clientRating}</p>
                     <div className="flex text-2xl">
                         {Array.from({ length: 5 }).map((_, i) => (
                             <span key={i} className={i < finalReview.rating ? 'text-yellow-400' : 'text-slate-300'}>★</span>
                         ))}
                     </div>
                      <blockquote className="mt-2 text-sm italic text-slate-600 border-l-4 border-slate-200 pl-3">
                         "{finalReview.testimonial.substring(0, 100)}..."
                      </blockquote>
                 </div>
            )}


            {/* Actions */}
            <div className="border-t border-slate-200 pt-5 space-y-3">
                {projectState === 'in_progress' && (
                    <>
                        <button
                            onClick={onOpenSubmissionModal}
                            className="w-full flex items-center justify-center bg-slate-800 text-white font-semibold py-3 px-5 rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                        >
                            {t.submitRevisionBtn}
                        </button>
                         <button
                            onClick={onCompleteProject}
                            className="w-full flex items-center justify-center bg-white text-slate-700 font-semibold py-3 px-5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                         >
                            {t.completeProjectBtn}
                         </button>
                    </>
                )}
                 {projectState === 'completed' && (
                     <>
                        <button
                            onClick={onReset}
                            className="w-full flex items-center justify-center bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                        >
                            {t.startNewScenarioBtn}
                        </button>
                    </>
                 )}
            </div>
        </div>
    );
};

export default ProjectHub;
