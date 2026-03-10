fetch("version.json")
.then(r=>r.json())
.then(v=>{

document.getElementById("appVersion").innerText=v.version

})

function updateVersion(){

fetch("version.json?"+Date.now())

.then(r=>r.json())

.then(server=>{

let current=document.getElementById("appVersion").innerText

if(server.version!=current){

alert("נמצאה גרסה חדשה")

caches.keys().then(names=>{

names.forEach(n=>caches.delete(n))

})

location.reload(true)

}else{

alert("אין גרסה חדשה")

location.reload()

}

})

}
