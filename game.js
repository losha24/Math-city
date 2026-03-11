let level=1
let score=0
let coins=0

let correct1=0
let correct2=0

let solved=0
let wheelReady=false

let shopItems=[

{name:"🚗 מכונית",price:50,icon:"🚗"},
{name:"🌳 עץ",price:30,icon:"🌳"},
{name:"🏠 בית",price:70,icon:"🏠"},
{name:"🏪 חנות",price:90,icon:"🏪"},
{name:"🏫 בית ספר",price:120,icon:"🏫"},
{name:"🎡 לונה פארק",price:150,icon:"🎡"},
{name:"🏰 טירה",price:200,icon:"🏰"},
{name:"🗼 מגדל",price:250,icon:"🗼"},
{name:"🎢 רכבת הרים",price:300,icon:"🎢"}

]

function showScreen(id){

document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

function startGame(){

showScreen("gameScreen")

newQuestions()

renderShop()

updateUI()

}

function newQuestions(){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

correct1=a+b
q1.innerText=a+" + "+b

let c=Math.floor(Math.random()*10)
let d=Math.floor(Math.random()*10)

correct2=c+d
q2.innerText=c+" + "+d

}

function checkAnswer(n){

let input=document.getElementById("a"+n)

let val=parseInt(input.value)

let correct=n==1?correct1:correct2

if(val==correct){

score++
coins+=5
solved++

input.style.background="#b8f5b8"

build()

if(solved%10===0){
wheelReady=true
showReward("🎰 גלגל מזל זמין!")
}

}else{

input.classList.add("shake")

setTimeout(()=>{
input.classList.remove("shake")
input.style.background=""
},400)

}

updateUI()

newQuestions()

input.value=""

}

function build(){

let el=document.createElement("div")
el.innerText="🏠"

city.appendChild(el)

}

function updateUI(){

score.innerText=score
coins.innerText=coins
level.innerText=level

}

function renderShop(){

shopList.innerHTML=""

shopItems.forEach(item=>{

let red=coins<item.price?"red":""

shopList.innerHTML+=`

<div class="shopItem">

<h3>${item.icon} ${item.name}</h3>

${item.price} 🪙

<br><br>

<button class="buyBtn ${red}" onclick="buy('${item.icon}',${item.price})">קנה</button>

</div>

`

})

}

function buy(icon,price){

if(coins<price)return

coins-=price

let el=document.createElement("div")
el.innerText=icon

city.appendChild(el)

updateUI()
renderShop()

}

function openShop(){

showScreen("shopScreen")
renderShop()

}

function backGame(){

showScreen("gameScreen")

}

function spinWheel(){

if(!wheelReady){
showReward("❗ גלגל מזל כל 10 תרגילים")
return
}

wheelReady=false

let prizes=[

{msg:"🪙 זכית ב-50 מטבעות!",coins:50},
{msg:"🪙 זכית ב-100 מטבעות!",coins:100},
{msg:"⭐ קיבלת 20 נקודות!",score:20},
{msg:"🏠 בניין מתנה!",build:true}

]

let prize=prizes[Math.floor(Math.random()*prizes.length)]

if(prize.coins) coins+=prize.coins
if(prize.score) score+=prize.score
if(prize.build) build()

updateUI()

showReward(prize.msg)

}

function showReward(text){

rewardPopup.innerText=text
rewardPopup.style.display="block"

setTimeout(()=>{
rewardPopup.style.display="none"
},2500)

}

async function checkUpdate(){

try{

let res=await fetch("version.json?"+Date.now())
let data=await res.json()

let current=versionText.innerText

if(data.version!==current){
location.reload(true)
}else{
location.reload()
}

}catch{
location.reload()
}

}

function resetGame(){

localStorage.clear()
location.reload()

}
