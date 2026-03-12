let level=1, points=0, coins=0;

const shopItems=[
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

let shopVisible=false;

function startGame(){
document.getElementById("startScreen").style.display="none";
document.getElementById("game").style.display="block";
loadGame();
generateExercise();
updateStats();
}

function saveGame(){
localStorage.setItem("mathcity",JSON.stringify({level,points,coins}));
}

function loadGame(){
let data=localStorage.getItem("mathcity");
if(!data)return;
let d=JSON.parse(data);
level=d.level; points=d.points; coins=d.coins;
updateStats();
}

function updateStats(){
document.getElementById("level").innerText=level;
document.getElementById("points").innerText=points;
document.getElementById("coins").innerText=coins;
}

function random(a,b){return Math.floor(Math.random()*(b-a+1))+a;}

function generateExercise(){
let a=random(1,10), b=random(1,10);
let box=document.querySelector(".exercise");
box.dataset.answer=a+b;
box.querySelector(".q").innerText=a+" + "+b;
box.querySelector("input").value="";
box.classList.remove("correct","wrong");
}

function checkAnswers(){
let box=document.querySelector(".exercise");
let val=parseInt(box.querySelector("input").value);
let ans=parseInt(box.dataset.answer);
box.classList.remove("correct","wrong");
if(val===ans){box.classList.add("correct"); points++; coins+=2;}
else{
box.classList.add("wrong");
box.animate([{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],{duration:300});
}
updateStats(); saveGame(); generateExercise();
}

function spinReward(){
let reward=random(10,50); coins+=reward;
alert("זכית ב "+reward+" מטבעות"); updateStats(); saveGame();
}

function dailyGift(){
let today=new Date().toDateString(), last=localStorage.getItem("daily");
if(last===today){alert("כבר קיבלת היום"); return;}
let reward=random(20,50); coins+=reward;
localStorage.setItem("daily",today);
alert("מתנה יומית "+reward);
updateStats(); saveGame();
}

function toggleShop(){
shopVisible=!shopVisible;
let shop=document.getElementById("shop");
shop.style.display=shopVisible?"block":"none";
if(shopVisible) openShop();
}

function openShop(){
let shop=document.getElementById("shop");
shop.innerHTML="";
shopItems.forEach((item,i)=>{
let btn=document.createElement("button");
btn.className="shopItem";
btn.innerHTML=item.icon+" "+item.name+" - "+item.price;
if(coins<item.price) btn.classList.add("noMoney");
btn.onclick=()=>buyItem(i);
shop.appendChild(btn);
});
}

function buyItem(i){
let item=shopItems[i];
if(coins<item.price) return;
coins-=item.price;
alert("קנית "+item.name);
updateStats(); saveGame(); openShop();
}

function resetGame(){localStorage.clear(); location.reload();}

async function checkUpdate(){
let res=await fetch("version.json?"+Date.now());
let data=await res.json();
let current=localStorage.getItem("appVersion");
if(current!==data.version){localStorage.setItem("appVersion",data.version); alert("יש גרסה חדשה"); location.reload(true);}
else location.reload();
}
