import { Language, CoreBriefType, DesignCategory } from './types';

// --- TRANSLATIONS ---
export const translations: Record<Language, any> = {
    en: {
        pageTitle: "ClientBuddy - Your Friendly Mock Client Generator",
        mainTitle: "Hi, Buddy! Ready to start? 👋",
        mainSubtitle: "Let's create your next creative challenge!",
        designCategoryLabel: "Select Design Category:",
        regionLabel: "Select Client Region:",
        industryLabel: "Select Specific Industry:",
        searchCategoryPlaceholder: "Search categories...",
        searchIndustryPlaceholder: "Search industries...",
        generateBtn: "Let's Go! 🚀",
        generateBtnLoading: "🎲 Generating your mock client...",
        brainstormBtn: "Chat with your client 💬",
        navHome: "Home",
        navAbout: "About",
        navFeedback: "Submit for Review",
        navChallenge: "Daily Challenge",
        navScenario: "Scenario Mode",
        footerText: "Your friendly mock client generator. Fake clients, real practice.",
        aboutTitle: "About ClientBuddy",
        aboutP1: "Our mission is to help developers, designers, and creators practice & test their projects with realistic, easy-to-use client data. We're a simple, friendly tool for creating mock client data—perfect for portfolio demos, testing, and learning project communication.",
        aboutP2: "ClientBuddy is lighter and more fun than heavy tools, with a personal touch. We believe that even fake clients can teach you real skills. Think of us as your reliable, creative partner for mock projects.",
        
        // Brief Labels (Shared)
        industry: "Industry",
        clientPersonality: "Client Personality",
        apiError: "Error: Could not generate brief from AI. Please try again.",
        apiErrorDetails: "Check the console for details.",

        // Logo Brief Labels
        bgInfo: "🎉 Background Information", slogan: "Slogan to incorporate in the logo", description: "Description of the organization and its target audience",
        visualStyle: "Visual style", colors: "Colors to explore", colorNotes: "Other color requirements", styleAttrs: "Style Attributes", references: "References", attachments: "Attachments", otherNotes: "Other notes", deliverables: "Contest deliverables", finalFiles: "Final files", screenQuality: "Screen quality", printQuality: "Print quality", fonts: "Fonts", noSlogan: "No slogan provided", noAttachments: "No attachments provided.", defaultFile: "1 x Logo design",
        
        // Web Brief Labels
        projectGoals: "Project Goals",
        projectName: "Project Name",
        projectSummary: "Project Summary",
        targetAudience: "Target Audience",
        coreObjective: "Core Objective",
        scopeAndFeatures: "Scope & Features",
        keyFeatures: "Key Features",
        pages: "Pages",
        designGuidance: "Design Guidance",
        designInspirations: "Design Inspirations",
        thingsToAvoid: "Things to Avoid",

        // Brand Brief Labels
        projectOverview: "Project Overview",
        brandCore: "Brand Core",
        coreValues: "Core Values",
        brandArchetype: "Brand Archetype/Personality",
        marketLandscape: "Market Landscape",
        competitors: "Competitors",
        brandDeliverables: "Brand Deliverables",

        // Presentation Brief Labels
        presentationGoals: "Presentation Goals",
        presentationTitle: "Presentation Title",
        objective: "Objective",
        audience: "Audience",
        contentAndStructure: "Content & Structure",
        keyMessage: "Key Message",
        slideCount: "Estimated Slide Count",
        visualDirection: "Visual Direction",

        // Cover Brief Labels
        projectDetails: "Project Details",
        coverTitle: "Title",
        author: "Author / Artist",
        genre: "Genre / Topic",
        contentAndTone: "Content & Tone",
        synopsis: "Synopsis / Summary",
        mood: "Desired Mood / Tone",
        designRequirements: "Design Requirements",
        mustIncludeElements: "Must-Include Elements",

        // Feedback Page
        feedbackTitle: "Submit for Client Review 📮",
        feedbackSubtitle: "Upload your design, add a note to your client, and get their feedback.",
        uploadLabel: "1. Upload Your Design",
        uploadPrompt: "Drag & drop or click to upload your design",
        submissionNoteLabel: "2. Add a Submission Note (Optional)",
        submissionNotePlaceholder: "e.g., Hi! Here's the first draft. I focused on creating a modern and clean feel. Let me know what you think!",
        submitBtn: "Submit for Review",
        submitBtnLoading: "Client is reviewing...",
        submitNewBtn: "Submit a Revision",
        noBriefError: "Please create a client on the Home page first to submit a design.",
        noImageError: "Please upload your design first.",

        // Daily Challenge Page
        challengeTitle: "Today's Design Challenges 🔥",
        challengeSubtitle: "A fresh set of creative prompts, delivered daily. Pick one and generate a full brief!",
        challengeDate: "Challenges for",
        generateBriefBtn: "Generate Full Brief",
        generatingBrief: "Generating...",

        // Scenario Mode Page
        scenarioTitle: "Scenario Mode: Full Project Simulation 💼",
        scenarioSubtitle: "Experience a full project lifecycle—from brief to final review. Hone your communication and revision skills.",
        scenarioSetupTitle: "Configure Your Next Scenario",
        startProjectBtn: "Start New Project",
        startingProject: "Generating client...",
        submitRevisionBtn: "Submit Revision",
        submittingRevision: "Client is reviewing...",
        completeProjectBtn: "Complete Project",
        completingProject: "Getting final review...",
        startNewScenarioBtn: "Start a New Scenario",
        finalReviewTitle: "Final Project Review ⭐",
        clientRating: "Client Rating:",
        clientTestimonial: "Client Testimonial:",
        projectHubTitle: "Project Hub",
        projectStatus: "Status",
        status_brief_received: "Brief Received",
        status_awaiting_submission: "Awaiting Your Submission",
        status_reviewing: "Reviewing...",
        status_completed: "Completed",
        interactionTimeline: "Interaction Timeline",
        timeline_initial_brief: "Initial Project Brief",
        yourSubmission: "Your Submission",
        clientFeedback: "Client Feedback",
        
        // Personalities
        p_perfectionist: "The Perfectionist", p_knowitall: "The Know-It-All", p_indecisive: "The Indecisive", p_enthusiast: "The Enthusiast",
        
        // Chat
        chatClientStatus: "Online",
        chatWelcome: "Hey there! Thanks for checking in. I'm here to clarify the brief. What's on your mind?",
        chatPlaceholder: "Type your message...",
        
        // Chat Responses
        r_audience: {
            default: (d) => `Well, about our audience... we're really targeting ${d.audience}. They're people who value ${d.values[0]} and ${d.values[1]}. So, the logo needs to feel right for them, you know?`,
            perfectionist: (d) => `The audience is *exactly* ${d.audience}. Not 'similar to'. *Exactly*. The design must be perfectly targeted to their demographic.`,
            knowitall: (d) => `It's ${d.audience}. I read a marketing report that says this demographic *only* responds to the color blue. So, we should probably use blue.`,
            indecisive: (d) => `The audience? Oh, ${d.audience}, I guess? But my cousin said we should also target some other group? What do you think is better?`,
            enthusiast: (d) => `OMG yes! The audience is ${d.audience}! They are going to LOVE this! Just make it POP! Make it feel ${d.styleAdjectives[0]}!`
        },
        r_values: {
            default: (d) => `Great question! When we say '${d.values[0]}', we mean we want to feel ${d.styleAdjectives[0]}. And '${d.values[1]}' is all about appearing ${d.styleAdjectives[1]}. That's the core of it.`,
            perfectionist: (d) => `The value '${d.values[0]}' is CRITICAL. The logo must be 100% symmetrical and pixel-perfect to reflect that. It must feel ${d.styleAdjectives[0]} and ${d.styleAdjectives[1]}.`,
            knowitall: (d) => `Sure. '${d.values[0]}' means we need to use a strong, Sans-Serif font. I read that fonts like Montserrat really convey that. And '${d.values[1]}' is about the color, obviously.`,
            indecisive: (d) => `Hmm, the values... I wrote down '${d.values[0]}' and '${d.values[1]}'. But I'm not sure how to show that. Maybe you can show me a few options? Like, 5 or 6?`,
            enthusiast: (d) => `Values! Yes! For '${d.values[0]}', I'm thinking... WOW! You know? And for '${d.values[1]}', it should be super ${d.styleAdjectives[0]}! I can't wait to see it!`
        },
        r_hate: {
            default: (d) => `Oh, definitely. We really don't like logos that are ${d.logoToAvoid}. Also, our main competitor is ${d.competitor}, so please, nothing that looks like their brand!`,
            perfectionist: (d) => `I cannot stand logos that are ${d.logoToAvoid}. Or anything asymmetrical. Also, our competitor ${d.competitor} uses a similar font, so we must be *completely* different. Check their brand guide.`,
            knowitall: (d) => `I hate ${d.logoToAvoid} logos. They are so last year. And whatever you do, don't make it look like ${d.competitor}. Their branding is all wrong.`,
            indecisive: (d) => `Hate is a strong word... I don't *love* logos that are ${d.logoToAvoid}, I guess? But if you think it works, maybe show me? Our competitor is ${d.competitor}, but their logo is... okay?`,
            enthusiast: (d) => `Ugh, YES! I hate ${d.logoToAvoid} logos. Sooo boring! And ${d.competitor} is the WORST. We need to crush them! Make our logo 10x better!`
        },
        r_name: {
            default: (d) => `The name '${d.brandName}'? It's a key part of our identity. We want it to feel ${d.styleAdjectives[0]}.`,
            perfectionist: (d) => `The name '${d.brandName}' is final. It's spelled exactly like that. Do not abbreviate it.`,
            knowitall: (d) => `Ah, the name. '${d.brandName}'. It perfectly captures our focus on ${d.focus}. You should probably use a wordmark to emphasize it.`,
            indecisive: (d) => `It's '${d.brandName}'. We *think* it works. But we're also considering '${d.brandName}Co'. Which do you think is stronger?`,
            enthusiast: (d) => `It's '${d.brandName}'! We LOVE it! It's all about ${d.values[0]} and ${d.focus}! It just sounds so... NOW! The logo should feel just as exciting as the name!`
        },
        r_generic1: {
            default: (d) => `That's an interesting point. Could you elaborate on how that relates to our value of '${d.values[0]}'?`,
            perfectionist: (d) => `I'm not following. How does that help us look ${d.styleAdjectives[0]}? Please be specific.`,
            knowitall: (d) => `I don't think that's relevant. Let's talk about the font. I think we should use...`,
            indecisive: (d) => `Oh, I'm not sure. What do you recommend? You're the expert.`,
            enthusiast: (d) => `Ooh, interesting! Tell me more! How does that make it more WOW?`
        },
        r_generic2: {
            default: (d) => `I see. I hadn't thought of it that way. Just remember, the key target is ${d.audience}.`,
            perfectionist: (d) => `I'm not sure I agree with that assessment. Let's stick to the brief. The target is ${d.audience}, period.`,
            knowitall: (d) => `Right. But remember, as I said, that target audience *only* likes blue. Don't forget that.`,
            indecisive: (d) => `That... makes sense? I think? As long as it works for ${d.audience}, I'm open to it.`,
            enthusiast: (d) => `Totally! As long as ${d.audience} loves it! This is going to be great!`
        },
        r_generic_fallback: {
            default: (d) => "Hmm, I'm not sure I follow. Let's stick to the brief for now. What else can I clarify from it?",
            perfectionist: (d) => "That's out of scope. Please re-read the brief and ask a specific question about the deliverables.",
            knowitall: (d) => "I already explained this. Please pay attention. Ask me about something else.",
            indecisive: (d) => "I don't know... What do you think? I'm really relying on you here.",
            enthusiast: (d) => "I don't know, but it sounds cool! Let's just make something awesome!"
        },
        
        // --- Core Categories ---
        category_logo: "Logo Design",
        category_web: "Web Design",
        category_brand: "Brand Identity",
        category_presentation: "Presentation Design",
        category_cover: "Cover Design",

        // --- Detailed Categories ---
        // Branding & Identity
        category_logo_design: "Logo Design",
        category_brand_guideline: "Brand Guideline",
        category_stationery: "Stationery",
        category_rebranding_project: "Rebranding Project",
        category_icon_design: "Icon Design",
        category_mascot_logo: "Mascot / Character Logo",
        // Marketing & Advertising
        category_poster: "Poster",
        category_flyer_brochure: "Flyer / Brochure",
        category_online_banner: "Online Banner",
        category_billboard: "Billboard",
        category_social_media_ads: "Social Media Ads",
        category_email_campaign: "Email Campaign Visuals",
        category_promo_packaging: "Packaging Promo",
        // Digital & Web
        category_website_ui_ux: "Website UI/UX",
        category_landing_page: "Landing Page",
        category_mobile_app_ui: "Mobile App UI",
        category_dashboard_design: "Dashboard Design",
        category_web_banner_hero: "Web Banner / Hero Section",
        category_wireframe_prototype: "Wireframe / Prototype",
        // Print & Editorial
        category_magazine_book: "Magazine / Book",
        category_newsletter: "Newsletter",
        category_product_catalog: "Product Catalog",
        category_event_poster: "Event Poster",
        category_zine_design: "Zine Design",
        category_annual_report: "Annual Report",
        // Social Media & Content
        category_instagram_post_story: "Instagram Post / Story",
        category_tiktok_thumbnail_overlay: "TikTok Thumbnail / Overlay",
        category_youtube_banner_thumbnail: "YouTube Banner / Thumbnail",
        category_carousel_template: "Carousel Template",
        category_meme_design: "Meme Design",
        category_content_pack_template: "Content Pack Template",
        // Packaging & Product
        category_food_packaging: "Food Packaging",
        category_product_label: "Product Label",
        category_box_bag_design: "Box / Bag Design",
        category_bottle_jar_layout: "Bottle / Jar Layout",
        category_merchandise: "Merchandise (T-shirt, etc)",
        category_sticker_hang_tag: "Sticker / Hang Tag",
        // Illustration & Art
        category_character_illustration: "Character Illustration",
        category_flat_illustration: "Flat Illustration",
        category_digital_painting: "Digital Painting",
        category_concept_art: "Concept Art",
        category_childrens_book_art: "Children’s Book Art",
        category_vector_art: "Vector Art",
        category_nft_art: "NFT Art / Collectible",
        // Typography & Layout
        category_custom_font_lettering: "Custom Font / Lettering",
        category_typographic_poster: "Typographic Poster",
        category_layout_grid_design: "Layout Grid Design",
        category_magazine_spread: "Magazine Spread",
        category_minimalist_composition: "Minimalist Composition",
        category_quote_design: "Quote Design",


        // Regions
        region_global: "Global / Any", region_na: "North America", region_eu: "Europe", region_asia: "Asia", region_sa: "South America", region_af: "Africa", region_oc: "Oceania",
        
        // --- Detailed Industries ---
        group_manufacturing: "Manufacturing Industry",
        man_automotive: "Automotive & Vehicle Components",
        man_electronics: "Electronics & Semiconductors",
        man_machinery: "Industrial Machinery & Equipment",
        man_textiles: "Textiles & Garments",
        man_chemicals: "Basic Chemicals & Petrochemicals",
        man_metals: "Metals & Steel",
        man_pharma: "Pharmaceuticals & Biotechnology",
        man_food: "Processed Food & Beverages",
        man_plastics: "Plastics, Rubber, & Packaging",
        man_furniture: "Household Products & Furniture",

        group_energy: "Energy & Natural Resources",
        energy_oil_gas: "Oil & Gas",
        energy_mining: "Coal & Mineral Mining",
        energy_renewable: "Renewable Energy (Solar, Wind, Hydro)",
        energy_utilities: "Electric & Gas Utilities",
        energy_water: "Water & Waste Treatment",

        group_finance: "Financial Services",
        fin_banking: "Banking (Conventional & Digital)",
        fin_insurance: "Insurance & Reinsurance",
        fin_investment: "Investment & Capital Markets",
        fin_fintech: "Fintech & Digital Payments",
        fin_asset_management: "Asset Management & Pension Funds",
        fin_leasing: "Financing & Leasing Institutions",

        group_tech: "Information & Digital Technology",
        tech_software_dev: "Software & Application Development",
        tech_cloud: "Cloud Infrastructure & Data Centers",
        tech_ai_ml: "Artificial Intelligence (AI) & Machine Learning",
        tech_cybersecurity: "Cybersecurity & Data Encryption",
        tech_iot: "Internet of Things (IoT)",
        tech_ecommerce: "E-commerce & Marketplaces",
        tech_blockchain: "Blockchain Technology & Crypto",

        group_media: "Communications & Media",
        media_broadcast: "Television, Radio, & Print Media",
        media_digital: "Digital Media & Streaming",
        media_film: "Film & Animation Production",
        media_advertising: "Advertising, PR, & Branding",
        media_social: "Social Media Platforms",
        media_telecom: "Telecommunications (Mobile, Internet, Satellite)",

        group_construction: "Construction & Property",
        con_building: "Building & Civil Construction",
        con_architecture: "Architecture & Interior Design",
        con_property: "Commercial & Residential Property",
        con_facility_management: "Facility Management",
        con_infrastructure: "Road, Bridge, & Transport Infrastructure",

        group_transport: "Transportation & Logistics",
        trans_land_sea_air: "Land, Sea, & Air Transportation",
        trans_logistics: "Logistics, Warehousing, & Distribution",
        trans_freight: "Freight Forwarding & Expedition",
        trans_public: "Public Transport & Ride-Hailing",
        trans_supply_chain: "Supply Chain Management",

        group_agriculture: "Agriculture, Fisheries, & Forestry",
        agri_farming: "Agriculture & Horticulture",
        agri_plantation: "Plantations (Palm Oil, Coffee, Tea, Rubber)",
        agri_livestock: "Livestock & Processed Animal Products",
        agri_fisheries: "Fisheries & Aquaculture",
        agri_forestry: "Forestry & Wood Products",

        group_health: "Healthcare & Biotechnology",
        health_hospitals: "Hospitals & Clinics",
        health_pharma: "Pharmaceuticals & Medical Devices",
        health_biotech: "Biotechnology & Medical Research",
        health_digital: "Digital Health (Telemedicine)",
        health_nutrition: "Health & Nutrition Products",

        group_education: "Education & Training",
        edu_schools: "Schools & Universities",
        edu_vocational: "Vocational Education & Courses",
        edu_edtech: "EdTech (Digital Learning Platforms)",
        edu_consulting: "Education Consultants",
        edu_research: "Academic Research & Development",

        group_tourism: "Tourism & Entertainment",
        tour_hospitality: "Hotels & Accommodation",
        tour_travel_agents: "Travel Agents & Tour Operators",
        tour_restaurants: "Restaurants & Culinary",
        tour_events: "Event Organizers & Festivals",
        tour_sports: "Sports & Recreation",
        tour_gaming: "Gaming & Esports",

        group_retail: "Retail & Consumer Goods",
        retail_offline: "Offline Retail & Supermarkets",
        retail_ecommerce: "E-commerce & Dropshipping",
        retail_beauty: "Beauty & Fashion Products",
        retail_electronics: "Consumer Electronics",
        retail_fmcg: "FMCG (Fast Moving Consumer Goods)",

        group_nonprofit: "Government, Social, & Non-Profit",
        nonprofit_gov: "Government Institutions & State-Owned Enterprises",
        nonprofit_social: "Non-Profit & Social Organizations",
        nonprofit_ngo: "International NGOs",
        nonprofit_humanitarian: "Humanitarian & Philanthropic Institutions",
        nonprofit_think_tank: "Think Tanks & Policy Research Institutes",

        group_creative: "Creative & Cultural Industries",
        creative_design: "Graphic Design & Branding",
        creative_photo_video: "Photography & Videography",
        creative_music: "Music & Sound Production",
        creative_fashion: "Fashion & Product Design",
        creative_art: "Fine Arts, Crafts, & Illustration",
        creative_architecture: "Creative Architecture",
        creative_content: "Digital Content & Influencer Marketing",

        // Translation Controls
        translateToID: "Translate to Bahasa Indonesia 🇮🇩",
        showInEN: "Show in English 🇬🇧",
        translating: "Translating...",

    },
    id: {
        pageTitle: "ClientBuddy - Generator Klien Tiruan Anda",
        mainTitle: "Hai, Sobat! Siap memulai? 👋",
        mainSubtitle: "Ayo ciptakan tantangan kreatif Anda berikutnya!",
        designCategoryLabel: "Pilih Kategori Desain:",
        regionLabel: "Pilih Wilayah Klien:",
        industryLabel: "Pilih Industri Spesifik:",
        searchCategoryPlaceholder: "Cari kategori...",
        searchIndustryPlaceholder: "Cari industri...",
        generateBtn: "Ayo Mulai! 🚀",
        generateBtnLoading: "🎲 Menghasilkan klien tiruan Anda...",
        brainstormBtn: "Mengobrol dengan klien Anda 💬",
        navHome: "Beranda",
        navAbout: "Tentang",
        navFeedback: "Kirim untuk Ulasan",
        navChallenge: "Tantangan Harian",
        navScenario: "Mode Skenario",
        footerText: "Generator klien tiruan Anda. Klien palsu, latihan nyata.",
        aboutTitle: "Tentang ClientBuddy",
        aboutP1: "Misi kami adalah membantu pengembang, desainer, dan kreator berlatih & menguji proyek mereka dengan data klien yang realistis dan mudah digunakan. Kami adalah alat yang sederhana dan ramah untuk membuat data klien tiruan—sempurna untuk demo portofolio, pengujian, dan belajar komunikasi proyek.",
        aboutP2: "ClientBuddy lebih ringan dan lebih menyenangkan daripada alat-alat berat, dengan sentuhan pribadi. Kami percaya bahwa bahkan klien palsu dapat mengajari Anda keterampilan nyata. Anggap kami sebagai mitra kreatif Anda yang andal untuk proyek-proyek tiruan.",
        industry: "Industri",
        clientPersonality: "Kepribadian Klien",
        apiError: "Kesalahan: Tidak dapat membuat brief dari AI. Silakan coba lagi.",
        apiErrorDetails: "Periksa konsol untuk detail.",
        bgInfo: "🎉 Informasi Latar Belakang",
        slogan: "Slogan untuk dimasukkan ke dalam logo",
        description: "Deskripsi organisasi dan audiens targetnya",
        visualStyle: "Gaya visual",
        colors: "Warna untuk dijelajahi",
        colorNotes: "Persyaratan warna lainnya",
        styleAttrs: "Atribut Gaya",
        references: "Referensi",
        attachments: "Lampiran",
        otherNotes: "Catatan lain",
        deliverables: "Hasil kontes",
        finalFiles: "File akhir",
        screenQuality: "Kualitas layar",
        printQuality: "Kualitas cetak",
        fonts: "Font",
        noSlogan: "Tidak ada slogan yang diberikan",
        noAttachments: "Tidak ada lampiran yang diberikan.",
        defaultFile: "1 x Desain Logo",
        projectGoals: "Tujuan Proyek",
        projectName: "Nama Proyek",
        projectSummary: "Ringkasan Proyek",
        targetAudience: "Audiens Target",
        coreObjective: "Tujuan Inti",
        scopeAndFeatures: "Lingkup & Fitur",
        keyFeatures: "Fitur Utama",
        pages: "Halaman",
        designGuidance: "Panduan Desain",
        designInspirations: "Inspirasi Desain",
        thingsToAvoid: "Hal yang Harus Dihindari",
        projectOverview: "Gambaran Proyek",
        brandCore: "Inti Merek",
        coreValues: "Nilai Inti",
        brandArchetype: "Arketipe/Kepribadian Merek",
        marketLandscape: "Lanskap Pasar",
        competitors: "Pesaing",
        brandDeliverables: "Hasil Merek",
        presentationGoals: "Tujuan Presentasi",
        presentationTitle: "Judul Presentasi",
        objective: "Tujuan",
        audience: "Audiens",
        contentAndStructure: "Konten & Struktur",
        keyMessage: "Pesan Utama",
        slideCount: "Perkiraan Jumlah Slide",
        visualDirection: "Arah Visual",
        projectDetails: "Detail Proyek",
        coverTitle: "Judul",
        author: "Penulis / Artis",
        genre: "Genre / Topik",
        contentAndTone: "Konten & Nada",
        synopsis: "Sinopsis / Ringkasan",
        mood: "Suasana Hati / Nada yang Diinginkan",
        designRequirements: "Persyaratan Desain",
        mustIncludeElements: "Elemen yang Harus Disertakan",
        feedbackTitle: "Kirim untuk Ulasan Klien 📮",
        feedbackSubtitle: "Unggah desain Anda, tambahkan catatan untuk klien Anda, dan dapatkan umpan baliknya.",
        uploadLabel: "1. Unggah Desain Anda",
        uploadPrompt: "Seret & lepas atau klik untuk mengunggah desain Anda",
        submissionNoteLabel: "2. Tambahkan Catatan Pengiriman (Opsional)",
        submissionNotePlaceholder: "misalnya, Hai! Ini draf pertama. Saya fokus menciptakan nuansa modern dan bersih. Beri tahu saya pendapat Anda!",
        submitBtn: "Kirim untuk Ulasan",
        submitBtnLoading: "Klien sedang meninjau...",
        submitNewBtn: "Kirim Revisi",
        noBriefError: "Harap buat klien di halaman Beranda terlebih dahulu untuk mengirimkan desain.",
        noImageError: "Harap unggah desain Anda terlebih dahulu.",
        challengeTitle: "Tantangan Desain Hari Ini 🔥",
        challengeSubtitle: "Satu set petunjuk kreatif baru, dikirim setiap hari. Pilih satu dan hasilkan brief lengkap!",
        challengeDate: "Tantangan untuk",
        generateBriefBtn: "Hasilkan Brief Lengkap",
        generatingBrief: "Menghasilkan...",
        scenarioTitle: "Mode Skenario: Simulasi Proyek Penuh 💼",
        scenarioSubtitle: "Alami siklus hidup proyek penuh—dari brief hingga ulasan akhir. Asah keterampilan komunikasi dan revisi Anda.",
        scenarioSetupTitle: "Konfigurasikan Skenario Anda Berikutnya",
        startProjectBtn: "Mulai Proyek Baru",
        startingProject: "Menghasilkan klien...",
        submitRevisionBtn: "Kirim Revisi",
        submittingRevision: "Klien sedang meninjau...",
        completeProjectBtn: "Selesaikan Proyek",
        completingProject: "Mendapatkan ulasan akhir...",
        startNewScenarioBtn: "Mulai Skenario Baru",
        finalReviewTitle: "Ulasan Proyek Akhir ⭐",
        clientRating: "Peringkat Klien:",
        clientTestimonial: "Testimoni Klien:",
        projectHubTitle: "Pusat Proyek",
        projectStatus: "Status",
        status_brief_received: "Brief Diterima",
        status_awaiting_submission: "Menunggu Pengiriman Anda",
        status_reviewing: "Meninjau...",
        status_completed: "Selesai",
        interactionTimeline: "Linimasa Interaksi",
        timeline_initial_brief: "Brief Proyek Awal",
        yourSubmission: "Pengiriman Anda",
        clientFeedback: "Umpan Balik Klien",
        p_perfectionist: "Si Perfeksionis",
        p_knowitall: "Si Tahu Segalanya",
        p_indecisive: "Si Ragu-ragu",
        p_enthusiast: "Si Antusias",
        chatClientStatus: "Online",
        chatWelcome: "Hai! Terima kasih sudah mampir. Saya di sini untuk mengklarifikasi brief. Ada yang bisa saya bantu?",
        chatPlaceholder: "Ketik pesan Anda...",
        // --- Core Categories ---
        category_logo: "Desain Logo",
        category_web: "Desain Web",
        category_brand: "Identitas Merek",
        category_presentation: "Desain Presentasi",
        category_cover: "Desain Sampul",

        // --- Detailed Categories ---
        // Branding & Identity
        category_logo_design: "Desain Logo",
        category_brand_guideline: "Panduan Merek",
        category_stationery: "Alat Tulis",
        category_rebranding_project: "Proyek Rebranding",
        category_icon_design: "Desain Ikon",
        category_mascot_logo: "Logo Maskot / Karakter",
        // Marketing & Advertising
        category_poster: "Poster",
        category_flyer_brochure: "Flyer / Brosur",
        category_online_banner: "Banner Online",
        category_billboard: "Papan Reklame",
        category_social_media_ads: "Iklan Media Sosial",
        category_email_campaign: "Visual Kampanye Email",
        category_promo_packaging: "Kemasan Promo",
        // Digital & Web
        category_website_ui_ux: "UI/UX Situs Web",
        category_landing_page: "Halaman Arahan",
        category_mobile_app_ui: "UI Aplikasi Seluler",
        category_dashboard_design: "Desain Dasbor",
        category_web_banner_hero: "Banner Web / Hero Section",
        category_wireframe_prototype: "Wireframe / Prototipe",
        // Print & Editorial
        category_magazine_book: "Majalah / Buku",
        category_newsletter: "Buletin",
        category_product_catalog: "Katalog Produk",
        category_event_poster: "Poster Acara",
        category_zine_design: "Desain Zine",
        category_annual_report: "Laporan Tahunan",
        // Social Media & Content
        category_instagram_post_story: "Post / Story Instagram",
        category_tiktok_thumbnail_overlay: "Thumbnail / Overlay TikTok",
        category_youtube_banner_thumbnail: "Banner / Thumbnail YouTube",
        category_carousel_template: "Template Carousel",
        category_meme_design: "Desain Meme",
        category_content_pack_template: "Template Paket Konten",
        // Packaging & Product
        category_food_packaging: "Kemasan Makanan",
        category_product_label: "Label Produk",
        category_box_bag_design: "Desain Kotak / Tas",
        category_bottle_jar_layout: "Layout Botol / Toples",
        category_merchandise: "Merchandise (Kaos, dll)",
        category_sticker_hang_tag: "Stiker / Hang Tag",
        // Illustration & Art
        category_character_illustration: "Ilustrasi Karakter",
        category_flat_illustration: "Ilustrasi Datar",
        category_digital_painting: "Lukisan Digital",
        category_concept_art: "Seni Konsep",
        category_childrens_book_art: "Seni Buku Anak",
        category_vector_art: "Seni Vektor",
        category_nft_art: "Seni NFT / Koleksi",
        // Typography & Layout
        category_custom_font_lettering: "Font / Lettering Kustom",
        category_typographic_poster: "Poster Tipografi",
        category_layout_grid_design: "Desain Grid Tata Letak",
        category_magazine_spread: "Spread Majalah",
        category_minimalist_composition: "Komposisi Minimalis",
        category_quote_design: "Desain Kutipan",


        // Regions
        region_global: "Global / Mana saja", region_na: "Amerika Utara", region_eu: "Eropa", region_asia: "Asia", region_sa: "Amerika Selatan", region_af: "Afrika", region_oc: "Oseania",
        
        // --- Detailed Industries ---
        group_manufacturing: "Industri Manufaktur",
        man_automotive: "Otomotif dan Komponen Kendaraan",
        man_electronics: "Elektronik dan Semikonduktor",
        man_machinery: "Mesin dan Peralatan Industri",
        man_textiles: "Tekstil dan Garmen",
        man_chemicals: "Kimia Dasar dan Petrokimia",
        man_metals: "Logam dan Baja",
        man_pharma: "Farmasi dan Bioteknologi",
        man_food: "Makanan dan Minuman Olahan",
        man_plastics: "Plastik, Karet, dan Kemasan",
        man_furniture: "Produk Rumah Tangga dan Furnitur",

        group_energy: "Industri Energi dan Sumber Daya Alam",
        energy_oil_gas: "Minyak dan Gas Bumi",
        energy_mining: "Batu Bara dan Pertambangan Mineral",
        energy_renewable: "Energi Terbarukan (Surya, Angin, Hidro)",
        energy_utilities: "Utilitas Listrik dan Gas",
        energy_water: "Pengolahan Air dan Limbah",

        group_finance: "Industri Jasa Keuangan",
        fin_banking: "Perbankan (Konvensional dan Digital)",
        fin_insurance: "Asuransi dan Reasuransi",
        fin_investment: "Investasi dan Pasar Modal",
        fin_fintech: "Fintech dan Pembayaran Digital",
        fin_asset_management: "Manajemen Aset dan Dana Pensiun",
        fin_leasing: "Lembaga Pembiayaan dan Leasing",

        group_tech: "Industri Teknologi Informasi dan Digital",
        tech_software_dev: "Pengembangan Perangkat Lunak dan Aplikasi",
        tech_cloud: "Infrastruktur Cloud dan Data Center",
        tech_ai_ml: "Kecerdasan Buatan (AI) dan Machine Learning",
        tech_cybersecurity: "Cybersecurity dan Enkripsi Data",
        tech_iot: "Internet of Things (IoT)",
        tech_ecommerce: "E-commerce dan Marketplace",
        tech_blockchain: "Teknologi Blockchain dan Kripto",

        group_media: "Industri Komunikasi dan Media",
        media_broadcast: "Televisi, Radio, dan Media Cetak",
        media_digital: "Media Digital dan Streaming",
        media_film: "Produksi Film dan Animasi",
        media_advertising: "Periklanan, PR, dan Branding",
        media_social: "Platform Media Sosial",
        media_telecom: "Telekomunikasi (Seluler, Internet, Satelit)",

        group_construction: "Industri Konstruksi dan Properti",
        con_building: "Konstruksi Bangunan dan Sipil",
        con_architecture: "Arsitektur dan Desain Interior",
        con_property: "Properti Komersial dan Perumahan",
        con_facility_management: "Pengelolaan Fasilitas (Facility Management)",
        con_infrastructure: "Infrastruktur Jalan, Jembatan, dan Transportasi",

        group_transport: "Industri Transportasi dan Logistik",
        trans_land_sea_air: "Transportasi Darat, Laut, dan Udara",
        trans_logistics: "Logistik, Pergudangan, dan Distribusi",
        trans_freight: "Freight Forwarding dan Ekspedisi",
        trans_public: "Transportasi Publik dan Ride-Hailing",
        trans_supply_chain: "Manajemen Rantai Pasokan (Supply Chain)",

        group_agriculture: "Industri Pertanian, Perikanan, & Kehutanan",
        agri_farming: "Pertanian & Hortikultura",
        agri_plantation: "Perkebunan (Kelapa Sawit, Kopi, Teh, Karet)",
        agri_livestock: "Peternakan & Produk Hewan Olahan",
        agri_fisheries: "Perikanan & Akuakultur",
        agri_forestry: "Kehutanan & Produk Kayu",

        group_health: "Industri Kesehatan & Bioteknologi",
        health_hospitals: "Rumah Sakit & Klinik",
        health_pharma: "Farmasi & Alat Kesehatan",
        health_biotech: "Bioteknologi & Riset Medis",
        health_digital: "Kesehatan Digital (Telemedicine)",
        health_nutrition: "Produk Kesehatan & Gizi",

        group_education: "Industri Pendidikan & Pelatihan",
        edu_schools: "Sekolah & Universitas",
        edu_vocational: "Pendidikan Vokasi & Kursus",
        edu_edtech: "EdTech (Platform Belajar Digital)",
        edu_consulting: "Konsultan Pendidikan",
        edu_research: "Riset & Pengembangan Akademik",

        group_tourism: "Industri Pariwisata & Hiburan",
        tour_hospitality: "Hotel & Akomodasi",
        tour_travel_agents: "Agen Perjalanan & Operator Tur",
        tour_restaurants: "Restoran & Kuliner",
        tour_events: "Penyelenggara Acara & Festival",
        tour_sports: "Olahraga & Rekreasi",
        tour_gaming: "Game & Esports",

        group_retail: "Industri Ritel & Barang Konsumen",
        retail_offline: "Ritel Offline & Supermarket",
        retail_ecommerce: "E-commerce & Dropshipping",
        retail_beauty: "Produk Kecantikan & Fesyen",
        retail_electronics: "Elektronik Konsumen",
        retail_fmcg: "FMCG (Barang Konsumen Cepat Bergerak)",

        group_nonprofit: "Industri Pemerintahan, Sosial, & Nirlaba",
        nonprofit_gov: "Institusi Pemerintah & BUMN",
        nonprofit_social: "Organisasi Nirlaba & Sosial",
        nonprofit_ngo: "LSM Internasional",
        nonprofit_humanitarian: "Lembaga Kemanusiaan & Filantropi",
        nonprofit_think_tank: "Lembaga Riset & Kebijakan (Think Tank)",

        group_creative: "Industri Kreatif & Budaya",
        creative_design: "Desain Grafis & Branding",
        creative_photo_video: "Fotografi & Videografi",
        creative_music: "Produksi Musik & Suara",
        creative_fashion: "Desain Fesyen & Produk",
        creative_art: "Seni Rupa, Kerajinan, & Ilustrasi",
        creative_architecture: "Arsitektur Kreatif",
        creative_content: "Konten Digital & Pemasaran Influencer"
    }
};

