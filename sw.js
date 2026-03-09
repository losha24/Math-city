const CACHE_NAME = "mathcity-v1.0.2";

self.addEventListener("install", e => {

self.skipWaiting();

e.waitUntil(

caches.open(CACHE_NAME).then(cache => {

return cache.addAll([
"/",
"/index.html",
"/manifest.json",
"/logo.png",
"/icon.png"
]);

})

);

});

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys().then(keys => {

return Promise.all(

keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))

);

})

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request).then(res => {

return res || fetch(event.request);

})

);

});
