let level=1, score=0, coins=0, attempts=0, solved=0, mistakes=0;
let rewards=[], buildings=["🏠","🌳","🏪","🏫","🎡","🏢"], monsters=["👾","👻","🤖","🦖"], monsterActive=false;
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
const localVersion = "5.0";
let correctAnswer=0;

function showScreen(id){ document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active")); document.getElementById(id).classList.add("active"); }
function startGame(){ showScreen("gameScreen"); newQuestion(); }
function backGame(){ showScreen("gameScreen"); }
function openShop(){ renderShop(); showScreen("shopScreen"); }
function openRewards(){ updateRewardList(); showScreen("rewardsScreen"); }
function openStats(){ renderStats(); showScreen("statsScreen"); }

function newQuestion(){
    attempts=0;
    let a=Math.floor(Math.random()*10), b=Math.floor(Math.random()*10);
    correctAnswer=a+b;
    document.getElementById("question").innerText=a+" + "+b;
    document.getElementById("answer").value="";
}

function check(){
    let val=parseInt(document.getElementById("answer").value);
    let ansInput=document.getElementById("answer");
    if(isNaN(val)) return;
    if(val==correctAnswer){
        ansInput.classList.add("correct");
        score++; solved++; coins+=5;
        build();
        if(score%10==0){ coins+=20; giveReward(); }
        if(score%5==0){ level++; spawnMonster(); destroyBuilding(); }
        updateUI(); save();
        setTimeout(newQuestion,500);
    } else {
        attempts++; mistakes++;
        ansInput.classList.add("wrong");
        if(attempts>=2){ setTimeout(()=>{ ansInput.value=""; ansInput.classList.remove("wrong"); newQuestion(); },700); }
    }
}

function build(){ let el=document.createElement("div"); el.innerText=buildings[Math.floor(Math.random()*buildings.length)]; city.appendChild(el); }
function giveReward(){ let icons=["🚗","🎡","🏰","🗼","🎢"]; let r=icons[Math.floor(Math.random()*icons.length)]; rewards.push(r); document.getElementById("rewardBox").innerHTML='<div class="reward">🎁 פרס חדש '+r+'</div>'; setTimeout(()=>{ document.getElementById("rewardBox").innerHTML=""; },3000); }
function spawnMonster(){ document.getElementById("monster").innerText=monsters[Math.floor(Math.random()*monsters.length)]; monsterActive=true; }
function destroyBuilding(){ let c=city.children; if(c.length>0){ city.removeChild(c[Math.floor(Math.random()*c.length)]); } }

function renderShop(){
    let shopList=document.getElementById("shopList"); shopList.innerHTML="";
    shopItems.forEach(item=>{
        let btnClass=coins>=item.price?"":"disabled";
        shopList.innerHTML+=`<div class="shopItem"><h3>${item.icon} ${item.name}</h3>מחיר: ${item.price} 🪙<br><br>
        <button class="${btnClass}" onclick="buyItem('${item.icon}',${item.price})">קנה</button></div>`;
    });
}

function buyItem(icon,price){
    if(coins<price){ alert("אין מספיק מטבעות"); return; }
    coins-=price;
    let el=document.createElement("div"); el.innerText=icon; city.appendChild(el); updateUI(); save();
}

function updateRewardList(){ document.getElementById("rewardList").innerHTML=rewards.join(" "); }
function renderStats(){ let accuracy=solved==0?0:Math.round((solved/(solved+mistakes))*100); document.getElementById("statsBox").innerHTML=`תרגילים שנפתרו: ${solved}<br>טעויות: ${mistakes}<br>אחוז הצלחה: ${accuracy}%<br>מטבעות: ${coins}`; }
function updateUI(){ document.getElementById("score").innerText=score; document.getElementById("level").innerText=level; document.getElementById("coins").innerText=coins; }

function save(){ localStorage.setItem("mathCity",JSON.stringify({score,level,coins,city:city.innerHTML,rewards,solved,mistakes})); }
function load(){ let data=localStorage.getItem("mathCity"); if(data){ let d=JSON.parse(data); score=d.score||0; level=d.level||1; coins=d.coins||0; rewards=d.rewards||[]; solved=d.solved||0; mistakes=d.mistakes||0; city.innerHTML=d.city||""; } updateUI(); }
load(); newQuestion();

function resetGame(){ localStorage.clear(); location.reload(); }
async function checkUpdate(){
    try {
        let response = await fetch("version.json");
        let data = await response.json();
        if(data.currentVersion !== localVersion){
            if(confirm(`יש גרסה חדשה: ${data.currentVersion}. האם לעדכן עכשיו?`)){
                location.reload();
            }
        } else {
            alert("אין גרסה חדשה. מבצעים רענון.");
            location.reload();
        }
    } catch(e){
        console.error("לא ניתן לבדוק גרסא:", e);
        alert("שגיאה בבדיקת גרסא. מבצעים רענון.");
        location.reload();
    }
}
function installApp(){ alert("התקנת אפליקציה לא זמינה כרגע."); }