export const clientAvatars: Record<string, string> = {
    perfectionist: "🧐",
    knowitall: "🤓",
    indecisive: "🤔",
    enthusiast: "🎉"
};


// --- GLOBAL DATA (Local) ---
export const regionMapping = [
    { key: "region_global" }, { key: "region_na" }, { key: "region_eu" },
    { key: "region_asia" }, { key: "region_sa" }, { key: "region_af" }, { key: "region_oc" }
];

export const styleAttributesPairs = [
    { left: "Classic", right: "Modern" }, { left: "Mature", right: "Youthful" },
    { left: "Feminine", right: "Masculine" }, { left: "Playful", right: "Serious" },
    { left: "Economical", right: "Luxurious" }, { left: "Geometric", right: "Organic" },
    { left: "Abstract", right: "Literal" }
];
export const colorPalettes = [
    { name: "Corporate & Trustworthy", colors: ["#0A2A4E", "#007BFF", "#F0F2F5", "#FFFFFF"] },
    { name: "Warm & Energetic", colors: ["#C14925", "#E87A00", "#F0C808", "#FDF8E2"] },
    { name: "Natural & Eco-Friendly", colors: ["#2D572C", "#7A9E7E", "#F5F0E6", "#3D352E"] },
    { name: "Luxury & Premium", colors: ["#121212", "#D4AF37", "#36454F", "#FFFFF0"] },
    { name: "Tech & Modern", colors: ["#00FFFF", "#3700B3", "#1E1E1E", "#FFFFFF"] },
    { name: "Friendly & Soft", colors: ["#FADADD", "#BEEFDD", "#C9E9FF", "#FFF8C9"] }
];
export const deliverablesSets = [
    { screen: ["PNG", "JPG"], print: ["AI", "EPS", "PDF"] },
    { screen: ["PNG", "JPG", "GIF"], print: ["AI", "EPS", "PDF", "PSD"] },
    { screen: ["PNG", "SVG"], print: ["AI", "EPS"] }
];
export const fontRecommendations_en = [
    "Client likes modern, clean Sans-Serif fonts like Inter, Montserrat, or Poppins.",
    "We are looking for an elegant, timeless Serif font, like Playfair Display or Lora.",
    "A casual but readable script font would be nice, but avoid anything too formal.",
    "No specific preference, as long as the font is professional and legible on small screens."
];
export const fontRecommendations_id = [
    "Klien menyukai font Sans-Serif yang modern dan bersih seperti Inter, Montserrat, atau Poppins.",
    "Kami mencari font Serif yang elegan dan abadi, seperti Playfair Display atau Lora.",
    "Font skrip yang kasual namun mudah dibaca akan bagus, tapi hindari yang terlalu formal.",
    "Kami tidak punya preferensi spesifik, asalkan font-nya profesional dan mudah dibaca di layar kecil."
];
export const otherNotes_en = [
    "The logo must look good when printed in black and white for invoices or letterheads.",
    "We plan to create merchandise (t-shirts, hats), so the logo must be easy to apply.",
    "Top priority is legibility at small sizes, like a social media profile picture.",
    "We are open to both wordmark (logotype) or abstract symbol ideas."
];
export const otherNotes_id = [
    "Logo harus terlihat bagus saat dicetak hitam putih untuk faktur atau kop surat.",
    "Kami berencana membuat merchandise (kaus, topi), jadi logo harus mudah diaplikasikan.",
    "Prioritas utama adalah keterbacaan pada ukuran kecil, seperti foto profil media sosial.",
    "Kami terbuka untuk ide wordmark (logotype) atau simbol abstrak."
];

