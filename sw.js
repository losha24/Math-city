const CACHE_NAME = "mathcity-v1";
self.addEventListener("install", e => {self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(["/","/index.html","/manifest.json","/logo.png","/icon.png"])));});
self.addEventListener("activate", e => {e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));});
self.addEventListener("fetch", e => {e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request)));});
