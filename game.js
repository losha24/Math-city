// game.js – גרסת Math City 4

let level = 1;
let score = 0;
let coins = 0;
let attempts = 0;
let correctAnswer = 0;
let solved = 0;
let mistakes = 0;

let rewards = [];
let shopItems = [
    {name:"🚗 מכונית",price:50,icon:"🚗"},
    {name:"🌳 עץ מיוחד",price:40,icon:"🌳"},
    {name:"🏠 בית גדול",price:80,icon:"🏠"},
    {name:"🏪 קניון",price:120,icon:"🏪"},
    {name:"🏫 בית ספר",price:150,icon:"🏫"},
    {name:"🎡 לונה פארק",price:200,icon:"🎡"}
];

let buildings = ["🏠","🌳","🏪","🏫","🎡","🏢"];
let monsters = ["👾","👻","🤖","🦖"];
let monsterActive = false;

let characters = [
    {name:"ליאון","icon":"🦁"},
    {name:"קיטי","icon":"🐱"},
    {name:"דרקו","icon":"🐉"},
    {name:"פיפי","icon":"🐦"}
];

let dailyTasks = [
    {task:"פתור 5 תרגילים","done":false},
    {task:"צבור 20 מטבעות","done":false}
];

// ---------------------
// DOM Elements
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answer");
const cityEl = document.getElementById("city");
const rewardBox = document.getElementById("rewardBox");
const shopList = document.getElementById("shopList");
const rewardList = document.getElementById("rewardList");
const statsBox = document.getElementById("statsBox");
const tasksList = document.getElementById("tasksList");
const mapContainer = document.getElementById("mapContainer");
const charactersList = document.getElementById("charactersList");
const wheelCanvas = document.getElementById("wheelCanvas");
const currentVersionEl = document.getElementById("currentVersion");

// ---------------------
// Screen functions
function showScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function startGame(){ showScreen("gameScreen"); newQuestion(); }
function backGame(){ showScreen("gameScreen"); }
function openShop(){ renderShop(); showScreen("shopScreen"); }
function openRewards(){ updateRewardList(); showScreen("rewardsScreen"); }
function openStats(){ renderStats(); showScreen("statsScreen"); }
function openDailyTasks(){ renderDailyTasks(); showScreen("dailyTasksScreen"); }
function openMap(){ renderMap(); showScreen("mapScreen"); }
function openCharacters(){ renderCharacters(); showScreen("charactersScreen"); }
function openWheel(){ drawWheel(); showScreen("wheelScreen"); }

// ---------------------
// Questions
function newQuestion(){
    answerInput.classList.remove("correct","wrong");
    attempts=0;
    let a,b;
    if(level<3){
        a = Math.floor(Math.random()*10);
        b = Math.floor(Math.random()*10);
        correctAnswer = a+b;
        questionEl.innerText = a + " + " + b;
    } else {
        a = Math.floor(Math.random()*10);
        b = Math.floor(Math.random()*a);
        correctAnswer = a-b;
        questionEl.innerText = a + " - " + b;
    }
}

// ---------------------
// Check answer
function check(){
    let val = parseInt(answerInput.value);
    if(isNaN(val)) return;

    if(val === correctAnswer){
        answerInput.classList.add("correct");
        score++; solved++; coins+=5;
        if(monsterActive){ document.getElementById("monster").innerText=""; monsterActive=false; }
        else { build(); }
        if(score%10===0){ coins+=20; giveReward(); }
        if(score%5===0){ spawnMonster(); destroyBuilding(); level++; }
        updateUI();
        setTimeout(()=>{ answerInput.value=""; newQuestion(); }, 500);
        save();
    } else {
        attempts++; mistakes++;
        answerInput.classList.add("wrong");
        if(attempts>=2){
            setTimeout(()=>{ answerInput.value=""; newQuestion(); answerInput.classList.remove("wrong"); },700);
        }
    }
}

// ---------------------
// Build city
function build(){
    let el = document.createElement("div");
    el.innerText = buildings[Math.floor(Math.random()*buildings.length)];
    cityEl.appendChild(el);
}

