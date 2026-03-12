let level=1, points=0, coins=0, correctStreak=0;
let shopVisible=false, parentalMode=false;
let rewardText="";

const icons=["⚽","🍦","🍰","🧸","📚","⭐","🤖","🎲","🎈","🚗","✈️","⛵","🌸","❤️","🐻"];

let shopItems=[
{name:"כדור",price:10,icon:"⚽"},
{name:"גלידה",price:15,icon:"🍦"},
{name:"עוגה",price:20,icon:"🍰"},
{name:"צעצוע",price:25,icon:"🧸"},
{name:"ספר",price:30,icon:"📚"},
{name:"כוכב",price:40,icon:"⭐"},
{name:"רובוט",price:50,icon:"🤖"},
{name:"קוביה",price:35,icon:"🎲"},
{name:"בלון",price:12,icon:"🎈"}
];

function startGame(){
document.getElementById("startScreen").style.display="none";
document.getElementById("game").style.display="block";
loadGame();
generateExercises();
updateStats();
}

function saveGame(){localStorage.setItem("mathcity",JSON.stringify({level,points,coins,correctStreak}));}

function loadGame(){
let data=localStorage.getItem("mathcity");
if(!data)return;
let d=JSON.parse(data);
level=d.level; points=d.points; coins=d.coins; correctStreak=d.correctStreak||0;
updateStats();
}

function updateStats(){
document.getElementById("level").innerText=level;
document.getElementById("points").innerText=points;
document.getElementById("coins").innerText=coins;
document.getElementById("rewardText").innerText=rewardText;
}

function random(a,b){return Math.floor(Math.random()*(b-a+1))+a;}

function generateExercises(){
document.querySelectorAll(".exercise").forEach(box=>{
let a=random(1,10), b=random(1,10);
box.dataset.answer=a+b;
box.querySelector(".q").innerText=a+" + "+b;
box.querySelector("input").value="";
box.classList.remove("correct","wrong");
});
}

function checkAnswers(){
let allCorrect=true;
document.querySelectorAll(".exercise").forEach(box=>{
let val=parseInt(box.querySelector("input").value);
let ans=parseInt(box.dataset.answer);
if(val===ans){
box.classList.add("correct");
points++; coins+=2; correctStreak++;
}else{
box.classList.add("wrong");
box.animate([{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],{duration:300});
allCorrect=false;
}
});
rewardText=allCorrect?"":"תשובה שגויה! נסה שוב";
if(correctStreak>=14){
rewardText="🎯 זכית בגלגל מזל!";
coins+=random(10,50);
correctStreak=0;
}
updateStats(); saveGame();
generateExercises();
}

function toggleShop(){shopVisible=!shopVisible; document.getElementById("shop").style.display=shopVisible?"grid":"none"; if(shopVisible) openShop();}

function openShop(){
let shop=document.getElementById("shop");
shop.innerHTML="";
shopItems.forEach((item,i)=>{
let btn=document.createElement("div");
btn.className="shopItem";
if(coins<item.price) btn.classList.add("noMoney");
btn.innerHTML=`<div>${item.icon}</div><div>${item.name} - ${item.price}</div>`;
if(parentalMode){
btn.innerHTML+=`<button onclick="editItem(${i})">✏️</button>
<button onclick="deleteItem(${i})">🗑️</button>`;
}
shop.appendChild(btn);
});
}

function buyItem(i){let item=shopItems[i]; if(coins<item.price)return; coins-=item.price; alert("קנית "+item.name); updateStats(); saveGame(); openShop();}

function editItem(i){let newName=prompt("שם חדש:",shopItems[i].name); if(newName) shopItems[i].name=newName; let newPrice=parseInt(prompt("מחיר חדש:",shopItems[i].price)); if(!isNaN(newPrice)) shopItems[i].price=newPrice; let newIcon=icons[random(0,icons.length-1)]; shopItems[i].icon=newIcon; openShop();}

function deleteItem(i){if(confirm("למחוק פריט?")){shopItems.splice(i,1); openShop();}}

function addItem(){let name=prompt("שם פריט חדש:"); let price=parseInt(prompt("מחיר:")); if(!name||isNaN(price)) return; let icon=icons[random(0,icons.length-1)]; shopItems.push({name,price,icon}); openShop();}

function toggleParental(){parentalMode=!parentalMode; openShop();}

function dailyGift(){let today=new Date().toDateString(), last=localStorage.getItem("daily"); if(last===today){rewardText="כבר קיבלת היום מתנה"; updateStats(); return;} let reward=random(20,50); coins+=reward; rewardText="מתנה יומית: "+reward; localStorage.setItem("daily",today); updateStats(); saveGame();}

function spinReward(){rewardText="🎯 גלגל מזל!"; coins+=random(10,50); updateStats(); saveGame();}

function installApp(){alert("תהליך התקנת אפליקציה");}

function showStats(){alert(`סטטיסטיקה:\nרמה: ${level}\nנקודות: ${points}\nמטבעות: ${coins}`);}

function resetGame(){localStorage.clear(); location.reload();}

async function checkUpdate(){let res=await fetch("version.json?"+Date.now()); let data=await res.json(); let current=localStorage.getItem("appVersion"); if(current!==data.version){localStorage.setItem("appVersion",data.version); alert("יש גרסה חדשה"); location.reload(true);} else location.reload();}
