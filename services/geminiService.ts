
import { GoogleGenAI, Type } from "@google/genai";
import { 
    translations, 
    clientPersonalities, 
    colorPalettes, 
    deliverablesSets, 
    fontRecommendations_en,
    fontRecommendations_id,
    otherNotes_en, 
    otherNotes_id,
    styleAttributesPairs,
    dailyChallengeCategoryMapping,
    detailedIndustryMapping
} from '../constants';
import type { Language, DesignCategory, AnyBriefData, LogoBriefData, WebBriefData, BrandBriefData, PresentationBriefData, CoverBriefData, DailyChallenge, FinalReview, ScenarioInteraction, CoreBriefType } from '../types';

// Export the key so the UI can check for its existence.
export const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

// Singleton pattern to initialize the AI client only when needed.
// This prevents the app from crashing on startup if the key is missing.
const getAiClient = (): GoogleGenAI => {
    if (!apiKey) {
        // This error will be caught by the functions calling the API.
        throw new Error("API_KEY environment variable is not set. Please configure it to use the AI features.");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey });
    }
    return ai;
};


const getRandom = <T,>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const mapCategoryToBriefType = (category: DesignCategory): CoreBriefType => {
    if (['website_ui_ux', 'landing_page', 'mobile_app_ui', 'dashboard_design', 'web_banner_hero', 'wireframe_prototype'].includes(category)) return 'web';
    if (['brand_guideline', 'rebranding_project'].includes(category)) return 'brand';
    if (['magazine_book', 'newsletter', 'product_catalog', 'event_poster', 'zine_design', 'annual_report', 'character_illustration', 'flat_illustration', 'digital_painting', 'concept_art', 'childrens_book_art', 'vector_art', 'nft_art'].includes(category)) return 'cover';
    if (['presentation'].includes(category)) return 'presentation';
    // Default to logo for most single-asset design types
    return 'logo';
};


// --- CONFIGURATION FOR EACH BRIEF CATEGORY ---

