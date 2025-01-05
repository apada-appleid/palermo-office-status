self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// No caching strategy - all requests go to network
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});