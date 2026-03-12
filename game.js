let points=0
let coins=0
let level=1
let solved=0

function startGame(){

document.getElementById("menu").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

generate()

}

function generate(){

for(let i=1;i<=4;i++){

let a=Math.floor(Math.random()*10)+1
let b=Math.floor(Math.random()*10)+1

document.getElementById("q"+i).value=a+"+"+b
document.getElementById("q"+i).dataset.answer=a+b

document.getElementById("a"+i).value=""

}

}

function checkAnswers(){

for(let i=1;i<=4;i++){

let q=document.getElementById("q"+i)
let a=document.getElementById("a"+i)

if(Number(a.value)==Number(q.dataset.answer)){

points++
coins++
solved++

a.style.background="lightgreen"

}else{

a.style.background="salmon"
a.classList.add("shake")

}

}

updateStats()
generate()

}

function updateStats(){

if(points>=level*10) level++

document.getElementById("points").innerText=points
document.getElementById("coins").innerText=coins
document.getElementById("level").innerText=level

localStorage.setItem("points",points)
localStorage.setItem("coins",coins)
localStorage.setItem("level",level)

}

function openShop(){

let shop=document.getElementById("shop")

shop.classList.toggle("hidden")

shop.innerHTML=""

let items=[

["🍫",5],
["🎮",20],
["📚",15],
["🍭",3],
["⭐",10],
["🎁",25],
["🚗",30],
["⚽",12],
["🧩",18]

]

items.forEach(i=>{

let div=document.createElement("div")

div.className="shopItem"

let can=coins>=i[1]

div.innerHTML=`
<div>${i[0]}</div>
<div>${i[1]} מטבעות</div>
<button class="${can?'':'red'}"
onclick="buy(${i[1]})">קנה</button>
`

shop.appendChild(div)

})

}

function buy(price){

if(coins>=price){

coins-=price
updateStats()

}

}

function spinWheel(){

if(solved<10){

alert("צריך 10 פתרונות")

return

}

solved=0

let prize=Math.floor(Math.random()*10)+5

coins+=prize

alert("זכית ב "+prize+" מטבעות!")

updateStats()

}

function dailyGift(){

let last=localStorage.getItem("gift")

let today=new Date().toDateString()

if(last===today){

alert("כבר קיבלת היום")

return

}

let gift=10

coins+=gift

localStorage.setItem("gift",today)

alert("קיבלת "+gift+" מטבעות")

updateStats()

}

function showStats(){

let box=document.getElementById("statsBox")

box.classList.toggle("hidden")

box.innerHTML=`
רמה ${level}<br>
נקודות ${points}<br>
מטבעות ${coins}
`

}

function resetGame(){

localStorage.clear()
location.reload()

}

function checkUpdate(){

fetch("version.json")

.then(r=>r.json())

.then(v=>{

if(v.version!="1.0"){

location.reload()

}else{

location.reload()

}

})

}