const briefConfigs: Record<CoreBriefType, any> = {
    logo: {
        schema: {
            type: Type.OBJECT,
            properties: {
                "brandName": { "type": Type.STRING }, "tagline": { "type": Type.STRING }, "brandType": { "type": Type.STRING }, "audience": { "type": Type.STRING }, "focus": { "type": Type.STRING },
                "values": { "type": Type.ARRAY, "items": { "type": Type.STRING } },
                "styleAdjectives": { "type": Type.ARRAY, "items": { "type": Type.STRING } },
                "logoToAvoid": { "type": Type.STRING }, "competitor": { "type": Type.STRING }, "description": { "type": Type.STRING }
            },
            required: ["brandName", "brandType", "audience", "focus", "values", "styleAdjectives", "logoToAvoid", "competitor", "description"]
        },
        buildUserQuery: (industryName: string, regionName: string, languageName: string, challengeContext?: DailyChallenge, subCategory?: DesignCategory) => {
            const langKey = languageName === 'Indonesian' ? 'id' : 'en';
            const subCategoryName = subCategory ? (translations[langKey][`category_${subCategory}`] || subCategory.replace(/_/g, ' ')) : 'logo design';

            const promptLanguageInstruction = `The 'brandName' and 'tagline' can be in English or the local language, whichever sounds more professional, creative, or natural for the brand. All other fields (description, audience, values, etc.) MUST be in ${languageName}.`;
            let baseQuery = `Generate a creative ${subCategoryName} brief for a fictional company.`;
            if (challengeContext) {
                baseQuery = `Based on this creative challenge: (Project: "${challengeContext.projectName}", Description: "${challengeContext.description}", Keywords: ${challengeContext.keywords.join(', ')}), generate a full, detailed ${subCategoryName} brief for this fictional company.`
            }
            
            if (regionName === "Global / Any" || regionName === "Global / Mana saja") {
                return `${baseQuery} The company is in the '${industryName}' industry. ${promptLanguageInstruction} Make the brand name and slogan as unique and wild as possible.`;
            } else {
                return `${baseQuery} The company is in the '${industryName}' industry, with a client based in '${regionName}'. Make the brand name, slogan, and cultural references feel appropriate for the '${regionName}' region. ${promptLanguageInstruction} Make it unique and wild.`;
            }
        },
        processResponse: (aiText: string, industryName: string, lang: Language): LogoBriefData => {
            const aiData = JSON.parse(aiText);
            const fontRecs = lang === 'id' ? fontRecommendations_id : fontRecommendations_en;
            const otherNotes = lang === 'id' ? otherNotes_id : otherNotes_en;
            return {
                ...aiData,
                type: 'logo',
                lang: lang,
                clientPersonality: getRandom(clientPersonalities),
                industry: industryName,
                tagline: aiData.tagline || "",
                palette: getRandom(colorPalettes),
                finalFiles: getRandom(deliverablesSets),
                otherNote: getRandom(otherNotes),
                fontNote: getRandom(fontRecs),
                styles: styleAttributesPairs.map(pair => ({
                    pair: pair,
                    position: getRandomInt(1, 5)
                }))
            };
        }
    },
    web: {
        schema: {
            type: Type.OBJECT,
            properties: {
                "projectName": { "type": Type.STRING },
                "projectSummary": { "type": Type.STRING },
                "targetAudience": { "type": Type.STRING },
                "coreObjective": { "type": Type.STRING, "description": "A single, measurable primary goal, e.g., 'Increase online sales by 20%' or 'Generate 500 new qualified leads per month'." },
                "keyFeatures": { "type": Type.ARRAY, "items": { "type": Type.STRING }, "description": "A list of 3-5 essential functionalities." },
                "pages": { "type": Type.ARRAY, "items": { "type": Type.STRING }, "description": "A list of 4-6 required pages for the website." },
                "designInspirations": { "type": Type.STRING, "description": "Describe the desired look and feel, maybe mentioning 1-2 example websites." },
                "thingsToAvoid": { "type": Type.STRING, "description": "Specific design elements, colors, or layouts to avoid." }
            },
            required: ["projectName", "projectSummary", "targetAudience", "coreObjective", "keyFeatures", "pages", "designInspirations", "thingsToAvoid"]
        },
        buildUserQuery: (industryName: string, regionName: string, languageName: string, challengeContext?: DailyChallenge, subCategory?: DesignCategory) => {
             const langKey = languageName === 'Indonesian' ? 'id' : 'en';
            const subCategoryName = subCategory ? (translations[langKey][`category_${subCategory}`] || subCategory.replace(/_/g, ' ')) : 'web design';

            const promptLanguageInstruction = `All text fields in the JSON response MUST be in ${languageName}.`;
            let baseQuery = `Generate a creative ${subCategoryName} brief for a fictional company in the '${industryName}' industry. The project should be modern and have clear goals. Make the project name and summary creative and unique.`;
            if (challengeContext) {
                 baseQuery = `Based on this creative challenge: (Project: "${challengeContext.projectName}", Description: "${challengeContext.description}", Keywords: ${challengeContext.keywords.join(', ')}), generate a full, detailed ${subCategoryName} brief.`
            }

            if (regionName === "Global / Any" || regionName === "Global / Mana saja") {
                return `${baseQuery} ${promptLanguageInstruction}`;
            } else {
                return `${baseQuery} The client is based in '${regionName}'. The project's tone and references should feel appropriate for that region. ${promptLanguageInstruction}`;
            }
        },
        processResponse: (aiText: string, industryName: string, lang: Language): WebBriefData => {
            const aiData = JSON.parse(aiText);
            return {
                ...aiData,
                type: 'web',
                lang: lang,
                clientPersonality: getRandom(clientPersonalities),
                industry: industryName,
            };
        }
    },
    brand: {
        schema: {
            type: Type.OBJECT,
            properties: {
                "projectName": { "type": Type.STRING },
                "coreValues": { "type": Type.ARRAY, "items": { "type": Type.STRING }, "description": "A list of 3-4 core principles or values of the brand." },
                "brandArchetype": { "type": Type.STRING, "description": "A single, clear brand archetype, e.g., 'The Rebel', 'The Sage', 'The Jester'." },
                "competitors": { "type": Type.ARRAY, "items": { "type": Type.STRING }, "description": "A list of 2-3 main competitors." },
                "deliverables": { "type": Type.ARRAY, "items": { "type": Type.STRING }, "description": "A list of 5-7 required brand assets, e.g., 'Logo suite', 'Color palette', 'Typography guidelines', 'Business card design', 'Social media templates'." }
            },
            required: ["projectName", "coreValues", "brandArchetype", "competitors", "deliverables"]
        },
        buildUserQuery: (industryName: string, regionName: string, languageName: string, challengeContext?: DailyChallenge, subCategory?: DesignCategory) => {
            const langKey = languageName === 'Indonesian' ? 'id' : 'en';
            const subCategoryName = subCategory ? (translations[langKey][`category_${subCategory}`] || subCategory.replace(/_/g, ' ')) : 'brand identity';

            const promptLanguageInstruction = `All text fields in the JSON response MUST be in ${languageName}.`;
             if (challengeContext) {
                return `Based on this creative challenge: (Project: "${challengeContext.projectName}", Description: "${challengeContext.description}", Keywords: ${challengeContext.keywords.join(', ')}), generate a full, detailed ${subCategoryName} brief.`
            }
            return `Generate a comprehensive ${subCategoryName} brief for a fictional company in the '${industryName}' industry. The brief should focus on the brand's core essence and required assets. The project name should be creative and memorable. ${promptLanguageInstruction}`;
        },
        processResponse: (aiText: string, industryName: string, lang: Language): BrandBriefData => {
            const aiData = JSON.parse(aiText);
            return {
                ...aiData,
                type: 'brand',
                lang: lang,
                clientPersonality: getRandom(clientPersonalities),
                industry: industryName,
            };
        }
    },
    presentation: {
        schema: {
            type: Type.OBJECT,
            properties: {
                "presentationTitle": { "type": Type.STRING },
                "objective": { "type": Type.STRING, "description": "The primary goal of the presentation, e.g., 'To secure Series A funding' or 'To train new employees on company culture'." },
                "audience": { "type": Type.STRING, "description": "A description of the target audience for the presentation." },
                "keyMessage": { "type": Type.STRING, "description": "The single most important takeaway for the audience." },
                "slideCount": { "type": Type.STRING, "description": "An estimated number of slides, e.g., '15-20 slides' or 'Around 10 slides'." },
                "visualStyle": { "type": Type.STRING, "description": "The desired visual look and feel, e.g., 'Minimalist and corporate', 'Bold, vibrant, and energetic', or 'Data-driven and professional'." }
            },
            required: ["presentationTitle", "objective", "audience", "keyMessage", "slideCount", "visualStyle"]
        },
        buildUserQuery: (industryName: string, regionName: string, languageName: string, challengeContext?: DailyChallenge, subCategory?: DesignCategory) => {
             const langKey = languageName === 'Indonesian' ? 'id' : 'en';
            const subCategoryName = subCategory ? (translations[langKey][`category_${subCategory}`] || subCategory.replace(/_/g, ' ')) : 'presentation design';
            
            const promptLanguageInstruction = `All text fields in the JSON response MUST be in ${languageName}.`;
            if (challengeContext) {
                return `Based on this creative challenge: (Project: "${challengeContext.projectName}", Description: "${challengeContext.description}", Keywords: ${challengeContext.keywords.join(', ')}), generate a full, detailed ${subCategoryName} brief.`
            }
            return `Generate a creative and clear ${subCategoryName} brief for a company in the '${industryName}' industry. The brief should outline the presentation's goals, audience, and desired visual style. Make the presentation title engaging and unique. ${promptLanguageInstruction}`;
        },
        processResponse: (aiText: string, industryName: string, lang: Language): PresentationBriefData => {
            const aiData = JSON.parse(aiText);
            return {
                ...aiData,
                type: 'presentation',
                lang: lang,
                clientPersonality: getRandom(clientPersonalities),
                industry: industryName,
            };
        }
    },
    cover: {
        schema: {
            type: Type.OBJECT,
            properties: {
                "coverTitle": { "type": Type.STRING },
                "author": { "type": Type.STRING, "description": "The author, artist, or company name to be featured." },
                "genre": { "type": Type.STRING, "description": "The genre of the work, e.g., 'Science Fiction Novel', 'Annual Financial Report', 'Indie Folk Album'." },
                "synopsis": { "type": Type.STRING, "description": "A brief 2-3 sentence summary of the content." },
                "mood": { "type": Type.STRING, "description": "The desired mood or emotional tone, e.g., 'Mysterious and dark', 'Optimistic and inspiring', 'Clean and professional'." },
                "mustIncludeElements": { "type": Type.STRING, "description": "Any specific imagery, symbols, or text that must be included on the cover." }
            },
            required: ["coverTitle", "author", "genre", "synopsis", "mood", "mustIncludeElements"]
        },
        buildUserQuery: (industryName: string, regionName: string, languageName: string, challengeContext?: DailyChallenge, subCategory?: DesignCategory) => {
            const langKey = languageName === 'Indonesian' ? 'id' : 'en';
            const subCategoryName = subCategory ? (translations[langKey][`category_${subCategory}`] || subCategory.replace(/_/g, ' ')) : 'cover design';
            
            const promptLanguageInstruction = `All text fields in the JSON response MUST be in ${languageName}.`;
            if (challengeContext) {
                return `Based on this creative challenge: (Project: "${challengeContext.projectName}", Description: "${challengeContext.description}", Keywords: ${challengeContext.keywords.join(', ')}), generate a full, detailed ${subCategoryName} brief.`
            }
            return `Generate a creative design brief for a ${subCategoryName} (e.g., book cover, report cover, or album art) for a fictional project related to the '${industryName}' industry. The brief should be imaginative and provide clear direction. Make the title and author name creative and fitting for the genre. ${promptLanguageInstruction}`;
        },
        processResponse: (aiText: string, industryName: string, lang: Language): CoverBriefData => {
            const aiData = JSON.parse(aiText);
            return {
                ...aiData,
                type: 'cover',
                lang: lang,
                clientPersonality: getRandom(clientPersonalities),
                industry: industryName,
            };
        }
    }
};