export const clientPersonalities = ["perfectionist", "knowitall", "indecisive", "enthusiast"];

export const detailedDesignCategoryMapping = [
    {
        group: { en: "Branding & Identity", id: "Branding & Identitas" },
        items: [
            { key: 'logo_design', en: 'Logo Design', id: 'Desain Logo' },
            { key: 'brand_guideline', en: 'Brand Guideline', id: 'Panduan Merek' },
            { key: 'stationery', en: 'Stationery', id: 'Alat Tulis' },
            { key: 'rebranding_project', en: 'Rebranding Project', id: 'Proyek Rebranding' },
            { key: 'icon_design', en: 'Icon Design', id: 'Desain Ikon' },
            { key: 'mascot_logo', en: 'Mascot / Character Logo', id: 'Logo Maskot / Karakter' }
        ]
    },
    {
        group: { en: "Marketing & Advertising", id: "Pemasaran & Periklanan" },
        items: [
            { key: 'poster', en: 'Poster', id: 'Poster' },
            { key: 'flyer_brochure', en: 'Flyer / Brochure', id: 'Flyer / Brosur' },
            { key: 'online_banner', en: 'Online Banner', id: 'Banner Online' },
            { key: 'billboard', en: 'Billboard', id: 'Papan Reklame' },
            { key: 'social_media_ads', en: 'Social Media Ads', id: 'Iklan Media Sosial' },
            { key: 'email_campaign', en: 'Email Campaign Visuals', id: 'Visual Kampanye Email' },
            { key: 'promo_packaging', en: 'Packaging Promo', id: 'Kemasan Promo' }
        ]
    },
    {
        group: { en: "Digital & Web", id: "Digital & Web" },
        items: [
            { key: 'website_ui_ux', en: 'Website UI/UX', id: 'UI/UX Situs Web' },
            { key: 'landing_page', en: 'Landing Page', id: 'Halaman Arahan' },
            { key: 'mobile_app_ui', en: 'Mobile App UI', id: 'UI Aplikasi Seluler' },
            { key: 'dashboard_design', en: 'Dashboard Design', id: 'Desain Dasbor' },
            { key: 'web_banner_hero', en: 'Web Banner / Hero Section', id: 'Banner Web / Hero Section' },
            { key: 'wireframe_prototype', en: 'Wireframe / Prototype', id: 'Wireframe / Prototipe' }
        ]
    },
    {
        group: { en: "Print & Editorial", id: "Cetak & Editorial" },
        items: [
            { key: 'magazine_book', en: 'Magazine / Book', id: 'Majalah / Buku' },
            { key: 'newsletter', en: 'Newsletter', id: 'Buletin' },
            { key: 'product_catalog', en: 'Product Catalog', id: 'Katalog Produk' },
            { key: 'event_poster', en: 'Event Poster', id: 'Poster Acara' },
            { key: 'zine_design', en: 'Zine Design', id: 'Desain Zine' },
            { key: 'annual_report', en: 'Annual Report', id: 'Laporan Tahunan' }
        ]
    },
    {
        group: { en: "Social Media & Content", id: "Media Sosial & Konten" },
        items: [
            { key: 'instagram_post_story', en: 'Instagram Post / Story', id: 'Post / Story Instagram' },
            { key: 'tiktok_thumbnail_overlay', en: 'TikTok Thumbnail / Overlay', id: 'Thumbnail / Overlay TikTok' },
            { key: 'youtube_banner_thumbnail', en: 'YouTube Banner / Thumbnail', id: 'Banner / Thumbnail YouTube' },
            { key: 'carousel_template', en: 'Carousel Template', id: 'Template Carousel' },
            { key: 'meme_design', en: 'Meme Design', id: 'Desain Meme' },
            { key: 'content_pack_template', en: 'Content Pack Template', id: 'Template Paket Konten' }
        ]
    },
    {
        group: { en: "Packaging & Product", id: "Kemasan & Produk" },
        items: [
            { key: 'food_packaging', en: 'Food Packaging', id: 'Kemasan Makanan' },
            { key: 'product_label', en: 'Product Label', id: 'Label Produk' },
            { key: 'box_bag_design', en: 'Box / Bag Design', id: 'Desain Kotak / Tas' },
            { key: 'bottle_jar_layout', en: 'Bottle / Jar Layout', id: 'Layout Botol / Toples' },
            { key: 'merchandise', en: 'Merchandise (T-shirt, etc)', id: 'Merchandise (Kaos, dll)' },
            { key: 'sticker_hang_tag', en: 'Sticker / Hang Tag', id: 'Stiker / Hang Tag' }
        ]
    },
    {
        group: { en: "Illustration & Art", id: "Ilustrasi & Seni" },
        items: [
            { key: 'character_illustration', en: 'Character Illustration', id: 'Ilustrasi Karakter' },
            { key: 'flat_illustration', en: 'Flat Illustration', id: 'Ilustrasi Datar' },
            { key: 'digital_painting', en: 'Digital Painting', id: 'Lukisan Digital' },
            { key: 'concept_art', en: 'Concept Art', id: 'Seni Konsep' },
            { key: 'childrens_book_art', en: 'Children’s Book Art', id: 'Seni Buku Anak' },
            { key: 'vector_art', en: 'Vector Art', id: 'Seni Vektor' },
            { key: 'nft_art', en: 'NFT Art / Collectible', id: 'Seni NFT / Koleksi' }
        ]
    },
    {
        group: { en: "Typography & Layout", id: "Tipografi & Tata Letak" },
        items: [
            { key: 'custom_font_lettering', en: 'Custom Font / Lettering', id: 'Font / Lettering Kustom' },
            { key: 'typographic_poster', en: 'Typographic Poster', id: 'Poster Tipografi' },
            { key: 'layout_grid_design', en: 'Layout Grid Design', id: 'Desain Grid Tata Letak' },
            { key: 'magazine_spread', en: 'Magazine Spread', id: 'Spread Majalah' },
            { key: 'minimalist_composition', en: 'Minimalist Composition', id: 'Komposisi Minimalis' },
            { key: 'quote_design', en: 'Quote Design', id: 'Desain Kutipan' }
        ]
    }
];

