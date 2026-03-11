let level=1
let score=0
let coins=0

let answers=[]
let solved=0

let shopItems=JSON.parse(localStorage.getItem("shopItems"))||[
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

function updateUI(){

document.getElementById("levelValue").textContent=level
document.getElementById("scoreValue").textContent=score
document.getElementById("coinsValue").textContent=coins

}

function startGame(){

show("gameScreen")
generateQuestions()
updateUI()

}

function show(id){

document.querySelectorAll(".screen").forEach(s=>s.style.display="none")
document.getElementById(id).style.display="block"

}

function generateQuestions(){

answers=[]

for(let i=1;i<=4;i++){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

answers[i]=a+b

document.getElementById("q"+i).textContent=a+" + "+b

}

}

function checkAll(){

let correct=true

for(let i=1;i<=4;i++){

let input=document.getElementById("a"+i)

if(parseInt(input.value)==answers[i]){

score++
coins+=5
solved++

build()

}else{

input.style.background="#ffb3b3"
correct=false

}

input.value=""

}

if(correct)generateQuestions()

if(score>=level*20){

level++
coins+=50
alert("עלית רמה!")

}

updateUI()

}

function build(){

let el=document.createElement("div")
el.textContent="🏠"
city.appendChild(el)

}

function openShop(){

show("shopScreen")
renderShop()

}

function renderShop(){

shopList.innerHTML=""

shopItems.forEach(item=>{

let red=coins<item.price?"red":""

shopList.innerHTML+=`

<div>

${item.icon} ${item.name}<br>
${item.price} 🪙

<button class="buyBtn ${red}" onclick="buy('${item.icon}',${item.price})">קנה</button>

</div>

`

})

}

function buy(icon,price){

if(coins<price)return

coins-=price

let el=document.createElement("div")
el.textContent=icon

city.appendChild(el)

updateUI()
renderShop()

}

function openParents(){

show("parentsScreen")

}

function addItem(){

let name=itemName.value
let price=parseInt(itemPrice.value)
let icon=itemIcon.value

shopItems.push({name,price,icon})

localStorage.setItem("shopItems",JSON.stringify(shopItems))

renderShop()

alert("נוסף לחנות")

}

function backShop(){

show("shopScreen")

}

function spinWheel(){

if(solved<10){

alert("גלגל מזל כל 10 פתרונות")

return

}

solved=0

let r=Math.floor(Math.random()*3)

if(r==0){coins+=50}
if(r==1){score+=20}
if(r==2){build()}

updateUI()

}

function backGame(){

show("gameScreen")

}

function resetGame(){

localStorage.clear()
location.reload()

}

function checkUpdate(){

location.reload()

}

function installApp(){

alert("ניתן להתקין דרך הדפדפן")

}
