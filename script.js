/* ============================================================
   SUJAL GAIKWAD PORTFOLIO — script.js
   Premium Edition
   ============================================================ */

// ── LOADING SCREEN ──────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 700);
  }, 1200);
});

// ── SCROLL PROGRESS BAR ─────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const st = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = dh > 0 ? `${(st / dh) * 100}%` : '0%';
  }, { passive: true });
}

// ── DARK / LIGHT MODE ───────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('sg-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('sg-theme', next);
  });
}

// ── TYPEWRITER ──────────────────────────────────────────────
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const roles = [
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer',
    'Flutter Developer',
    'Problem Solver'
  ];
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    if (!deleting) {
      typeEl.textContent = word.slice(0, ci++);
      if (ci > word.length) { deleting = true; return setTimeout(tick, 2000); }
    } else {
      typeEl.textContent = word.slice(0, ci--);
      if (ci < 0) { deleting = false; ri = (ri + 1) % roles.length; return setTimeout(tick, 400); }
    }
    setTimeout(tick, deleting ? 55 : 95);
  }
  tick();
}

// ── MOBILE NAV ──────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', open);
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    })
  );
}

// ── NAVBAR SHRINK ON SCROLL ─────────────────────────────────
const headerEl = document.querySelector('header');
window.addEventListener('scroll', () => {
  headerEl?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── SCROLL REVEAL (with stagger via data-delay) ──────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || '0');
      setTimeout(() => entry.target.classList.add('in-view'), delay);
    }
  });
}, { threshold: 0.07 });
revealEls.forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV ON SCROLL ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const m = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (m) m.classList.add('active');
    }
  });
}, { threshold: 0.3, rootMargin: '-70px 0px -35% 0px' });
sections.forEach(s => navObserver.observe(s));

// ── CERT TOGGLE ──────────────────────────────────────────────
window.toggleCerts = function () {
  const extra = document.getElementById('certExtra');
  const btn   = document.getElementById('certToggle');
  const txt   = document.getElementById('certToggleText');
  if (!extra) return;
  const open = extra.classList.toggle('open');
  btn?.classList.toggle('open', open);
  if (txt) txt.textContent = open ? 'View Less' : 'View All';
};

// ── CERT PREVIEW MODAL ───────────────────────────────────────
window.openPreview = function (fp, ft) {
  const modal  = document.getElementById('certModal');
  const iframe = document.getElementById('certModalFrame');
  const img    = document.getElementById('certModalImg');
  const link   = document.getElementById('certModalOpen');
  const title  = document.getElementById('certModalTitle');
  if (!modal) return;

  title.textContent = fp.split('/').pop().replace(/_/g, ' ').replace(/\.[^/.]+$/, '');
  link.href = fp;

  if (ft === 'pdf') {
    iframe.src = fp;
    iframe.style.display = 'block';
    img.style.display = 'none';
  } else {
    img.src = fp;
    img.style.display = 'block';
    iframe.style.display = 'none';
    iframe.src = '';
  }
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeCertModal = function () {
  const modal  = document.getElementById('certModal');
  const iframe = document.getElementById('certModalFrame');
  const img    = document.getElementById('certModalImg');
  if (!modal) return;
  iframe.src = '';
  img.src = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
};
