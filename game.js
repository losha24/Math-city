let level=1
let points=0
let coins=0
let correctStreak=0

const LEVEL_STEP=10

const shopItems=[
{name:"כדור",price:10,icon:"⚽"},
{name:"גלידה",price:15,icon:"🍦"},
{name:"עוגה",price:20,icon:"🍰"},
{name:"צעצוע",price:25,icon:"🧸"},
{name:"ספר",price:30,icon:"📚"},
{name:"כוכב",price:40,icon:"⭐"},
{name:"רובוט",price:50,icon:"🤖"},
{name:"קוביה",price:35,icon:"🎲"},
{name:"בלון",price:12,icon:"🎈"}
]

function startGame(){

document.getElementById("startScreen").style.display="none"
document.getElementById("game").style.display="block"

loadGame()

generateAll()

}

function saveGame(){

localStorage.setItem("mathcity",
JSON.stringify({level,points,coins,correctStreak})
)

}

function loadGame(){

let data=localStorage.getItem("mathcity")

if(!data)return

let d=JSON.parse(data)

level=d.level
points=d.points
coins=d.coins
correctStreak=d.correctStreak

updateStats()

}

function updateStats(){

levelEl=document.getElementById("level")
pointsEl=document.getElementById("points")
coinsEl=document.getElementById("coins")

levelEl.innerText=level
pointsEl.innerText=points
coinsEl.innerText=coins

}

function random(a,b){

return Math.floor(Math.random()*(b-a+1))+a

}

function generateOne(id){

let a=random(1,10)
let b=random(1,10)

let box=document.getElementById(id)

box.dataset.answer=a+b

box.querySelector(".q").innerText=a+" + "+b

box.querySelector("input").value=""

box.classList.remove("correct","wrong")

}

function generateAll(){

generateOne("ex1")
generateOne("ex2")
generateOne("ex3")
generateOne("ex4")

}

function checkAnswers(){

for(let i=1;i<=4;i++){

let box=document.getElementById("ex"+i)

let input=box.querySelector("input")

let val=parseInt(input.value)

let ans=parseInt(box.dataset.answer)

box.classList.remove("correct","wrong")

if(val===ans){

box.classList.add("correct")

points++
coins+=2

correctStreak++

}else{

box.classList.add("wrong")

box.animate(
[
{transform:"translateX(-5px)"},
{transform:"translateX(5px)"},
{transform:"translateX(0)"}
],
{duration:300}
)

}

}

if(points>=level*LEVEL_STEP){

level++

alert("עלית רמה")

}

updateStats()

saveGame()

generateAll()

if(correctStreak>=10){

correctStreak=0

spinReward()

}

}

function spinReward(){

let reward=random(10,50)

coins+=reward

alert("זכית ב "+reward+" מטבעות")

updateStats()

saveGame()

}

function dailyGift(){

let today=new Date().toDateString()

let last=localStorage.getItem("daily")

if(last===today){

alert("כבר קיבלת היום")

return

}

let reward=random(20,50)

coins+=reward

localStorage.setItem("daily",today)

alert("מתנה יומית "+reward)

updateStats()

saveGame()

}

function openShop(){

shop=document.getElementById("shop")

shop.innerHTML=""

shopItems.forEach((item,i)=>{

btn=document.createElement("button")

btn.className="shopItem"

btn.innerHTML=item.icon+"<br>"+item.name+"<br>"+item.price

if(coins<item.price){

btn.classList.add("noMoney")

}

btn.onclick=()=>buyItem(i)

shop.appendChild(btn)

})

}

function buyItem(i){

item=shopItems[i]

if(coins<item.price)return

coins-=item.price

alert("קנית "+item.name)

updateStats()

saveGame()

openShop()

}

function resetGame(){

localStorage.clear()

location.reload()

}

async function checkUpdate(){

let res=await fetch("version.json?"+Date.now())

let data=await res.json()

let current=localStorage.getItem("appVersion")

if(current!==data.version){

localStorage.setItem("appVersion",data.version)

alert("יש גרסה חדשה")

location.reload(true)

}else{

location.reload()

}

}