// --- GENERIC BRIEF GENERATION FUNCTION ---

export const generateBrief = async (
    regionKey: string, 
    industryKey: string, 
    category: DesignCategory,
    lang: Language = 'en',
    challengeContext?: DailyChallenge
): Promise<AnyBriefData> => {
    const briefType = mapCategoryToBriefType(category);
    const config = briefConfigs[briefType];
    
    if (!config) {
        throw new Error(`Invalid design category or mapping: ${category} -> ${briefType}`);
    }

    // Use a default industry if coming from a challenge that doesn't specify one
    const finalIndustryKey = industryKey || 'tech_software_dev';
    const finalRegionKey = regionKey || 'region_global';

    const getFullIndustryName = (key: string): string => {
        for (const group of detailedIndustryMapping) {
            const item = group.items.find(i => i.key === key);
            if (item) {
                const groupName = group.group[lang];
                const itemName = item[lang];
                // Format: "Sub-industry (Main Industry)"
                return `${itemName} (${groupName})`;
            }
        }
        // Fallback for any old keys or if not found (should not happen in normal flow)
        return translations[lang][key] || key;
    };

    const industryName = getFullIndustryName(finalIndustryKey);
    const languageName = lang === 'id' ? "Indonesian" : "English";
    const regionName = translations[lang][finalRegionKey];

    const systemPrompt = `You are a world-class creative director. Your task is to generate a creative and highly detailed design brief for a fictional company. The brief must be in the specified language and strictly follow the JSON schema provided.`;
    
    const userQuery = config.buildUserQuery(industryName, regionName, languageName, challengeContext, category);

    try {
        const aiClient = getAiClient();
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userQuery,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
                responseSchema: config.schema,
                temperature: 1,
                topP: 0.95
            }
        });

        const aiText = response.text.trim();
        if (!aiText) {
            throw new Error("No valid content returned from AI.");
        }
        
        const processedResponse = config.processResponse(aiText, industryName, lang);
        // Ensure the correct core type is set on the final brief data
        processedResponse.type = briefType;
        return processedResponse;


    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error((error as Error).message || "Failed to generate brief from AI service.");
    }
};


