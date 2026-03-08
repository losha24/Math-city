const cacheName="mathcity-v2"

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(cacheName).then(cache=>{

return cache.addAll([
"/",
"/index.html",
"/style.css",
"/icon.png",
"/logo.png"
])

})

)

})

self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request).then(r=>{

return r||fetch(e.request)

})

)

})
