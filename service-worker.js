/* Simple service worker for offline support */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('worksheet-gen').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/names.html',
        '/font.otf',
        '/writingfont.otf',
        '/TEMPLATE.xlsx'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
