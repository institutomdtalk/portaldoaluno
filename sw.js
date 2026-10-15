/* MD Talk Portal PWA - modo online com tela de contingencia offline.
 * Nao guarda HTML do portal, dados de alunos, logins, planilhas ou chamadas API no cache.
 */
const STATIC_CACHE = 'mdtalk-pwa-v87-static-01';
const ROOT = new URL(self.registration.scope);
const OFFLINE_PAGE = new URL('offline.html', ROOT).href;
const SAFE_ASSETS = [
  OFFLINE_PAGE,
  new URL('icons/icon-192.png', ROOT).href,
  new URL('icons/icon-512.png', ROOT).href,
  new URL('icons/icon-maskable-512.png', ROOT).href,
  new URL('icons/apple-touch-icon.png', ROOT).href
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(SAFE_ASSETS))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith('mdtalk-pwa-') && key !== STATIC_CACHE)
        .map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Always use the network for any navigation (including the authenticated portal).
  // An offline informational page is shown when loading the app without connectivity.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_PAGE)));
    return;
  }

  // Cache only the icons and the neutral offline page.
  if (SAFE_ASSETS.includes(url.href)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
  }
});
