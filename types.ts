export type Language = 'en' | 'id';
export type Page = 'home' | 'about' | 'feedback' | 'challenge' | 'scenario';
export type ClientPersonality = "perfectionist" | "knowitall" | "indecisive" | "enthusiast";

// The 5 core brief types remain for schema/service mapping.
export type CoreBriefType = 'logo' | 'web' | 'brand' | 'presentation' | 'cover';

export type DesignCategory =
    // Original Brief Types
    CoreBriefType |
    // Branding & Identity
    'logo_design' | 'brand_guideline' | 'stationery' | 'rebranding_project' | 'icon_design' | 'mascot_logo' |
    // Marketing & Advertising
    'poster' | 'flyer_brochure' | 'online_banner' | 'billboard' | 'social_media_ads' | 'email_campaign' | 'promo_packaging' |
    // Digital & Web
    'website_ui_ux' | 'landing_page' | 'mobile_app_ui' | 'dashboard_design' | 'web_banner_hero' | 'wireframe_prototype' |
    // Print & Editorial
    'magazine_book' | 'newsletter' | 'product_catalog' | 'event_poster' | 'zine_design' | 'annual_report' |
    // Social Media & Content
    'instagram_post_story' | 'tiktok_thumbnail_overlay' | 'youtube_banner_thumbnail' | 'carousel_template' | 'meme_design' | 'content_pack_template' |
    // Packaging & Product
    'food_packaging' | 'product_label' | 'box_bag_design' | 'bottle_jar_layout' | 'merchandise' | 'sticker_hang_tag' |
    // Illustration & Art
    'character_illustration' | 'flat_illustration' | 'digital_painting' | 'concept_art' | 'childrens_book_art' | 'vector_art' | 'nft_art' |
    // Typography & Layout
    'custom_font_lettering' | 'typographic_poster' | 'layout_grid_design' | 'magazine_spread' | 'minimalist_composition' | 'quote_design';


export interface AIData {
  brandName: string;
  tagline?: string;
  brandType: string;
  audience: string;
  focus: string;
  values: string[];
  styleAdjectives: string[];
  logoToAvoid: string;
  competitor: string;
  description: string;
}

export interface ColorPalette {
  name: string;
  colors: string[];
}

export interface StyleAttribute {
    pair: { left: string; right: string };
    position: number;
}

export interface FinalFiles {
    screen: string[];
    print: string[];
}

// --- CATEGORY-SPECIFIC BRIEF DATA ---

export interface LogoBriefData extends AIData {
  type: 'logo';
  lang: Language;
  clientPersonality: ClientPersonality;
  industry: string;
  palette: ColorPalette;
  finalFiles: FinalFiles;
  otherNote: string;
  fontNote: string;
  styles: StyleAttribute[];
}

export interface WebBriefData {
    type: 'web';
    lang: Language;
    clientPersonality: ClientPersonality;
    industry: string;
    projectName: string;
    projectSummary: string;
    targetAudience: string;
    coreObjective: string;
    keyFeatures: string[];
    pages: string[];
    designInspirations: string;
    thingsToAvoid: string;
}

export interface BrandBriefData {
    type: 'brand';
    lang: Language;
    clientPersonality: ClientPersonality;
    industry: string;
    projectName: string;
    coreValues: string[];
    brandArchetype: string;
    competitors: string[];
    deliverables: string[];
}

export interface PresentationBriefData {
    type: 'presentation';
    lang: Language;
    clientPersonality: ClientPersonality;
    industry: string;
    presentationTitle: string;
    objective: string;
    audience: string;
    keyMessage: string;
    slideCount: string;
    visualStyle: string;
}

export interface CoverBriefData {
    type: 'cover';
    lang: Language;
    clientPersonality: ClientPersonality;
    industry: string;
    coverTitle: string;
    author: string;
    genre: string;
    synopsis: string;
    mood: string;
    mustIncludeElements: string;
}


export type AnyBriefData = LogoBriefData | WebBriefData | BrandBriefData | PresentationBriefData | CoverBriefData;


export interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'client';
}

export interface InspirationImage {
    src: string;
    prompt: string;
}

export interface DailyChallenge {
  category: DesignCategory;
  industry: string;
  projectName: string;
  description: string;
  keywords: string[];
}

// --- SCENARIO MODE TYPES ---

export interface UserSubmission {
    type: 'user_submission';
    imagePreview: string;
    submissionNote: string;
}

export interface ClientFeedback {
    type: 'client_feedback';
    feedback: string;
}

export interface ScenarioInteraction {
    id: number;
    content: AnyBriefData | UserSubmission | ClientFeedback;
}

export interface FinalReview {
    rating: number; // 1 to 5
    testimonial: string;
}