// --- BRIEF TRANSLATION FUNCTION ---

export const translateBrief = async (briefData: AnyBriefData, targetLang: Language): Promise<AnyBriefData> => {
    const languageName = targetLang === 'id' ? 'Indonesian' : 'English';
    const translatablePayload: any = {};
    const schema: any = { type: Type.OBJECT, properties: {}, required: [] };
    const keysToKeepUntranslated: string[] = [];

    switch (briefData.type) {
        case 'logo':
            keysToKeepUntranslated.push('brandName', 'tagline');
            translatablePayload.brandType = briefData.brandType;
            translatablePayload.audience = briefData.audience;
            translatablePayload.focus = briefData.focus;
            translatablePayload.values = briefData.values;
            translatablePayload.styleAdjectives = briefData.styleAdjectives;
            translatablePayload.logoToAvoid = briefData.logoToAvoid;
            translatablePayload.competitor = briefData.competitor;
            translatablePayload.description = briefData.description;
            translatablePayload.industry = briefData.industry;
            translatablePayload.paletteName = briefData.palette.name;
            translatablePayload.otherNote = briefData.otherNote;
            translatablePayload.fontNote = briefData.fontNote;

            schema.properties = {
                brandType: { type: Type.STRING }, audience: { type: Type.STRING }, focus: { type: Type.STRING },
                values: { type: Type.ARRAY, items: { type: Type.STRING } }, styleAdjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                logoToAvoid: { type: Type.STRING }, competitor: { type: Type.STRING }, description: { type: Type.STRING },
                industry: { type: Type.STRING }, paletteName: { type: Type.STRING }, otherNote: { type: Type.STRING }, fontNote: { type: Type.STRING }
            };
            break;
        case 'web':
            keysToKeepUntranslated.push('projectName');
            translatablePayload.industry = briefData.industry;
            translatablePayload.projectSummary = briefData.projectSummary;
            translatablePayload.targetAudience = briefData.targetAudience;
            translatablePayload.coreObjective = briefData.coreObjective;
            translatablePayload.keyFeatures = briefData.keyFeatures;
            translatablePayload.pages = briefData.pages;
            translatablePayload.designInspirations = briefData.designInspirations;
            translatablePayload.thingsToAvoid = briefData.thingsToAvoid;

            schema.properties = {
                industry: { type: Type.STRING }, projectSummary: { type: Type.STRING }, targetAudience: { type: Type.STRING }, coreObjective: { type: Type.STRING },
                keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } }, pages: { type: Type.ARRAY, items: { type: Type.STRING } },
                designInspirations: { type: Type.STRING }, thingsToAvoid: { type: Type.STRING }
            };
            break;
        case 'brand':
             keysToKeepUntranslated.push('projectName');
             translatablePayload.industry = briefData.industry;
             translatablePayload.coreValues = briefData.coreValues;
             translatablePayload.brandArchetype = briefData.brandArchetype;
             translatablePayload.competitors = briefData.competitors;
             translatablePayload.deliverables = briefData.deliverables;

             schema.properties = {
                 industry: { type: Type.STRING }, coreValues: { type: Type.ARRAY, items: { type: Type.STRING } }, brandArchetype: { type: Type.STRING },
                 competitors: { type: Type.ARRAY, items: { type: Type.STRING } }, deliverables: { type: Type.ARRAY, items: { type: Type.STRING } }
             };
            break;
        case 'presentation':
            keysToKeepUntranslated.push('presentationTitle');
            translatablePayload.industry = briefData.industry;
            translatablePayload.objective = briefData.objective;
            translatablePayload.audience = briefData.audience;
            translatablePayload.keyMessage = briefData.keyMessage;
            translatablePayload.slideCount = briefData.slideCount;
            translatablePayload.visualStyle = briefData.visualStyle;

            schema.properties = {
                industry: { type: Type.STRING }, objective: { type: Type.STRING }, audience: { type: Type.STRING }, keyMessage: { type: Type.STRING },
                slideCount: { type: Type.STRING }, visualStyle: { type: Type.STRING }
            };
            break;
        case 'cover':
            keysToKeepUntranslated.push('coverTitle', 'author');
            translatablePayload.industry = briefData.industry;
            translatablePayload.genre = briefData.genre;
            translatablePayload.synopsis = briefData.synopsis;
            translatablePayload.mood = briefData.mood;
            translatablePayload.mustIncludeElements = briefData.mustIncludeElements;

            schema.properties = {
                industry: { type: Type.STRING }, genre: { type: Type.STRING }, synopsis: { type: Type.STRING },
                mood: { type: Type.STRING }, mustIncludeElements: { type: Type.STRING }
            };
            break;
    }
    
    schema.required = Object.keys(schema.properties);
    const systemPrompt = `You are a professional translator. Translate the text values in the provided JSON object into ${languageName}. Return a valid JSON object that strictly adheres to the provided schema. Do not translate proper nouns or technical terms unless it's natural in the target language.`;
    const userQuery = JSON.stringify(translatablePayload);

    try {
        const aiClient = getAiClient();
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userQuery,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
                responseSchema: schema,
            }
        });

        const translatedPayload = JSON.parse(response.text.trim());
        const newBriefData = JSON.parse(JSON.stringify(briefData)); // Deep copy
        
        // Merge translated fields back into the new brief object
        for (const key in translatedPayload) {
            if (key === 'paletteName' && newBriefData.type === 'logo') {
                newBriefData.palette.name = translatedPayload[key];
            } else if (Object.prototype.hasOwnProperty.call(newBriefData, key)) {
                (newBriefData as any)[key] = translatedPayload[key];
            }
        }
        
        newBriefData.lang = targetLang;
        return newBriefData;

    } catch (error) {
        console.error("Error translating brief:", error);
        throw new Error((error as Error).message || "Failed to translate the brief.");
    }
};



