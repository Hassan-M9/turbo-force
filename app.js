// App State
let currentLang = localStorage.getItem('preferredLanguage') || 'ar'; // Default language

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    // Navigation toggle elements
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const langSelect = document.getElementById("langSelect");
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");
    
    // Initialise Application
    const isRTL = (currentLang === 'ar' || currentLang === 'ur');
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    document.body.className = 'lang-' + currentLang;
    if (langSelect) {
        langSelect.value = currentLang;
    }
    updateLanguageUI(currentLang);

    // Handle Scroll Header Effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });

    // Mobile Navigation Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
            const spans = menuToggle.querySelectorAll("span");
            if (menuToggle.classList.contains("active")) {
                spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
            } else {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });

        // Close menu on nav-link click (mobile)
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                const spans = menuToggle.querySelectorAll("span");
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            });
        });
    }

    // Language Dropdown Selector Change
    if (langSelect) {
        langSelect.addEventListener("change", (e) => {
            currentLang = e.target.value;
            localStorage.setItem('preferredLanguage', currentLang);
            document.body.className = 'lang-' + currentLang;
            const isRTL = (currentLang === 'ar' || currentLang === 'ur');
            document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
            document.documentElement.setAttribute('lang', currentLang);
            updateLanguageUI(currentLang);
        });
    }

    // FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.parentElement;
            const isActive = item.classList.contains("active");
            document.querySelectorAll(".faq-item").forEach(faq => {
                faq.classList.remove("active");
            });
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameVal = document.getElementById("clientName").value.trim();
            const phoneVal = document.getElementById("clientPhone").value.trim();
            const turboCodeVal = document.getElementById("clientTurboCode").value.trim();
            const messageVal = document.getElementById("clientMessage").value.trim();

            if (nameVal === "" || phoneVal === "" || messageVal === "") {
                alert(currentLang === 'ar'
                    ? "يرجى تعبئة الحقول الأساسية: الاسم، رقم الجوال، وتفاصيل الطلب."
                    : "Please fill in the required fields: Name, Phone, and Order Details.");
                return;
            }

            // Construct WhatsApp message with emojis
            let waMsg = "";
            if (currentLang === 'ar') {
                waMsg = `🔧 *طلب سعر تيربو - تيربو فورس*\n\n👤 *الاسم:* ${nameVal}\n📞 *رقم الجوال:* ${phoneVal}`;
                if (turboCodeVal) waMsg += `\n🔢 *كود التيربو:* ${turboCodeVal}`;
                waMsg += `\n📝 *تفاصيل الطلب:* ${messageVal}`;
                waMsg += `\n\n_تم الإرسال من موقع تيربو فورس_`;
            } else {
                waMsg = `🔧 *Turbo Quote Request - Turbo Force*\n\n👤 *Name:* ${nameVal}\n📞 *Phone:* ${phoneVal}`;
                if (turboCodeVal) waMsg += `\n🔢 *Turbo Code:* ${turboCodeVal}`;
                waMsg += `\n📝 *Details:* ${messageVal}`;
                waMsg += `\n\n_Sent from Turbo Force website_`;
            }

            const waLink = `https://wa.me/966536758510?text=${encodeURIComponent(waMsg)}`;
            window.open(waLink, '_blank');

            formFeedback.style.display = "block";
            contactForm.reset();

            setTimeout(() => {
                formFeedback.style.opacity = "0";
                setTimeout(() => {
                    formFeedback.style.display = "none";
                    formFeedback.style.opacity = "1";
                }, 400);
            }, 6000);
        });
    }

    // Turbo Guide Toggle
    const guideToggle = document.getElementById("guideToggle");
    const turboGuideContainer = document.getElementById("turboGuideContainer");
    if (guideToggle && turboGuideContainer) {
        guideToggle.addEventListener("click", () => {
            turboGuideContainer.classList.toggle("active");
            const isExpanded = turboGuideContainer.classList.contains("active");
            const spanText = guideToggle.querySelector("span");
            if (spanText) {
                const key = isExpanded ? 'hide_guide' : 'show_guide';
                spanText.textContent = translations[currentLang][key];
            }
        });
    }

    // Guide Tab Buttons switcher
    const guideTabButtons = document.querySelectorAll(".guide-tab-btn");
    const guideImage = document.getElementById("guideImage");
    const guideImageCaption = document.getElementById("guideImageCaption");
    if (guideTabButtons && guideImage && guideImageCaption) {
        guideTabButtons.forEach(button => {
            button.addEventListener("click", () => {
                guideTabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                const index = button.getAttribute("data-guide-index");
                guideImage.src = `assets/turbo_plate_${index}.png`;
                const key = `guide_caption_${index}`;
                guideImageCaption.setAttribute("data-i18n", key);
                guideImageCaption.textContent = translations[currentLang][key];
            });
        });
    }

    // File Upload Handler and Preview
    const fileInput = document.getElementById("clientTurboImage");
    const previewContainer = document.getElementById("uploadPreviewContainer");
    if (fileInput && previewContainer) {
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (file) {
                const objectURL = URL.createObjectURL(file);
                const fileSizeKB = (file.size / 1024).toFixed(1);
                previewContainer.innerHTML = `
                    <img class="upload-preview-thumbnail" src="${objectURL}" alt="Preview">
                    <div class="upload-preview-info">
                        <span class="upload-preview-name">${file.name}</span>
                        <span class="upload-preview-size">${fileSizeKB} KB</span>
                    </div>
                    <button type="button" class="btn-remove-upload" id="btnRemoveUpload" title="Remove image">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                `;
                previewContainer.style.display = "flex";
                const btnRemove = document.getElementById("btnRemoveUpload");
                if (btnRemove) {
                    btnRemove.addEventListener("click", () => {
                        fileInput.value = "";
                        previewContainer.style.display = "none";
                        previewContainer.innerHTML = "";
                    });
                }
            } else {
                previewContainer.style.display = "none";
                previewContainer.innerHTML = "";
            }
        });
    }

    // Reset uploader preview in form submit
    if (contactForm) {
        const originalReset = contactForm.reset.bind(contactForm);
        contactForm.reset = function() {
            originalReset();
            if (previewContainer) {
                previewContainer.style.display = "none";
                previewContainer.innerHTML = "";
            }
            if (fileInput) fileInput.value = "";
        };
    }

    // Lightbox modal logic
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (lightbox && lightboxImg && lightboxClose) {
        document.addEventListener("click", (e) => {
            if (e.target && (e.target.classList.contains("upload-preview-thumbnail") || e.target.matches(".gallery-img-wrapper img"))) {
                lightbox.style.display = "block";
                lightboxImg.src = e.target.src;
            }
        });
        lightboxClose.addEventListener("click", () => { lightbox.style.display = "none"; });
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });
    }

    // ─────────────────────────────────────────────────
    // SCROLL TO TOP BUTTON
    // ─────────────────────────────────────────────────
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ─────────────────────────────────────────────────
    // ANIMATED COUNTERS (Intersection Observer)
    // ─────────────────────────────────────────────────
    const statCards = document.querySelectorAll(".stat-card");

    const animateCounter = (el, rawText) => {
        const duration = 1800;
        const start = performance.now();
        // Extract numeric part
        const numMatch = rawText.match(/\d+/);
        if (!numMatch) return;
        const targetNum = parseInt(numMatch[0]);
        const hasPlusSuffix = rawText.trim().endsWith("+");
        const hasPlusPrefix = rawText.trim().startsWith("+");
        const suffix = hasPlusSuffix ? "+" : "";
        const prefix = hasPlusPrefix ? "+" : "";

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * targetNum);
            el.textContent = prefix + current.toLocaleString('ar-SA') + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = prefix + targetNum.toLocaleString('ar-SA') + suffix;
        };
        requestAnimationFrame(tick);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = "true";
                const numEl = entry.target.querySelector(".stat-number");
                if (numEl) animateCounter(numEl, numEl.textContent.trim());
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => statObserver.observe(card));

    // ─────────────────────────────────────────────────
    // SCROLL REVEAL ANIMATIONS
    // ─────────────────────────────────────────────────
    const revealSelectors = [
        ".feature-card", ".review-card", ".gallery-card",
        ".faq-item", ".about-item", ".stat-card",
        ".contact-form-container", ".contact-sidebar", ".section-title"
    ];

    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, idx) => {
            el.classList.add("animate-on-scroll");
            if (idx < 6) el.classList.add(`delay-${idx + 1}`);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".animate-on-scroll").forEach(el => revealObserver.observe(el));

    // ─────────────────────────────────────────────────
    // HERO QUICK STATS — Count up on page load
    // ─────────────────────────────────────────────────
    const heroStatNums = document.querySelectorAll(".hero-stat-num");

    const countHeroStat = (el) => {
        const target = parseInt(el.getAttribute("data-target") || "0");
        const duration = 1600;
        const start = performance.now();
        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(tick);
    };

    // Fire hero counters 700ms after load
    setTimeout(() => {
        heroStatNums.forEach(el => countHeroStat(el));
    }, 700);

});

