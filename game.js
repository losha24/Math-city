let level=1, points=0, coins=0, correctStreak=0
const LEVEL_STEP=10, REWARD_CYCLE=20

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

let shopVisible=false, rewardsVisible=false

function startGame(){
document.getElementById("startScreen").style.display="none"
document.getElementById("game").style.display="block"
loadGame()
generateAll()
updateStats()
}

function saveGame(){
localStorage.setItem("mathcity",
JSON.stringify({level,points,coins,correctStreak}))
}

function loadGame(){
let data=localStorage.getItem("mathcity")
if(!data)return
let d=JSON.parse(data)
level=d.level; points=d.points; coins=d.coins; correctStreak=d.correctStreak
updateStats()
}

function updateStats(){
document.getElementById("level").innerText=level
document.getElementById("points").innerText=points
document.getElementById("coins").innerText=coins
}

function random(a,b){return Math.floor(Math.random()*(b-a+1))+a}

function generateOne(id){
let a=random(1,10), b=random(1,10)
let box=document.getElementById(id)
box.dataset.answer=a+b
box.querySelector(".q").innerText=a+" + "+b
box.querySelector("input").value=""
box.classList.remove("correct","wrong")
}

function generateAll(){
for(let i=1;i<=4;i++) generateOne("ex"+i)
}

function checkAnswers(){
let allCorrect=true
for(let i=1;i<=4;i++){
let box=document.getElementById("ex"+i)
let val=parseInt(box.querySelector("input").value)
let ans=parseInt(box.dataset.answer)
box.classList.remove("correct","wrong")
if(val===ans) box.classList.add("correct")
else{
allCorrect=false
box.classList.add("wrong")
box.animate([{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],{duration:300})
}
}
if(!allCorrect) return
points+=4; coins+=8; correctStreak+=4
if(points>=level*LEVEL_STEP){level++; alert("🎉 עלית רמה!")}
updateStats(); saveGame(); generateAll()
if(correctStreak>=REWARD_CYCLE){correctStreak=0; spinReward()}
}

function spinReward(){
let reward=random(10,50); coins+=reward
alert("זכית ב "+reward+" מטבעות"); updateStats(); saveGame()
}

function dailyGift(){
let today=new Date().toDateString(), last=localStorage.getItem("daily")
if(last===today){alert("כבר קיבלת היום"); return}
let reward=random(20,50); coins+=reward
localStorage.setItem("daily",today)
alert("מתנה יומית "+reward)
updateStats(); saveGame()
}

function toggleShop(){
shopVisible=!shopVisible
let shop=document.getElementById("shop")
shop.style.display=shopVisible?"grid":"none"
if(shopVisible) openShop()
}

function openShop(){
let shop=document.getElementById("shop"); shop.innerHTML=""
shopItems.forEach((item,i)=>{
let btn=document.createElement("button")
btn.className="shopItem"
btn.innerHTML=item.icon+"<br>"+item.name+"<br>"+item.price
if(coins<item.price) btn.classList.add("noMoney")
btn.onclick=()=>buyItem(i)
shop.appendChild(btn)
})
shopItemsManagement()
}

function buyItem(i){
let item=shopItems[i]
if(coins<item.price)return
coins-=item.price; alert("קנית "+item.name)
updateStats(); saveGame(); openShop()
}

function shopItemsManagement(){
let management=document.createElement("div")
management.innerHTML="<b>ניהול הורים:</b><br>"
document.getElementById("shop").appendChild(management)
shopItems.forEach((item,i)=>{
let btn=document.createElement("button")
btn.innerText="עריכה/מחיקה "+item.name
btn.onclick=()=>{
let price=prompt("מחיר חדש:",item.price)
if(price) item.price=parseInt(price)
updateStats(); openShop()
}
management.appendChild(btn)
})
}

function toggleRewards(){
rewardsVisible=!rewardsVisible
document.getElementById("rewards").style.display=rewardsVisible?"block":"none"
}

function resetGame(){localStorage.clear(); location.reload()}

async function checkUpdate(){
let res=await fetch("version.json?"+Date.now())
let data=await res.json()
let current=localStorage.getItem("appVersion")
if(current!==data.version){localStorage.setItem("appVersion",data.version); alert("יש גרסה חדשה"); location.reload(true)}
else location.reload()
}
