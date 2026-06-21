// shared.js — Injects header and footer into every page
// Detect current page to highlight active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const NAV_LINKS = [
    { href: 'index.html',        labelKey: 'nav_home',      label: 'الرئيسية' },
    { href: 'index.html#gallery', labelKey: 'nav_gallery',   label: 'معرض الصور' },
    { href: 'how-it-works.html', labelKey: 'nav_how',       label: 'كيف نعمل' },
    { href: 'index.html#reviews', labelKey: 'nav_reviews',   label: 'آراء العملاء' },
    { href: 'about.html',        labelKey: 'nav_about',     label: 'من نحن' },
    { href: 'faq.html',          labelKey: 'nav_faq',       label: 'الأسئلة الشائعة' },
    { href: 'contact.html',      labelKey: 'nav_contact',   label: 'اتصل بنا' },
];

// Extend global translations object with new keys if it exists
if (typeof translations !== 'undefined') {
    const extraTranslations = {
        ar: {
            nav_how: "كيف نعمل",
            nav_reviews: "آراء العملاء",
            home_cards_title: "أقسام المركز",
            home_card_gallery_desc: "تصفح صور شواحن وقلوب التيربو المتوفرة لدينا.",
            home_card_how_desc: "تعرف على خطوات طلب وفحص شاحن التيربو ومقارنة الأسعار.",
            home_card_reviews_desc: "اقرأ تقييمات وآراء عملائنا في مختلف مدن المملكة.",
            home_card_about_desc: "تعرف على مركزنا بالرياض، خبرتنا، ورؤيتنا وقيمنا.",
            home_card_faq_desc: "إجابات على الأسئلة الشائعة حول شواحن التيربو والضمان والشحن.",
            home_card_contact_desc: "اطلب سعر فوري لسيارتك عبر الواتساب أو اتصل بنا هاتفياً.",
            
            // Homepage counters
            hero_stat_clients: "عميل سعيد",
            hero_stat_experience: "سنوات خبرة",
            hero_stat_brands: "ماركة مدعومة",
            hero_stat_delivery: "توصيل لكل المدن",
            hero_stat_delivery_unit: "سا",

            // Customer Reviews translations
            rev1_text: `"جبت قلب تيربو لشانجان CS75 وركبوه بنفس اليوم. الأداء زي ما كان تمام. خدمة ممتازة وسعر معقول جداً مقارنة بالوكالة."`,
            rev1_author: "محمد العتيبي",
            rev1_region: "الرياض",
            rev1_avatar: "م.ع",

            rev2_text: `"طلبت تيربو كامل لهافال H6 وتم الشحن لجدة خلال يوم ونص. صندوق التغليف محترم وما فيه أي خلل. شكراً تيربو فورس."`,
            rev2_author: "خالد الزهراني",
            rev2_region: "جدة",
            rev2_avatar: "خ.ز",

            rev3_text: `"كانت عندي مشكلة في إيجاد القطعة الصح لجيلي إيمغراند. الفريق ساعدني من الكود وطلع لي القطعة المناسبة. محترفين!"`,
            rev3_author: "عبدالله الشمري",
            rev3_region: "القصيم",
            rev3_avatar: "ع.ش",

            rev4_text: `"تعاملت معهم أكثر من مرة لورشتي. أسعار الجملة ممتازة والتوصيل سريع. أنصح كل ورشة صيانة بالتعامل معهم."`,
            rev4_author: "سعد المطيري",
            rev4_region: "الدمام",
            rev4_avatar: "س.م",

            rev5_text: `"طلبت خراطيش تيربو لثلاث سيارات صينية. الكل وصل مضمون وسليم. الرد على الواتساب سريع جداً."`,
            rev5_author: "فيصل الحربي",
            rev5_region: "مكة المكرمة",
            rev5_avatar: "ف.ح",

            rev6_text: `"صراحة أحسن تجربة شريت فيها قطعة تيربو بالسعودية. السعر منافس وما اضطررت أدور كثير. شكراً على الخدمة."`,
            rev6_author: "ناصر القحطاني",
            rev6_region: "أبها",
            rev6_avatar: "ن.ق",

            // How It Works Translations
            how_title: "كيف تطلب قطعتك؟",
            step1_title: "اتصل أو أرسل الكود",
            step1_desc: "اتصل بنا عبر الواتساب أو الهاتف، وأرسل صورة لوحة بيانات التيربو أو رقم القطعة وموديل سيارتك.",
            step2_title: "نحدد القطعة ونقدّم السعر",
            step2_desc: "يقوم فريقنا بالتحقق من التوافق، ونرسل لك عرض سعر دقيق خلال دقائق مع توضيح نوع القطعة ومصدرها.",
            step3_title: "استلم قطعتك خلال 48سا",
            step3_desc: "نشحن يومياً لكافة مدن المملكة عبر شركات الشحن السريعة. مضمون 100% مع ضمان بعد الاستلام.",
            comp_title: "لماذا تيربو فورس؟",
            comp_header_feature: "الميزة",
            comp_header_us: "★ تيربو فورس",
            comp_header_agency: "الوكالة",
            comp_header_market: "السوق",
            comp_row1_feature: "جودة القطعة",
            comp_row1_us: "✔ وكالة + تجاري",
            comp_row1_agency: "✔ وكالة فقط",
            comp_row1_market: "✖ غير مضمون",
            comp_row2_feature: "السعر",
            comp_row2_us: "✔ تنافسي جداً",
            comp_row2_agency: "✖ مرتفع",
            comp_row2_market: "− يتفاوت",
            comp_row3_feature: "سرعة التوصيل",
            comp_row3_us: "✔ خلال 48سا",
            comp_row3_agency: "− قد يتأخر",
            comp_row3_market: "✖ غير مضمون",
            comp_row4_feature: "دعم فني",
            comp_row4_us: "✔ مباشر وفوري",
            comp_row4_agency: "− محدود",
            comp_row4_market: "✖ نادراً",
            comp_row5_feature: "ضمان بعد الشراء",
            comp_row5_us: "✔ متوفر",
            comp_row5_agency: "✔ متوفر",
            comp_row5_market: "✖ نادراً",
            comp_row6_feature: "التوافق مع السيارات الصينية",
            comp_row6_us: "✔ متخصص",
            comp_row6_agency: "− محدود",
            comp_row6_market: "✖ غير متخصص",
            comp_cta: "📞 احصل على سعرك الآن",

            // FAQ Bottom CTA
            faq_cta: "📞 سؤالك مش موجود؟ تواصل معنا"
        },
        en: {
            nav_how: "How It Works",
            nav_reviews: "Reviews",
            home_cards_title: "Explore Our Center",
            home_card_gallery_desc: "Browse photos of available turbochargers and cartridge cores.",
            home_card_how_desc: "Learn the steps to order and compare pricing options.",
            home_card_reviews_desc: "Read reviews and testimonials from our clients nationwide.",
            home_card_about_desc: "Learn about our Riyadh workshop, values, and vision.",
            home_card_faq_desc: "Get answers to frequently asked questions about warranty and shipping.",
            home_card_contact_desc: "Get an instant price quote via WhatsApp or direct call.",
            
            // Homepage counters
            hero_stat_clients: "Happy Clients",
            hero_stat_experience: "Years Experience",
            hero_stat_brands: "Brands Supported",
            hero_stat_delivery: "Nationwide Delivery",
            hero_stat_delivery_unit: "h",

            // Customer Reviews translations
            rev1_text: `"I bought a turbo cartridge for my Changan CS75 and they installed it on the same day. Performance is as good as new. Excellent service and very reasonable price compared to the agency."`,
            rev1_author: "Mohammad Al-Otaibi",
            rev1_region: "Riyadh",
            rev1_avatar: "M.O",

            rev2_text: `"I ordered a complete turbocharger for a Haval H6 and it was shipped to Jeddah in a day and a half. The packaging was neat and intact. Thank you, Turbo Force."`,
            rev2_author: "Khalid Al-Zahrani",
            rev2_region: "Jeddah",
            rev2_avatar: "K.Z",

            rev3_text: `"I had trouble finding the right part for my Geely Emgrand. The team helped me identify it using the code and got me the exact match. True professionals!"`,
            rev3_author: "Abdullah Al-Shammari",
            rev3_region: "Qassim",
            rev3_avatar: "A.S",

            rev4_text: `"I have dealt with them multiple times for my auto workshop. Wholesale prices are excellent and delivery is fast. I highly recommend them to every repair shop."`,
            rev4_author: "Saad Al-Mutairi",
            rev4_region: "Dammam",
            rev4_avatar: "S.M",

            rev5_text: `"I ordered turbo cartridges for three Chinese cars. Everything arrived secure and guaranteed. Extremely fast response on WhatsApp."`,
            rev5_author: "Faisal Al-Harbi",
            rev5_region: "Makkah",
            rev5_avatar: "F.H",

            rev6_text: `"Honestly, the best experience buying a turbo part in Saudi Arabia. The price is highly competitive, saving me from searching elsewhere. Thank you for the service."`,
            rev6_author: "Nasser Al-Qahtani",
            rev6_region: "Abha",
            rev6_avatar: "N.Q",

            // How It Works Translations
            how_title: "How to Order Your Part?",
            step1_title: "Call or Send Code",
            step1_desc: "Contact us via WhatsApp or phone, and send a photo of the turbo plate or part number and your car model.",
            step2_title: "We Identify and Quote",
            step2_desc: "Our team checks compatibility and sends a precise price quote in minutes, explaining the origin and type of part.",
            step3_title: "Get it in 48 Hours",
            step3_desc: "We ship daily to all Saudi cities via express carriers. 100% guaranteed with after-sales warranty.",
            comp_title: "Why Turbo Force?",
            comp_header_feature: "Feature",
            comp_header_us: "★ Turbo Force",
            comp_header_agency: "Dealer (Agency)",
            comp_header_market: "Local Market",
            comp_row1_feature: "Part Quality",
            comp_row1_us: "✔ OEM + Aftermarket",
            comp_row1_agency: "✔ OEM Only",
            comp_row1_market: "✖ Not Guaranteed",
            comp_row2_feature: "Pricing",
            comp_row2_us: "✔ Highly Competitive",
            comp_row2_agency: "✖ Expensive",
            comp_row2_market: "− Varies",
            comp_row3_feature: "Delivery Speed",
            comp_row3_us: "✔ Within 48 Hours",
            comp_row3_agency: "− Delayed",
            comp_row3_market: "✖ Not Guaranteed",
            comp_row4_feature: "Technical Support",
            comp_row4_us: "✔ Direct & Instant",
            comp_row4_agency: "− Limited",
            comp_row4_market: "✖ Rarely",
            comp_row5_feature: "Warranty",
            comp_row5_us: "✔ Included",
            comp_row5_agency: "✔ Included",
            comp_row5_market: "✖ Rarely",
            comp_row6_feature: "Chinese Car Expertise",
            comp_row6_us: "✔ Specialized",
            comp_row6_agency: "− Limited",
            comp_row6_market: "✖ Unspecialized",
            comp_cta: "📞 Get Your Quote Now",

            // FAQ Bottom CTA
            faq_cta: "📞 Question not listed? Contact us"
        }
    };

    // Fallback other languages to English for the new keys if not defined
    const allLangs = ['bn', 'hi', 'ur', 'zh', 'fr', 'de', 'es'];
    allLangs.forEach(lang => {
        if (translations[lang]) {
            if (!extraTranslations[lang]) {
                extraTranslations[lang] = {};
            }
            // Merge custom translations if available, otherwise fallback to English
            for (const key in extraTranslations.en) {
                if (!extraTranslations[lang][key]) {
                    extraTranslations[lang][key] = extraTranslations.en[key];
                }
            }
        }
    });

    // Merge all extra translations into the global translations object
    for (const lang in extraTranslations) {
        if (translations[lang]) {
            Object.assign(translations[lang], extraTranslations[lang]);
        }
    }
}

