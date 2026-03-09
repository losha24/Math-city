let level=1,score=0,coins=0,attempts=0,solved=0,mistakes=0
let rewards=[],buildings=["🏠","🌳","🏪","🏫","🎡","🏢"],monsters=["👾","👻","🤖","🦖"],monsterActive=false
let shopItems=[{name:"🚗 מכונית",price:50,icon:"🚗"},{name:"🌳 עץ מיוחד",price:40,icon:"🌳"},{name:"🏠 בית גדול",price:80,icon:"🏠"},{name:"🏪 קניון",price:120,icon:"🏪"},{name:"🏫 בית ספר",price:150,icon:"🏫"},{name:"🎡 לונה פארק",price:200,icon:"🎡"},{name:"🏰 טירה",price:300,icon:"🏰"},{name:"🗼 מגדל",price:400,icon:"🗼"},{name:"🎢 רכבת הרים",price:500,icon:"🎢"},{name:"🚀 חללית",price:700,icon:"🚀"}]

function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active")}
function startGame(){showScreen("gameScreen");newQuestion()}
function backGame(){showScreen("gameScreen")}
function openShop(){renderShop();showScreen("shopScreen")}
function openRewards(){updateRewardList();showScreen("rewardsScreen")}
function openStats(){renderStats();showScreen("statsScreen")}

let correct=0
function newQuestion(){
let a=Math.floor(Math.random()*10),b=Math.floor(Math.random()*10)
if(level<3){correct=a+b;document.getElementById("question").innerText=a+" + "+b}
else{b=Math.floor(Math.random()*a);correct=a-b;document.getElementById("question").innerText=a+" - "+b}
document.getElementById("answer").classList.remove("correct","wrong")
attempts=0
}

function spawnMonster(){document.getElementById("monster").innerText=monsters[Math.floor(Math.random()*monsters.length)];monsterActive=true}
function destroyBuilding(){let c=document.getElementById("city").children;if(c.length>0)document.getElementById("city").removeChild(c[Math.floor(Math.random()*c.length)])}

function check(){
let val=parseInt(document.getElementById("answer").value)
if(isNaN(val))return
let btn=document.getElementById("checkBtn")
if(val==correct){
btn.classList.add("correct");score++;solved++;coins+=5
if(monsterActive){document.getElementById("monster").innerText="";monsterActive=false}else build()
if(score%10==0){coins+=20;giveReward()}
if(score%5==0){level++;spawnMonster();destroyBuilding()}
updateUI();setTimeout(()=>{document.getElementById("answer").value="";newQuestion();btn.classList.remove("correct")},500);save()
}else{
attempts++;mistakes++;btn.classList.add("wrong");document.getElementById("answer").classList.add("shake")
setTimeout(()=>{document.getElementById("answer").classList.remove("shake");btn.classList.remove("wrong")},500)
if(attempts>=2){setTimeout(()=>{document.getElementById("answer").value="";newQuestion();},700)}
}
}

function build(){let el=document.createElement("div");el.innerText=buildings[Math.floor(Math.random()*buildings.length)];document.getElementById("city").appendChild(el)}
function giveReward(){let icons=["🚗","🎡","🏰","🗼","🎢"],r=icons[Math.floor(Math.random()*icons.length)];rewards.push(r);document.getElementById("rewardBox").innerHTML='<div class="reward">🎁 פרס חדש '+r+'</div>';setTimeout(()=>{document.getElementById("rewardBox").innerHTML=""},3000)}

function renderShop(){let shop=document.getElementById("shopList");shop.innerHTML="";shopItems.forEach(item=>{shop.innerHTML+=`<div class="shopItem"><h3>${item.icon} ${item.name}</h3>מחיר: ${item.price} 🪙<br><br><button onclick="buyItem('${item.icon}',${item.price})">קנה</button></div>`})}
function buyItem(icon,price){if(coins<price){alert("אין מספיק מטבעות");return}coins-=price;let el=document.createElement("div");el.innerText=icon;document.getElementById("city").appendChild(el);updateUI();save()}

function updateRewardList(){document.getElementById("rewardList").innerHTML=rewards.join(" ")}
function renderStats(){let accuracy=solved==0?0:Math.round((solved/(solved+mistakes))*100);document.getElementById("statsBox").innerHTML=`תרגילים שנפתרו: ${solved}<br>טעויות: ${mistakes}<br>אחוז הצלחה: ${accuracy}%<br>מטבעות: ${coins}`}

function updateUI(){document.getElementById("score").innerText=score;document.getElementById("level").innerText=level;document.getElementById("coins").innerText=coins}
function save(){localStorage.setItem("mathCity",JSON.stringify({score,level,coins,city:document.getElementById("city").innerHTML,rewards,solved,mistakes}))}
function load(){let data=localStorage.getItem("mathCity");if(data){let d=JSON.parse(data);score=d.score||0;level=d.level||1;coins=d.coins||0;rewards=d.rewards||[];solved=d.solved||0;mistakes=d.mistakes||0;document.getElementById("city").innerHTML=d.city||""}updateUI()}

function resetGame(){localStorage.clear();location.reload()}

load();newQuestion()
