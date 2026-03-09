let level=1,score=0,coins=0,attempts=0,solved=0,mistakes=0;
let rewards=[],buildings=["🏠","🌳","🏪","🏫","🎡","🏢"],monsters=["👾","👻","🤖","🦖"],monsterActive=false;
let parentMode=false;

let shopItems=[
{name:"🚗 מכונית",price:50,icon:"🚗"},
{name:"🌳 עץ מיוחד",price:40,icon:"🌳"},
{name:"🏠 בית גדול",price:80,icon:"🏠"},
{name:"🏪 קניון",price:120,icon:"🏪"},
{name:"🏫 בית ספר",price:150,icon:"🏫"},
{name:"🎡 לונה פארק",price:200,icon:"🎡"}
];

function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active")}
function startGame(){showScreen("gameScreen");newQuestion()}
function backGame(){showScreen("gameScreen")}
function openShop(){renderShop();showScreen("shopScreen")}
function openRewards(){updateRewardList();showScreen("rewardsScreen")}
function openStats(){renderStats();showScreen("statsScreen")}

let correct=0;
function newQuestion(){
let a=Math.floor(Math.random()*10),b=Math.floor(Math.random()*10);
if(level<3){correct=a+b;document.getElementById("question").innerText=a+" + "+b}
else{b=Math.floor(Math.random()*a);correct=a-b;document.getElementById("question").innerText=a+" - "+b}
document.getElementById("answer").classList.remove("correct","wrong")
attempts=0;
}

function check(){
let val=parseInt(document.getElementById("answer").value);
if(isNaN(val))return;
let btn=document.getElementById("checkBtn");
if(val==correct){
btn.classList.add("correct");score++;solved++;coins+=5;
buildOrMonster();
if(score%10==0){coins+=20;giveReward();}
updateUI();setTimeout(()=>{document.getElementById("answer").value="";newQuestion();btn.classList.remove("correct")},500);save()
}else{
attempts++;mistakes++;btn.classList.add("wrong");document.getElementById("answer").classList.add("shake");
setTimeout(()=>{document.getElementById("answer").classList.remove("shake");btn.classList.remove("wrong")},500);
if(attempts>=2){setTimeout(()=>{document.getElementById("answer").value="";newQuestion();},700)}
}
}

function buildOrMonster(){
if(score%5==0){spawnMonster();destroyBuilding();}else{let el=document.createElement("div");el.innerText=buildings[Math.floor(Math.random()*buildings.length)];document.getElementById("city").appendChild(el);}
}

function spawnMonster(){document.getElementById("monster").innerText=monsters[Math.floor(Math.random()*monsters.length)];monsterActive=true;}
function destroyBuilding(){let c=document.getElementById("city").children;if(c.length>0)document.getElementById("city").removeChild(c[Math.floor(Math.random()*c.length)]);}

function giveReward(){let icons=["🚗","🎡","🏰","🗼","🎢"],r=icons[Math.floor(Math.random()*icons.length)];rewards.push(r);document.getElementById("rewardBox").innerHTML='<div class="reward">🎁 פרס חדש '+r+'</div>';setTimeout(()=>{document.getElementById("rewardBox").innerHTML=""},3000)}

function renderShop(){let shop=document.getElementById("shopList");shop.innerHTML="";shopItems.forEach((item,i)=>{shop.innerHTML+=`<div class="shopItem"><h3>${item.icon} ${item.name}</h3>מחיר: <span id="price${i}">${item.price}</span> 🪙<br><br><button onclick="buyItem(${i})">קנה</button>${parentMode?`<br><button onclick="editItem(${i})">✏️ שנה מחיר</button><button onclick="deleteItem(${i})">🗑️ מחק</button>`:""}</div>`})}

function buyItem(index){let item=shopItems[index];if(coins<item.price){alert("אין מספיק מטבעות");return;}coins-=item.price;let el=document.createElement("div");el.innerText=item.icon;document.getElementById("city").appendChild(el);updateUI();save()}

function editItem(index){let newPrice=prompt("הכנס מחיר חדש:",shopItems[index].price);if(newPrice!==null){shopItems[index].price=parseInt(newPrice);renderShop();save()}}
function deleteItem(index){shopItems.splice(index,1);renderShop();save()}
function toggleParentMode(){parentMode=!parentMode;renderShop();alert(parentMode?"מצב הורים מופעל":"מצב הורים כבוי")}

function updateRewardList(){document.getElementById("rewardList").innerHTML=rewards.join(" ")}
function renderStats(){let accuracy=solved==0?0:Math.round((solved/(solved+mistakes))*100);document.getElementById("statsBox").innerHTML=`תרגילים שנפתרו: ${solved}<br>טעויות: ${mistakes}<br>אחוז הצלחה: ${accuracy}%<br>מטבעות: ${coins}`}

function updateUI(){document.getElementById("score").innerText=score;document.getElementById("level").innerText=level;document.getElementById("coins").innerText=coins}
function save(){localStorage.setItem("mathCity",JSON.stringify({score,level,coins,city:document.getElementById("city").innerHTML,rewards,solved,mistakes,shopItems}))}
function load(){let data=localStorage.getItem("mathCity");if(data){let d=JSON.parse(data);score=d.score||0;level=d.level||1;coins=d.coins||0;rewards=d.rewards||[];solved=d.solved||0;mistakes=d.mistakes||0;document.getElementById("city").innerHTML=d.city||"";if(d.shopItems)shopItems=d.shopItems;}updateUI()}
function resetGame(){localStorage.clear();location.reload()}

load();newQuestion()

// עדכון גרסה
function updateOrRefresh(){fetch("version.json").then(r=>r.json()).then(v=>{let current="1.0.2";if(v.version!==current){if(confirm("גרסה חדשה זמינה. לעדכן עכשיו?")) location.reload();else alert("אין צורך לעדכן")}else location.reload()})}
