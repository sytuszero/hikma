/* ----------------------------------------------------
   Al-Hikma University College Socials Portal Script
   Core Functionality: Bilingual Switcher, Clipboard
   Helpers, & Mouse-tracking Hover Glows
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // State Manager
    const state = {
        lang: 'ar' // Default language is Arabic
    };

    // DOM Elements
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const langToggleBtn = document.getElementById('lang-toggle');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const cards = document.querySelectorAll('.card');

    const copyrightYear = document.getElementById('copyright-year');
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    // Initializations
    initTheme();
    initCopyright();
    setupLanguage(state.lang);
    setupCardHoverGlows();

    // Theme Toggle Mechanism
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            const clickedBtn = e.target.closest('.theme-btn');
            if (!clickedBtn) return;
            const newTheme = clickedBtn.getAttribute('data-theme');
            if (newTheme) {
                setTheme(newTheme);
            }
        });
    }

    function setTheme(theme, isInitialLoad = false) {
        const changeTheme = () => {
            if (theme === 'light') {
                htmlEl.classList.add('light-theme');
            } else {
                htmlEl.classList.remove('light-theme');
            }
            localStorage.setItem('theme', theme);
            updateThemeSwitcherUI(theme);
        };

        if (!isInitialLoad && document.startViewTransition) {
            // Add helper classes to control direction in CSS
            if (theme === 'dark') {
                htmlEl.classList.add('theme-transitioning-to-dark');
                htmlEl.classList.remove('theme-transitioning-to-light');
            } else {
                htmlEl.classList.add('theme-transitioning-to-light');
                htmlEl.classList.remove('theme-transitioning-to-dark');
            }

            const transition = document.startViewTransition(changeTheme);

            // Clean up helper classes after transition completes
            transition.finished.finally(() => {
                htmlEl.classList.remove('theme-transitioning-to-dark', 'theme-transitioning-to-light');
            });
        } else {
            changeTheme();
        }
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme, true);
    }

    function updateThemeSwitcherUI(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.classList.remove('active-dark', 'active-light');
            themeToggleBtn.classList.add(`active-${theme}`);
            
            const btns = themeToggleBtn.querySelectorAll('.theme-btn');
            btns.forEach(btn => {
                if (btn.getAttribute('data-theme') === theme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }

    // 1. Language Toggle Mechanism
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', (e) => {
            const clickedBtn = e.target.closest('.lang-btn');
            if (!clickedBtn) return;
            const newLang = clickedBtn.getAttribute('data-lang');
            if (newLang && newLang !== state.lang) {
                state.lang = newLang;
                setupLanguage(state.lang);
            }
        });
    }

    function setupLanguage(lang) {
        // Toggle Attributes
        htmlEl.setAttribute('lang', lang);
        htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        bodyEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Toggle Active state on neomorphic buttons & container slider
        if (langToggleBtn) {
            langToggleBtn.classList.remove('active-ar', 'active-en');
            langToggleBtn.classList.add(`active-${lang}`);

            const btns = langToggleBtn.querySelectorAll('.lang-btn');
            btns.forEach(btn => {
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // Translate Static Texts
        const translatableEls = document.querySelectorAll('[data-en][data-ar]');
        translatableEls.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Adjust document title and description for SEO
        const metaTitle = document.getElementById('meta-title');
        const metaDesc = document.getElementById('meta-desc');
        if (lang === 'ar') {
            document.title = "كلية الحكمة الجامعة - دليل قنوات التواصل والخدمات | Al-Hikma University College";
            if (metaDesc) metaDesc.setAttribute('content', 'الدليل الرسمي لقنوات التواصل الاجتماعي والخدمات الطلابية لكلية الحكمة الجامعة. تابع آخر الأخبار، خطوط النقل، والسكن الجامعي.');
        } else {
            document.title = "Al-Hikma University College - Socials & Services Directory";
            if (metaDesc) metaDesc.setAttribute('content', 'Official social media and student services directory for Al-Hikma University College. Find news, transportation routes, and student housing.');
        }
    }

    // 2. Interactive Card Mouse Hover Effect (Glow Tracking)
    function setupCardHoverGlows() {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x coordinate inside the element.
                const y = e.clientY - rect.top;  // y coordinate inside the element.

                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        });
    }



    // Toast Alert Helper
    let toastTimeout;
    function showToast(message, type = 'success') {
        clearTimeout(toastTimeout);
        
        toastMessage.textContent = message;
        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 5. Dynamic Footer Copyright
    function initCopyright() {
        if (copyrightYear) {
            copyrightYear.textContent = new Date().getFullYear();
        }
    }

    // 6. Interactive Physics Particle Canvas
    function initPhysicsCanvas() {
        const canvas = document.getElementById('ziq-hero-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let canvasRect = canvas.getBoundingClientRect();

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            canvasRect = canvas.getBoundingClientRect();
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', () => {
            canvasRect = canvas.getBoundingClientRect();
        }, { passive: true });

        const particles = [];
        let particleCount = width < 768
            ? Math.min(36, Math.floor((width * height) / 7500))
            : Math.min(65, Math.floor((width * height) / 18000));

        const sparks = [];

        class Spark {
            constructor(x, y, isShockwave = false) {
                this.x = x;
                this.y = y;
                const angle = Math.random() * Math.PI * 2;
                const speed = isShockwave ? (Math.random() * 4.5 + 2) : (Math.random() * 1.5 + 0.4);
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.size = Math.random() * 3 + 1.2;
                this.alpha = 1.0;
                this.decay = isShockwave ? (Math.random() * 0.015 + 0.01) : (Math.random() * 0.025 + 0.015);
                this.colorIndex = Math.floor(Math.random() * 4);
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                
                const isLight = document.documentElement.classList.contains('light-theme');
                const colors = isLight ? [
                    'rgba(2, 132, 199, ',   /* Cyan */
                    'rgba(29, 78, 216, ',   /* Blue */
                    'rgba(15, 23, 42, ',    /* Dark slate */
                    'rgba(180, 83, 9, '     /* Gold */
                ] : [
                    'rgba(0, 210, 255, ',   /* Cyan */
                    'rgba(14, 165, 233, ',  /* Sky blue */
                    'rgba(255, 255, 255, ', /* White */
                    'rgba(186, 230, 253, '  /* Soft light blue */
                ];
                
                ctx.fillStyle = colors[this.colorIndex] + this.alpha + ')';
                ctx.fill();
                ctx.restore();
            }
        }

        const mouse = {
            x: null,
            y: null,
            radius: 100
        };

        window.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Disable canvas hover tracking/sparks on mobile
            if (!canvasRect) return;
            const x = e.clientX - canvasRect.left;
            const y = e.clientY - canvasRect.top;

            if (x >= 0 && x <= canvasRect.width && y >= 0 && y <= canvasRect.height) {
                mouse.x = x;
                mouse.y = y;

                if (width >= 768 && Math.random() > 0.65) {
                    sparks.push(new Spark(mouse.x, mouse.y));
                }
            } else {
                mouse.x = null;
                mouse.y = null;
            }
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('click', (e) => {
            if (!canvasRect) return;
            const clickX = e.clientX - canvasRect.left;
            const clickY = e.clientY - canvasRect.top;

            if (clickX >= 0 && clickX <= canvasRect.width && clickY >= 0 && clickY <= canvasRect.height) {
                particles.forEach(p => {
                    const dx = p.x - clickX;
                    const dy = p.y - clickY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 250) {
                        const force = (250 - dist) / 12;
                        const angle = Math.atan2(dy, dx);
                        p.vx += Math.cos(angle) * force;
                        p.vy += Math.sin(angle) * force;
                    }
                });

                const count = width < 768 ? 12 : 28;
                for (let i = 0; i < count; i++) {
                    sparks.push(new Spark(clickX, clickY, true));
                }
            }
        });

        const academicItems = [
            "E = mc²", "∫ f(x) dx", "a² + b² = c²", "∇ × E = -∂B/∂t",
            "[A][B] = [C]", "[cosθ -sinθ; sinθ cosθ]", "A·x = λ·x", "det(A) = ad - bc",
            "A × A⁻¹ = I", "[1 0; 0 1]", "Σ aᵢⱼbⱼₖ", "det(A - λI) = 0",
            "[x' y']ᵀ = R(θ)[x y]ᵀ", "Aᵀ · A = I", "lim (x→0) sin(x)/x = 1", "∑ xᵢ = Nμ",
            "i² = -1", "F = ma", "sin²θ + cos²θ = 1", "PV = nRT", "H₂O & CO₂",
            "λ = h / p", "Δx · Δp ≥ ℏ/2", "π ≈ 3.1415", "e^(iπ) + 1 = 0",
            "x = (-b ± √Δ) / 2a", "Ψ(x,t)", "Ω = V / I", "∮ B·dl = μ₀I",
            "√", "∫", "∑", "π", "Ω", "θ", "∞", "λ", "Δ", "Ψ", "Φ", "α", "β", "γ", "δ"
        ];

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.baseVx = this.vx;
                this.baseVy = this.vy;
                this.mode = Math.random() > 0.45 ? 'equation' : 'shape';

                if (this.mode === 'equation') {
                    this.text = academicItems[Math.floor(Math.random() * academicItems.length)];
                    this.fontSize = Math.random() * 5 + 11;
                    this.size = this.text.length * this.fontSize * 0.5;
                    this.angle = (Math.random() - 0.5) * 0.35;
                    this.spin = (Math.random() - 0.5) * 0.003;
                } else {
                    const shapeTypes = ['flask', 'atom', 'dna'];
                    this.shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
                    this.size = Math.random() * 8 + 18;
                    this.angle = Math.random() * Math.PI * 2;
                    this.spin = (Math.random() - 0.5) * 0.012;
                }

                this.colorIndex = Math.floor(Math.random() * 5);
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                const isLight = document.documentElement.classList.contains('light-theme');
                const colors = isLight ? [
                    'rgba(180, 83, 9, 0.38)',   /* Deeper Gold */
                    'rgba(29, 78, 216, 0.35)',   /* Deeper Blue */
                    'rgba(219, 39, 119, 0.32)',  /* Deeper Pink */
                    'rgba(4, 120, 87, 0.32)',    /* Deeper Green */
                    'rgba(15, 23, 42, 0.28)'     /* Dark slate */
                ] : [
                    'rgba(212, 175, 55, 0.22)',  /* Gold glow */
                    'rgba(59, 130, 246, 0.20)',  /* Blue glow */
                    'rgba(236, 72, 153, 0.18)',  /* Pink glow */
                    'rgba(16, 185, 129, 0.16)',  /* Green glow */
                    'rgba(255, 255, 255, 0.15)'   /* Soft white */
                ];
                const color = colors[this.colorIndex];

                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = isLight ? 1.8 : 1.4;

                if (this.mode === 'equation') {
                    ctx.font = `${isLight ? '600' : '500'} ${this.fontSize}px 'Readex Pro', sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(this.text, 0, 0);
                } else {
                    if (this.shapeType === 'flask') {
                        ctx.beginPath();
                        ctx.moveTo(-this.size * 0.16, -this.size * 0.4);
                        ctx.lineTo(this.size * 0.16, -this.size * 0.4);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(-this.size * 0.1, -this.size * 0.4);
                        ctx.lineTo(-this.size * 0.1, -this.size * 0.1);
                        ctx.lineTo(-this.size * 0.4, this.size * 0.4);
                        ctx.lineTo(this.size * 0.4, this.size * 0.4);
                        ctx.lineTo(this.size * 0.1, -this.size * 0.1);
                        ctx.lineTo(this.size * 0.1, -this.size * 0.4);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(-this.size * 0.22, 0.1 * this.size);
                        ctx.lineTo(this.size * 0.22, 0.1 * this.size);
                        ctx.lineTo(this.size * 0.36, this.size * 0.36);
                        ctx.lineTo(-this.size * 0.36, this.size * 0.36);
                        ctx.closePath();
                        ctx.fill();
                    } else if (this.shapeType === 'atom') {
                        ctx.beginPath();
                        ctx.ellipse(0, 0, this.size * 0.58, this.size * 0.2, Math.PI / 4, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.ellipse(0, 0, this.size * 0.58, this.size * 0.2, -Math.PI / 4, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(0, 0, 3, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (this.shapeType === 'dna') {
                        ctx.beginPath();
                        for (let i = -14; i <= 14; i++) {
                            const tx = i;
                            const ty1 = Math.sin(i * 0.38) * 5;
                            if (i === -14) ctx.moveTo(tx, ty1);
                            else ctx.lineTo(tx, ty1);
                        }
                        ctx.stroke();

                        ctx.beginPath();
                        for (let i = -14; i <= 14; i++) {
                            const tx = i;
                            const ty2 = -Math.sin(i * 0.38) * 5;
                            if (i === -14) ctx.moveTo(tx, ty2);
                            else ctx.lineTo(tx, ty2);
                        }
                        ctx.stroke();

                        for (let i = -10; i <= 10; i += 5) {
                            const ty1 = Math.sin(i * 0.38) * 5;
                            const ty2 = -Math.sin(i * 0.38) * 5;
                            ctx.beginPath();
                            ctx.moveTo(i, ty1);
                            ctx.lineTo(i, ty2);
                            ctx.stroke();
                        }
                    }
                }
                ctx.restore();
            }

            update() {
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        const pushX = Math.cos(angle) * force * 3.5;
                        const pushY = Math.sin(angle) * force * 3.5;

                        this.vx += pushX;
                        this.vy += pushY;
                    }
                }

                this.vx += (this.baseVx - this.vx) * 0.04;
                this.vy += (this.baseVy - this.vy) * 0.04;

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -this.size) this.x = width + this.size;
                else if (this.x > width + this.size) this.x = -this.size;

                if (this.y < -this.size) this.y = height + this.size;
                else if (this.y > height + this.size) this.y = -this.size;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }

            for (let i = sparks.length - 1; i >= 0; i--) {
                sparks[i].update();
                if (sparks[i].alpha <= 0) {
                    sparks.splice(i, 1);
                } else {
                    sparks[i].draw();
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Initializations
    initCopyright();
    initPhysicsCanvas();
});
