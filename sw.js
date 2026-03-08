const CACHE="math-city-v3"

const urls=[

"/",
"/index.html",
"/style.css",
"/icon.png",
"/logo.png"

]

self.addEventListener("install",event=>{

self.skipWaiting()

event.waitUntil(

caches.open(CACHE).then(cache=>{

return cache.addAll(urls)

})

)

})

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys().then(keys=>{

return Promise.all(

keys.map(key=>{

if(key!==CACHE){

return caches.delete(key)

}

})

)

})

)

})

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request).then(res=>{

return res || fetch(event.request)

})

)

})
