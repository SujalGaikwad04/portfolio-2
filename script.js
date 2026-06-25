// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Active nav link on scroll + reveal + skill bars
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const revealEls = document.querySelectorAll('.reveal');
const skillFills = document.querySelectorAll('.skill-fill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      if (entry.target.id === 'skills') {
        skillFills.forEach(f => f.style.width = f.dataset.w + '%');
      }
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const match = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });
sections.forEach(s => navObserver.observe(s));

// Toggle extra certificates
function toggleCerts() {
  const extraPanel = document.getElementById('certExtra');
  const btn = document.getElementById('certToggle');
  const btnText = document.getElementById('certToggleText');
  
  if (extraPanel.classList.contains('open')) {
    extraPanel.classList.remove('open');
    btn.classList.remove('open');
    btnText.textContent = 'View All';
  } else {
    extraPanel.classList.add('open');
    btn.classList.add('open');
    btnText.textContent = 'View Less';
  }
}

// Certificate Preview Modal Functions
function openPreview(filePath, fileType) {
  const modal = document.getElementById('certModal');
  const iframe = document.getElementById('certModalFrame');
  const img = document.getElementById('certModalImg');
  const openLink = document.getElementById('certModalOpen');
  const title = document.getElementById('certModalTitle');

  // Set the filename as title
  const filename = filePath.split('/').pop().replace(/_/g, ' ').replace(/\.[^/.]+$/, "");
  title.textContent = filename;
  openLink.href = filePath;

  if (fileType === 'pdf') {
    iframe.src = filePath;
    iframe.style.display = 'block';
    img.style.display = 'none';
  } else {
    img.src = filePath;
    img.style.display = 'block';
    iframe.style.display = 'none';
    iframe.src = '';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Disable scroll under modal
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  const iframe = document.getElementById('certModalFrame');
  const img = document.getElementById('certModalImg');

  modal.classList.remove('open');
  iframe.src = '';
  img.src = '';
  document.body.style.overflow = ''; // Restore scroll
}
