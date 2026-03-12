let level=1, points=0, coins=0, correctAnswersCount=0, parentMode=false;
let shopItems=[{id:1,name:"פריט 1",price:10,icon:"⭐"},{id:2,name:"פריט 2",price:15,icon:"🍎"},{id:3,name:"פריט 3",price:20,icon:"🎁"},{id:4,name:"פריט 4",price:25,icon:"💎"},{id:5,name:"פריט 5",price:30,icon:"🍀"},{id:6,name:"פריט 6",price:12,icon:"🔔"},{id:7,name:"פריט 7",price:18,icon:"⚡"},{id:8,name:"פריט 8",price:22,icon:"🎉"},{id:9,name:"פריט 9",price:27,icon:"💡"}];

function startGame(){ document.getElementById('startScreen').style.display='none'; document.getElementById('gameScreen').style.display='block'; generateExercises(); updateStats(); loadShop();}
function generateExercises(){ const area=document.getElementById('mathArea'); area.innerHTML=''; for(let i=0;i<4;i++){ const div=document.createElement('div'); div.className='mathBox'; div.innerHTML=`<span id="ex${i}">${Math.floor(Math.random()*10)}+${Math.floor(Math.random()*10)}</span><input type="number" id="ans${i}" />`; area.appendChild(div);}}
function checkAnswers(){ correctAnswersCount=0; for(let i=0;i<4;i++){ const ex=document.getElementById(`ex${i}`); const ans=document.getElementById(`ans${i}`); const correct=eval(ex.textContent); if(Number(ans.value)===correct){ ex.parentElement.classList.add('correct'); ex.parentElement.classList.remove('wrong','shake'); correctAnswersCount++; points++; coins+=2; } else{ ex.parentElement.classList.add('wrong','shake'); setTimeout(()=>{ex.parentElement.classList.remove('shake');},500); } } updateStats(); if(correctAnswersCount===4 && points%14===0){ rewardText("קיבלת מתנה מגלגל מזל!");} generateExercises();}
function updateStats(){ document.getElementById('level').textContent=level; document.getElementById('points').textContent=points; document.getElementById('coins').textContent=coins;}
function loadShop(){ const container=document.getElementById('shopItems'); container.innerHTML=''; shopItems.forEach(item=>{ const div=document.createElement('div'); div.className='shopItem'; if(coins<item.price) div.classList.add('disabled'); div.innerHTML=`${item.icon}<br>${item.name}<br>${item.price}💰`; if(parentMode){ const edit=document.createElement('button'); edit.textContent='ערוך'; edit.onclick=()=>editItem(item.id); div.appendChild(edit); const del=document.createElement('button'); del.textContent='מחק'; del.onclick=()=>deleteItem(item.id); div.appendChild(del); } container.appendChild(div);});}
function toggleParentMode(){ parentMode=!parentMode; loadShop(); }
function spinReward(){ rewardText("קיבלת מתנה מגלגל מזל!"); }
function dailyReward(){ rewardText("קיבלת מתנה יומית!"); }
function rewardText(msg){ document.getElementById('rewardText').textContent=msg; }
function resetGame(){ level=1; points=0; coins=0; updateStats(); generateExercises();}
function checkUpdate(){ location.reload();}
function editItem(id){ alert("ערוך פריט "+id);}
function deleteItem(id){ alert("מחק פריט "+id);}