// --- DESIGN FEEDBACK FUNCTION ---

export const getDesignFeedback = async (
    base64Image: string,
    mimeType: string,
    briefData: AnyBriefData,
    lang: Language,
    submissionNote?: string
): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const languageName = (lang === 'id') ? "Indonesian" : "English";
    
    // Extract personality and key brief details
    const personality = briefData.clientPersonality;
    const personalityName = translations['en']['p_' + personality] || personality;
    const briefSummary = JSON.stringify(briefData, null, 2);

    const systemPrompt = `You are a design client simulator. Your name is ClientBuddy.
    Your personality is: "${personalityName}".
    - If you are "The Perfectionist", be extremely detail-oriented, critical, and specific. Point out minor flaws.
    - If you are "The Know-It-All", act like you know more about design than the designer. Suggest specific, often trendy, changes.
    - If you are "The Indecisive", be vague, contradictory, and ask for more options. Express uncertainty.
    - If you are "The Enthusiast", be overly positive and energetic, but your feedback might be unfocused and based on feelings rather than strategy.

    You are reviewing a design submitted by a freelancer. Your feedback MUST be directly related to the original design brief provided.
    Provide your feedback in a conversational, professional, first-person chat format (e.g., "Hi, thanks for sending this over. My first impression is...").
    The response MUST be in ${languageName}.`;

    let userQuery = `This is the original project brief we agreed on:
    \`\`\`json
    ${briefSummary}
    \`\`\`
    And here is the design I've submitted for your review.`;

    if (submissionNote) {
        userQuery += `\n\nThe designer also sent this note: "${submissionNote}"`;
    }

    userQuery += `\n\nBased on the brief, my note, and your personality, please provide your feedback.`;


    try {
        const aiClient = getAiClient();
        const response = await aiClient.models.generateContent({
            model: model,
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Image
                        }
                    },
                    { text: userQuery }
                ]
            },
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.8,
                topP: 0.95
            }
        });

        const text = response.text.trim();
        if (!text) {
            throw new Error("The client seems to be speechless. No feedback was returned.");
        }
        return text;
    } catch (error) {
        console.error("Error calling Gemini API for design feedback:", error);
        throw new Error((error as Error).message || "Failed to get feedback from the AI service.");
    }
};

