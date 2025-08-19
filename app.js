// Insertar header y footer
(async () => {
  const [h, f] = await Promise.all([
    fetch('header.html').then(r => r.text()),
    fetch('footer.html').then(r => r.text()),
  ]);
  document.getElementById('header').innerHTML = h;
  document.getElementById('footer').innerHTML = f;

  // Hotspot preview logic
  const hotspot = document.querySelector('button[aria-label="Hotspot"]');
  const preview = document.getElementById('preview');
  const previewText = document.getElementById('preview-text');
  const imageContainer = document.querySelector('.relative.w-full.h-full.flex.items-center.justify-center');

  if (hotspot && preview && imageContainer) {
    hotspot.addEventListener('mouseenter', () => {
      previewText.textContent = hotspot.dataset.info;
      preview.classList.remove('hidden');
    });
    hotspot.addEventListener('mouseleave', () => {
      preview.classList.add('hidden');
    });
    const positionPreview = (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const boxW = preview.offsetWidth || 260;
      const boxH = preview.offsetHeight || (260 * 9 / 16) + 20;
      let x = e.clientX - rect.left + 10;
      let y = e.clientY - rect.top + 10;
      x = Math.max(4, Math.min(rect.width - boxW - 4, x));
      y = Math.max(4, Math.min(rect.height - boxH - 4, y));
      preview.style.left = x + 'px';
      preview.style.top = y + 'px';
    };
    hotspot.addEventListener('mousemove', positionPreview);
    imageContainer.addEventListener('mousemove', positionPreview);
  }
  // Entry animation targets
  const isGallery = location.pathname.toLowerCase().includes('gallery');
  const animTargets = isGallery
    ? [...document.querySelectorAll('main section article')]
    : [
        ...document.querySelectorAll('main > *'),
        ...document.querySelectorAll('main section > *'),
        ...document.querySelectorAll('main article')
      ];
  animTargets.forEach((el, i) => {
    el.classList.add('reveal');
    const delay = Math.min(i * 50, 600);
    setTimeout(() => el.classList.add('in'), delay);
  });
  // --- 3D PNG Carousel (index) ---
  (function initCarousel(){
    const track = document.getElementById('carousel-track');
    if (!track) return; // only on index

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    slides.forEach((s, i) => { s.dataset.baseIdx = i; });

    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');
    const section = track.closest('section');

    const previewColors = [
      '#ff5a5f', '#ffb400', '#00a699', '#007a87', '#7b0051',
      '#8ce071', '#ff8a65', '#b15cff', '#00d1c1', '#2b2d42'
    ];

    // Disable hover preview while scrolling
    let isScrolling = false;
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        // Si el ratón sigue encima y ya no hay movimiento, mostrar preview sin mover el ratón
        if (hoverState.over && !isWheeling && Math.abs(velocity) <= 0.01 && hoverPreview && hoverPreview.style.display === 'none') {
          const el = hoverState.img;
          if (el) {
            const baseIdx2 = parseInt((el.closest('.carousel-slide')?.dataset.baseIdx) || el.dataset.baseIdx || 0, 10);
            const color2 = el.dataset.previewColor || previewColors[baseIdx2 % previewColors.length];
            const src2 = el.dataset.preview || '';
            if (src2) setPreviewVisual({ src: src2 }); else setPreviewVisual({ color: color2 });
            hoverPreview.style.display = 'block';
            positionPreviewAt(hoverState.x, hoverState.y);
          }
        }
      }, 40);
    }, { passive: true });

    // Track wheel-based lateral scrolling to suppress hover preview
    let isWheeling = false;
    let wheelStopTimeout;
    // --- Auto-scroll config ---
    let autoPaused = false;
    const AUTO_VX = 1.0; // px/frame (~60px/s @60fps)

    // Shared hover state to re-show preview after wheel/scroll stops
    const hoverState = { over: false, img: null, x: 0, y: 0 };

    // --- Hover preview (16:9) next to cursor ---
    let hoverPreview = document.getElementById('cursor-preview');
    if (!hoverPreview) {
      hoverPreview = document.createElement('div');
      hoverPreview.id = 'cursor-preview';
      Object.assign(hoverPreview.style, {
        position: 'fixed',
        zIndex: 2000,
        width: '260px',
        aspectRatio: '16 / 9',
        background: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'none',
        display: 'none'
      });
      const img = document.createElement('img');
      img.alt = 'preview';
      Object.assign(img.style, {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block'
      });
      hoverPreview.appendChild(img);
      document.body.appendChild(hoverPreview);
    }

    const setPreviewVisual = ({ src = '', color = '' } = {}) => {
      const img = hoverPreview.querySelector('img');
      if (color) {
        hoverPreview.style.background = color;
        if (img) { img.src = ''; img.style.display = 'none'; }
        return;
      }
      hoverPreview.style.background = 'white';
      if (img && src) { img.src = src; img.style.display = 'block'; }
    };

    const positionPreviewAt = (clientX, clientY) => {
      const pad = 12;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = hoverPreview.offsetWidth || 260;
      const h = hoverPreview.offsetHeight || (260 * 9 / 16);
      let x = clientX + pad;
      let y = clientY + pad;
      if (x + w > vw) x = clientX - w - pad;
      if (y + h > vh) y = clientY - h - pad;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      hoverPreview.style.left = x + 'px';
      hoverPreview.style.top  = y + 'px';
    };

    // Helper: show preview only in the middle 60% vertically of the image
    const shouldShowPreview = (evt, imgEl) => {
      if (!imgEl) return false;
      const r = imgEl.getBoundingClientRect();
      const h = r.height || (r.bottom - r.top);
      const y = evt.clientY;
      const topBand = r.top + h * 0.20;      // 20% desde arriba
      const bottomBand = r.bottom - h * 0.20; // 20% desde abajo
      return y >= topBand && y <= bottomBand; // solo aparece en el 60% central
    };

    // Attach hover handlers to each slide
    const attachHoverHandlers = (slide) => {
      const img = slide.querySelector('img');
      if (!img) return;
      const baseIdx = parseInt(slide.dataset.baseIdx || img.dataset.baseIdx || 0, 10);
      const previewColor = img.dataset.previewColor || previewColors[baseIdx % previewColors.length];
      let over = false;
      slide.addEventListener('mouseenter', (e) => {
        over = true;
        hoverState.over = true;
        hoverState.img = img;
        hoverState.x = e.clientX;
        hoverState.y = e.clientY;
        if (!shouldShowPreview(e, img)) { hoverPreview.style.display = 'none'; return; }
        if (isScrolling || isWheeling || Math.abs(velocity) > 0.01) return;
        const previewSrc = img.dataset.preview; // can be undefined
        if (previewSrc) setPreviewVisual({ src: previewSrc });
        else setPreviewVisual({ color: previewColor });
        hoverPreview.style.display = 'block';
        positionPreviewAt(e.clientX, e.clientY);
      });
      slide.addEventListener('mousemove', (e) => {
        hoverState.x = e.clientX;
        hoverState.y = e.clientY;
        if (!over) return;
        // If cursor is too far below the image, hide preview
        if (!shouldShowPreview(e, img)) {
          if (hoverPreview.style.display !== 'none') hoverPreview.style.display = 'none';
          return;
        }
        if (isScrolling || isWheeling || Math.abs(velocity) > 0.01) {
          if (hoverPreview.style.display !== 'none') hoverPreview.style.display = 'none';
          return;
        }
        if (hoverPreview.style.display === 'none') {
          const previewSrc = img.dataset.preview;
          if (previewSrc) setPreviewVisual({ src: previewSrc });
          else setPreviewVisual({ color: previewColor });
          hoverPreview.style.display = 'block';
        }
        positionPreviewAt(e.clientX, e.clientY);
      });
      slide.addEventListener('mouseleave', () => {
        over = false;
        hoverState.over = false;
        hoverState.img = null;
        hoverPreview.style.display = 'none';
      });
    };

    // Apply to current and future slides (after duplication)
    slides.forEach(attachHoverHandlers);

    // Remove pagination dots from DOM
    const dotNodes = document.querySelectorAll('.carousel-dot');
    dotNodes.forEach(el => el.remove());
    // If a wrapper remains empty, remove it as well
    const dotsWrapper = section ? Array.from(section.querySelectorAll('div')).find(d => d.childElementCount === 0) : null;
    if (dotsWrapper) dotsWrapper.remove();

    if (slides.length === 0) return;

    // Build multiple full copies for seamless loop
    const BASE = slides.length;
    const COPIES = 5; // odd, middle copy as anchor
    const MID = Math.floor(COPIES / 2);
    const frag = document.createDocumentFragment();
    for (let c = 0; c < COPIES; c++) {
      slides.forEach(s => frag.appendChild(s.cloneNode(true)));
    }
    // Asegura que los clones mantienen el índice base
    frag.querySelectorAll && frag.querySelectorAll('.carousel-slide').forEach((s) => {
      if (!s.dataset.baseIdx) {
        const orig = s.querySelector('img');
        if (orig && orig.dataset.baseIdx == null) orig.dataset.baseIdx = s.dataset.baseIdx || '0';
      }
    });
    track.innerHTML = '';
    track.appendChild(frag);
    const allSlides = Array.from(track.querySelectorAll('.carousel-slide'));
    allSlides.forEach(attachHoverHandlers);
    const getGap = () => {
      const cs = getComputedStyle(track);
      const g = parseFloat(cs.columnGap || cs.gap || '0');
      return Number.isFinite(g) ? g : 0;
    };
    let slideWidth = (allSlides[0] && allSlides[0].getBoundingClientRect().width) || 600;
    let gapPx = getGap();
    let unitWidth = slideWidth + gapPx; // real advance per slide including CSS gap

    let baseWidth = unitWidth * BASE; // width of one logical set
    let offsetPx = -baseWidth * MID;     // start centered on the middle copy
    let velocity = 0;

    const applyTransform = () => {
      track.style.transform = `translate3d(${Math.round(offsetPx)}px, 0, 0)`; // GPU-friendly
    };

    // Animation loop for smooth continuous scrolling
    const animate = () => {
      // Auto-scroll unless user is interacting
      autoPaused = (isScrolling || isWheeling || hoverState.over);
      const autoV = autoPaused ? 0 : AUTO_VX;
      offsetPx += (velocity * 0.3) + autoV;
      // Decay user-induced velocity
      velocity *= 0.94; // decae más lento -> movimiento más suave
      if (Math.abs(velocity) > 0.01 && hoverPreview && hoverPreview.style.display !== 'none') {
        hoverPreview.style.display = 'none';
      }
      // Si la velocidad ya es baja y el puntero sigue encima, re-muestra el preview
      if (Math.abs(velocity) <= 0.01 && hoverPreview && hoverPreview.style.display === 'none' && hoverState.over && !isScrolling && !isWheeling) {
        const el = hoverState.img;
        if (el) {
          const baseIdx2 = parseInt((el.closest('.carousel-slide')?.dataset.baseIdx) || el.dataset.baseIdx || 0, 10);
          const color2 = el.dataset.previewColor || previewColors[baseIdx2 % previewColors.length];
          const src2 = el.dataset.preview || '';
          if (src2) setPreviewVisual({ src: src2 }); else setPreviewVisual({ color: color2 });
          hoverPreview.style.display = 'block';
          positionPreviewAt(hoverState.x, hoverState.y);
        }
      }
      // Normalize offsetPx within baseWidth range for seamless loop
      offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
      applyTransform();
      requestAnimationFrame(animate);
    };
    // Start animation loop
    animate();

    // Button click handlers adjust velocity instead of stepping
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        velocity -= unitWidth / 6;
        velocity = Math.max(-unitWidth, Math.min(unitWidth, velocity));
      });
    }
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        velocity += unitWidth / 6;
        velocity = Math.max(-unitWidth, Math.min(unitWidth, velocity));
      });
    }

    // Wheel scroll control (no autoplay). Throttled.
    let wheelLock = false;
    const onWheel = (e) => {
      // Always prevent default and stop propagation at the top
      e.preventDefault();
      e.stopPropagation();
      isWheeling = true;
      clearTimeout(wheelStopTimeout);
      wheelStopTimeout = setTimeout(() => {
        isWheeling = false;
        // If pointer is over a slide and motion is calm, show preview without requiring extra mouse movement
        if (hoverState.over && !isScrolling && Math.abs(velocity) <= 0.01 && hoverPreview && hoverPreview.style.display === 'none') {
          const el = hoverState.img;
          if (el) {
            const baseIdx2 = parseInt((el.closest('.carousel-slide')?.dataset.baseIdx) || el.dataset.baseIdx || 0, 10);
            const color2 = el.dataset.previewColor || previewColors[baseIdx2 % previewColors.length];
            const src2 = el.dataset.preview || '';
            if (src2) setPreviewVisual({ src: src2 }); else setPreviewVisual({ color: color2 });
            hoverPreview.style.display = 'block';
            positionPreviewAt(hoverState.x, hoverState.y);
          }
        }
      }, 40);
      if (wheelLock) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 20) return;
      wheelLock = true;
      if (delta > 0) {
        velocity -= unitWidth / 6;
      } else {
        velocity += unitWidth / 6;
      }
      velocity = Math.max(-unitWidth, Math.min(unitWidth, velocity));
      setTimeout(() => { wheelLock = false; }, 90);
    };
    section && section.addEventListener('wheel', onWheel, { passive: false });

    // Touch swipe
    let startX = 0, activeTouch = false;
    const onTouchStart = (e) => { activeTouch = true; startX = e.touches[0].clientX; };
    const onTouchMove  = (e) => { if (!activeTouch) return; };
    const onTouchEnd   = (e) => {
      if (!activeTouch) return;
      const dx = (e.changedTouches && e.changedTouches[0].clientX) - startX;
      if (Math.abs(dx) > 30) {
        if (dx < 0) {
          velocity -= unitWidth / 5;
        } else {
          velocity += unitWidth / 5;
        }
        velocity = Math.max(-unitWidth, Math.min(unitWidth, velocity));
      }
      activeTouch = false;
    };
    section && section.addEventListener('touchstart', onTouchStart, { passive: true });
    section && section.addEventListener('touchmove', onTouchMove, { passive: true });
    section && section.addEventListener('touchend', onTouchEnd, { passive: true });

    // Prevent default horizontal swipes on carousel section (touchmove)
    if (section) {
      let lastTouchX = 0, lastTouchY = 0;
      section.addEventListener('touchstart', function(e) {
        if (e.touches && e.touches.length > 0) {
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;
        }
      }, { passive: true });
      section.addEventListener('touchmove', function(e) {
        if (e.touches && e.touches.length > 0) {
          const dx = e.touches[0].clientX - lastTouchX;
          const dy = e.touches[0].clientY - lastTouchY;
          // If horizontal swipe (dx much bigger than dy), prevent default
          if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
            e.preventDefault();
          }
        }
      }, { passive: false });
    }

    // Pause auto-scroll while hovering the carousel area
    if (section) {
      section.addEventListener('mouseenter', () => { autoPaused = true; });
      section.addEventListener('mouseleave', () => { autoPaused = false; });
    }

    // Handle window resize to update slideWidth and position
    let rAF = 0;
    window.addEventListener('resize', () => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const newW = (allSlides[0] && allSlides[0].getBoundingClientRect().width) || 600;
        const newGap = getGap();
        const oldUnit = unitWidth;
        const newUnit = newW + newGap;
        if (newW !== slideWidth || newGap !== gapPx) {
          slideWidth = newW;
          gapPx = newGap;
          const ratio = newUnit / oldUnit;
          unitWidth = newUnit;
          // Scale offsets to keep the same apparent position
          offsetPx *= ratio;
          // Recompute base width for one logical set
          baseWidth = unitWidth * BASE;
          // Wrap offset into range relative to new base (centralized around MID)
          offsetPx = ((offsetPx % baseWidth) + baseWidth) % baseWidth - baseWidth * MID;
          // Apply instantly
          track.style.transition = 'none';
          track.style.transform = `translate3d(${offsetPx}px, 0, 0)`; // GPU-friendly
          requestAnimationFrame(() => { track.style.transition = ''; });
        }
      });
    });

  })();
})();