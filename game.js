let level=1
let score=0
let coins=0

let solved=0
let mistakes=0

let correctAnswer

let city=document.getElementById("city")

let buildings=[
"🏠","🏡","🏢","🏫","🏪","🎡","🏬","🏭"
]

let rewards=[]

let characters=[

{name:"אורי",icon:"🧑"},
{name:"נועה",icon:"👧"},
{name:"דני",icon:"👦"},
{name:"מאיה",icon:"👩"},
{name:"תום",icon:"🧑‍🚀"},
{name:"ליאן",icon:"👩‍🎓"},
{name:"רון",icon:"🧑‍🔧"},
{name:"אדם",icon:"🧑‍🚀"},
{name:"רותם",icon:"👨‍🚒"},
{name:"יואב",icon:"🧑‍🚀"}

]

let shopItems=[

{name:"🏠 בית",price:30,icon:"🏠"},
{name:"🌳 עץ",price:20,icon:"🌳"},
{name:"🏪 חנות",price:60,icon:"🏪"},
{name:"🏫 בית ספר",price:80,icon:"🏫"},
{name:"🎡 לונה פארק",price:120,icon:"🎡"},
{name:"🏢 בניין",price:150,icon:"🏢"}

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
answer.className=""

}


function checkAnswer(){

let val=parseInt(answer.value)

if(isNaN(val)) return


if(val==correctAnswer){

answer.className="correct"

score++
coins+=5
solved++

build()

if(score%10==0){

giveReward()

}

setTimeout(newQuestion,500)

}else{

mistakes++

answer.className="wrong"

}

updateUI()

save()

}


function build(){

let el=document.createElement("div")

el.innerText=buildings[Math.floor(Math.random()*buildings.length)]

el.className="buildAnim"

city.appendChild(el)

}


function giveReward(){

let icons=["🚗","🎁","🎡","🏰"]

let r=icons[Math.floor(Math.random()*icons.length)]

rewards.push(r)

alert("קיבלת פרס "+r)

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

${item.price} 🪙

<br>

<button class="buyBtn ${disabled?'disabled':''}" 
onclick="buyItem('${item.icon}',${item.price})">

קנה

</button>

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

characterList.innerHTML+=`

<div>

${c.icon} ${c.name}

</div>

`

})

showScreen("charactersScreen")

}


function openStats(){

let accuracy=solved==0?0:

Math.round((solved/(solved+mistakes))*100)

statsBox.innerHTML=

`

תרגילים שנפתרו: ${solved}<br>

טעויות: ${mistakes}<br>

אחוז הצלחה: ${accuracy}%<br>

מטבעות: ${coins}

`

showScreen("statsScreen")

}


function parentMode(){

let pass=prompt("קוד הורים")

if(pass!="1234"){

alert("קוד שגוי")

return

}

let name=prompt("שם פריט")

let icon=prompt("אייקון")

let price=parseInt(prompt("מחיר"))

shopItems.push({

name:name,
icon:icon,
price:price

})

alert("נוסף לחנות")

}


function updateUI(){

score.innerText=score

coins.innerText=coins

level.innerText=level

}


function save(){

localStorage.setItem(

"mathCity",

JSON.stringify({

score,
coins,
level,
city:city.innerHTML,
rewards,
solved,
mistakes

})

)

}


function load(){

let data=localStorage.getItem("mathCity")

if(!data) return

let d=JSON.parse(data)

score=d.score||0
coins=d.coins||0
level=d.level||1

rewards=d.rewards||[]

solved=d.solved||0
mistakes=d.mistakes||0

city.innerHTML=d.city||""

updateUI()

}


function resetGame(){

if(!confirm("לאפס משחק?")) return

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

location.reload()

}

})

}


load()

newQuestion()
