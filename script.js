    window.addEventListener("DOMContentLoaded", () => {
        // ----- GSAP ENTRANCE ANIMATIONS -----
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
        tl.from(".profile-img", { opacity: 0, scale: 0.85, y: 30, duration: 0.9 })
          .from(".intro-text h1", { opacity: 0, y: 35, duration: 0.7 }, "-=0.4")
          .from(".tagline", { opacity: 0, x: -20, duration: 0.5 }, "-=0.5")
          .from(".intro-text p", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
          .from(".bio-card", { opacity: 0, y: 45, duration: 0.7 }, "-=0.2")
          .from(".hobbies-section", { opacity: 0, y: 40, duration: 0.7 }, "-=0.5")
          .from(".contact-grid", { opacity: 0, y: 50, duration: 0.8 }, "-=0.3")
          .from(".form-section", { opacity: 0, y: 40, duration: 0.7 }, "-=0.2")
          .from(".social-icons-grid a", { opacity: 0, scale: 0.8, stagger: 0.05, duration: 0.5 }, "-=0.2");

        gsap.from(".hobby-list li", {
            opacity: 0,
            x: -25,
            duration: 0.6,
            stagger: 0.07,
            ease: "back.out(0.7)",
            delay: 0.6
        });

        // KEBAB MENU LOGIC
        const kebab = document.getElementById("kebabMenu");
        const toggleBtn = document.getElementById("kebabToggle");

        function closeMenuOnClickOutside(e) {
            if (!kebab.contains(e.target)) {
                kebab.classList.remove("active");
                document.removeEventListener("click", closeMenuOnClickOutside);
            }
        }

        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!kebab.classList.contains("active")) {
                kebab.classList.add("active");
                setTimeout(() => document.addEventListener("click", closeMenuOnClickOutside), 10);
            } else {
                kebab.classList.remove("active");
                document.removeEventListener("click", closeMenuOnClickOutside);
            }
        });

        // Smooth scroll for menu items
        document.querySelectorAll(".menu-dropdown a").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    kebab.classList.remove("active");
                    document.removeEventListener("click", closeMenuOnClickOutside);
                }
            });
        });

        // Contact form handler (email + message)
        const contactForm = document.getElementById("profileContactForm");
        const feedbackDiv = document.getElementById("formFeedback");

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("userEmail");
            const messageInput = document.getElementById("userMessage");
            const emailVal = emailInput.value.trim();
            const msgVal = messageInput.value.trim();

            if (!emailVal || !msgVal) {
                feedbackDiv.innerHTML = "<i class='fas fa-exclamation-triangle'></i> Please fill in both email and message.";
                feedbackDiv.style.color = "#f2a07e";
                gsap.to(feedbackDiv, { opacity: 0, duration: 2, delay: 2.5, onComplete: () => { feedbackDiv.innerHTML = ""; feedbackDiv.style.opacity = 1; } });
                return;
            }
            if (!emailVal.includes("@") || !emailVal.includes(".")) {
                feedbackDiv.innerHTML = "<i class='fas fa-envelope'></i> Enter a valid email address.";
                feedbackDiv.style.color = "#f2a07e";
                setTimeout(() => { feedbackDiv.innerHTML = ""; }, 2500);
                return;
            }
            // success simulation (since backend not required)
            feedbackDiv.innerHTML = `<i class="fas fa-check-circle"></i> Thanks ${emailVal.split('@')[0]}! I'll read your message soon.`;
            feedbackDiv.style.color = "#a3e0d0";
            contactForm.reset();
            gsap.to(feedbackDiv, { opacity: 1, y: 0, duration: 0.3 });
            setTimeout(() => {
                gsap.to(feedbackDiv, { opacity: 0, duration: 1.5, delay: 2 });
            }, 2800);
        });

        // optional hover animations for social icons (extra smoothness)
        const socialIcons = document.querySelectorAll(".social-icon-link");
        socialIcons.forEach(icon => {
            icon.addEventListener("mouseenter", () => gsap.to(icon, { y: -5, duration: 0.2, ease: "power1.out" }));
            icon.addEventListener("mouseleave", () => gsap.to(icon, { y: 0, duration: 0.2 }));
        });
    });
