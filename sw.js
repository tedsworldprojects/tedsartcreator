const CACHE_NAME = 'teds-art-creator-cache-v1';
const APP_SHELL_URLS = [
  '/',
  '/index.html'
];

// Install: Caches the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(APP_SHELL_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: Cleans up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Serves requests from cache or network
self.addEventListener('fetch', (event) => {
  // We only cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  // For navigation requests (loading the page), use a network-first strategy.
  // This ensures users get the latest version of the app shell if they are online,
  // but falls back to the cache if they are offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For all other requests (assets, scripts, etc.), use a cache-first strategy.
  // This serves assets from the cache if available, which makes the app load fast.
  // If an asset is not in the cache, it's fetched from the network and cached for future use.
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        // Return response from cache if found.
        if (response) {
          return response;
        }

        // Fetch from network and cache it for next time.
        return fetch(event.request.clone()).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    })
  );
});