export const detailedIndustryMapping = [
     {
        group: { en: "Information & Digital Technology", id: "Industri Teknologi Informasi dan Digital", key: "group_tech" },
        items: [
            { key: 'tech_software_dev', en: 'Software & Application Development', id: 'Pengembangan Perangkat Lunak dan Aplikasi' },
            { key: 'tech_cloud', en: 'Cloud Infrastructure & Data Centers', id: 'Infrastruktur Cloud dan Data Center' },
            { key: 'tech_ai_ml', en: 'Artificial Intelligence (AI) & Machine Learning', id: 'Kecerdasan Buatan (AI) dan Machine Learning' },
            { key: 'tech_cybersecurity', en: 'Cybersecurity & Data Encryption', id: 'Cybersecurity dan Enkripsi Data' },
            { key: 'tech_iot', en: 'Internet of Things (IoT)', id: 'Internet of Things (IoT)' },
            { key: 'tech_ecommerce', en: 'E-commerce & Marketplaces', id: 'E-commerce dan Marketplace' },
            { key: 'tech_blockchain', en: 'Blockchain Technology & Crypto', id: 'Teknologi Blockchain dan Kripto' },
        ]
    },
    {
        group: { en: "Creative & Cultural Industries", id: "Industri Kreatif & Budaya", key: "group_creative" },
        items: [
            { key: 'creative_design', en: 'Graphic Design & Branding', id: 'Desain Grafis & Branding' },
            { key: 'creative_photo_video', en: 'Photography & Videography', id: 'Fotografi & Videografi' },
            { key: 'creative_music', en: 'Music & Sound Production', id: 'Produksi Musik & Suara' },
            { key: 'creative_fashion', en: 'Fashion & Product Design', id: 'Desain Fesyen & Produk' },
            { key: 'creative_art', en: 'Fine Arts, Crafts, & Illustration', id: 'Seni Rupa, Kerajinan, & Ilustrasi' },
            { key: 'creative_architecture', en: 'Creative Architecture', id: 'Arsitektur Kreatif' },
            { key: 'creative_content', en: 'Digital Content & Influencer Marketing', id: 'Konten Digital & Pemasaran Influencer' }
        ]
    },
    {
        group: { en: "Retail & Consumer Goods", id: "Industri Ritel & Barang Konsumen", key: "group_retail" },
        items: [
            { key: 'retail_offline', en: 'Offline Retail & Supermarkets', id: 'Ritel Offline & Supermarket' },
            { key: 'retail_ecommerce', en: 'E-commerce & Dropshipping', id: 'E-commerce & Dropshipping' },
            { key: 'retail_beauty', en: 'Beauty & Fashion Products', id: 'Produk Kecantikan & Fesyen' },
            { key: 'retail_electronics', en: 'Consumer Electronics', id: 'Elektronik Konsumen' },
            { key: 'retail_fmcg', en: 'FMCG (Fast Moving Consumer Goods)', id: 'FMCG (Barang Konsumen Cepat Bergerak)' },
        ]
    },
    {
        group: { en: "Tourism & Entertainment", id: "Industri Pariwisata & Hiburan", key: "group_tourism" },
        items: [
            { key: 'tour_hospitality', en: 'Hotels & Accommodation', id: 'Hotel & Akomodasi' },
            { key: 'tour_travel_agents', en: 'Travel Agents & Tour Operators', id: 'Agen Perjalanan & Operator Tur' },
            { key: 'tour_restaurants', en: 'Restaurants & Culinary', id: 'Restoran & Kuliner' },
            { key: 'tour_events', en: 'Event Organizers & Festivals', id: 'Penyelenggara Acara & Festival' },
            { key: 'tour_sports', en: 'Sports & Recreation', id: 'Olahraga & Rekreasi' },
            { key: 'tour_gaming', en: 'Gaming & Esports', id: 'Game & Esports' },
        ]
    },
    {
        group: { en: "Financial Services", id: "Industri Jasa Keuangan", key: "group_finance" },
        items: [
            { key: 'fin_banking', en: 'Banking (Conventional & Digital)', id: 'Perbankan (Konvensional dan Digital)' },
            { key: 'fin_insurance', en: 'Insurance & Reinsurance', id: 'Asuransi dan Reasuransi' },
            { key: 'fin_investment', en: 'Investment & Capital Markets', id: 'Investasi dan Pasar Modal' },
            { key: 'fin_fintech', en: 'Fintech & Digital Payments', id: 'Fintech dan Pembayaran Digital' },
            { key: 'fin_asset_management', en: 'Asset Management & Pension Funds', id: 'Manajemen Aset dan Dana Pensiun' },
            { key: 'fin_leasing', en: 'Financing & Leasing Institutions', id: 'Lembaga Pembiayaan dan Leasing' },
        ]
    },
    {
        group: { en: "Communications & Media", id: "Industri Komunikasi dan Media", key: "group_media" },
        items: [
            { key: 'media_broadcast', en: 'Television, Radio, & Print Media', id: 'Televisi, Radio, dan Media Cetak' },
            { key: 'media_digital', en: 'Digital Media & Streaming', id: 'Media Digital dan Streaming' },
            { key: 'media_film', en: 'Film & Animation Production', id: 'Produksi Film dan Animasi' },
            { key: 'media_advertising', en: 'Advertising, PR, & Branding', id: 'Periklanan, PR, dan Branding' },
            { key: 'media_social', en: 'Social Media Platforms', id: 'Platform Media Sosial' },
            { key: 'media_telecom', en: 'Telecommunications (Mobile, Internet, Satellite)', id: 'Telekomunikasi (Seluler, Internet, Satelit)' },
        ]
    },
    {
        group: { en: "Healthcare & Biotechnology", id: "Industri Kesehatan & Bioteknologi", key: "group_health" },
        items: [
            { key: 'health_hospitals', en: 'Hospitals & Clinics', id: 'Rumah Sakit & Klinik' },
            { key: 'health_pharma', en: 'Pharmaceuticals & Medical Devices', id: 'Farmasi & Alat Kesehatan' },
            { key: 'health_biotech', en: 'Biotechnology & Medical Research', id: 'Bioteknologi & Riset Medis' },
            { key: 'health_digital', en: 'Digital Health (Telemedicine)', id: 'Kesehatan Digital (Telemedicine)' },
            { key: 'health_nutrition', en: 'Health & Nutrition Products', id: 'Produk Kesehatan & Gizi' },
        ]
    },
    {
        group: { en: "Education & Training", id: "Industri Pendidikan & Pelatihan", key: "group_education" },
        items: [
            { key: 'edu_schools', en: 'Schools & Universities', id: 'Sekolah & Universitas' },
            { key: 'edu_vocational', en: 'Vocational Education & Courses', id: 'Pendidikan Vokasi & Kursus' },
            { key: 'edu_edtech', en: 'EdTech (Digital Learning Platforms)', id: 'EdTech (Platform Belajar Digital)' },
            { key: 'edu_consulting', en: 'Education Consultants', id: 'Konsultan Pendidikan' },
            { key: 'edu_research', en: 'Academic Research & Development', id: 'Riset & Pengembangan Akademik' },
        ]
    },
    {
        group: { en: "Manufacturing Industry", id: "Industri Manufaktur", key: "group_manufacturing" },
        items: [
            { key: 'man_automotive', en: 'Automotive & Vehicle Components', id: 'Otomotif dan Komponen Kendaraan' },
            { key: 'man_electronics', en: 'Electronics & Semiconductors', id: 'Elektronik dan Semikonduktor' },
            { key: 'man_machinery', en: 'Industrial Machinery & Equipment', id: 'Mesin dan Peralatan Industri' },
            { key: 'man_textiles', en: 'Textiles & Garments', id: 'Tekstil dan Garmen' },
            { key: 'man_chemicals', en: 'Basic Chemicals & Petrochemicals', id: 'Kimia Dasar dan Petrokimia' },
            { key: 'man_metals', en: 'Metals & Steel', id: 'Logam dan Baja' },
            { key: 'man_pharma', en: 'Pharmaceuticals & Biotechnology', id: 'Farmasi dan Bioteknologi' },
            { key: 'man_food', en: 'Processed Food & Beverages', id: 'Makanan dan Minuman Olahan' },
            { key: 'man_plastics', en: 'Plastics, Rubber, & Packaging', id: 'Plastik, Karet, dan Kemasan' },
            { key: 'man_furniture', en: 'Household Products & Furniture', id: 'Produk Rumah Tangga dan Furnitur' },
        ]
    },
    {
        group: { en: "Energy & Natural Resources", id: "Industri Energi dan Sumber Daya Alam", key: "group_energy" },
        items: [
            { key: 'energy_oil_gas', en: 'Oil & Gas', id: 'Minyak dan Gas Bumi' },
            { key: 'energy_mining', en: 'Coal & Mineral Mining', id: 'Batu Bara dan Pertambangan Mineral' },
            { key: 'energy_renewable', en: 'Renewable Energy (Solar, Wind, Hydro)', id: 'Energi Terbarukan (Surya, Angin, Hidro)' },
            { key: 'energy_utilities', en: 'Electric & Gas Utilities', id: 'Utilitas Listrik dan Gas' },
            { key: 'energy_water', en: 'Water & Waste Treatment', id: 'Pengolahan Air dan Limbah' },
        ]
    },
    {
        group: { en: "Construction & Property", id: "Industri Konstruksi dan Properti", key: "group_construction" },
        items: [
            { key: 'con_building', en: 'Building & Civil Construction', id: 'Konstruksi Bangunan dan Sipil' },
            { key: 'con_architecture', en: 'Architecture & Interior Design', id: 'Arsitektur dan Desain Interior' },
            { key: 'con_property', en: 'Commercial & Residential Property', id: 'Properti Komersial dan Perumahan' },
            { key: 'con_facility_management', en: 'Facility Management', id: 'Pengelolaan Fasilitas (Facility Management)' },
            { key: 'con_infrastructure', en: 'Road, Bridge, & Transport Infrastructure', id: 'Infrastruktur Jalan, Jembatan, dan Transportasi' },
        ]
    },
    {
        group: { en: "Transportation & Logistics", id: "Industri Transportasi dan Logistik", key: "group_transport" },
        items: [
            { key: 'trans_land_sea_air', en: 'Land, Sea, & Air Transportation', id: 'Transportasi Darat, Laut, dan Udara' },
            { key: 'trans_logistics', en: 'Logistics, Warehousing, & Distribution', id: 'Logistik, Pergudangan, dan Distribusi' },
            { key: 'trans_freight', en: 'Freight Forwarding & Expedition', id: 'Freight Forwarding dan Ekspedisi' },
            { key: 'trans_public', en: 'Public Transport & Ride-Hailing', id: 'Transportasi Publik dan Ride-Hailing' },
            { key: 'trans_supply_chain', en: 'Supply Chain Management', id: 'Manajemen Rantai Pasokan (Supply Chain)' },
        ]
    },
    {
        group: { en: "Agriculture, Fisheries, & Forestry", id: "Industri Pertanian, Perikanan, & Kehutanan", key: "group_agriculture" },
        items: [
            { key: 'agri_farming', en: 'Agriculture & Horticulture', id: 'Pertanian & Hortikultura' },
            { key: 'agri_plantation', en: 'Plantations (Palm Oil, Coffee, Tea, Rubber)', id: 'Perkebunan (Kelapa Sawit, Kopi, Teh, Karet)' },
            { key: 'agri_livestock', en: 'Livestock & Processed Animal Products', id: 'Peternakan & Produk Hewan Olahan' },
            { key: 'agri_fisheries', en: 'Fisheries & Aquaculture', id: 'Perikanan & Akuakultur' },
            { key: 'agri_forestry', en: 'Forestry & Wood Products', id: 'Kehutanan & Produk Kayu' },
        ]
    },
    {
        group: { en: "Government, Social, & Non-Profit", id: "Industri Pemerintahan, Sosial, & Nirlaba", key: "group_nonprofit" },
        items: [
            { key: 'nonprofit_gov', en: 'Government Institutions & State-Owned Enterprises', id: 'Institusi Pemerintah & BUMN' },
            { key: 'nonprofit_social', en: 'Non-Profit & Social Organizations', id: 'Organisasi Nirlaba & Sosial' },
            { key: 'nonprofit_ngo', en: 'International NGOs', id: 'LSM Internasional' },
            { key: 'nonprofit_humanitarian', en: 'Humanitarian & Philanthropic Institutions', id: 'Lembaga Kemanusiaan & Filantropi' },
            { key: 'nonprofit_think_tank', en: 'Think Tanks & Policy Research Institutes', id: 'Lembaga Riset & Kebijakan (Think Tank)' },
        ]
    }
];

// For Daily Challenges - a smaller, curated list
export const dailyChallengeCategoryMapping = [
    { category: 'logo_design' as DesignCategory, industry: 'tech_software_dev' },
    { category: 'website_ui_ux' as DesignCategory, industry: 'tour_hospitality' },
    { category: 'instagram_post_story' as DesignCategory, industry: 'retail_beauty' },
    { category: 'poster' as DesignCategory, industry: 'creative_music' },
    { category: 'food_packaging' as DesignCategory, industry: 'man_food' },
    { category: 'landing_page' as DesignCategory, industry: 'edu_edtech' },
    { category: 'character_illustration'as DesignCategory, industry: 'tour_gaming' },
    { category: 'brand_guideline' as DesignCategory, industry: 'nonprofit_social' },
    { category: 'mobile_app_ui' as DesignCategory, industry: 'health_digital' },
];