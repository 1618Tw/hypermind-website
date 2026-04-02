/* ═══════════════════════════════════════════════════════════
   HYPERMIND — Shared JavaScript
   Used by: index.html, ubiq.html
═══════════════════════════════════════════════════════════ */

/* ─── Navbar: add .scrolled class after 60px ────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── Smooth scroll to section by id ────────────────────── */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ─── Contact Modal ──────────────────────────────────────── */
function openModal() {
  document.getElementById('modal-bg').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal-bg').classList.remove('open');
  document.body.style.overflow = '';
}
// Close when clicking the dark backdrop (not the modal box itself)
function closeModalOut(e) {
  if (e.target === document.getElementById('modal-bg')) closeModal();
}
// Form submit handler — swap for a real endpoint when ready
function sendForm(e) {
  e.preventDefault();
  closeModal();
}
// ESC key closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ─── Scroll-Reveal (IntersectionObserver) ──────────────── */
// Elements with .r .r-l .r-r .r-sc get class .on added when
// they enter the viewport, triggering their CSS transition.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('on');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.r, .r-l, .r-r, .r-sc')
  .forEach(el => revealObserver.observe(el));

/* ─── Footer SVG Hover Effect ───────────────────────────── */
// Moves the radial gradient reveal mask to follow the mouse,
// exposing the coral gradient stroke of "HYPERMIND".
const fhEl   = document.getElementById('fh-hover');
const fhSvg  = document.getElementById('footer-svg');
const fhGrad = document.getElementById('fhReveal');

function fhOn(state) {
  if (fhEl) fhEl.style.opacity = state ? '1' : '0';
}
function fhMove(e) {
  if (!fhSvg || !fhGrad) return;
  const rect = fhSvg.getBoundingClientRect();
  fhGrad.setAttribute('cx', ((e.clientX - rect.left)  / rect.width)  * 1000);
  fhGrad.setAttribute('cy', ((e.clientY - rect.top)   / rect.height) * 160);
}
