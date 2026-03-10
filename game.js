let level=1
let score=0
let coins=0
let correctCount=0

let correctAnswer

let activeCharacter=null

let buildings=["🏠","🏢","🏫","🏪","🏰"]

let city=document.getElementById("city")

let characters=[

{name:"אורי",icon:"👷",power:"build"},
{name:"נועה",icon:"👩‍🚀",power:"coins"},
{name:"דני",icon:"👮",power:"protect"},
{name:"מאיה",icon:"🧙",power:"bonus"},
{name:"תום",icon:"👩‍🔬",power:"science"},
{name:"רותם",icon:"👨‍🚒",power:"fire"},
{name:"עדי",icon:"🧑‍🌾",power:"nature"},
{name:"רון",icon:"👨‍🏫",power:"xp"},
{name:"ליה",icon:"👩‍🎨",power:"city"},
{name:"יואב",icon:"🧑‍🔧",power:"repair"}

]

let shopItems=[

{name:"בית",price:30,icon:"🏠"},
{name:"עץ",price:20,icon:"🌳"},
{name:"בניין",price:80,icon:"🏢"},
{name:"בית ספר",price:120,icon:"🏫"}

]

function startGame(){

showScreen("gameScreen")
newQuestion()

}

function showScreen(id){

document.querySelectorAll(".screen")
.forEach(s=>s.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

function newQuestion(){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

correctAnswer=a+b

document.getElementById("question").innerText=a+" + "+b

document.getElementById("answer").value=""

}

function checkAnswer(){

let val=parseInt(document.getElementById("answer").value)

if(val===correctAnswer){

score++
coins+=5
correctCount++

build()

if(activeCharacter && activeCharacter.power==="coins"){
coins+=5
}

if(correctCount%10===0){
spinWheel()
}

}else{

alert("תשובה לא נכונה")

}

updateUI()
save()
newQuestion()

}

function build(){

let el=document.createElement("div")

el.innerText=buildings[Math.floor(Math.random()*buildings.length)]

city.appendChild(el)

}

function spinWheel(){

let prizes=["coins20","coins50","build","character"]

let p=prizes[Math.floor(Math.random()*prizes.length)]

if(p==="coins20") coins+=20

if(p==="coins50") coins+=50

if(p==="build") build()

if(p==="character"){

let c=characters[Math.floor(Math.random()*characters.length)]

alert("קיבלת דמות "+c.icon+" "+c.name)

}

updateUI()

}

function openShop(){

renderShop()

showScreen("shopScreen")

}

function renderShop(){

let list=document.getElementById("shopList")

list.innerHTML=""

shopItems.forEach((i,index)=>{

let disabled=coins<i.price

list.innerHTML+=`

<div class="shopItem">

${i.icon} ${i.name}

<br>

${i.price} מטבעות

<br>

<button style="background:${disabled?'red':'green'}"

onclick="buyItem(${index})">

קנה

</button>

</div>

`

})

}

function buyItem(i){

let item=shopItems[i]

if(coins<item.price) return

coins-=item.price

let el=document.createElement("div")

el.innerText=item.icon

city.appendChild(el)

updateUI()

}

function addShopItem(){

let pass=prompt("קוד הורים")

if(pass!=="1234") return

let name=prompt("שם פריט")

let price=parseInt(prompt("מחיר"))

let icons=["🏠","🌳","🏢","🏫","🏪","🎡","🏰","🗼","🎢","🚀"]

let iconIndex=parseInt(prompt(

"בחר אייקון:\n1🏠\n2🌳\n3🏢\n4🏫\n5🏪\n6🎡\n7🏰\n8🗼\n9🎢\n10🚀"

))

shopItems.push({

name:name,
price:price,
icon:icons[iconIndex-1]

})

renderShop()

}

function openCharacters(){

let box=document.getElementById("characterList")

box.innerHTML=""

characters.forEach(c=>{

box.innerHTML+=`

<button onclick="selectCharacter('${c.name}')">

${c.icon} ${c.name}

</button>

<br>

`

})

showScreen("charactersScreen")

}

function selectCharacter(name){

activeCharacter=characters.find(c=>c.name===name)

alert("בחרת דמות "+activeCharacter.icon)

}

function openStats(){

document.getElementById("statsBox").innerHTML=

`

נקודות: ${score}

<br>

מטבעות: ${coins}

<br>

תרגילים נכונים: ${correctCount}

`

showScreen("statsScreen")

}

function updateUI(){

document.getElementById("score").innerText=score
document.getElementById("coins").innerText=coins
document.getElementById("level").innerText=level

}

function save(){

localStorage.setItem("mathCity",

JSON.stringify({

score,
coins,
city:city.innerHTML

})

)

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

if(data.version!==current){

if(confirm("יש גרסה חדשה לעדכן?")){
location.reload(true)
}

}else{

location.reload()

}

})

}

function installApp(){

alert("להתקנה השתמש בתפריט הדפדפן")

}

function backGame(){

showScreen("gameScreen")

}

load()
