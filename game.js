let score=0
let coins=0
let level=1
let solved=0

let questions=[]

function startGame(){

document.getElementById("startScreen").style.display="none"
document.getElementById("gameScreen").style.display="block"

generateQuestions()
updateStats()

}

function resetGame(){

localStorage.clear()
location.reload()

}

function newQuestion(){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

return {a:a,b:b,c:a+b}

}

function generateQuestions(){

questions=[
newQuestion(),
newQuestion(),
newQuestion(),
newQuestion()
]

document.getElementById("q1").innerText=questions[0].a+"+"+questions[0].b
document.getElementById("q2").innerText=questions[1].a+"+"+questions[1].b
document.getElementById("q3").innerText=questions[2].a+"+"+questions[2].b
document.getElementById("q4").innerText=questions[3].a+"+"+questions[3].b

}

function checkAnswers(){

for(let i=1;i<=4;i++){

let val=parseInt(document.getElementById("a"+i).value)

if(val===questions[i-1].c){

score++
coins+=2
solved++

}else{

document.getElementById("a"+i).classList.add("red")

}

}

generateQuestions()

updateStats()

}

function updateStats(){

document.getElementById("score").innerText=score
document.getElementById("coins").innerText=coins

level=Math.floor(score/10)+1

document.getElementById("level").innerText=level

}

function spinWheel(){

let r=Math.floor(Math.random()*3)

if(r===0){coins+=20}
if(r===1){score+=10}
if(r===2){coins+=50}

alert("קיבלת פרס!")

updateStats()

}

function dailyReward(){

coins+=30

alert("קיבלת מתנה יומית")

updateStats()

}

function toggleShop(){

let s=document.getElementById("shop")

s.style.display=s.style.display==="block"?"none":"block"

}
