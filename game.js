let score=0
let coins=0
let level=1
let solved=0

let questions=[]

const city=document.getElementById("city")

loadGame()

function saveGame(){

localStorage.setItem("mathCity",JSON.stringify({

score,
coins,
level,
solved,
city:city.innerHTML

}))

}

function loadGame(){

let data=localStorage.getItem("mathCity")

if(data){

let game=JSON.parse(data)

score=game.score
coins=game.coins
level=game.level
solved=game.solved
city.innerHTML=game.city

}

updateStats()

}

function newQuestion(){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

return{
a:a,
b:b,
c:a+b
}

}

function generateQuestions(){

questions=[

newQuestion(),
newQuestion(),
newQuestion(),
newQuestion()

]

document.getElementById("q1").innerText=
questions[0].a+" + "+questions[0].b

document.getElementById("q2").innerText=
questions[1].a+" + "+questions[1].b

document.getElementById("q3").innerText=
questions[2].a+" + "+questions[2].b

document.getElementById("q4").innerText=
questions[3].a+" + "+questions[3].b

document.getElementById("a1").value=""
document.getElementById("a2").value=""
document.getElementById("a3").value=""
document.getElementById("a4").value=""

}

function checkAnswers(){

for(let i=1;i<=4;i++){

let val=parseInt(
document.getElementById("a"+i).value)

let box=document.getElementById("a"+i)

if(val===questions[i-1].c){

box.classList.remove("red")
box.classList.add("green")

score++
coins+=2
solved++

}else{

box.classList.add("red")
box.classList.add("shake")

setTimeout(()=>{

box.classList.remove("shake")

},300)

}

}

progressCity()

updateStats()

saveGame()

generateQuestions()

}

function progressCity(){

if(solved===3)build("🌳")
if(solved===6)build("🏠")
if(solved===10)build("🏪")
if(solved===15)build("🏫")
if(solved===20)build("🏢")
if(solved===30)build("🎡")

}

function build(icon){

let el=document.createElement("span")

el.innerText=icon

city.appendChild(el)

}

function updateStats(){

document.getElementById("score").innerText=score
document.getElementById("coins").innerText=coins

level=Math.floor(score/10)+1

document.getElementById("level").innerText=level

renderShop()

}

function spinWheel(){

let rewards=[

{type:"coins",value:20},
{type:"coins",value:50},
{type:"build",value:"🏠"},
{type:"build",value:"🌳"},
{type:"score",value:10}

]

let r=rewards[Math.floor(Math.random()*rewards.length)]

if(r.type==="coins"){

coins+=r.value
alert("זכית ב "+r.value+" מטבעות")

}

if(r.type==="build"){

build(r.value)
alert("זכית בבניין")

}

if(r.type==="score"){

score+=r.value
alert("זכית ב "+r.value+" נקודות")

}

updateStats()

saveGame()

}

function dailyReward(){

let today=new Date().toDateString()

let last=localStorage.getItem("dailyReward")

if(last===today){

alert("כבר קיבלת מתנה היום")

return

}

coins+=30

alert("קיבלת 30 מטבעות 🎁")

localStorage.setItem("dailyReward",today)

updateStats()

saveGame()

}

const shop=[

{n:"עץ",p:10,i:"🌳"},
{n:"בית",p:20,i:"🏠"},
{n:"חנות",p:30,i:"🏪"},
{n:"בית ספר",p:40,i:"🏫"},
{n:"בניין",p:50,i:"🏢"},
{n:"פארק",p:20,i:"🌲"},
{n:"גלגל ענק",p:60,i:"🎡"},
{n:"טירה",p:70,i:"🏰"},
{n:"מגדל",p:80,i:"🗼"}

]

function renderShop(){

let html=""

shop.forEach((item,i)=>{

let color=coins>=item.p?"green":"red"

html+=`

<div class="shopItem">

${item.i}

<br>

${item.n}

<br>

${item.p}

<br>

<button class="${color}"
onclick="buy(${i})">

קנה

</button>

</div>

`

})

document.getElementById("shopItems").innerHTML=html

}

function buy(i){

if(coins<shop[i].p)return

coins-=shop[i].p

build(shop[i].i)

updateStats()

saveGame()

}

generateQuestions()

renderShop()
