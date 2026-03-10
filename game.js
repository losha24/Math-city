let level=1
let score=0
let coins=0

let correctAnswer=0

let rewards=[]

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

document.getElementById("rewardList").innerText=rewards.join(" ")

showScreen("rewardsScreen")

}

function openStats(){

document.getElementById("statsBox").innerHTML=

"נקודות: "+score+"<br>מטבעות: "+coins

showScreen("statsScreen")

}

function newQuestion(){

let a=Math.floor(Math.random()*10)

let b=Math.floor(Math.random()*10)

correctAnswer=a+b

document.getElementById("question").innerText=a+" + "+b

}

function check(){

let input=document.getElementById("answer")

let val=parseInt(input.value)

if(val==correctAnswer){

score++

coins+=5

input.className="correct"

build()

}else{

input.className="wrong"

}

updateUI()

setTimeout(()=>{

input.value=""

input.className=""

newQuestion()

},500)

}

function build(){

let el=document.createElement("div")

el.innerText="🏠"

document.getElementById("city").appendChild(el)

}

function renderShop(){

let shop=document.getElementById("shopList")

shop.innerHTML=""

for(let i=0;i<6;i++){

shop.innerHTML+=`

<div class="shopItem">

🏠 בית

<br>

מחיר: 50

<br>

<button onclick="buy()">קנה</button>

</div>

`

}

}

function buy(){

if(coins<50){

alert("אין מספיק מטבעות")

return

}

coins-=50

build()

updateUI()

}

function spinWheel(){

let prizes=[10,20,50,"פרס"]

let p=prizes[Math.floor(Math.random()*prizes.length)]

alert("זכית: "+p)

if(typeof p=="number") coins+=p

else rewards.push("🎁")

updateUI()

}

function parentMode(){

alert("מצב הורים בפיתוח")

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

function updateVersion(){

fetch("version.json?"+Date.now())

.then(r=>r.json())

.then(v=>{

let current=document.getElementById("appVersion").innerText

if(v.version!=current){

alert("נמצאה גרסה חדשה")

location.reload(true)

}else{

alert("אין גרסה חדשה")

location.reload()

}

})

}