function buildHeader() {
    const navItems = NAV_LINKS.filter(link => link.labelKey !== 'nav_reviews').map(link => {
        const baseHref = link.href.split('#')[0];
        const hash = link.href.split('#')[1];
        let active = '';
        
        if (currentPage === baseHref) {
            if (hash) {
                if (window.location.hash === '#' + hash) {
                    active = 'class="active"';
                }
            } else {
                const otherHashes = NAV_LINKS.filter(l => l.href.includes('#') && l.labelKey !== 'nav_reviews').map(l => '#' + l.href.split('#')[1]);
                if (!otherHashes.includes(window.location.hash)) {
                    active = 'class="active"';
                }
            }
        }
        return `<a href="${link.href}" ${active} data-i18n="${link.labelKey}">${link.label}</a>`;
    }).join('\n');

    return `
    <header>
        <div class="container">
            <a href="index.html" class="logo" aria-label="Turbo Force Home" data-i18n="logo_text">
                تيربو فورس | Turbo Force
            </a>
            <nav class="nav-links" id="navLinks">
                ${navItems}
            </nav>
            <div class="header-actions">
                <a href="tel:0536758510" class="phone-btn">
                    <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    <span data-i18n="call_now">اتصل الآن</span>
                </a>
                <select class="lang-select" id="langSelect" aria-label="Language Selector">
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="ur">اردو (Urdu)</option>
                    <option value="zh">中文 (Chinese)</option>
                    <option value="fr">Français (French)</option>
                    <option value="de">Deutsch (German)</option>
                    <option value="es">Español (Spanish)</option>
                </select>
                <div class="menu-toggle" id="menuToggle">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    </header>`;
}

