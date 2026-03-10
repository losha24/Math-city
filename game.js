let version="4.2"

document.getElementById("versionText").innerText=version

let level=1
let score=0
let coins=0

let buildings=["🌱","🏗","🏠","🏡","🏢","🏙"]

let characters=[
{name:"נועה",icon:"🧑‍🚀"},
{name:"יואב",icon:"🧑‍🔬"},
{name:"מאיה",icon:"🧑‍🎨"},
{name:"עומר",icon:"🧑‍🍳"},
{name:"דניאל",icon:"🧑‍🚒"},
{name:"איתי",icon:"🧑‍🔧"},
{name:"ליה",icon:"🧑‍⚕️"},
{name:"רועי",icon:"🧑‍🌾"},
{name:"תמר",icon:"🧑‍💻"},
{name:"ליאם",icon:"🧑‍🎮"}
]

let shopItems=[
{name:"בית",icon:"🏠",price:50},
{name:"פארק",icon:"🌳",price:40},
{name:"קניון",icon:"🏪",price:120},
{name:"לונה פארק",icon:"🎡",price:200}
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

correct=a+b

question.innerText=a+" + "+b

}

function check(){

let val=parseInt(answer.value)

if(val==correct){

coins+=5
score++

build()

updateUI()

newQuestion()

}else{

answer.style.background="red"

setTimeout(()=>{

answer.style.background="white"

},300)

}

}

function build(){

let el=document.createElement("div")

el.innerText="🌱"

city.appendChild(el)

setTimeout(()=>{

el.innerText="🏗"

},300)

setTimeout(()=>{

el.innerText="🏠"
el.classList.add("buildAnim")

},600)

}

function openShop(){

renderShop()

showScreen("shopScreen")

}

function renderShop(){

shopList.innerHTML=""

shopItems.forEach(item=>{

let canBuy=coins>=item.price

shopList.innerHTML+=`

<div class="shopItem">

${item.icon} ${item.name}

<br>

${item.price} 🪙

<br>

<button class="buyBtn ${canBuy?"":"red"}"
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

}

function openCharacters(){

charactersList.innerHTML=""

characters.forEach(c=>{

charactersList.innerHTML+=`

<div>

${c.icon} ${c.name}

</div>

`

})

showScreen("charactersScreen")

}

function openStats(){

statsBox.innerHTML=`

רמה ${level}<br>
נקודות ${score}<br>
מטבעות ${coins}

`

showScreen("statsScreen")

}

function updateUI(){

score.innerText=score
coins.innerText=coins
level.innerText=level

}

function spinWheel(){

let rewards=[10,20,30,50]

let win=rewards[Math.floor(Math.random()*rewards.length)]

coins+=win

alert("זכית "+win+" מטבעות")

updateUI()

}

function resetGame(){

localStorage.clear()

location.reload()

}

function checkUpdate(){

location.reload()

}
