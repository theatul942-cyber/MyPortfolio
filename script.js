/* ==========================================================================
   Atul Chadgal - CSE Portfolio JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Typing Effect in Hero Section ---
  const typingElement = document.getElementById('typing-text');
  const titles = [
    "B.Tech CSE Student @ LPU",
    "Python & AI Enthusiast",
    "Aspiring ML Engineer"
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500; // Pause before starting next title
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingElement) {
    typeEffect();
  }

  // --- 2. Dark / Light Theme Toggler ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Check saved theme from localStorage
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    themeIcon.className = 'fa-solid fa-moon';
  }

  themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeIcon.className = 'fa-solid fa-sun';
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeIcon.className = 'fa-solid fa-moon';
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });

  // --- 3. Mobile Navigation Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // --- 4. Navbar Scroll Active Link Indicator ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 5. Skills Category Filtering ---
  const skillFilterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Project Category Filtering ---
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pfilter = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const pcategory = card.getAttribute('data-pcategory');
        if (pfilter === 'all' || pcategory === pfilter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 7. P-T-R-L Project Deep Dive Modal Data & Handler ---
  const ptrlModal = document.getElementById('ptrl-modal');
  const ptrlModalBody = document.getElementById('ptrl-modal-body');
  const ptrlModalClose = document.getElementById('ptrl-modal-close');

  const projectData = {
    music: {
      title: "AI Music Assistant",
      subtitle: "Streamlit-powered Music Discovery & Recommendation Platform",
      period: "April 2026 – May 2026",
      techStack: ["Python", "Streamlit", "Spotify API", "Spotipy OAuth", "Data Analysis"],
      problem: "Music streaming users often find track discovery repetitive and struggle to preview track audio snippets and custom artwork instantly without navigating multi-tiered interfaces.",
      technology: "Developed using Python with the Streamlit interactive app framework. Integrated the official Spotify Web API using Spotipy library for OAuth 2.0 user authentication and dynamic RESTful music metadata retrieval.",
      result: "Engineered a responsive, feature-rich web dashboard capable of real-time artist/album/track searches, display of high-res album covers, 30-second audio previews, and AI-driven personalized playlist recommendations based on user listening preferences.",
      learning: "Gained practical mastery of OAuth authentication flows, API rate limiting, handling JSON API payloads, and building rapid data-driven web interfaces using Streamlit.",
      github: "https://github.com/theatul942-cyber"
    },
    umbrella: {
      title: "Smart Blind Man's Umbrella",
      subtitle: "IoT Assistive Device for Visually Impaired Safety",
      period: "Nov 2025 – Dec 2025",
      techStack: ["Arduino Uno", "Arduino IDE", "C++", "Ultrasonic Sensors (HC-SR04)", "MPU-6050 Gyro", "Piezo Buzzer"],
      problem: "Visually impaired individuals face dangerous physical hazards outdoors including overhead obstacles, sudden ground dips, and fall accidents that traditional walking canes fail to detect.",
      technology: "Designed a compact, modular retrofit kit powered by an Arduino Uno board. Integrated dual HC-SR04 ultrasonic sensors for distance detection and an MPU-6050 6-axis gyroscopic sensor to monitor sudden orientation shifts.",
      result: "Built a fully functional, lightweight attachment for standard umbrellas that provides distinct audio buzzer alerts for approaching obstacle proximity and emergency fall alerts to nearby passersby.",
      learning: "Acquired real-world experience in embedded C++ programming, sensor calibration, hardware circuit debugging, micro-power management, and assistive human-centered engineering design.",
      github: "https://github.com/theatul942-cyber"
    }
  };

  document.querySelectorAll('.open-ptrl-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-project');
      const data = projectData[pKey];

      if (data) {
        ptrlModalBody.innerHTML = `
          <div class="modal-header">
            <span class="section-badge">${data.period}</span>
            <h2 class="modal-project-title">${data.title}</h2>
            <p class="section-subtitle" style="text-align: left; margin: 0 0 1rem 0;">${data.subtitle}</p>
          </div>

          <div class="project-skills-list" style="margin-bottom: 1.5rem;">
            ${data.techStack.map(t => `<span class="pskill-tag">${t}</span>`).join('')}
          </div>

          <div class="modal-ptrl-section">
            <div class="modal-ptrl-block problem-block">
              <h4><span class="ptrl-letter p-letter">P</span> Problem Statement</h4>
              <p>${data.problem}</p>
            </div>

            <div class="modal-ptrl-block tech-block">
              <h4><span class="ptrl-letter t-letter">T</span> Technology & Tools Used</h4>
              <p>${data.technology}</p>
            </div>

            <div class="modal-ptrl-block result-block">
              <h4><span class="ptrl-letter r-letter">R</span> Key Results & Accomplishments</h4>
              <p>${data.result}</p>
            </div>

            <div class="modal-ptrl-block learning-block">
              <h4><span class="ptrl-letter l-letter">L</span> Core Key Learnings</h4>
              <p>${data.learning}</p>
            </div>
          </div>

          <div style="margin-top: 2rem; display: flex; gap: 1rem;">
            <a href="${data.github}" target="_blank" class="btn btn-primary btn-block">
              <i class="fa-brands fa-github"></i> View GitHub Repository
            </a>
          </div>
        `;
        ptrlModal.classList.add('active');
      }
    });
  });

  if (ptrlModalClose) {
    ptrlModalClose.addEventListener('click', () => {
      ptrlModal.classList.remove('active');
    });
  }

  // --- 8. Certificate Preview Modal Handler ---
  const certModal = document.getElementById('cert-modal');
  const certModalBody = document.getElementById('cert-modal-body');
  const certModalClose = document.getElementById('cert-modal-close');

  const certData = {
    'infosys-python': {
      title: "Programming Fundamentals Using Python",
      issuer: "Infosys Springboard",
      date: "June 2026",
      desc: "Comprehensive certification verifying mastery in Python fundamentals, data structures, control flow, functions, modular programming, and algorithmic problem solving."
    },
    'infosys-ai': {
      title: "Introduction to Artificial Intelligence",
      issuer: "Infosys Springboard",
      date: "March 2026",
      desc: "Certification covering foundational artificial intelligence concepts, search algorithms, machine learning paradigms, data preprocessing, and AI application frameworks."
    },
    'infosys-cpp': {
      title: "Programming Using C++",
      issuer: "Infosys Springboard",
      date: "January 2026",
      desc: "Certification demonstrating proficiency in C++ syntax, pointers, memory allocation, object-oriented principles (classes, inheritance, polymorphism), and standard template library (STL)."
    },
    'tcs': {
      title: "Frontend Development Internship Certificate",
      issuer: "Tata Consultancy Services (TCS)",
      date: "June 2026 – August 2026",
      desc: "Industry internship certificate recognizing successful completion of frontend web development responsibilities including HTML5/CSS3 page creation, responsive design implementation, and UI bug resolution."
    },
    'python-training': {
      title: "Python Programming Training Certificate",
      issuer: "Fundamentals & Problem Solving Course",
      date: "June 2026 – July 2026",
      desc: "Structured completion certificate covering hands-on Python programming, object-oriented concepts, algorithm challenges, and mini application development."
    }
  };

  document.querySelectorAll('.view-cert-btn, .cert-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certKey = btn.getAttribute('data-cert');
      const c = certData[certKey];

      if (c) {
        certModalBody.innerHTML = `
          <div class="cert-preview-card">
            <div class="cert-preview-badge">
              <i class="fa-solid fa-award"></i>
            </div>
            <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${c.title}</h2>
            <p style="color: var(--accent-cyan); font-weight: 600; margin-bottom: 0.25rem;">${c.issuer}</p>
            <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 1.25rem;"><i class="fa-regular fa-calendar"></i> Issue Date: ${c.date}</p>
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left;">
              <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${c.desc}</p>
            </div>
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); color: var(--accent-emerald); padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">
              <i class="fa-solid fa-circle-check"></i> Verified Certificate Credential
            </div>
          </div>
        `;
        certModal.classList.add('active');
      }
    });
  });

  if (certModalClose) {
    certModalClose.addEventListener('click', () => {
      certModal.classList.remove('active');
    });
  }

  // Close modals when clicking outside modal box
  window.addEventListener('click', (e) => {
    if (e.target === ptrlModal) {
      ptrlModal.classList.remove('active');
    }
    if (e.target === certModal) {
      certModal.classList.remove('active');
    }
  });

  // --- 9. Contact Form Submission Handling ---
  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('form-submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        formResponse.className = 'form-response success';
        formResponse.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Atul will get back to you soon.';
        contactForm.reset();

        setTimeout(() => {
          formResponse.style.display = 'none';
        }, 6000);
      }, 1200);
    });
  }
});
