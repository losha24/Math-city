let level=1
let score=0
let coins=0

let attempts=0
let correct=0

let solved=0
let mistakes=0

let rewards=[]

let buildings=["🏠","🌳","🏪","🏫","🎡","🏢"]

let monsters=["👾","👻","🤖","🦖"]

let monsterActive=false


let shopItems=[

{name:"🚗 מכונית",price:50,icon:"🚗"},
{name:"🌳 עץ",price:40,icon:"🌳"},
{name:"🏠 בית גדול",price:80,icon:"🏠"},
{name:"🏪 קניון",price:120,icon:"🏪"},
{name:"🎡 לונה פארק",price:200,icon:"🎡"}

]


function showScreen(id){

document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"))
document.getElementById(id).classList.add("active")

}

function startGame(){

showScreen("gameScreen")
newQuestion()

}


function backGame(){

showScreen("gameScreen")

}


function newQuestion(){

answer.classList.remove("correct","wrong")

attempts=0

let a,b

if(level<3){

a=Math.floor(Math.random()*10)
b=Math.floor(Math.random()*10)

correct=a+b

question.innerText=a+" + "+b

}else{

a=Math.floor(Math.random()*10)
b=Math.floor(Math.random()*a)

correct=a-b

question.innerText=a+" - "+b

}

}


function check(){

let val=parseInt(answer.value)

if(isNaN(val)) return

if(val==correct){

answer.classList.add("correct")

score++
solved++

coins+=5

if(monsterActive){

monster.innerText=""
monsterActive=false

}else{

build()

}

if(score%10==0){

coins+=20
giveReward()

}

if(score%5==0){

spawnMonster()

}

updateUI()

setTimeout(()=>{

answer.value=""
newQuestion()

},500)

save()

}else{

attempts++
mistakes++

answer.classList.add("wrong")

if(attempts>=2){

setTimeout(()=>{

answer.value=""
newQuestion()

},700)

}

}

}


function build(){

let el=document.createElement("div")

el.innerText=buildings[Math.floor(Math.random()*buildings.length)]

city.appendChild(el)

}


function giveReward(){

let icons=["🚗","🎡","🏰","🎢"]

let r=icons[Math.floor(Math.random()*icons.length)]

rewards.push(r)

rewardBox.innerHTML='<div class="reward">🎁 פרס חדש '+r+'</div>'

setTimeout(()=>{

rewardBox.innerHTML=""

},3000)

}


function openShop(){

renderShop()

showScreen("shopScreen")

}


function renderShop(){

shopList.innerHTML=""

shopItems.forEach(item=>{

let disabled=coins<item.price

shopList.innerHTML+=`

<div class="shopItem">

<h3>${item.icon} ${item.name}</h3>

מחיר ${item.price} 🪙

<br>

<button ${disabled?"style='background:red'":""}

onclick="buyItem('${item.icon}',${item.price})">

קנה

</button>

</div>

`

})

}


function buyItem(icon,price){

if(coins<price) return

coins-=price

let el=document.createElement("div")

el.innerText=icon

city.appendChild(el)

updateUI()

save()

}


function spinWheel(){

let prizes=[

"20 מטבעות",
"50 מטבעות",
"פרס מיוחד",
"בניין חדש"

]

let p=prizes[Math.floor(Math.random()*prizes.length)]

alert("🎡 גלגל מזל: "+p)

if(p=="20 מטבעות") coins+=20
if(p=="50 מטבעות") coins+=50
if(p=="בניין חדש") build()

updateUI()

}


function spawnMonster(){

monster.innerText=monsters[Math.floor(Math.random()*monsters.length)]

monsterActive=true

}


function updateUI(){

scoreEl.innerText=score
levelEl.innerText=level
coinsEl.innerText=coins

}


function save(){

localStorage.setItem("mathCity",

JSON.stringify({

score,level,coins,
city:city.innerHTML,
rewards

}))

}


function load(){

let data=localStorage.getItem("mathCity")

if(data){

let d=JSON.parse(data)

score=d.score||0
level=d.level||1
coins=d.coins||0
rewards=d.rewards||[]

city.innerHTML=d.city||""

}

updateUI()

}


function parentMode(){

let name=prompt("שם פרס")
let icon=prompt("אייקון")
let price=parseInt(prompt("מחיר"))

if(name && icon && price){

shopItems.push({name,icon,price})

alert("הפרס נוסף לחנות")

}

}


function updateVersion(){

fetch("version.json")
.then(r=>r.json())
.then(v=>{

alert("בודק עדכון גרסה")

location.reload()

})

}


function resetGame(){

localStorage.clear()

location.reload()

}


let scoreEl=document.getElementById("score")
let levelEl=document.getElementById("level")
let coinsEl=document.getElementById("coins")

load()
newQuestion()
