// service-worker.js
const CACHE_NAME = 'firebase-cache-v1';
const IMAGE_CACHE_URLS = [];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(IMAGE_CACHE_URLS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        // Cache the new response
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