function buildFooter() {
    return `
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col footer-about">
                    <a href="index.html" class="logo" aria-label="Turbo Force Home">
                        <img src="assets/logo.jpg" alt="Turbo Force Logo" class="logo-img">
                    </a>
                    <p data-i18n="hero_desc">نحن متخصصون في توفير شواحن التيربو وأنويتها وأطقم الإصلاح بأعلى معايير الجودة.</p>
                </div>
                <div class="footer-col">
                    <h4 data-i18n="footer_quick_links">روابط سريعة</h4>
                    <ul class="footer-links">
                        <li><a href="index.html" data-i18n="nav_home">الرئيسية</a></li>
                        <li><a href="index.html#gallery" data-i18n="nav_gallery">معرض الصور</a></li>
                        <li><a href="how-it-works.html" data-i18n="nav_how">كيف نعمل</a></li>
                        <li><a href="index.html#reviews" data-i18n="nav_reviews">آراء العملاء</a></li>
                        <li><a href="about.html" data-i18n="nav_about">من نحن</a></li>
                        <li><a href="faq.html" data-i18n="nav_faq">الأسئلة الشائعة</a></li>
                        <li><a href="contact.html" data-i18n="nav_contact">اتصل بنا</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 data-i18n="footer_social">وسائل التواصل</h4>
                    <div class="social-links">
                        <a href="https://wa.me/966536758510" target="_blank" class="social-link-item link-whatsapp" title="WhatsApp">
                            <svg viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                        </a>
                        <a href="https://www.instagram.com/turbo.force1?igsh=MWlwaDhmZG5mZGZwcg==" target="_blank" class="social-link-item link-instagram" title="Instagram">
                            <svg viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>
                        </a>
                        <a href="https://www.snapchat.com/add/turboforce1" target="_blank" class="social-link-item link-snapchat" title="Snapchat">
                            <svg viewBox="0 0 16 16"><path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1 1 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.4 3.4 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.3.3 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.4 1.4 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.8 1.8 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.3 4.3 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0s-1.76.216-2.505.641c-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.8 1.8 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.4 1.4 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.4.4 0 0 1 .109.11c.026.053.027.11-.012.217a3.4 3.4 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075q.18.189.409.31a4.4 4.4 0 0 0 1 .4.7.7 0 0 1 .202.09c.118.104.102.26.259.488q.12.178.296.3c.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.6.6 0 0 1 .19-.087 4.5 4.5 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047"/></svg>
                        </a>
                        <a href="https://www.tiktok.com/@turbo.force8" target="_blank" class="social-link-item link-tiktok" title="TikTok">
                            <svg viewBox="0 0 16 16"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/></svg>
                        </a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4 data-i18n="footer_contact">بيانات التواصل</h4>
                    <div class="footer-contact-item">
                        <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        <a href="tel:0536758510">0536758510</a>
                    </div>
                    <div class="footer-contact-item">
                        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        <span data-i18n="contact_address_val">المملكة العربية السعودية، الرياض، صناعية الدريهمية</span>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 <span data-i18n="footer_rights">جميع الحقوق محفوظة. تيربو فورس</span></p>
                <p>Designed with passion</p>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp Widget -->
    <a href="https://wa.me/966536758510" class="whatsapp-float" target="_blank" aria-label="WhatsApp Us">
        <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.07 1 11.99 1c-5.433 0-9.852 4.373-9.856 9.803-.001 1.742.483 3.442 1.402 4.962L2.49 20.315l4.157-1.161z"/></svg>
    </a>

    <!-- Scroll To Top Button -->
    <button class="scroll-top-btn" id="scrollTopBtn" aria-label="Scroll to top">
        <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
    </button>

    <!-- Mobile Sticky CTA Bar -->
    <div class="mobile-cta-bar" id="mobileCTABar">
        <a href="tel:0536758510" class="mobile-cta-call">
            <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            <span>اتصل الآن</span>
        </a>
        <a href="https://wa.me/966536758510" target="_blank" class="mobile-cta-whatsapp">
            <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24z"/></svg>
            <span>واتساب</span>
        </a>
    </div>`;
}

// Inject header and footer on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Insert header before first child of body
    document.body.insertAdjacentHTML('afterbegin', buildHeader());
    // Insert footer before </body>
    document.body.insertAdjacentHTML('beforeend', buildFooter());

    // Listen to hashchange to update active navigation links dynamically
    window.addEventListener('hashchange', () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const baseHref = href.split('#')[0];
                const hash = href.split('#')[1];
                let isActive = false;
                
                if (currentPage === baseHref) {
                    if (hash) {
                        isActive = (window.location.hash === '#' + hash);
                    } else {
                        const otherHashes = NAV_LINKS.filter(l => l.href.includes('#') && l.labelKey !== 'nav_reviews').map(l => '#' + l.href.split('#')[1]);
                        isActive = (!otherHashes.includes(window.location.hash));
                    }
                }
                
                if (isActive) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
});
