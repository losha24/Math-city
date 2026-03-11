let level=1
let score=0
let coins=0

let correct1
let correct2

let icons=["🚗","🏠","🏪","🏫","🌳","🎡","🏰","🗼","🎢","🚀","🛸","🚲","🛵","🚁","⛲"]

let shopItems=[
{name:"🚗 מכונית",price:50,icon:"🚗"},
{name:"🌳 עץ",price:30,icon:"🌳"},
{name:"🏠 בית",price:70,icon:"🏠"}
]


function startGame(){

document.getElementById("startScreen").style.display="none"
document.getElementById("gameScreen").style.display="block"

newQuestions()

renderShop()

}


function newQuestions(){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

correct1=a+b

document.getElementById("q1").innerText=a+" + "+b

let c=Math.floor(Math.random()*10)
let d=Math.floor(Math.random()*10)

correct2=c+d

document.getElementById("q2").innerText=c+" + "+d

}



function checkAnswer(n){

let input=document.getElementById("a"+n)

let val=parseInt(input.value)

let correct=n==1?correct1:correct2

if(val==correct){

score++
coins+=5

input.style.background="#b8f5b8"

build()

}else{

input.classList.add("shake")

setTimeout(()=>{

input.classList.remove("shake")

input.style.background=""

},500)

}

updateUI()

newQuestions()

}



function build(){

let el=document.createElement("div")

el.innerText="🏠"

document.getElementById("city").appendChild(el)

}



function updateUI(){

document.getElementById("score").innerText=score
document.getElementById("coins").innerText=coins
document.getElementById("level").innerText=level

}



function renderShop(){

let box=document.getElementById("shopList")

box.innerHTML=""

shopItems.forEach(item=>{

let red=coins<item.price?"red":""

box.innerHTML+=`

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

document.getElementById("city").appendChild(el)

updateUI()

renderShop()

}



function openShop(){

document.getElementById("shopScreen").style.display="block"
document.getElementById("gameScreen").style.display="none"

}



function backGame(){

document.getElementById("shopScreen").style.display="none"
document.getElementById("gameScreen").style.display="block"

}



function openParent(){

document.getElementById("parentPanel").style.display="block"

let select=document.getElementById("pIcon")

select.innerHTML=""

icons.forEach(i=>{

select.innerHTML+=`<option>${i}</option>`

})

}



function addItem(){

let name=document.getElementById("pName").value
let price=parseInt(document.getElementById("pPrice").value)
let icon=document.getElementById("pIcon").value

shopItems.push({name,price,icon})

renderShop()

}



function resetGame(){

localStorage.clear()

location.reload()

}



async function checkUpdate(){

try{

let res=await fetch("version.json?"+Date.now())

let data=await res.json()

let current=document.getElementById("versionText").innerText

if(data.version!==current){

alert("יש גרסה חדשה "+data.version)

location.reload(true)

}else{

location.reload()

}

}catch{

location.reload()

}

}
