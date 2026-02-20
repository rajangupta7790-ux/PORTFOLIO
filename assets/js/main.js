// ===== AOS INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60 });
  }
  initParticles();
  initTyped();
  initScrollSpy();
  initHamburger();
  initTheme();
  initProjectFilter();
  initContactForm();
  initScrollTop();
});

// ===== PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const isDark = () => !document.body.classList.contains('light-mode');

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const color = isDark() ? '0,212,255' : '0,140,180';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${p.alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    // Draw connections
    particles.forEach((p, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const d = Math.hypot(p.x - particles[j].x, p.y - particles[j].y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color},${0.06 * (1 - d/100)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== TYPED TEXT =====
function initTyped() {
  const el = document.getElementById('typedRole');
  if (!el) return;
  const roles = ['Python Developer', 'Flask Developer', 'Backend Engineer', 'Full Stack Developer', 'SQL Developer', 'Machine Learning Enthusiast'];
  let i = 0, j = 0, deleting = false;
  function type() {
    const current = roles[i];
    el.textContent = deleting ? current.slice(0, j--) : current.slice(0, j++);
    if (!deleting && j === current.length + 1) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
    if (deleting && j < 0) {
      deleting = false;
      i = (i + 1) % roles.length;
      j = 0;
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
}

// ===== SCROLL SPY =====
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const nav = document.getElementById('navbar');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));

  // Scroll opacity
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 50
      ? 'rgba(8,12,20,0.97)' : 'rgba(8,12,20,0.85)';
    if (document.body.classList.contains('light-mode')) {
      nav.style.background = window.scrollY > 50
        ? 'rgba(240,244,250,0.99)' : 'rgba(240,244,250,0.88)';
    }
  });
}

// ===== HAMBURGER =====
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// ===== THEME TOGGLE =====
function initTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') applyLight();

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = btn.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
      icon.className = 'fa-solid fa-moon';
      localStorage.setItem('theme', 'light');
    } else {
      icon.className = 'fa-solid fa-sun';
      localStorage.setItem('theme', 'dark');
    }
  });
  function applyLight() {
    document.body.classList.add('light-mode');
    const icon = btn.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-moon';
  }
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cats = card.dataset.category || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
//   const form = document.getElementById('contactForm');
//   const success = document.getElementById('formSuccess');
//   if (!form) return;

//   form.addEventListener('submit', e => {
//     e.preventDefault();
//     let valid = true;

//     const fields = [
//       { id: 'name', errId: 'nameError', msg: 'Please enter your name.' },
//       { id: 'email', errId: 'emailError', msg: 'Please enter a valid email.', isEmail: true },
//       { id: 'subject', errId: 'subjectError', msg: 'Please enter a subject.' },
//       { id: 'message', errId: 'messageError', msg: 'Please enter a message.' },
//     ];

//     fields.forEach(f => {
//       const el = document.getElementById(f.id);
//       const errEl = document.getElementById(f.errId);
//       if (!el) return;
//       const val = el.value.trim();
//       let fieldOk = val.length > 0;
//       if (f.isEmail) fieldOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
//       if (!fieldOk) {
//         errEl.textContent = f.msg;
//         el.style.borderColor = '#ff6b6b';
//         valid = false;
//       } else {
//         errEl.textContent = '';
//         el.style.borderColor = '';
//       }
//     });

//     if (!valid) return;

//     // Simulate send (mailto fallback)
//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const subject = document.getElementById('subject').value.trim();
//     const message = document.getElementById('message').value.trim();

//     const mailtoLink = `mailto:rajangupta7790@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
//     window.location.href = mailtoLink;

//     form.style.display = 'none';
//     success.style.display = 'block';
//     showToast('Message sent successfully! 🎉');
//   });

  // Netlify form handling - form submits naturally
  // No custom submission needed
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}