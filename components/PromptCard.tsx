
import React, { useMemo } from 'react';
import CopyButton from './CopyButton';

interface PromptCardProps {
  markdownContent: string;
}

interface ParsedPrompt {
  title: string;
  subject: string;
  setting: string;
  artisticStyle: string;
  lightingAndColor: string;
  composition: string;
  finalPrompt: string;
}

const PromptCard: React.FC<PromptCardProps> = ({ markdownContent }) => {
    const parsedPrompt = useMemo((): ParsedPrompt | null => {
        try {
            const content = markdownContent.trim();
            const result: Partial<ParsedPrompt> = {};

            const titleMatch = content.match(/###\s*(.*)/);
            result.title = titleMatch ? titleMatch[1].trim() : "AI Art Director's Brief";

            const extractField = (fieldName: string) => {
                const regex = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*|---|$)`, 's');
                const match = content.match(regex);
                return match ? match[1].trim() : '';
            };
            
            result.subject = extractField('SUBJECT');
            result.setting = extractField('SETTING');
            result.artisticStyle = extractField('ARTISTIC STYLE');
            result.lightingAndColor = extractField('LIGHTING & COLOR');
            result.composition = extractField('COMPOSITION');
            
            const finalPromptMatch = content.match(/\*\*✨ Final Prompt \(Copy & Paste\):\*\*\s*([\s\S]*?$)/s);
            result.finalPrompt = finalPromptMatch ? finalPromptMatch[1].trim() : '';

            if (result.subject && result.finalPrompt) {
                 return result as ParsedPrompt;
            }

            return null;

        } catch (e) {
            console.error("Failed to parse prompt:", e);
            return null;
        }
    }, [markdownContent]);

    if (!parsedPrompt) {
        return (
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg text-gray-400">
                <p>Could not parse the inspiration. The format might have changed. Here's the raw content:</p>
                <pre className="mt-4 whitespace-pre-wrap font-mono text-sm">{markdownContent}</pre>
            </div>
        );
    }
    
    const DetailItem = ({ label, value, icon }: { label: string; value: string; icon: string; }) => (
        value ? (
            <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-400 flex items-center gap-2 mb-1">
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                </h3>
                <p className="text-gray-200">{value}</p>
            </div>
        ) : null
    );

    return (
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-xl shadow-2xl shadow-indigo-900/20 animate-fade-in space-y-5">
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-3">
                <span>{parsedPrompt.title}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <DetailItem label="Subject" value={parsedPrompt.subject} icon="👤" />
                <DetailItem label="Setting" value={parsedPrompt.setting} icon="🏞️" />
                <DetailItem label="Artistic Style" value={parsedPrompt.artisticStyle} icon="🎨" />
                <DetailItem label="Lighting & Color" value={parsedPrompt.lightingAndColor} icon="💡" />
                <DetailItem label="Composition" value={parsedPrompt.composition} icon="🖼️" />
            </div>

            <div className="border-t border-gray-700 pt-5">
                 <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-400 flex items-center gap-2 mb-2">
                    <span className="text-lg">✨</span>
                    <span>Final Prompt</span>
                </h3>
                <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700 flex items-center justify-between gap-4">
                    <p className="text-gray-200 text-sm font-mono break-words flex-1">
                        {parsedPrompt.finalPrompt}
                    </p>
                   <CopyButton textToCopy={parsedPrompt.finalPrompt} />
                </div>
            </div>
        </div>
    );
};

export default PromptCard;
