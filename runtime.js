// Storage can be unavailable in privacy mode or embedded browsers.
const appStorage = (() => {
  const memory = new Map();
  return {
    getItem(key) {
      try { return localStorage.getItem(key) ?? memory.get(key) ?? null; }
      catch { return memory.get(key) ?? null; }
    },
    setItem(key, value) {
      memory.set(key, String(value));
      try { localStorage.setItem(key, String(value)); } catch { /* Session fallback. */ }
    }
  };
})();

// Capture also covers images added by mission dialogs after startup.
document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || image.dataset.fallback === 'true') return;
  image.dataset.fallback = 'true';
  image.src = './assets/placeholder.svg';
}, true);
