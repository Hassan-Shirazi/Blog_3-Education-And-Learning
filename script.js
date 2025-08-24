
        document.addEventListener('DOMContentLoaded', () => {

            // --- MOBILE NAVIGATION (HAMBURGER MENU) ---
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const navLinkItems = document.querySelectorAll('.nav-links a');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
            
            // Close menu when a link is clicked
            navLinkItems.forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                });
            });

            // --- HERO SECTION TYPING ANIMATION ---
            const subtitleEl = document.querySelector('.hero-content .subtitle');
            const subtitles = [
                "Shaping the Future Through Knowledge.",
                "Unlocking Human Potential.",
                "The Journey of Lifelong Learning.",
                "Empowering Minds, Building Futures."
            ];
            let subtitleIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentText = subtitles[subtitleIndex];
                let displayedText = '';

                if (isDeleting) {
                    displayedText = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    displayedText = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }

                subtitleEl.textContent = displayedText;

                let typeSpeed = isDeleting ? 50 : 150;

                if (!isDeleting && charIndex === currentText.length) {
                    typeSpeed = 2000; // Pause at end
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    subtitleIndex = (subtitleIndex + 1) % subtitles.length;
                    typeSpeed = 500; // Pause before starting new word
                }

                setTimeout(type, typeSpeed);
            }
            type();

            // --- FADE-IN ANIMATION ON SCROLL ---
            const sections = document.querySelectorAll('.fade-in-section');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };
            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            sections.forEach(section => {
                sectionObserver.observe(section);
            });
            
            // --- ANIMATED COUNTERS ---
            const statsSection = document.getElementById('stats');
            const counters = document.querySelectorAll('.counter');
            let statsAnimated = false;

            const statsObserver = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && !statsAnimated) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let current = 0;
                        const increment = target / 200; // Animation speed control

                        const updateCount = () => {
                            if (current < target) {
                                current += increment;
                                counter.innerText = Math.ceil(current);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                    statsAnimated = true;
                    statsObserver.unobserve(statsSection);
                }
            }, { threshold: 0.5 });
            
            if (statsSection) {
                 statsObserver.observe(statsSection);
            }
            
            // --- BLOG POST MODAL ---
            const readMoreBtns = document.querySelectorAll('.read-more-btn');
            const modalOverlay = document.getElementById('blog-modal-overlay');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            
            readMoreBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const title = btn.dataset.title;
                    const image = btn.dataset.image;
                    const content = btn.dataset.content;

                    document.getElementById('modal-title').textContent = title;
                    document.getElementById('modal-image').src = image;
                    document.getElementById('modal-content').innerHTML = content;
                    
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                });
            });

            const closeModal = () => {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            modalCloseBtn.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                // Close only if clicking on the overlay itself, not the modal content
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
            
            // --- NEWSLETTER FORM VALIDATION ---
            const newsletterForm = document.getElementById('newsletter-form');
            const emailInput = document.getElementById('email-input');
            const formMessage = document.getElementById('form-message');

            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = emailInput.value;
                formMessage.textContent = ''; // Clear previous messages
                
                if (validateEmail(email)) {
                    formMessage.textContent = 'Thank you for subscribing!';
                    formMessage.className = 'success-message';
                    emailInput.value = '';
                } else {
                    formMessage.textContent = 'Please enter a valid email address.';
                    formMessage.className = 'error-message';
                }
                
                // Clear the message after 3 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 3000);
            });

            function validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            // --- DOWNLOAD STUDY GUIDE CTA ---
            const downloadBtn = document.getElementById('download-guide-btn');
            downloadBtn.addEventListener('click', () => {
                const studyGuideContent = `
Your Awesome Study Guide
========================

1. The Pomodoro Technique
   - Study for 25 minutes, then take a 5-minute break.
   - Every 4 pomodoros, take a longer 15-30 minute break.

2. Active Recall
   - Don't just re-read. Test yourself!
   - Use flashcards, quizzes, or explain concepts out loud.

3. Spaced Repetition
   - Review material at increasing intervals.
   - Day 1, Day 3, Day 7, Day 16...

4. Feynman Technique
   - Choose a concept you want to understand.
   - Pretend you are teaching it to a student in simple terms.
   - Identify gaps in your explanation and go back to the source material.
   - Review and simplify.

Happy studying!
- From EduLearn
                `;
                
                const blob = new Blob([studyGuideContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'study-guide.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

        });