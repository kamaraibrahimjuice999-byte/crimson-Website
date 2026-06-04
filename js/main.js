/* ============================================================
   CRIMSON TRADING COMPANY LIMITED — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  'use strict';

  /* ===== PRELOADER ===== */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 600);
    });
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  /* ===== HERO PARTICLES ===== */
  const heroParticles = document.getElementById('heroParticles');
  if (heroParticles) {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
      heroParticles.appendChild(particle);
    }
  }

  /* ===== COUNTER ANIMATION ===== */
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count) || 0;
      const duration = 2000;
      const step = Math.max(1, Math.floor(target / 60));
      let current = 0;
      const increment = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          return;
        }
        counter.textContent = current.toLocaleString();
        requestAnimationFrame(increment);
      };
      increment();
    });
  }

  /* ===== INTERSECTION OBSERVER FOR COUNTERS ===== */
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  /* ===== NAVIGATION ===== */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  /* ===== QUICK ENQUIRY WIDGET ===== */
  const enquiryWidget = document.getElementById('trackingWidget');
  const enquiryToggle = document.getElementById('trackingToggle');
  const enquirySubmit = document.getElementById('enquirySubmit');
  const enquiryResult = document.getElementById('trackingResult');
  const enquiryStatusText = document.getElementById('trackingStatusText');

  if (enquiryToggle) {
    enquiryToggle.addEventListener('click', () => {
      enquiryWidget.classList.toggle('active');
    });
  }

  if (enquirySubmit) {
    enquirySubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('enquiryName');
      const email = document.getElementById('enquiryEmail');
      const message = document.getElementById('enquiryMessage');
      if (name && email && message && name.value && email.value && message.value) {
        enquiryStatusText.textContent = 'Thank you! We\'ll respond within 24 hours.';
        enquiryStatusText.style.color = '#27c93f';
        name.value = ''; email.value = ''; message.value = '';
        setTimeout(() => {
          enquiryStatusText.textContent = 'We\'re here to help!';
          enquiryStatusText.style.color = 'var(--gold)';
        }, 5000);
      } else {
        enquiryStatusText.textContent = 'Please fill in all fields.';
        enquiryStatusText.style.color = '#ff5f56';
      }
    });
  }

  /* ===== AOS (Animate On Scroll) INIT ===== */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: 'mobile'
    });
  }

  /* ===== TESTIMONIAL CAROUSEL ===== */
  const track = document.querySelector('.testimonial-track');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    let autoplay = setInterval(() => goToSlide(currentSlide + 1), 5000);

    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
  }

  /* ===== JOB FILTERING ===== */
  const deptFilter = document.getElementById('jobDepartment');
  const locationFilter = document.getElementById('jobLocation');
  const jobsList = document.getElementById('jobsList');

  if (deptFilter && locationFilter && jobsList) {
    function filterJobs() {
      const dept = deptFilter.value;
      const loc = locationFilter.value;
      const cards = jobsList.querySelectorAll('.job-card');

      cards.forEach(card => {
        const cardDept = card.dataset.department;
        const cardLoc = card.dataset.location;
        const deptMatch = !dept || cardDept === dept;
        const locMatch = !loc || cardLoc === loc;

        if (deptMatch && locMatch) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    }

    deptFilter.addEventListener('change', filterJobs);
    locationFilter.addEventListener('change', filterJobs);
  }

  /* ===== CONTACT FORM ===== */
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => contactSuccess.classList.remove('show'), 5000);
    });
  }

  /* ===== NEWSLETTER FORM ===== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input) {
        input.value = '';
        input.placeholder = 'Subscribed! Thank you.';
        setTimeout(() => { input.placeholder = 'Your email address'; }, 3000);
      }
    });
  }

  /* ===== BACK TO TOP ===== */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== LEAFLEAT MAP ===== */
  function initMap() {
    const mapContainer = document.getElementById('worldMap');
    if (typeof L === 'undefined' || !mapContainer) return;

    const map = L.map('worldMap', {
      center: [15, -10],
      zoom: 2.5,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const hubs = [
      { name: 'Freetown — HQ', coords: [8.4657, -13.2317] },
      { name: 'Accra', coords: [5.6037, -0.1870] },
      { name: 'London', coords: [51.5074, -0.1278] },
      { name: 'Dubai', coords: [25.2048, 55.2708] },
      { name: 'New York', coords: [40.7128, -74.0060] },
      { name: 'Beijing', coords: [39.9042, 116.4074] },
      { name: 'Nairobi', coords: [-1.2921, 36.8219] },
      { name: 'Johannesburg', coords: [-26.2041, 28.0473] }
    ];

    const crimsonIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="width:14px;height:14px;background:#8B0000;border:2px solid #C9A84C;border-radius:50%;box-shadow:0 0 20px rgba(139,0,0,0.6);"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    hubs.forEach(hub => {
      L.marker(hub.coords, { icon: crimsonIcon })
        .addTo(map)
        .bindPopup(`<b style="color:#fff;font-size:13px;">${hub.name}</b>`, {
          className: 'custom-popup'
        });
    });

    const routes = [
      [hubs[0].coords, hubs[1].coords],
      [hubs[1].coords, hubs[2].coords],
      [hubs[0].coords, hubs[3].coords],
      [hubs[2].coords, hubs[4].coords],
      [hubs[3].coords, hubs[5].coords],
      [hubs[6].coords, hubs[7].coords]
    ];

    routes.forEach(route => {
      L.polyline(route, {
        color: '#8B0000',
        weight: 1.5,
        opacity: 0.4,
        dashArray: '8, 6'
      }).addTo(map);
    });

    const style = document.createElement('style');
    style.textContent = `
      .custom-popup .leaflet-popup-content-wrapper {
        background: rgba(26,26,46,0.95);
        color: #fff;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .custom-popup .leaflet-popup-tip {
        background: rgba(26,26,46,0.95);
      }
      .custom-popup .leaflet-popup-close-button {
        color: #666 !important;
      }
    `;
    document.head.appendChild(style);
  }

  initMap();

  /* ===== DASHBOARD LIVE SIMULATION ===== */
  const dashShipments = document.getElementById('dashShipments');
  const dashOntime = document.getElementById('dashOntime');

  if (dashShipments && dashOntime) {
    setInterval(() => {
      const current = parseInt(dashShipments.textContent.replace(/,/g, ''));
      const change = Math.floor(Math.random() * 5) - 1;
      dashShipments.textContent = (current + change).toLocaleString();
    }, 4000);

    setInterval(() => {
      const current = parseFloat(dashOntime.textContent);
      const change = (Math.random() * 0.2 - 0.1);
      const newVal = (current + change);
      dashOntime.textContent = newVal.toFixed(1);
    }, 5000);
  }

  /* ===== DASHBOARD FEED LIVE UPDATES ===== */
  const dashFeed = document.querySelector('.dash-feed');
  if (dashFeed) {
    const updates = [
      'ICT training completed — Freetown',
      'Media broadcast launched — Bo District',
      'Telecom infrastructure deployed — Kenema',
      'Digital literacy program — Makeni',
      'Community radio setup — Kailahun'
    ];

    setInterval(() => {
      const items = dashFeed.querySelectorAll('.feed-item');
      const firstItem = items[0];
      if (firstItem) {
        firstItem.remove();
      }
      const newItem = document.createElement('div');
      newItem.className = 'feed-item';
      newItem.innerHTML = `<span class="feed-dot live"></span> ${updates[Math.floor(Math.random() * updates.length)]}`;
      dashFeed.appendChild(newItem);
    }, 6000);
  }

  /* ===== PARALLAX EFFECT ON SCROLL ===== */
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.15}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });

  /* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ===== SERVICE CARD INTERACTION ===== */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const bars = card.querySelectorAll('.demo-fill');
      bars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = targetWidth; }, 100);
      });
    });
  });

  /* ===== HUB INTERACTION ON MAP ===== */
  document.querySelectorAll('.hub').forEach(hub => {
    hub.addEventListener('click', () => {
      const city = hub.dataset.city;
      if (city) {
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          background: rgba(26,26,46,0.98); color: #fff;
          padding: 16px 32px; border-radius: 12px;
          border: 1px solid rgba(139,0,0,0.3);
          z-index: 9999; font-size: 0.9rem;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
          animation: fadeIn 0.3s ease;
        `;
        toast.innerHTML = `<i class="fas fa-map-marker-alt" style="color:var(--crimson-light);margin-right:8px;"></i> ${city} — Connecting Sierra Leone to the World`;
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = '0';
          toast.style.transition = 'opacity 0.4s ease';
          setTimeout(() => toast.remove(), 400);
        }, 2500);
      }
    });
  });

  /* ===== KEYFRAMES FOR DYNAMIC ANIMATIONS ===== */
  const keyframes = document.createElement('style');
  keyframes.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(keyframes);

}); // End DOMContentLoaded
