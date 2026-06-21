// App State
let currentLang = 'ar'; // Default language

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    // Navigation toggle elements
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const langSelect = document.getElementById("langSelect");
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");
    
    // Initialise Application
    updateLanguageUI(currentLang);

    // Handle Scroll Header Effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Navigation Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
            // Toggle hamburger icon animation
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
            
            // Set body class and document dir
            document.body.className = 'lang-' + currentLang;
            const isRTL = (currentLang === 'ar' || currentLang === 'ur');
            document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
            document.documentElement.setAttribute('lang', currentLang);

            // Update UI elements
            updateLanguageUI(currentLang);
        });
    }


    // FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.parentElement;
            const isActive = item.classList.contains("active");
            
            // Close all items
            document.querySelectorAll(".faq-item").forEach(faq => {
                faq.classList.remove("active");
            });

            // Toggle selected item
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // Contact Form Submission Validation
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameVal = document.getElementById("clientName").value.trim();
            const phoneVal = document.getElementById("clientPhone").value.trim();
            const emailVal = document.getElementById("clientEmail").value.trim();
            const turboCodeVal = document.getElementById("clientTurboCode").value.trim();
            const messageVal = document.getElementById("clientMessage").value.trim();

            if (nameVal === "" || phoneVal === "" || messageVal === "") {
                alert(currentLang === 'ar' ? "يرجى تعبئة الحقول الأساسية: الاسم، رقم الجوال، وتفاصيل الطلب." : "Please fill in the required fields: Name, Phone, and Order Details.");
                return;
            }

            // Construct WhatsApp message
            let waMsg = "";
            if (currentLang === 'ar') {
                waMsg = `السلام عليكم ورحمة الله،\nأود الحصول على عرض سعر لتيربو:\n\n*الاسم:* ${nameVal}\n*رقم الجوال:* ${phoneVal}`;
                if (emailVal) waMsg += `\n*البريد الإلكتروني:* ${emailVal}`;
                if (turboCodeVal) waMsg += `\n*كود التيربو (رقم القطعة):* ${turboCodeVal}`;
                waMsg += `\n*تفاصيل الطلب:* ${messageVal}`;
            } else {
                waMsg = `Hello,\nI would like to request a quote for a turbocharger:\n\n*Name:* ${nameVal}\n*Phone:* ${phoneVal}`;
                if (emailVal) waMsg += `\n*Email:* ${emailVal}`;
                if (turboCodeVal) waMsg += `\n*Turbo Code:* ${turboCodeVal}`;
                waMsg += `\n*Details:* ${messageVal}`;
            }

            const waLink = `https://wa.me/966536758510?text=${encodeURIComponent(waMsg)}`;
            window.open(waLink, '_blank');

            // Simulate form submission success visual feedback
            formFeedback.style.display = "block";
            contactForm.reset();

            // Clear feedback after 6 seconds
            setTimeout(() => {
                formFeedback.style.opacity = "0";
                setTimeout(() => {
                    formFeedback.style.display = "none";
                    formFeedback.style.opacity = "1";
                }, 400);
            }, 6000);
        });
    }

    // Scroll Spy for Nav links
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section[id]");
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.add("active");
            } else {
                document.querySelector(`.nav-links a[href*=${sectionId}]`)?.classList.remove("active");
            }
        });
    });

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
                
                // Swap Image source
                guideImage.src = `assets/turbo_plate_${index}.png`;
                
                // Swap Caption based on current language
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
                
                // Populated custom preview
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
                
                // Add click event to remove button
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
            if (fileInput) {
                fileInput.value = "";
            }
        };
    }

    // Lightbox modal logic
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    if (lightbox && lightboxImg && lightboxClose) {
        // Event delegation to open lightbox when clicking preview image
        document.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("upload-preview-thumbnail")) {
                lightbox.style.display = "block";
                lightboxImg.src = e.target.src;
            }
        });

        // Close lightbox
        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
        });

        // Close lightbox on click outside the image
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }
});

// Update Text Nodes on Page based on selected Language
function updateLanguageUI(lang) {
    const i18nElements = document.querySelectorAll("[data-i18n]");
    i18nElements.forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (translations[lang][key]) {
            // Check if element is a title or innerHTML
            if (key === 'hero_title') {
                elem.innerHTML = translations[lang][key];
            } else {
                elem.textContent = translations[lang][key];
            }
        }
    });

    // Update input placeholders
    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(elem => {
        const key = elem.getAttribute("data-i18n-placeholder");
        if (translations[lang][key]) {
            elem.setAttribute("placeholder", translations[lang][key]);
        }
    });

    // Update document title
    document.title = translations[lang].company_name;

    // Update Guide Button text dynamically
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

    // Update active tab caption text in language switch
    const guideImageCaption = document.getElementById("guideImageCaption");
    if (guideImageCaption) {
        const activeKey = guideImageCaption.getAttribute("data-i18n");
        if (activeKey && translations[lang][activeKey]) {
            guideImageCaption.textContent = translations[lang][activeKey];
        }
    }
}

