const CACHE = 'pawpad-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(r => { const c=r.clone(); caches.open(CACHE).then(ca=>ca.put(e.request,c)); return r; })
      .catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(fetch(e.request).then(r => { const c=r.clone(); caches.open(CACHE).then(ca=>ca.put(e.request,c)); return r; }).catch(() => caches.match(e.request)));
});