// ---------------------
// Rewards
function giveReward(){
    let icons = ["🚗","🎡","🏰","🗼","🎢","🦁"];
    let r = icons[Math.floor(Math.random()*icons.length)];
    rewards.push(r);
    rewardBox.innerHTML='<div class="reward">🎁 פרס חדש '+r+'</div>';
    setTimeout(()=>{ rewardBox.innerHTML=""; },3000);
}
function updateRewardList(){ rewardList.innerHTML = rewards.join(" "); }

// ---------------------
// Shop
function renderShop(){
    shopList.innerHTML="";
    shopItems.forEach(item=>{
        shopList.innerHTML+=`
        <div class="shopItem">
            <h3>${item.icon} ${item.name}</h3>
            מחיר: ${item.price} 🪙
            <br><br>
            <button onclick="buyItem('${item.icon}',${item.price})">קנה</button>
        </div>`;
    });
}
function buyItem(icon,price){
    if(coins<price){ alert("אין מספיק מטבעות"); return; }
    coins-=price;
    let el=document.createElement("div");
    el.innerText = icon;
    cityEl.appendChild(el);
    updateUI();
    save();
}

// ---------------------
// Stats
function renderStats(){
    let accuracy = solved===0?0:Math.round((solved/(solved+mistakes))*100);
    statsBox.innerHTML = `
    תרגילים שנפתרו: ${solved}<br>
    טעויות: ${mistakes}<br>
    אחוז הצלחה: ${accuracy}%<br>
    מטבעות: ${coins}`;
}

// ---------------------
// Daily tasks
function renderDailyTasks(){
    tasksList.innerHTML="";
    dailyTasks.forEach((t,i)=>{
        tasksList.innerHTML+=`<div>${t.done?"✅":"⬜"} ${t.task}</div>`;
    });
}

// ---------------------
// Map
function renderMap(){
    mapContainer.innerHTML="";
    let countries = ["ישראל","יפן","צרפת","מצרים"];
    countries.forEach(c=>{
        let el=document.createElement("div");
        el.innerText = c;
        el.style.margin="5px";
        el.style.fontSize="20px";
        mapContainer.appendChild(el);
    });
}

// ---------------------
// Characters
function renderCharacters(){
    charactersList.innerHTML="";
    characters.forEach(c=>{
        let el=document.createElement("div");
        el.innerText=c.icon+" "+c.name;
        charactersList.appendChild(el);
    });
}

// ---------------------
// Monsters
function spawnMonster(){
    document.getElementById("monster").innerText = monsters[Math.floor(Math.random()*monsters.length)];
    monsterActive = true;
}
function destroyBuilding(){
    if(cityEl.children.length>0){
        cityEl.removeChild(cityEl.children[Math.floor(Math.random()*cityEl.children.length)]);
    }
}

// ---------------------
// Wheel
function drawWheel(){
    if(!wheelCanvas) return;
    let ctx = wheelCanvas.getContext("2d");
    ctx.clearRect(0,0,wheelCanvas.width,wheelCanvas.height);
    ctx.fillStyle="#FFD700";
    ctx.beginPath();
    ctx.arc(150,150,150,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle="#000";
    ctx.font="16px Arial";
    ctx.fillText("גלגל מזל",100,150);
}
function spinWheel(){ alert("גלגל מזל הסתובב!"); coins+=10; updateUI(); save(); }

// ---------------------
// UI Update
function updateUI(){
    scoreEl.innerText=score;
    levelEl.innerText=level;
    coinsEl.innerText=coins;
}

// ---------------------
// Save / Load
function save(){
    localStorage.setItem("mathCity",JSON.stringify({score,level,coins,city:cityEl.innerHTML,rewards,solved,mistakes}));
}
function load(){
    let data = JSON.parse(localStorage.getItem("mathCity")||"{}");
    score = data.score||0;
    level = data.level||1;
    coins = data.coins||0;
    rewards = data.rewards||[];
    solved = data.solved||0;
    mistakes = data.mistakes||0;
    cityEl.innerHTML = data.city||"";
    updateUI();
}
function resetGame(){ localStorage.clear(); location.reload(); }

// ---------------------
// Version update
function updateVersion(){
    fetch("version.json").then(r=>r.json()).then(v=>{
        if(v.version!==currentVersionEl.innerText){
            alert("גרסה חדשה זמינה! מעדכן...");
            location.reload();
        } else {
            alert("אין גרסה חדשה, מרענן...");
            location.reload();
        }
    });
}

// ---------------------
// Init
load();
newQuestion();
