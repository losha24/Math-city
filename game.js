let level=1, score=0, coins=0, correctCount=0, wheelUsed=false;
let correctAnswer;
let activeCharacter=null;
let buildings=["🏠","🏢","🏫","🏪","🏰"];
let city=document.getElementById("city");

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
];

let shopItems=[
{name:"בית",price:30,icon:"🏠"},
{name:"עץ",price:20,icon:"🌳"},
{name:"בניין",price:80,icon:"🏢"},
{name:"בית ספר",price:120,icon:"🏫"},
{name:"לונה פארק",price:200,icon:"🎡"},
{name:"טירה",price:300,icon:"🏰"},
{name:"חללית",price:500,icon:"🚀"},
{name:"רכבת הרים",price:400,icon:"🎢"},
{name:"מגדל",price:450,icon:"🗼"},
{name:"קניון",price:350,icon:"🏪"}
];

function startGame(){showScreen("gameScreen");newQuestion();}
function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");}
function backGame(){showScreen("gameScreen");}

function newQuestion(){
    let a=Math.floor(Math.random()*10), b=Math.floor(Math.random()*10);
    correctAnswer=a+b;
    let ansInput=document.getElementById("answer");
    ansInput.value=""; ansInput.classList.remove("wrong","correct");
    document.getElementById("question").innerText=a+" + "+b;
}

function checkAnswer(){
    let val=parseInt(document.getElementById("answer").value);
    let ansInput=document.getElementById("answer");
    if(isNaN(val)) return;
    if(val===correctAnswer){
        score++; coins+=5; correctCount++; wheelUsed=false;
        build();
        ansInput.classList.add("correct");
        if(correctCount % 10 === 0) alert("מזל טוב! מגיע לך גלגל מזל.");
    }else{
        ansInput.classList.add("wrong"); shake(ansInput);
    }
    updateUI(); save();
    setTimeout(newQuestion,500);
}

function shake(el){el.style.animation="shake 0.5s";el.addEventListener("animationend",()=>el.style.animation="");}

function build(){let el=document.createElement("div"); el.innerText=buildings[Math.floor(Math.random()*buildings.length)]; city.appendChild(el);}

function spinWheel(){
    if(correctCount<10 || wheelUsed){alert("אפשר להשתמש בגלגל מזל פעם אחת כל 10 תרגילים נכונים");return;}
    wheelUsed=true;
    let prizes=["coins20","coins50","build","character"];
    let p=prizes[Math.floor(Math.random()*prizes.length)];
    if(p==="coins20"){coins+=20; alert("קיבלת 20 מטבעות!");}
    if(p==="coins50"){coins+=50; alert("קיבלת 50 מטבעות!");}
    if(p==="build"){build(); alert("בניין נוסף לעיר!");}
    if(p==="character"){ let c=characters[Math.floor(Math.random()*characters.length)]; alert("קיבלת דמות: "+c.icon+" "+c.name);}
    updateUI();
}

function checkUpdate(){
    fetch("version.json").then(r=>r.json()).then(data=>{
        let current=document.getElementById("appVersion").innerText;
        if(data.version!==current){if(confirm("יש גרסה חדשה, להוריד ולעדכן?")) location.reload(true);}
        else location.reload();
    });
}

function resetGame(){localStorage.clear(); location.reload();}

function updateUI(){
    document.getElementById("score").innerText=score;
    document.getElementById("level").innerText=level;
    document.getElementById("coins").innerText=coins;
}

function save(){
    localStorage.setItem("mathCity",JSON.stringify({score,level,coins,city:city.innerHTML,correctCount}));
}

function load(){
    let data=localStorage.getItem("mathCity");
    if(data){let d=JSON.parse(data);
    score=d.score||0; level=d.level||1; coins=d.coins||0; correctCount=d.correctCount||0; city.innerHTML=d.city||"";}
    updateUI();
}
load();
newQuestion();
