// ======== Game State ========
let level=1, score=0, coins=0;
let solved=0, mistakes=0;
let rewards=[], trophies=[];
let monsterActive=false;

let buildings=["🏠","🌳","🏪","🏫","🎡","🏢"];
let monsters=["👾","👻","🤖","🦖"];
let characters=["ילד1","ילד2","ילד3","ילדה1","ילדה2","ילדה3","ילד4","ילדה4","ילד5","ילדה5"];

let shopItems=[
{name:"🚗 מכונית",price:50,icon:"🚗"},
{name:"🌳 עץ מיוחד",price:40,icon:"🌳"},
{name:"🏠 בית גדול",price:80,icon:"🏠"},
{name:"🏪 קניון",price:120,icon:"🏪"},
{name:"🏫 בית ספר",price:150,icon:"🏫"},
{name:"🎡 לונה פארק",price:200,icon:"🎡"},
{name:"🏰 טירה",price:300,icon:"🏰"},
{name:"🗼 מגדל",price:400,icon:"🗼"},
{name:"🎢 רכבת הרים",price:500,icon:"🎢"},
{name:"🚀 חללית",price:700,icon:"🚀"}
];

// ======== Screens ========
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function startGame(){ showScreen("gameScreen"); newQuestionAll(); }
function backGame(){ showScreen("gameScreen"); }
function openShop(){ renderShop(); showScreen("shopScreen"); }
function openRewards(){ updateRewardList(); showScreen("rewardsScreen"); }
function openStats(){ renderStats(); showScreen("statsScreen"); }

// ======== Questions ========
let currentAnswers=[0,0,0];
function newQuestionAll(){
  for(let i=0;i<3;i++){ newQuestion(i); }
}
function newQuestion(index){
  let a=Math.floor(Math.random()*10), b=Math.floor(Math.random()*10);
  let correct=a+b;
  document.getElementById("answer"+(index+1)).value="";
  document.getElementById("answer"+(index+1)).dataset.correct=correct;
  document.getElementById("answer"+(index+1)).classList.remove("correct","wrong");
}

// ======== Check Answer ========
function checkQuestion(index){
  let input=document.getElementById("answer"+index);
  let val=parseInt(input.value);
  let correct=parseInt(input.dataset.correct);
  if(val===correct){
    input.classList.add("correct");
    score++; solved++; coins+=5;
    if(score%10===0){ giveReward(); } // גלגל מזל כל 10
    if(score%5===0){ level++; spawnMonster(); destroyBuilding(); }
    build();
    updateUI();
    setTimeout(()=>newQuestion(index),500);
    save();
  } else{
    mistakes++;
    input.classList.add("wrong");
    setTimeout(()=>{ input.classList.remove("wrong"); input.value=""; },500);
  }
}

// ======== UI Updates ========
function updateUI(){
  document.getElementById("score").innerText=score;
  document.getElementById("level").innerText=level;
  document.getElementById("coins").innerText=coins;
}

// ======== Build / Monster ========
function spawnMonster(){ document.getElementById("monster").innerText=monsters[Math.floor(Math.random()*monsters.length)]; monsterActive=true; }
function destroyBuilding(){ let c=document.getElementById("city").children; if(c.length>0) document.getElementById("city").removeChild(c[Math.floor(Math.random()*c.length)]); }
function build(){ let el=document.createElement("div"); el.innerText=buildings[Math.floor(Math.random()*buildings.length)]; document.getElementById("city").appendChild(el); }

// ======== Rewards / Wheel ========
function giveReward(){
  let icons=["🚗","🎡","🏰","🗼","🎢"];
  let r=icons[Math.floor(Math.random()*icons.length)];
  rewards.push(r);
  document.getElementById("rewardBox").innerHTML='<div class="reward">🎁 פרס חדש '+r+'</div>';
  setTimeout(()=>{ document.getElementById("rewardBox").innerHTML=""; },3000);
}

// ======== Shop ========
function renderShop(){
  let shopList=document.getElementById("shopList");
  shopList.innerHTML="";
  shopItems.forEach(item=>{
    let btn=coins>=item.price?`<button onclick="buyItem('${item.icon}',${item.price})">קנה</button>`:`<button class="disabled">קנה</button>`;
    shopList.innerHTML+=`<div class="shopItem"><h3>${item.icon} ${item.name}</h3>מחיר: ${item.price} 🪙<br>${btn}</div>`;
  });
}

// ======== Buy Item ========
function buyItem(icon,price){
  if(coins<price) return;
  coins-=price;
  let el=document.createElement("div"); el.innerText=icon;
  document.getElementById("city").appendChild(el);
  updateUI(); save();
}

// ======== Parent Controls ========
function toggleParentMode(){ document.getElementById("parentControls").classList.toggle("hidden"); }
function addParentItem(){
  let name=document.getElementById("newItemName").value;
  let price=parseInt(document.getElementById("newItemPrice").value);
  let icon=document.getElementById("newItemIcon").value;
  if(name && !isNaN(price) && icon) shopItems.push({name,price,icon});
  renderShop();
}

// ======== Rewards / Stats ========
function updateRewardList(){ document.getElementById("rewardList").innerHTML=rewards.join(" "); }
function renderStats(){
  let accuracy=solved==0?0:Math.round((solved/(solved+mistakes))*100);
  document.getElementById("statsBox").innerHTML=`תרגילים שנפתרו: ${solved}<br>טעויות: ${mistakes}<br>אחוז הצלחה: ${accuracy}%<br>מטבעות: ${coins}`;
}

// ======== Save / Load ========
function save(){ localStorage.setItem("mathCity",JSON.stringify({score,level,coins,rewards,solved,mistakes,city:document.getElementById("city").innerHTML})); }
function load(){
  let d=JSON.parse(localStorage.getItem("mathCity")||"{}");
  score=d.score||0; level=d.level||1; coins=d.coins||0;
  rewards=d.rewards||[]; solved=d.solved||0; mistakes=d.mistakes||0;
  document.getElementById("city").innerHTML=d.city||"";
  updateUI();
}

// ======== Reset / Update / Install ========
function resetGame(){ localStorage.clear(); location.reload(); }
function checkUpdate(){
  fetch('version.json').then(r=>r.json()).then(v=>{
    if(v.version!=="5.1"){ alert("גרסא חדשה קיימת! מעדכן..."); location.reload(); }
    else{ location.reload(); }
  });
}
function installApp(){ alert("התקנה (PWA) זמינה במכשירים תואמים"); }

// ======== Init ========
load();
newQuestionAll();
