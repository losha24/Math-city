const cacheName="mathcity-cache-v4";
const filesToCache=["/","/index.html","/style.css","/game.js","/sw.js","/version.json","/logo.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(cacheName).then(c=>c.addAll(filesToCache)));});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(resp=>resp||fetch(e.request)));});
