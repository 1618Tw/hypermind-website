/* ═══════════════════════════════════════════════════════════
   HYPERMIND — Hardware Page
   Canvas frame renderer — lag-free scroll-scrub sequences.
   · Workstation: frames 1→192 (forward, explode)
   · Server:      frames 192→1 (reverse, camera pull-back)
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* Register once, at the top, before anything else */
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);

  const FRAME_COUNT = 192;
  const IMAGE_SCALE = 0.88;

  function padded(n) { return String(n).padStart(4, '0'); }

  function buildSequence({ path, ext, canvasId, sectionId, infoId, reverse }) {
    const canvas  = document.getElementById(canvasId);
    const section = document.getElementById(sectionId);
    const info    = document.getElementById(infoId);
    if (!canvas || !section) return;

    const ctx    = canvas.getContext('2d');
    const frames = new Array(FRAME_COUNT).fill(null);
    let currentFrame = reverse ? FRAME_COUNT - 1 : 0;
    let bgColor = '#05010A';

    /* ── canvas sizing ──────────────────────────────────── */
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrame);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    /* ── bg color sampling ──────────────────────────────── */
    function sampleBg(img) {
      try {
        const tmp = document.createElement('canvas');
        tmp.width = 4; tmp.height = 4;
        const tc = tmp.getContext('2d');
        tc.drawImage(img, 0, 0, 4, 4);
        const d = tc.getImageData(0, 0, 1, 1).data;
        bgColor = `rgb(${d[0]},${d[1]},${d[2]})`;
      } catch(e) {}
    }

    /* ── draw ───────────────────────────────────────────── */
    function drawFrame(index) {
      const img = frames[index];
      if (!img) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * IMAGE_SCALE;
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    /* ── preload ────────────────────────────────────────── */
    function loadFrame(i) {
      const img = new Image();
      const n   = reverse ? (FRAME_COUNT - i) : (i + 1);
      img.src   = `${path}frame_${padded(n)}.${ext}`;
      img.onload = () => {
        frames[i] = img;
        if (i % 20 === 0) sampleBg(img);
        /* redraw if this is the frame currently on screen */
        if (i === currentFrame) requestAnimationFrame(() => drawFrame(i));
      };
    }

    /* Load all frames — first frame priority */
    loadFrame(0);
    for (let i = 1; i < FRAME_COUNT; i++) loadFrame(i);

    /* ── ScrollTrigger ──────────────────────────────────── */
    ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   1,           /* 1 = slight lag for smoothness, no Lenis needed */
      onUpdate(self) {
        const p = self.progress;

        const idx = reverse
          ? Math.max(0, Math.min(FRAME_COUNT - 1, Math.round((1 - p) * (FRAME_COUNT - 1))))
          : Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(p       * (FRAME_COUNT - 1))));

        if (idx !== currentFrame) {
          currentFrame = idx;
          requestAnimationFrame(() => drawFrame(idx));
        }

        if (info) {
          info.style.opacity = p > 0.75 ? Math.min((p - 0.75) / 0.25, 1) : 0;
        }
      }
    });
  }

  /* ── Init both sequences ──────────────────────────────── */
  buildSequence({
    path:      'assets/frames-workstation/',
    ext:       'jpg',
    canvasId:  'wsCanvas',
    sectionId: 'workstation',
    infoId:    'wsInfo',
    reverse:   false,
  });

  buildSequence({
    path:      'assets/frames-server/',
    ext:       'jpg',
    canvasId:  'srvCanvas',
    sectionId: 'servers',
    infoId:    'srvReveal',
    reverse:   true,
  });

})();