// --- DAILY CHALLENGE FUNCTION ---

const getDailyChallenge = async (category: DesignCategory, industry: string, languageName: string): Promise<DailyChallenge> => {
    const dateSeed = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const categoryName = translations['en'][`category_${category}`] || category;

    const systemPrompt = `You are a creative director who generates daily design challenges. Your response must be deterministic based on the date seed provided. For the same date, always return the exact same challenge. You must strictly follow the JSON schema.`;
    
    const userQuery = `Generate a daily design challenge for the category "${categoryName}" in ${languageName}. The date seed is ${dateSeed}. Make it concise, creative, and inspiring.`;

    const schema = {
        type: Type.OBJECT,
        properties: {
            "projectName": { "type": Type.STRING, "description": "A creative, fictional name for the project or client." },
            "description": { "type": Type.STRING, "description": "A single, compelling sentence describing the design task." },
            "keywords": { "type": Type.ARRAY, "items": { "type": Type.STRING }, "description": "A list of exactly 3 keywords to guide the visual direction." }
        },
        required: ["projectName", "description", "keywords"]
    };

    try {
        const aiClient = getAiClient();
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userQuery,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.5, // Lower temperature for more deterministic results based on seed
            }
        });
        
        const aiText = response.text.trim();
        if (!aiText) {
            throw new Error(`No challenge content returned for ${category}.`);
        }
        const challengeData = JSON.parse(aiText);
        return { ...challengeData, category, industry };

    } catch (error) {
         console.error(`Error generating daily challenge for ${category}:`, error);
         const errorMessage = (error as Error).message || `Could not generate a challenge for ${categoryName}. Please try again later.`;
         // Return a fallback challenge on error
         return {
            category,
            industry,
            projectName: `Error Generating Challenge`,
            description: errorMessage,
            keywords: ["error", "debug", "retry"]
         }
    }
};