// Update Text Nodes on Page based on selected Language
function updateLanguageUI(lang) {
    const i18nElements = document.querySelectorAll("[data-i18n]");
    i18nElements.forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            if (key === 'hero_title') {
                elem.innerHTML = translations[lang][key];
            } else {
                elem.textContent = translations[lang][key];
            }
        }
    });

    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(elem => {
        const key = elem.getAttribute("data-i18n-placeholder");
        if (translations[lang] && translations[lang][key]) {
            elem.setAttribute("placeholder", translations[lang][key]);
        }
    });

    document.title = translations[lang].company_name || document.title;

    const guideToggle = document.getElementById("guideToggle");
    const turboGuideContainer = document.getElementById("turboGuideContainer");
    if (guideToggle && turboGuideContainer) {
        const spanText = guideToggle.querySelector("span");
        if (spanText) {
            const isExpanded = turboGuideContainer.classList.contains("active");
            const key = isExpanded ? 'hide_guide' : 'show_guide';
            spanText.textContent = translations[lang][key];
        }
    }

    const guideImageCaption = document.getElementById("guideImageCaption");
    if (guideImageCaption) {
        const activeKey = guideImageCaption.getAttribute("data-i18n");
        if (activeKey && translations[lang][activeKey]) {
            guideImageCaption.textContent = translations[lang][activeKey];
        }
    }
}
