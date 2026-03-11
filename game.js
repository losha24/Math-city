let level=1
let score=0
let coins=0

let answers=[]
let solved=0
let wheelReady=false

let coinReward=5

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


function startGame(){

showScreen("gameScreen")

generateQuestions()

updateUI()

}


function showScreen(id){

document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"))

document.getElementById(id).classList.add("active")

}


function generateQuestions(){

answers=[]

for(let i=1;i<=4;i++){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

answers[i]=a+b

document.getElementById("q"+i).innerText=a+" + "+b

}

}


function checkAll(){

for(let i=1;i<=4;i++){

let input=document.getElementById("a"+i)

let val=parseInt(input.value)

if(val==answers[i]){

score++
coins+=coinReward
solved++

input.style.background="#b8f5b8"

build()

}else{

input.classList.add("shake")

setTimeout(()=>{
input.classList.remove("shake")
},400)

return

}

}

updateUI()

generateQuestions()

}


function build(){

let el=document.createElement("div")

el.innerText="🏠"

document.getElementById("city").appendChild(el)

}


function updateUI(){

document.getElementById("scoreText").innerText=score
document.getElementById("coinsText").innerText=coins
document.getElementById("levelText").innerText=level

}


function openShop(){

showScreen("shopScreen")

renderShop()

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

<br>

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


function openParent(){

showScreen("parentPanel")

}


function backShop(){

showScreen("shopScreen")

}


function addItem(){

let name=document.getElementById("itemName").value
let price=parseInt(document.getElementById("itemPrice").value)
let icon=document.getElementById("itemIcon").value

shopItems.push({name,price,icon})

alert("נוסף לחנות")

}


function spinWheel(){

if(solved<10){
alert("גלגל מזל כל 10 תרגילים")
return
}

solved=0

let prize=Math.floor(Math.random()*3)

if(prize==0){
coins+=50
alert("🎉 זכית ב50 מטבעות")
}

if(prize==1){
score+=20
alert("⭐ זכית ב20 נקודות")
}

if(prize==2){
build()
alert("🏠 בניין מתנה")
}

updateUI()

}


function checkUpdate(){

location.reload()

}


function resetGame(){

location.reload()

}
