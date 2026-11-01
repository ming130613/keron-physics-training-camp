// Wait for the entry artwork, never for the ending movie or every game asset.
(() => {
  const loader = document.getElementById('bootLoader');
  const app = document.getElementById('app');
  if (!loader || !app) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const started = performance.now();
  let finished = false;
  let safetyTimer;
  app.inert = true;
  app.setAttribute('aria-busy', 'true');

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(safetyTimer);
    app.inert = false;
    app.removeAttribute('aria-busy');
    loader.classList.add('is-leaving');
    setTimeout(() => {
      document.documentElement.classList.remove('boot-loading');
      loader.remove();
    }, reducedMotion ? 0 : 300);
  }

  function preload(src) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = image.onerror = resolve;
      image.src = src;
    });
  }

  // Network failures and slow third-party fonts must never trap the player.
  safetyTimer = setTimeout(finish, 5000);
  const ready = Promise.all([
    preload('assets/icons/icon-192.png?v=keroro-3'),
    preload('assets/cover.webp'),
    preload('assets/select_base.webp')
  ]);
  ready.then(() => {
    const remaining = reducedMotion ? 0 : Math.max(0, 900 - (performance.now() - started));
    setTimeout(finish, remaining);
  });
})();

