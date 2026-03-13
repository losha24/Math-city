const cacheName = 'mathcity-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/logo.png',
  '/manifest.json'
];

// התקנת ה‑Service Worker ואחסון הקבצים
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// הפעלת ה‑Service Worker לכל בקשת רשת
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) // תחפש קודם ב‑cache
      .then(response => response || fetch(event.request)) // אם לא קיים, הביא מהאינטרנט
  );
});
