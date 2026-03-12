let level=1
let points=0
let coins=0

let correctCount=0

let answers=[]

function startGame(){

document.getElementById("startScreen").style.display="none"

document.getElementById("game").classList.remove("hidden")

newTasks()

}

function newTasks(){

answers=[]

for(let i=1;i<=4;i++){

let a=Math.floor(Math.random()*10)

let b=Math.floor(Math.random()*10)

answers.push(a+b)

document.getElementById("q"+i).innerText=a+" + "+b

document.getElementById("a"+i).value=""

document.getElementById("a"+i).className=""

}

}

function checkAnswers(){

for(let i=1;i<=4;i++){

let input=document.getElementById("a"+i)

let val=parseInt(input.value)

if(val===answers[i-1]){

input.className="correct"

points++

coins++

correctCount++

}else{

input.className="wrong"

}

}

if(points>=level*10){

level++

alert("עלית רמה!")

}

updateStats()

setTimeout(newTasks,1200)

if(correctCount>=10){

spinReward()

correctCount=0

}

}

function updateStats(){

document.getElementById("points").innerText=points

document.getElementById("coins").innerText=coins

document.getElementById("level").innerText=level

}

function spinReward(){

let reward=Math.floor(Math.random()*3)

if(reward===0){

coins+=5

alert("🎉 זכית ב5 מטבעות")

}

if(reward===1){

points+=5

alert("⭐ זכית ב5 נקודות")

}

if(reward===2){

coins+=10

alert("💰 זכית ב10 מטבעות")

}

updateStats()

}

function dailyReward(){

let last=localStorage.getItem("daily")

let today=new Date().toDateString()

if(last===today){

alert("כבר קיבלת מתנה היום")

return

}

coins+=5

localStorage.setItem("daily",today)

updateStats()

alert("🎁 קיבלת מתנה יומית")

}

function resetGame(){

localStorage.clear()

location.reload()

}

function checkUpdate(){

location.reload()

}
