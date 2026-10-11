/* Serbia Gateway PWA service worker — offline app shell. */
const CACHE_VERSION = 'serbia-gateway-pwa-v3';
const APP_SHELL = [
  './', './index.html', './manifest.webmanifest', './favicon.svg', './favicon.png',
  './icons/icon-192.png', './icons/icon-512.png', './signature.jpg', './seal.jpg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response && response.ok) caches.open(CACHE_VERSION).then(cache => cache.put('./index.html', response.clone()));
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response && response.ok) caches.open(CACHE_VERSION).then(cache => cache.put(request, response.clone()));
    return response;
  }).catch(() => { if (request.destination === 'document') return caches.match('./index.html'); throw new Error('Offline and resource not cached'); })));
});
