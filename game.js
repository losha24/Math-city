let level=1
let score=0
let coins=0
let correct=0
let attempts=0

let rewards=[]

let buildings=["🏠","🌳","🏪","🏫","🎡","🏢"]

let monsters=["👾","👻","🤖","🦖"]

let monsterActive=false


let shopItems=[
{name:"🚗 מכונית",price:50,icon:"🚗"},
{name:"🌳 עץ מיוחד",price:40,icon:"🌳"},
{name:"🏠 בית גדול",price:80,icon:"🏠"},
{name:"🏪 קניון",price:120,icon:"🏪"},
{name:"🏫 בית ספר",price:150,icon:"🏫"},
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


function openShop(){

renderShop()

showScreen("shopScreen")

}


function openRewards(){

document.getElementById("rewardList").innerHTML=rewards.join(" ")

showScreen("rewardsScreen")

}


function openStats(){

document.getElementById("statsBox").innerHTML=

"נקודות: "+score+"<br>מטבעות: "+coins

showScreen("statsScreen")

}


function newQuestion(){

attempts=0

let a=Math.floor(Math.random()*10)

let b=Math.floor(Math.random()*10)

correct=a+b

document.getElementById("question").innerText=a+" + "+b

}


function check(){

let input=document.getElementById("answer")

let val=parseInt(input.value)

if(isNaN(val)) return


if(val==correct){

score++
coins+=5

build()

if(score%10==0){

coins+=20

giveReward()

}

input.className="correct"

}else{

attempts++

input.className="wrong"

if(attempts<2) return

}

updateUI()

setTimeout(()=>{

input.value=""
input.className=""
newQuestion()

},600)

}


function build(){

let el=document.createElement("div")

el.innerText=buildings[Math.floor(Math.random()*buildings.length)]

document.getElementById("city").appendChild(el)

}


function giveReward(){

let icons=["🚗","🎡","🏰","🗼"]

let r=icons[Math.floor(Math.random()*icons.length)]

rewards.push(r)

document.getElementById("rewardBox").innerHTML="🎁 פרס חדש "+r

}


function renderShop(){

let shop=document.getElementById("shopList")

shop.innerHTML=""

shopItems.forEach(item=>{

shop.innerHTML+=`

<div class="shopItem">

<h3>${item.icon} ${item.name}</h3>

מחיר: ${item.price} 🪙

<br><br>

<button onclick="buyItem('${item.icon}',${item.price})">קנה</button>

</div>

`

})

}


function buyItem(icon,price){

if(coins<price){

alert("אין מספיק מטבעות")

return

}

coins-=price

let el=document.createElement("div")

el.innerText=icon

document.getElementById("city").appendChild(el)

updateUI()

}


function spinWheel(){

let prizes=[10,20,50,"🎁"]

let p=prizes[Math.floor(Math.random()*prizes.length)]

alert("זכית: "+p)

if(typeof p=="number") coins+=p
else rewards.push("🎁")

updateUI()

}


function parentMode(){

alert("מצב הורים")

}


function updateUI(){

document.getElementById("score").innerText=score
document.getElementById("coins").innerText=coins
document.getElementById("level").innerText=level

}


function resetGame(){

localStorage.clear()

location.reload()

}


fetch("version.json")

.then(r=>r.json())

.then(v=>{

document.getElementById("appVersion").innerText=v.version

})


function updateVersion(){

fetch("version.json?"+Date.now())

.then(r=>r.json())

.then(v=>{

alert("גרסה "+v.version)

location.reload()

})

}
