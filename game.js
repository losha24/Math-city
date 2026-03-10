let level=1
let score=0
let coins=0

let correctAnswer

let buildings=["🏠","🏡","🏢","🏫","🏪","🎡"]

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
{name:"נועה2",icon:"👩‍🚀"}

]

function startGame(){

showScreen("gameScreen")
newQuestion()

}

function newQuestion(){

let a=Math.floor(Math.random()*10)
let b=Math.floor(Math.random()*10)

correctAnswer=a+b

question.innerText=a+" + "+b

}

function checkAnswer(){

let val=parseInt(answer.value)

if(val==correctAnswer){

answer.className="correct"

score++
coins+=5

build()

}else{

answer.className="wrong"

}

updateUI()

}

function build(){

let el=document.createElement("div")

el.innerText=buildings[Math.floor(Math.random()*buildings.length)]

city.appendChild(el)

}

function updateUI(){

score.innerText=score
coins.innerText=coins
level.innerText=level

}
