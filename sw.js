const CACHE_NAME="mathcity-v4"

const urls=[
"./",
"./index.html",
"./style.css",
"./game.js",
"./logo.png"
]

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(CACHE_NAME).then(cache=>{

return cache.addAll(urls)

})

)

})

self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request).then(res=>{

return res||fetch(e.request)

})

)

})
