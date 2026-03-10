// sw.js – Service Worker
const cacheName = "mathcity-cache-v4";
const filesToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/game.js",
    "/logo.png",
    "/version.json"
];

self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open(cacheName).then(cache=>cache.addAll(filesToCache))
    );
});

self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(resp=>resp || fetch(e.request))
    );
});
