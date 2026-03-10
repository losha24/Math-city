let level=1
let score=0
let coins=0

let correctAnswer

let rewards=[]

let city=document.getElementById("city")

let buildings=["🏠","🏢","🏬","🏫","🏪","🏰"]

let characters=[

{name:"אורי",icon:"🧑"},
{name:"נועה",icon:"👧"},
{name:"דני",icon:"👦"},
{name:"מאיה",icon:"👩"},
{name:"תום",icon:"🧑‍🚀"},
{name:"רותם",icon:"👨‍🚒"},
{name:"עדי",icon:"👮"},
{name:"רון",icon:"🧙"},
{name:"ליה",icon:"👩‍🔬"},
{name:"יואב",icon:"🧑‍🌾"}

]

let shopItems=[

{name:"בית",price:40,icon:"🏠"},
{name:"עץ",price:20,icon:"🌳"},
{name:"בניין",price:80,icon:"🏢"},
{name:"בית ספר",price:120,icon:"🏫"},
{name:"חנות",price:90,icon:"🏪"},
{name:"טירה",price:200,icon:"🏰"}

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

let a=Math.floor(Math.random()*10)

let b=Math.floor(Math.random()*10)

correctAnswer=a+b

question.innerText=a+" + "+b

answer.value=""

}

function checkAnswer(){

let val=parseInt(answer.value)

if(val==correctAnswer){

answer.className="correct"

score++
coins+=5

build()

if(score%10==0){

spinWheel()

}

}else{

answer.className="wrong"

}

updateUI()

save()

setTimeout(newQuestion,500)

}

function build(){

let el=document.createElement("div")

el.innerText=buildings[Math.floor(Math.random()*buildings.length)]

city.appendChild(el)

}

function spinWheel(){

let prizes=[

"+20 מטבעות",
"+50 מטבעות",
"בית חדש",
"דמות"

]

let p=prizes[Math.floor(Math.random()*prizes.length)]

alert("גלגל המזל נתן: "+p)

if(p=="+20 מטבעות") coins+=20
if(p=="+50 מטבעות") coins+=50

if(p=="בית חדש") build()

if(p=="דמות"){

let c=characters[Math.floor(Math.random()*characters.length)]

rewards.push(c.icon)

}

updateUI()

}

function openShop(){

renderShop()

showScreen("shopScreen")

}

function renderShop(){

shopList.innerHTML=""

shopItems.forEach(i=>{

let disabled=coins<i.price

shopList.innerHTML+=`

<div class="shopItem">

${i.icon}

<br>

${i.name}

<br>

${i.price} 🪙

<br>

<button style="background:${disabled?'red':'green'}"

onclick="buyItem('${i.icon}',${i.price})">

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

function openRewards(){

rewardList.innerHTML=rewards.join(" ")

showScreen("rewardsScreen")

}

function openCharacters(){

characterList.innerHTML=""

characters.forEach(c=>{

characterList.innerHTML+=c.icon+" "+c.name+"<br>"

})

showScreen("charactersScreen")

}

function openStats(){

statsBox.innerHTML=

`

נקודות: ${score}

<br>

מטבעות: ${coins}

`

showScreen("statsScreen")

}

function parentMode(){

let pass=prompt("קוד הורים")

if(pass!="1234") return

let name=prompt("שם פריט")

let price=parseInt(prompt("מחיר"))

let icons=["🏠","🌳","🏢","🏫","🏪","🎡","🏰","🗼","🎢","🚀"]

let pick=parseInt(prompt("בחר אייקון 1-10"))

shopItems.push({

name:name,
price:price,
icon:icons[pick-1]

})

renderShop()

}

function updateUI(){

score.innerText=score
coins.innerText=coins
level.innerText=level

}

function save(){

localStorage.setItem("mathCity",

JSON.stringify({

score,
coins,
city:city.innerHTML

}))

}

function load(){

let data=localStorage.getItem("mathCity")

if(!data) return

let d=JSON.parse(data)

score=d.score
coins=d.coins

city.innerHTML=d.city

updateUI()

}

function resetGame(){

localStorage.clear()

location.reload()

}

function checkUpdate(){

fetch("version.json")

.then(r=>r.json())

.then(data=>{

let current=document.getElementById("appVersion").innerText

if(data.version!=current){

if(confirm("יש גרסה חדשה לעדכן?")){

location.reload(true)

}

}else{

alert("האפליקציה מעודכנת")

location.reload()

}

})

}

function installApp(){

alert("להתקנה השתמש בתפריט הדפדפן")

}

load()
