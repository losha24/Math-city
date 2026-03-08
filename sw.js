self.addEventListener("install", e => {

e.waitUntil(

caches.open("mathcity").then(cache => {

return cache.addAll([

"./",
"./index.html",
"./icon.png",
"./logo.png"

])

})

)

})

self.addEventListener("fetch", e => {

e.respondWith(

caches.match(e.request).then(res => {

return res || fetch(e.request)

})

)

})
