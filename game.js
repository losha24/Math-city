let level=1, score=0, coins=0, solved=0, mistakes=0;
let rewards=[], shopItems=[], monsterActive=false;

// DOM Elements
const scoreEl=document.getElementById("score");
const levelEl=document.getElementById("level");
const coinsEl=document.getElementById("coins");
const city=document.getElementById("city");

// SHOP icons
const iconOptions=["🚗","🌳","🏠","🏪","🏫","🎡","🏰","🗼","🎢","🚀","🛸","🛹","🛶","🎁","🎨"];
const shopIconSelect=document.getElementById("newItemIcon");
iconOptions.forEach(ic=>{ let opt=document.createElement("option"); opt.value=ic; opt.text=ic; shopIconSelect.add(opt); });

// Screen Control
function showScreen(id){ document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active")); document.getElementById(id).classList.add("active"); }
function startGame(){ showScreen("gameScreen"); newAllQuestions(); updateUI(); }
function backGame(){ showScreen("gameScreen"); updateUI(); }
function openShop(){ renderShop(); showScreen("shopScreen"); }
function openRewards(){ updateRewardList(); showScreen("rewardsScreen"); }
function openStats(){ renderStats(); showScreen("statsScreen"); }

// Questions
let questions=[];
function newQuestion(){ return {a: Math.floor(Math.random()*10), b: Math.floor(Math.random()*10), correct: 0 }; }
function newAllQuestions(){
    questions=[newQuestion(),newQuestion(),newQuestion(),newQuestion()];
    questions.forEach((q,i)=>{ 
        q.correct = q.a + q.b; 
        document.getElementById("question"+(i+1)).innerText=`${q.a} + ${q.b}`;
        document.getElementById("answer"+(i+1)).value="";
    });
}

function checkAllAnswers(){
    let allCorrect=true;
    questions.forEach((q,i)=>{
        let val=parseInt(document.getElementById("answer"+(i+1)).value);
        let inputEl=document.getElementById("answer"+(i+1));
        inputEl.classList.remove("red","green");
        if(val===q.correct){
            score++; coins+=5; solved++;
            inputEl.classList.add("green");
        } else {
            mistakes++; allCorrect=false;
            inputEl.classList.add("red");
            inputEl.classList.add("shake");
            setTimeout(()=>inputEl.classList.remove("shake"),500);
        }
    });
    if(score%10===0) spinWheel();
    if(score%5===0) level++;
    build();
    updateUI();
    if(!allCorrect) return;
    setTimeout(newAllQuestions,500);
}

// CITY / Build
const buildings=["🏠","🌳","🏪","🏫","🎡","🏢"];
function build(){ let el=document.createElement("div"); el.innerText=buildings[Math.floor(Math.random()*buildings.length)]; city.appendChild(el); }

// SHOP
function renderShop(){
    const list=document.getElementById("shopList");
    list.innerHTML="";
    shopItems.forEach((item,i)=>{
        let btnClass=coins>=item.price?"":"red";
        list.innerHTML+=`<div class="shopItem">${item.icon} ${item.name} - ${item.price} 🪙<br><button class="${btnClass}" onclick="buyItem(${i})">קנה</button></div>`;
    });
}
function buyItem(index){
    let item=shopItems[index];
    if(coins<item.price){ alert("אין מספיק מטבעות"); return; }
    coins-=item.price;
    let el=document.createElement("div"); el.innerText=item.icon; city.appendChild(el);
    updateUI();
}

// Parent Controls
let parentMode=false;
function toggleParentMode(){ parentMode=!parentMode; document.getElementById("parentControls").classList.toggle("hidden",!parentMode); }
function addShopItem(){
    let name=document.getElementById("newItemName").value;
    let price=parseInt(document.getElementById("newItemPrice").value);
    let icon=document.getElementById("newItemIcon").value;
    if(!name || isNaN(price)) return alert("שם ומחיר חובה");
    shopItems.push({name,price,icon});
    renderShop();
}

// REWARDS
function updateRewardList(){ document.getElementById("rewardList").innerHTML=rewards.join(" "); }

// STATS
function renderStats(){
    let accuracy=solved===0?0:Math.round(solved/(solved+mistakes)*100);
    document.getElementById("statsBox").innerHTML=`תרגילים: ${solved}<br>טעויות: ${mistakes}<br>אחוז הצלחה: ${accuracy}%<br>מטבעות: ${coins}`;
}

// SPIN WHEEL
function spinWheel(){
    alert("🎁 זכית בפרס!");
    let r=["🚗","🎡","🏰","🗼","🎢"];
    let reward=r[Math.floor(Math.random()*r.length)];
    rewards.push(reward);
    document.getElementById("rewardBox").innerHTML=`<div class="reward">🎁 ${reward}</div>`;
    setTimeout(()=>document.getElementById("rewardBox").innerHTML="",3000);
}

// VERSION UPDATE
function updateVersion(){
    // כאן ניתן לבדוק מול קובץ גרסה אמיתי בשרת, לפשט פה רק רענון
    location.reload();
}

// INSTALL APP
function installApp(){ alert("התקנת האפליקציה (PWA)"); }

// RESET
function resetGame(){ localStorage.clear(); location.reload(); }

// UI
function updateUI(){ scoreEl.innerText=score; levelEl.innerText=level; coinsEl.innerText=coins; }

// INIT
startGame();