export const getDailyChallenges = async (lang: Language): Promise<DailyChallenge[]> => {
    const languageName = (lang === 'id') ? "Indonesian" : "English";
    const promises = dailyChallengeCategoryMapping.map(item => getDailyChallenge(item.category, item.industry, languageName));
    return Promise.all(promises);
};


// --- SCENARIO MODE FINAL REVIEW ---

export const getFinalReview = async (
    briefData: AnyBriefData,
    interactions: ScenarioInteraction[],
    lang: Language
): Promise<FinalReview> => {
    const languageName = (lang === 'id') ? "Indonesian" : "English";
    const personality = briefData.clientPersonality;
    const personalityName = translations['en']['p_' + personality] || personality;

    const systemPrompt = `You are a design client simulator. Your name is ClientBuddy.
    Your personality is: "${personalityName}".
    You are giving a final review for a completed project.
    Analyze the entire project history, including the initial brief, the designer's submissions, their notes, and your previous feedback.
    Based on this history, provide a final star rating from 1 to 5 and a short testimonial.
    - If the designer followed the brief well and was responsive to feedback, give a high rating (4-5 stars).
    - If the designer struggled to understand the brief or ignored your feedback, give a lower rating (1-3 stars).
    The testimonial should reflect your client personality. Your entire response must be in ${languageName} and strictly follow the JSON schema.`;

    const interactionHistory = interactions.map(interaction => {
        if ('type' in interaction.content) {
            return {
                speaker: interaction.content.type === 'user_submission' ? 'Designer' : 'Client (Me)',
                content: JSON.stringify(interaction.content)
            };
        }
        // This is the initial brief
        return {
            speaker: 'Initial Brief',
            content: JSON.stringify(interaction.content)
        };
    });

    const userQuery = `Here is the full history of our project:
    \`\`\`json
    ${JSON.stringify(interactionHistory, null, 2)}
    \`\`\`
    Please provide your final review.`;
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            "rating": { "type": Type.NUMBER, "description": "A star rating from 1 to 5." },
            "testimonial": { "type": Type.STRING, "description": "A short project testimonial reflecting your personality." }
        },
        required: ["rating", "testimonial"]
    };

    try {
        const aiClient = getAiClient();
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userQuery,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.7
            }
        });
        
        const aiText = response.text.trim();
        if (!aiText) {
            throw new Error("No final review content was returned.");
        }
        return JSON.parse(aiText);

    } catch (error) {
        console.error("Error getting final review:", error);
        throw new Error((error as Error).message || "Failed to get final review from AI service.");
    }
};
